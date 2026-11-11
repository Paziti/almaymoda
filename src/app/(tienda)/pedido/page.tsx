"use client";

import Link from "next/link";
import { useState } from "react";
import { TrashIcon, WhatsappLogoIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { useSession } from "@/lib/session";
import { fmtMoney, now, uid } from "@/lib/format";
import { usePricer } from "@/lib/hooks";
import { whatsappUrl } from "@/lib/share";
import type { LineItem, Order } from "@/lib/types";
import { Button, ButtonLink, EmptyState, Field, IconButton, Input, Panel, Stepper, Textarea } from "@/components/ui";
import { ProductImage } from "@/components/product-image";
import { usePriceVisible } from "@/components/shop/product-card";

export default function PedidoPage() {
  const cart = useSession((s) => s.cart);
  const setQty = useSession((s) => s.setQty);
  const clearCart = useSession((s) => s.clearCart);
  const clientId = useSession((s) => s.clientId);
  const login = useSession((s) => s.login);
  const products = useDB((s) => s.products);
  const clients = useDB((s) => s.clients);
  const settings = useDB((s) => s.settings);
  const createOrder = useDB((s) => s.createOrder);
  const saveClient = useDB((s) => s.saveClient);
  const pricer = usePricer();
  const showPrice = usePriceVisible();

  const me = clients.find((c) => c.id === clientId);
  const [form, setForm] = useState({ name: me?.name ?? "", phone: me?.phone ?? "", business: me?.business ?? "", city: me?.city ?? "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<{ order: Order; url: string | null } | null>(null);

  const lines = cart
    .map((l) => {
      const p = products.find((x) => x.id === l.productId);
      const v = p?.variants.find((x) => x.id === l.variantId);
      return p && v ? { ...l, p, v, price: pricer(p) } : null;
    })
    .filter((x): x is NonNullable<typeof x> => !!x);

  const total = lines.reduce((a, l) => a + l.qty * l.price, 0);
  const units = lines.reduce((a, l) => a + l.qty, 0);
  const missing = settings.minPurchase > 0 ? Math.max(0, settings.minPurchase - total) : 0;

  if (sent) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center gap-5 px-4 py-16 text-center">
        <CheckCircleIcon size={56} className="text-ok" weight="duotone" />
        <h1 className="font-display text-4xl">Pedido N° {sent.order.number} registrado</h1>
        {sent.url ? (
          <>
            <p className="text-gris">Se abrió WhatsApp con el detalle. Si no se abrió, tocá el botón para enviarlo.</p>
            <a href={sent.url} target="_blank" rel="noreferrer" className="inline-flex min-h-13 items-center gap-2 rounded-xl bg-whatsapp px-6 font-semibold text-white dark:text-[#0b2a1a]">
              <WhatsappLogoIcon size={22} /> Abrir WhatsApp
            </a>
          </>
        ) : (
          <p className="text-gris">El local todavía no cargó su número de WhatsApp. Tu pedido quedó guardado y lo ven en el panel.</p>
        )}
        <ButtonLink href="/catalogo" variant="secondary">
          Seguir mirando
        </ButtonLink>
      </div>
    );
  }

  if (!lines.length) {
    return (
      <EmptyState title="Tu pedido está vacío" action={<ButtonLink href="/catalogo">Ir al catálogo</ButtonLink>}>
        Entrá a un artículo y elegí cuántas unidades querés de cada talle.
      </EmptyState>
    );
  }

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Escribí tu nombre.";
    if (form.phone.replace(/\D/g, "").length < 8) errs.phone = "Escribí un teléfono con código de área.";
    setErrors(errs);
    if (Object.keys(errs).length) return;

    const digits = form.phone.replace(/\D/g, "");
    let client = clients.find((c) => c.phone.replace(/\D/g, "").endsWith(digits.slice(-8)) && digits.length >= 8);
    if (!client) {
      client = { id: uid("c"), name: form.name, business: form.business, phone: form.phone, email: "", city: form.city, address: "", cuit: "", notes: "Alta desde la tienda", createdAt: now() };
    } else {
      client = { ...client, name: form.name || client.name, business: form.business || client.business, city: form.city || client.city };
    }
    saveClient(client);
    login(client.id);

    const items: LineItem[] = lines.map((l) => ({ productId: l.p.id, variantId: l.v.id, code: l.p.code, name: l.p.name, size: l.v.size, color: l.v.color, qty: l.qty, unitPrice: l.price }));
    const order = createOrder({ clientId: client.id, customer: { name: form.name, phone: form.phone, business: form.business, city: form.city }, items, notes: form.notes });

    const text = [
      `Hola! Soy ${form.name}${form.business ? ` (${form.business})` : ""}${form.city ? `, de ${form.city}` : ""}. Quiero hacer este pedido (N° ${order.number}):`,
      "",
      ...items.map((i) => `• ${i.qty} × ${i.code} ${i.name} · T.${i.size}${i.color !== "Único" ? ` ${i.color}` : ""}`),
      "",
      `${units} unidades${showPrice ? ` · Total ${fmtMoney(total)}` : ""}`,
      form.notes ? `\nNota: ${form.notes}` : "",
    ].join("\n");

    const url = settings.whatsapp ? whatsappUrl(settings.whatsapp, text) : null;
    if (url) window.open(url, "_blank", "noopener");
    clearCart();
    setSent({ order, url });
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1.3fr_1fr]">
      <section aria-labelledby="t-items" className="flex flex-col gap-4">
        <h1 id="t-items" className="font-display text-5xl">
          Tu pedido
        </h1>
        <ul className="flex flex-col divide-y divide-linea rounded-2xl border border-linea bg-papel">
          {lines.map((l) => (
            <li key={l.variantId} className="flex gap-3 p-3 sm:gap-4">
              <Link href={`/producto/${l.p.id}`} className="w-20 shrink-0 overflow-hidden rounded-xl sm:w-24">
                <ProductImage product={l.p} sizes="sm" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold leading-snug">{l.p.name}</p>
                    <p className="text-sm text-gris">
                      Talle {l.v.size}
                      {l.v.color !== "Único" && ` · ${l.v.color}`} · <span className="num">{l.p.code}</span>
                    </p>
                  </div>
                  <IconButton label={`Quitar ${l.p.name} talle ${l.v.size}`} onClick={() => setQty(l.productId, l.variantId, 0)} className="-mr-1 -mt-1 text-gris">
                    <TrashIcon size={18} />
                  </IconButton>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Stepper size="sm" label={`${l.p.name} talle ${l.v.size}`} value={l.qty} min={1} max={l.v.stock} onChange={(n) => setQty(l.productId, l.variantId, n)} />
                  {showPrice && <span className="num font-semibold">{fmtMoney(l.qty * l.price)}</span>}
                </div>
                {l.qty > l.v.stock && <p className="text-sm text-alerta">Hay {l.v.stock} en stock.</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <Panel className="flex flex-col gap-3 p-5">
          <div className="flex items-baseline justify-between">
            <span className="text-gris">Unidades</span>
            <span className="num font-semibold">{units}</span>
          </div>
          {showPrice && (
            <div className="flex items-baseline justify-between">
              <span className="text-gris">Total estimado</span>
              <span className="num font-display text-3xl">{fmtMoney(total)}</span>
            </div>
          )}
          {missing > 0 && showPrice && (
            <div className="flex flex-col gap-1.5">
              <div className="h-2 overflow-hidden rounded-full bg-malva" aria-hidden>
                <div className="h-full bg-fucsia" style={{ width: `${Math.min(100, (total / settings.minPurchase) * 100)}%` }} />
              </div>
              <p className="text-sm text-gris">
                Faltan {fmtMoney(missing)} para la compra mínima de {fmtMoney(settings.minPurchase)}.
              </p>
            </div>
          )}
        </Panel>

        <Panel as="div" className="p-5">
          <form onSubmit={submit} noValidate className="flex flex-col gap-4">
            <h2 className="font-semibold">Tus datos</h2>
            <Field label="Nombre" htmlFor="o-name" error={errors.name}>
              <Input id="o-name" autoComplete="name" placeholder="Tu nombre" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Teléfono / WhatsApp" htmlFor="o-phone" error={errors.phone}>
              <Input id="o-phone" type="tel" autoComplete="tel" inputMode="tel" placeholder="11 2345 6789" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Negocio" htmlFor="o-bus" hint="Opcional">
                <Input id="o-bus" placeholder="Nombre del local" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} />
              </Field>
              <Field label="Ciudad" htmlFor="o-city" hint="Opcional">
                <Input id="o-city" autoComplete="address-level2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </Field>
            </div>
            <Field label="Nota para el local" htmlFor="o-notes" hint="Opcional">
              <Textarea id="o-notes" rows={2} placeholder="Ej: envío por transporte, forma de pago" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </Field>
            <Button type="submit" size="lg" variant="whatsapp" className="w-full">
              <WhatsappLogoIcon size={22} /> Enviar pedido por WhatsApp
            </Button>
            {!settings.whatsapp && <p className="text-sm text-gris">El local aún no cargó su WhatsApp: el pedido igual queda registrado en el panel.</p>}
          </form>
        </Panel>
      </aside>
    </div>
  );
}
