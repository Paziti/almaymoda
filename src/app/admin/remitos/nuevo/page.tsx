"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { MagnifyingGlassIcon, TrashIcon, PlusIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { variantLabel } from "@/lib/labels";
import { fmtDate, fmtMoney, parseNumber, remitoNumber, uid } from "@/lib/format";
import { findExact, looksLikeBarcode, searchProducts } from "@/lib/barcode";
import { totalStock } from "@/lib/pricing";
import { useListPricer } from "@/lib/hooks";
import { brandOf, remitoTotals } from "@/lib/remito-pdf";
import type { Client, LineItem, PriceList, Product } from "@/lib/types";
import { Button, ButtonLink, EmptyState, Field, IconButton, Input, Panel, Segmented, Select, Spinner, Stepper, Switch, Textarea } from "@/components/comun/ui";
import { ProductImage } from "@/components/comun/product-image";
import { PageHeader, pagePad } from "@/components/admin/shell";
import { PaymentFields, draftToPayment, emptyDraft } from "@/components/admin/cobro";
import { accountOf, addDays, remitoAmount, startOfDay } from "@/lib/cuentas";

type Line = LineItem & { key: string };

const emptyCustomer = { name: "", phone: "", email: "", address: "", cuit: "" };
const WALK_IN = "Consumidor final";

function Builder() {
  const router = useRouter();
  const params = useSearchParams();
  const orderId = params.get("pedido");
  const presetClientId = params.get("cliente");
  const editId = params.get("editar");
  // Remito que se corrige: mismo número, mismos pagos; cambian los renglones y los datos.
  const editing = useDB((s) => (editId ? s.remitos.find((r) => r.id === editId) : undefined));
  const pointOfSale = useDB((s) => s.settings.pointOfSale);
  const allRemitos = useDB((s) => s.remitos);
  const payments = useDB((s) => s.payments);
  const adjustments = useDB((s) => s.adjustments);
  const updateRemito = useDB((s) => s.updateRemito);
  const products = useDB((s) => s.products);
  const suppliers = useDB((s) => s.suppliers);
  const clients = useDB((s) => s.clients);
  const order = useDB((s) => s.orders.find((o) => o.id === orderId));
  const createRemito = useDB((s) => s.createRemito);
  const saveClient = useDB((s) => s.saveClient);
  const listPricer = useListPricer();

  const initialClientId = editing ? (editing.clientId ?? "") : (order?.clientId ?? presetClientId ?? "");
  const orderClient = initialClientId ? clients.find((c) => c.id === initialClientId) : undefined;
  const [clientId, setClientId] = useState<string>(orderClient ? initialClientId : "");
  const [customer, setCustomer] = useState(() =>
    editing
      ? editing.customer
      : orderClient
      ? { name: orderClient.name, phone: orderClient.phone, email: orderClient.email, address: [orderClient.address, orderClient.city].filter(Boolean).join(", "), cuit: orderClient.cuit }
      : order
        ? { ...emptyCustomer, name: order.customer.name, phone: order.customer.phone, address: order.customer.city }
        : emptyCustomer,
  );
  const [priceList, setPriceList] = useState<PriceList>(editing ? (editing.priceList ?? "mayorista") : params.get("lista") === "minorista" || orderClient?.retail ? "minorista" : "mayorista");
  const pricer = (p: Product) => listPricer(priceList, p);
  const [saveAsClient, setSaveAsClient] = useState(true);
  const [lines, setLines] = useState<Line[]>(() => (editing?.items ?? order?.items ?? []).map((i) => ({ ...i, key: uid("l") })));
  const [q, setQ] = useState("");
  const [picking, setPicking] = useState<Product | null>(null);
  const [pickQty, setPickQty] = useState<Record<string, number>>({});
  const [discountText, setDiscountText] = useState(editing?.discount ? String(editing.discount) : "");
  const [notes, setNotes] = useState(editing?.notes ?? order?.notes ?? "");
  // Al editar, si la clienta queda con saldo a favor se pide tocar Guardar dos veces (con el mismo total).
  const [favorOkTotal, setFavorOkTotal] = useState<number | null>(null);
  const [discountStock, setDiscountStock] = useState(true);
  const [free, setFree] = useState({ name: "", qty: "1", price: "" });
  const [error, setError] = useState("");
  // Cobro: contado, todo a cuenta corriente, o una parte ahora y el resto a cuenta.
  const [cobro, setCobro] = useState<"contado" | "cuenta" | "parcial">("contado");
  const [daysText, setDaysText] = useState("20");
  const [pay, setPay] = useState(emptyDraft);
  const savePayment = useDB((s) => s.savePayment);

  const results = useMemo(() => searchProducts(products, q), [q, products]);

  /** Cambia la lista y recalcula los artículos cargados. Los renglones libres no se tocan. */
  const changeList = (list: PriceList) => {
    if (list === priceList) return;
    setPriceList(list);
    setLines((ls) =>
      ls.map((l) => {
        const p = l.productId ? products.find((x) => x.id === l.productId) : undefined;
        return p ? { ...l, unitPrice: listPricer(list, p) } : l;
      }),
    );
  };

  const pickClient = (id: string) => {
    setClientId(id);
    const c = clients.find((x) => x.id === id);
    setCustomer(c ? { name: c.name, phone: c.phone, email: c.email, address: [c.address, c.city].filter(Boolean).join(", "), cuit: c.cuit } : emptyCustomer);
    if (c) changeList(c.retail ? "minorista" : "mayorista");
  };

  /** Suma una unidad. Lo usa la pistola con artículos de un solo color y medida: cada lectura es +1. */
  const addOne = (p: Product) => {
    const v = p.variants[0];
    setLines((ls) => {
      const i = ls.findIndex((l) => l.variantId === v.id);
      if (i >= 0) return ls.map((l, k) => (k === i ? { ...l, qty: l.qty + 1 } : l));
      return [...ls, { key: uid("l"), productId: p.id, variantId: v.id, code: p.code, name: p.name, size: v.size, color: v.color, qty: 1, unitPrice: pricer(p) }];
    });
    toast.success(`+1 ${p.name}`, { id: "scan", duration: 1500 });
  };

  /** Enter en el buscador (la pistola lo manda sola): agrega el artículo exacto o abre sus colores. */
  const onSearchEnter = () => {
    const target = findExact(products, q) ?? (results.length === 1 ? results[0] : undefined);
    if (!target) return;
    setQ("");
    if (target.variants.length === 1) addOne(target);
    else {
      setPicking(target);
      setPickQty({});
    }
  };

  const addPicked = () => {
    if (!picking) return;
    const price = pricer(picking);
    const added: Line[] = [];
    for (const v of picking.variants) {
      const n = pickQty[v.id] ?? 0;
      if (n > 0) added.push({ key: uid("l"), productId: picking.id, variantId: v.id, code: picking.code, name: picking.name, size: v.size, color: v.color, qty: n, unitPrice: price });
    }
    setLines((ls) => {
      const next = [...ls];
      for (const a of added) {
        const i = next.findIndex((l) => l.variantId === a.variantId);
        if (i >= 0) next[i] = { ...next[i], qty: next[i].qty + a.qty };
        else next.push(a);
      }
      return next;
    });
    setPicking(null);
    setPickQty({});
    setQ("");
  };

  const discount = Math.min(100, Math.max(0, parseNumber(discountText) ?? 0));
  const { subtotal, units, discountAmount, total } = remitoTotals({ items: lines, discount });
  const dueDays = Math.max(0, Math.round(parseNumber(daysText) ?? 0));

  const oldTotal = editing ? remitoAmount(editing) : 0;
  const balanceAfter = useMemo(() => {
    if (!editing?.clientId) return null;
    return accountOf(editing.clientId, { remitos: allRemitos, payments, adjustments }).balance - oldTotal + total;
  }, [editing, allRemitos, payments, adjustments, oldTotal, total]);

  const saveEdit = () => {
    if (!editing) return;
    const name = customer.name.trim() || (priceList === "minorista" ? WALK_IN : "");
    if (!name) return setError("Poné el nombre del cliente.");
    if (!lines.length) return setError("El remito tiene que tener al menos un artículo. Si no va más, anulalo.");
    if (balanceAfter !== null && balanceAfter < 0 && favorOkTotal !== total) {
      setFavorOkTotal(total);
      return setError(`Con este total la clienta queda con ${fmtMoney(-balanceAfter)} a favor, porque ya pagó más. Si está bien, tocá «Guardar cambios» otra vez.`);
    }
    setError("");
    updateRemito(editing.id, {
      customer: { ...customer, name },
      items: lines.map((l) => ({ productId: l.productId, variantId: l.variantId, code: l.code, name: l.name, size: l.size, color: l.color, qty: l.qty, unitPrice: l.unitPrice, brand: l.brand ?? brandOf(l.productId, products, suppliers) })),
      notes,
      discount,
      priceList,
    });
    toast.success(`Remito N° ${remitoNumber(pointOfSale, editing.number)} actualizado`);
    router.replace(`/admin/remitos/ver?id=${editing.id}`);
  };

  const submit = () => {
    if (editing) return saveEdit();
    // En el local muchas veces no se pide el nombre.
    const name = customer.name.trim() || (priceList === "minorista" ? WALK_IN : "");
    if (!name) return setError("Poné el nombre del cliente.");
    if (!lines.length) return setError("Agregá al menos un artículo.");
    const willHaveClient = !!clientId || (saveAsClient && name !== WALK_IN);
    if (cobro !== "contado" && !willHaveClient) return setError("Para dejar saldo en cuenta corriente, elegí la clienta o dejá prendido «Guardar como cliente».");
    const paidNow = cobro === "contado" ? total : cobro === "parcial" ? (parseNumber(pay.amount) ?? 0) : 0;
    if (cobro === "parcial" && !(paidNow > 0 && paidNow < total)) return setError("En pago parcial, lo que paga ahora tiene que ser más que cero y menos que el total.");
    // Se valida el pago antes de emitir, para no dejar un remito a medias.
    const check = paidNow > 0 ? draftToPayment(pay, "x", { amount: paidNow }) : null;
    if (typeof check === "string") return setError(check);
    setError("");
    let cid: string | null = clientId || null;
    if (!cid && saveAsClient && name !== WALK_IN) {
      const c: Client = { id: uid("c"), name, retail: priceList === "minorista" || undefined, business: "", phone: customer.phone, email: customer.email, city: "", address: customer.address, cuit: customer.cuit, notes: "", createdAt: Date.now() };
      saveClient(c);
      cid = c.id;
    }
    const remito = createRemito(
      {
        clientId: cid,
        customer: { ...customer, name },
        items: lines.map((l) => ({ productId: l.productId, variantId: l.variantId, code: l.code, name: l.name, size: l.size, color: l.color, qty: l.qty, unitPrice: l.unitPrice, brand: brandOf(l.productId, products, suppliers) })),
        notes,
        discount,
        priceList,
        orderId: order?.id ?? null,
        dueDate: cobro === "contado" ? null : addDays(startOfDay(), dueDays),
      },
      discountStock,
    );
    if (cid && paidNow > 0) {
      const p = draftToPayment(pay, cid, { amount: paidNow, remitoId: remito.id });
      if (typeof p !== "string") savePayment(p);
    }
    toast.success(`Remito N° ${remito.number} generado`);
    router.replace(`/admin/remitos/ver?id=${remito.id}`);
  };

  const setLine = (key: string, patch: Partial<Line>) => setLines((ls) => ls.map((l) => (l.key === key ? { ...l, ...patch } : l)));

  if (editId && (!editing || editing.status === "anulado")) {
    return (
      <EmptyState title={editing ? "Este remito está anulado" : "No encontramos este remito"} action={<ButtonLink href="/admin/remitos">Volver a remitos</ButtonLink>}>
        {editing ? "Los remitos anulados no se pueden editar. Hacé uno nuevo." : "Revisá el número en la lista de remitos."}
      </EmptyState>
    );
  }

  return (
    <div className="pb-24 lg:pb-0">
      {editing ? (
        <PageHeader
          title={`Editar remito ${remitoNumber(pointOfSale, editing.number)}`}
          description="Queda el mismo número. Al guardar, el PDF sale con los cambios: si ya lo mandaste, reenvialo."
          back={{ href: `/admin/remitos/ver?id=${editing.id}`, label: "Volver al remito" }}
        />
      ) : (
        <PageHeader title="Nuevo remito" description={order ? `Desde el pedido web N° ${order.number}` : undefined} back={{ href: "/admin/remitos", label: "Remitos" }} />
      )}
      <div className={`${pagePad} grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]`}>
        <div className="flex min-w-0 flex-col gap-6">
          <Panel className="flex flex-col gap-3 p-5">
            <Segmented
              label="Precio"
              value={priceList}
              onChange={changeList}
              options={[
                { value: "mayorista", label: "Mayorista" },
                { value: "minorista", label: "Minorista" },
              ]}
            />
            <p className="text-sm text-gris">
              {priceList === "minorista"
                ? "Para ventas en el local o a particulares. Si no ponés nombre, sale como consumidor final."
                : "El precio de siempre, el que se ve en la tienda."}
            </p>
          </Panel>

          <Panel className="flex flex-col gap-4 p-5">
            <h2 className="font-semibold">Cliente</h2>
            <Field label="Cliente guardado" htmlFor="r-client" hint={editing ? "No se cambia al editar: la deuda y los pagos son de esta clienta. Si te equivocaste de clienta, anulá el remito y hacé uno nuevo." : undefined}>
              <Select id="r-client" value={clientId} onChange={(e) => pickClient(e.target.value)} disabled={!!editing}>
                <option value="">Cliente nuevo o sin guardar</option>
                {clients.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                    {c.business ? ` (${c.business})` : ""}
                  </option>
                ))}
              </Select>
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Nombre" htmlFor="r-name">
                <Input id="r-name" placeholder={priceList === "minorista" ? WALK_IN : "Nombre o razón social"} value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
              </Field>
              <Field label="Teléfono / WhatsApp" htmlFor="r-phone">
                <Input id="r-phone" type="tel" inputMode="tel" value={customer.phone} onChange={(e) => setCustomer({ ...customer, phone: e.target.value })} />
              </Field>
              <Field label="Email" htmlFor="r-email">
                <Input id="r-email" type="email" placeholder="email@ejemplo.com" value={customer.email} onChange={(e) => setCustomer({ ...customer, email: e.target.value })} />
              </Field>
              <Field label="CUIT / DNI" htmlFor="r-cuit">
                <Input id="r-cuit" inputMode="numeric" value={customer.cuit} onChange={(e) => setCustomer({ ...customer, cuit: e.target.value })} />
              </Field>
              <Field label="Dirección / localidad" htmlFor="r-addr" className="sm:col-span-2">
                <Input id="r-addr" value={customer.address} onChange={(e) => setCustomer({ ...customer, address: e.target.value })} />
              </Field>
            </div>
            {!clientId && !editing && <Switch checked={saveAsClient} onChange={setSaveAsClient} label="Guardar en clientes" description="Para no tener que tipear los datos la próxima vez" />}
          </Panel>

          <Panel className="flex flex-col gap-4 p-5">
            <h2 className="font-semibold">Artículos</h2>
            <div className="relative">
              <MagnifyingGlassIcon size={20} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gris" />
              <Input
                type="search"
                aria-label="Buscar artículo"
                placeholder="Pistoleá o buscá por código o nombre"
                className="pl-11"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    onSearchEnter();
                  }
                }}
              />
              {results.length > 0 && !picking && (
                <ul className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-linea bg-papel shadow-xl">
                  {results.map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => (setPicking(p), setPickQty({}))} className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-piedra">
                        <div className="w-9 shrink-0 overflow-hidden rounded-md">
                          <ProductImage product={p} sizes="sm" />
                        </div>
                        <span className="min-w-0 flex-1">
                          <span className="block truncate font-semibold">{p.name}</span>
                          <span className="num text-sm text-gris">
                            {p.code} · {fmtMoney(pricer(p))}
                          </span>
                        </span>
                        <span className="num text-sm text-gris">{totalStock(p)} u.</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {q && results.length === 0 && !picking && (
              <p className="text-sm text-gris">
                {looksLikeBarcode(q) ? "Ese código de barras no está cargado en ningún artículo." : `No hay artículos con “${q}”.`} Podés cargarlo en Artículos o agregarlo abajo como renglón libre.
              </p>
            )}

            {picking && (
              <div className="flex flex-col gap-3 rounded-xl border border-acento bg-acento-suave/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate font-semibold">
                    <span className="num text-gris">{picking.code}</span> {picking.name}
                  </p>
                  <span className="num text-sm font-semibold">{fmtMoney(pricer(picking))} c/u</span>
                </div>
                {picking.variants.length === 0 ? (
                  <p className="text-sm text-gris">Este artículo no tiene colores cargados.</p>
                ) : (
                  <ul className="flex flex-col divide-y divide-linea">
                    {picking.variants.map((v) => (
                      <li key={v.id} className="flex items-center justify-between gap-3 py-2">
                        <span className="min-w-0 text-sm">
                          <span className="font-semibold">{variantLabel(v.size, v.color)}</span> <span className={v.stock > 0 ? "text-gris" : "text-peligro"}>· hay {v.stock}</span>
                        </span>
                        <Stepper size="sm" label={`${v.color} ${v.size}`} value={pickQty[v.id] ?? 0} onChange={(n) => setPickQty({ ...pickQty, [v.id]: n })} />
                      </li>
                    ))}
                  </ul>
                )}
                <div className="flex gap-2">
                  <Button onClick={addPicked} disabled={!Object.values(pickQty).some((n) => n > 0)}>
                    Agregar al remito
                  </Button>
                  <Button variant="ghost" onClick={() => setPicking(null)}>
                    Cancelar
                  </Button>
                </div>
              </div>
            )}

            {lines.length > 0 ? (
              <ul className="flex flex-col divide-y divide-linea rounded-xl border border-linea">
                {lines.map((l) => (
                  <li key={l.key} className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center">
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{l.name}</p>
                      <p className="num text-sm text-gris">
                        {l.code}
                        {(l.size || l.color) && `, ${variantLabel(l.size, l.color)}`}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Stepper size="sm" label={`cantidad ${l.name}`} value={l.qty} min={1} onChange={(n) => setLine(l.key, { qty: n })} />
                      <Input aria-label={`Precio unitario ${l.name}`} inputMode="decimal" className="num min-h-10 w-28 text-right" value={l.unitPrice} onChange={(e) => setLine(l.key, { unitPrice: parseNumber(e.target.value) ?? 0 })} />
                      <IconButton label={`Quitar ${l.name}`} onClick={() => setLines((ls) => ls.filter((x) => x.key !== l.key))} className="text-gris">
                        <TrashIcon size={18} />
                      </IconButton>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="rounded-xl bg-piedra px-4 py-3 text-sm text-gris">Buscá artículos arriba y elegí cantidades por color.</p>
            )}

            <details className="rounded-xl border border-linea">
              <summary className="flex min-h-11 cursor-pointer items-center gap-2 px-4 text-sm font-semibold">
                <PlusIcon size={16} /> Agregar un renglón libre (algo que no está cargado)
              </summary>
              <form
                className="grid gap-3 border-t border-linea p-4 sm:grid-cols-[1fr_90px_120px_auto] sm:items-end"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!free.name.trim()) return;
                  setLines((ls) => [...ls, { key: uid("l"), productId: null, variantId: null, code: "-", name: free.name.trim(), size: "", color: "", qty: Math.max(1, parseInt(free.qty, 10) || 1), unitPrice: parseNumber(free.price) ?? 0 }]);
                  setFree({ name: "", qty: "1", price: "" });
                }}
              >
                <Field label="Descripción" htmlFor="fr-name">
                  <Input id="fr-name" value={free.name} onChange={(e) => setFree({ ...free, name: e.target.value })} />
                </Field>
                <Field label="Cant." htmlFor="fr-qty">
                  <Input id="fr-qty" inputMode="numeric" className="num" value={free.qty} onChange={(e) => setFree({ ...free, qty: e.target.value })} />
                </Field>
                <Field label="Precio" htmlFor="fr-price">
                  <Input id="fr-price" inputMode="decimal" className="num" value={free.price} onChange={(e) => setFree({ ...free, price: e.target.value })} />
                </Field>
                <Button type="submit" variant="secondary">
                  Agregar
                </Button>
              </form>
            </details>
          </Panel>
        </div>

        <div className="flex flex-col gap-4 lg:sticky lg:top-6 lg:self-start">
          <Panel className="flex flex-col gap-4 p-5">
            <h2 className="font-semibold">Resumen</h2>
            <dl className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <dt className="text-gris">Unidades</dt>
                <dd className="num font-semibold">{units}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-gris">Subtotal</dt>
                <dd className="num">{fmtMoney(subtotal)}</dd>
              </div>
              {discountAmount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-gris">Descuento {discount}%</dt>
                  <dd className="num">- {fmtMoney(discountAmount)}</dd>
                </div>
              )}
              <div className="flex items-baseline justify-between border-t border-linea pt-2">
                <dt className="font-semibold">Total</dt>
                <dd className="num font-display text-3xl">{fmtMoney(total)}</dd>
              </div>
            </dl>
            <Field label="Descuento (%)" htmlFor="r-disc">
              <Input id="r-disc" inputMode="decimal" className="num" placeholder="0" value={discountText} onChange={(e) => setDiscountText(e.target.value)} />
            </Field>
            <Field label="Observaciones" htmlFor="r-notes" hint="Sale impreso en el remito">
              <Textarea id="r-notes" rows={2} value={notes} onChange={(e) => setNotes(e.target.value)} />
            </Field>
            {editing ? (
              <p className="text-sm text-gris">
                {editing.stockDiscounted ? "El stock se corrige solo: lo que agregues se descuenta y lo que saques vuelve." : "Este remito no movió stock y al editarlo tampoco lo mueve."}
              </p>
            ) : (
              <Switch checked={discountStock} onChange={setDiscountStock} label="Descontar del stock" description="Si se anula el remito, el stock vuelve" />
            )}
          </Panel>

          {editing ? (
            <Panel className="flex flex-col gap-3 p-5 text-sm">
              <h2 className="font-semibold">Cuenta</h2>
              <div className="flex justify-between">
                <span className="text-gris">Total antes</span>
                <span className="num">{fmtMoney(oldTotal)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gris">Total nuevo</span>
                <span className="num font-semibold">{fmtMoney(total)}</span>
              </div>
              {balanceAfter !== null ? (
                <p className={balanceAfter < 0 ? "font-semibold text-peligro" : "text-gris"}>
                  {balanceAfter < 0 ? `La clienta queda con ${fmtMoney(-balanceAfter)} a favor.` : `La clienta queda debiendo ${fmtMoney(balanceAfter)} en total.`} Los pagos ya cargados no cambian.
                </p>
              ) : (
                <p className="text-gris">Sin clienta guardada: no hay cuenta corriente. Si el total cambió, cobrá o devolvé la diferencia.</p>
              )}
              {error && (
                <p role="alert" className="font-semibold text-peligro">
                  {error}
                </p>
              )}
            </Panel>
          ) : (
            <Panel className="flex flex-col gap-4 p-5">
              <h2 className="font-semibold">Cobro</h2>
              <Segmented
                label="Cómo paga"
                value={cobro}
                onChange={setCobro}
                options={[
                  { value: "contado", label: "Contado" },
                  { value: "cuenta", label: "Cuenta corriente" },
                  { value: "parcial", label: "Parcial" },
                ]}
              />
              {cobro !== "contado" && (
                <Field label={cobro === "parcial" ? "El resto vence en (días)" : "Vence en (días)"} htmlFor="r-days" hint={`Vence el ${fmtDate(addDays(startOfDay(), dueDays))}`}>
                  <div className="flex flex-wrap items-center gap-2">
                    <Input id="r-days" inputMode="numeric" className="num w-20" value={daysText} onChange={(e) => setDaysText(e.target.value.replace(/\D/g, ""))} />
                    {[7, 15, 20, 30].map((d) => (
                      <Button key={d} size="sm" variant={dueDays === d ? "primary" : "secondary"} onClick={() => setDaysText(String(d))}>
                        {d}
                      </Button>
                    ))}
                  </div>
                </Field>
              )}
              {cobro !== "cuenta" && (
                <PaymentFields
                  idPrefix="rp"
                  value={cobro === "contado" ? { ...pay, amount: String(total) } : pay}
                  onChange={(d) => setPay(cobro === "contado" ? { ...d, amount: pay.amount } : d)}
                  showAmount={cobro === "parcial"}
                  showDate={false}
                />
              )}
              {cobro === "parcial" && total > 0 && (parseNumber(pay.amount) ?? 0) > 0 && (
                <p className="num text-sm text-gris">Queda a cuenta {fmtMoney(Math.max(0, total - (parseNumber(pay.amount) ?? 0)))}</p>
              )}
              {error && (
                <p role="alert" className="text-sm font-semibold text-peligro">
                  {error}
                </p>
              )}
            </Panel>
          )}
          <div className="safe-bottom fixed inset-x-0 bottom-16 z-30 border-t border-linea bg-papel p-3 lg:static lg:border-0 lg:bg-transparent lg:p-0">
            <Button size="lg" className="w-full" onClick={submit}>
              {editing ? "Guardar cambios" : "Generar remito"} · {fmtMoney(total)}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <Builder />
    </Suspense>
  );
}
