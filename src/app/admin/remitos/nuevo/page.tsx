"use client";

import { Suspense, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { MagnifyingGlassIcon, TrashIcon, PlusIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtMoney, normalizeText, parseNumber, uid } from "@/lib/format";
import { totalStock } from "@/lib/pricing";
import { usePricer } from "@/lib/hooks";
import { remitoTotals } from "@/lib/remito-pdf";
import type { Client, LineItem, Product } from "@/lib/types";
import { Button, Field, IconButton, Input, Panel, Select, Spinner, Stepper, Switch, Textarea } from "@/components/ui";
import { ProductImage } from "@/components/product-image";
import { PageHeader, pagePad } from "@/components/admin/shell";

type Line = LineItem & { key: string };

const emptyCustomer = { name: "", phone: "", email: "", address: "", cuit: "" };

function Builder() {
  const router = useRouter();
  const params = useSearchParams();
  const orderId = params.get("pedido");
  const presetClientId = params.get("cliente");
  const products = useDB((s) => s.products);
  const clients = useDB((s) => s.clients);
  const order = useDB((s) => s.orders.find((o) => o.id === orderId));
  const createRemito = useDB((s) => s.createRemito);
  const saveClient = useDB((s) => s.saveClient);
  const pricer = usePricer();

  const initialClientId = order?.clientId ?? presetClientId ?? "";
  const orderClient = initialClientId ? clients.find((c) => c.id === initialClientId) : undefined;
  const [clientId, setClientId] = useState<string>(orderClient ? initialClientId : "");
  const [customer, setCustomer] = useState(() =>
    orderClient
      ? { name: orderClient.name, phone: orderClient.phone, email: orderClient.email, address: [orderClient.address, orderClient.city].filter(Boolean).join(", "), cuit: orderClient.cuit }
      : order
        ? { ...emptyCustomer, name: order.customer.name, phone: order.customer.phone, address: order.customer.city }
        : emptyCustomer,
  );
  const [saveAsClient, setSaveAsClient] = useState(true);
  const [lines, setLines] = useState<Line[]>(() => (order?.items ?? []).map((i) => ({ ...i, key: uid("l") })));
  const [q, setQ] = useState("");
  const [picking, setPicking] = useState<Product | null>(null);
  const [pickQty, setPickQty] = useState<Record<string, number>>({});
  const [discountText, setDiscountText] = useState("");
  const [notes, setNotes] = useState(order?.notes ?? "");
  const [discountStock, setDiscountStock] = useState(true);
  const [free, setFree] = useState({ name: "", qty: "1", price: "" });
  const [error, setError] = useState("");

  const results = useMemo(() => {
    const nq = normalizeText(q);
    if (!nq) return [];
    return products.filter((p) => normalizeText(`${p.code} ${p.name}`).includes(nq)).slice(0, 8);
  }, [q, products]);

  const pickClient = (id: string) => {
    setClientId(id);
    const c = clients.find((x) => x.id === id);
    setCustomer(c ? { name: c.name, phone: c.phone, email: c.email, address: [c.address, c.city].filter(Boolean).join(", "), cuit: c.cuit } : emptyCustomer);
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

  const submit = () => {
    if (!customer.name.trim()) return setError("Poné el nombre del cliente.");
    if (!lines.length) return setError("Agregá al menos un artículo.");
    setError("");
    let cid: string | null = clientId || null;
    if (!cid && saveAsClient) {
      const c: Client = { id: uid("c"), name: customer.name.trim(), business: "", phone: customer.phone, email: customer.email, city: "", address: customer.address, cuit: customer.cuit, notes: "", createdAt: Date.now() };
      saveClient(c);
      cid = c.id;
    }
    const remito = createRemito(
      {
        clientId: cid,
        customer: { ...customer, name: customer.name.trim() },
        items: lines.map((l) => ({ productId: l.productId, variantId: l.variantId, code: l.code, name: l.name, size: l.size, color: l.color, qty: l.qty, unitPrice: l.unitPrice })),
        notes,
        discount,
        orderId: order?.id ?? null,
      },
      discountStock,
    );
    toast.success(`Remito N° ${remito.number} generado`);
    router.replace(`/admin/remitos/${remito.id}`);
  };

  const setLine = (key: string, patch: Partial<Line>) => setLines((ls) => ls.map((l) => (l.key === key ? { ...l, ...patch } : l)));

  return (
    <div className="pb-24 lg:pb-0">
      <PageHeader title="Nuevo remito" description={order ? `Desde el pedido web N° ${order.number}` : undefined} back={{ href: "/admin/remitos", label: "Remitos" }} />
      <div className={`${pagePad} grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]`}>
        <div className="flex min-w-0 flex-col gap-6">
          <Panel className="flex flex-col gap-4 p-5">
            <h2 className="font-semibold">Cliente</h2>
            <Field label="Cliente guardado" htmlFor="r-client">
              <Select id="r-client" value={clientId} onChange={(e) => pickClient(e.target.value)}>
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
                <Input id="r-name" placeholder="Nombre o razón social" value={customer.name} onChange={(e) => setCustomer({ ...customer, name: e.target.value })} />
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
            {!clientId && <Switch checked={saveAsClient} onChange={setSaveAsClient} label="Guardar en clientes" description="Para no tener que tipear los datos la próxima vez" />}
          </Panel>

          <Panel className="flex flex-col gap-4 p-5">
            <h2 className="font-semibold">Artículos</h2>
            <div className="relative">
              <MagnifyingGlassIcon size={20} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gris" />
              <Input type="search" aria-label="Buscar artículo" placeholder="Buscar por código o nombre" className="pl-11" value={q} onChange={(e) => setQ(e.target.value)} />
              {results.length > 0 && !picking && (
                <ul className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-linea bg-papel shadow-xl">
                  {results.map((p) => (
                    <li key={p.id}>
                      <button type="button" onClick={() => (setPicking(p), setPickQty({}))} className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-malva">
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

            {picking && (
              <div className="flex flex-col gap-3 rounded-xl border border-fucsia bg-fucsia-suave/40 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="min-w-0 truncate font-semibold">
                    <span className="num text-gris">{picking.code}</span> {picking.name}
                  </p>
                  <span className="num text-sm font-semibold">{fmtMoney(pricer(picking))} c/u</span>
                </div>
                {picking.variants.length === 0 ? (
                  <p className="text-sm text-gris">Este artículo no tiene talles cargados.</p>
                ) : (
                  <ul className="flex flex-col divide-y divide-linea">
                    {picking.variants.map((v) => (
                      <li key={v.id} className="flex items-center justify-between gap-3 py-2">
                        <span className="min-w-0 text-sm">
                          <span className="font-semibold">T.{v.size}</span>
                          {v.color !== "Único" && ` ${v.color}`} <span className={v.stock > 0 ? "text-gris" : "text-peligro"}>· hay {v.stock}</span>
                        </span>
                        <Stepper size="sm" label={`talle ${v.size} ${v.color}`} value={pickQty[v.id] ?? 0} onChange={(n) => setPickQty({ ...pickQty, [v.id]: n })} />
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
                        {l.size && ` · T.${l.size}`}
                        {l.color && l.color !== "Único" && ` · ${l.color}`}
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
              <p className="rounded-xl bg-malva px-4 py-3 text-sm text-gris">Buscá artículos arriba y elegí cantidades por talle.</p>
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
            <Switch checked={discountStock} onChange={setDiscountStock} label="Descontar del stock" description="Si se anula el remito, el stock vuelve" />
            {error && (
              <p role="alert" className="text-sm font-semibold text-peligro">
                {error}
              </p>
            )}
          </Panel>
          <div className="safe-bottom fixed inset-x-0 bottom-16 z-30 border-t border-linea bg-papel p-3 lg:static lg:border-0 lg:bg-transparent lg:p-0">
            <Button size="lg" className="w-full" onClick={submit}>
              Generar remito · {fmtMoney(total)}
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
