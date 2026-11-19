"use client";

import Link from "next/link";
import { useState } from "react";
import { TrashIcon, WhatsappLogoIcon, CheckCircleIcon } from "@phosphor-icons/react";
import { useCarrito, useCatalogo, useClienta, usePedir, useLocal, usePrecio, useVerPrecios, fmtMoney, variantLabel, whatsappUrl, type LineItem, type Order } from "@/lib/tienda";
import { Button, ButtonLink, EmptyState, Field, IconButton, Input, Panel, Stepper, Textarea } from "@/components/comun/ui";
import { ProductImage } from "@/components/comun/product-image";

export default function PedidoPage() {
  const { cart, setQty, clearCart } = useCarrito();
  const { clienta: me } = useClienta();
  const products = useCatalogo();
  const settings = useLocal();
  const pedir = usePedir();
  const pricer = usePrecio();
  const showPrice = useVerPrecios();

  const [form, setForm] = useState({ name: me?.name ?? "", phone: me?.phone ?? "", business: me?.business ?? "", city: me?.city ?? "", notes: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState<{ order: Order; url: string | null } | null>(null);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

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
        <h1 className="font-display text-5xl leading-tight">Pedido N° {sent.order.number} registrado</h1>
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
        Entrá a un artículo y elegí cuántas unidades querés de cada color.
      </EmptyState>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (sending) return;
    const errs: Record<string, string> = {};
    if (!form.name.trim()) errs.name = "Escribí tu nombre.";
    if (form.phone.replace(/\D/g, "").length < 8) errs.phone = "Escribí un teléfono con código de área.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(errs.name ? "o-name" : "o-phone")?.focus();
      return;
    }

    const items: LineItem[] = lines.map((l) => ({ productId: l.p.id, variantId: l.v.id, code: l.p.code, name: l.p.name, size: l.v.size, color: l.v.color, qty: l.qty, unitPrice: l.price }));
    // La pestaña de WhatsApp se abre ya (con el toque), porque después de esperar a la base el navegador la bloquearía.
    const win = settings.whatsapp ? window.open("", "_blank") : null;
    setSending(true);
    setSendError("");
    let order: Order;
    try {
      order = await pedir({ customer: { name: form.name, phone: form.phone, business: form.business, city: form.city }, items, notes: form.notes });
    } catch (err) {
      win?.close();
      setSendError(err instanceof Error && err.message ? err.message : "No se pudo enviar el pedido. Probá de nuevo.");
      setSending(false);
      return;
    }
    setSending(false);

    const text = [
      `Hola! Soy ${form.name}${form.business ? ` (${form.business})` : ""}${form.city ? `, de ${form.city}` : ""}. Quiero hacer este pedido (N° ${order.number}):`,
      "",
      ...items.map((i) => `• ${i.qty} × ${i.code} ${i.name}, ${variantLabel(i.size, i.color)}`),
      "",
      `${units} unidades${showPrice ? ` · Total ${fmtMoney(total)}` : ""}`,
      form.notes ? `\nNota: ${form.notes}` : "",
    ].join("\n");

    const url = settings.whatsapp ? whatsappUrl(settings.whatsapp, text) : null;
    if (url && win) {
      win.opener = null;
      win.location.href = url;
    } else if (url) {
      window.open(url, "_blank", "noopener");
    }
    clearCart();
    setSent({ order, url });
  };

  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-8 lg:grid-cols-[1.3fr_1fr]">
      <section aria-labelledby="t-items" className="flex flex-col gap-4">
        <h1 id="t-items" className="border-b border-tinta pb-4 font-display text-[clamp(2.25rem,7vw,4rem)] leading-[0.95] tracking-[-0.02em]">
          Tu pedido
        </h1>
        <ul className="flex flex-col divide-y divide-linea">
          {lines.map((l) => (
            <li key={l.variantId} className="flex gap-3 py-4 sm:gap-5">
              <Link href={`/producto?id=${l.p.id}`} className="w-20 shrink-0 overflow-hidden rounded-[4px] sm:w-24">
                <ProductImage product={l.p} sizes="sm" />
              </Link>
              <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="font-semibold leading-tight">{l.p.name}</p>
                    <p className="text-sm text-gris">
                      {variantLabel(l.v.size, l.v.color)}, <span className="num">{l.p.code}</span>
                    </p>
                  </div>
                  <IconButton label={`Quitar ${l.p.name} ${variantLabel(l.v.size, l.v.color)}`} onClick={() => setQty(l.productId, l.variantId, 0)} className="-mr-1 -mt-1 text-gris">
                    <TrashIcon size={18} />
                  </IconButton>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <Stepper size="sm" label={`${l.p.name} ${variantLabel(l.v.size, l.v.color)}`} value={l.qty} min={1} max={l.v.stock} onChange={(n) => setQty(l.productId, l.variantId, n)} />
                  {showPrice && <span className="num font-semibold">{fmtMoney(l.qty * l.price)}</span>}
                </div>
                {l.qty > l.v.stock && <p className="text-sm text-alerta">Hay {l.v.stock} en stock.</p>}
              </div>
            </li>
          ))}
        </ul>
      </section>

      <aside className="flex flex-col gap-4 lg:sticky lg:top-24 lg:self-start">
        <section aria-label="Resumen" className="banda flex flex-col gap-4 rounded-[4px] p-5">
          <div className="flex items-baseline justify-between">
            <span className="text-gris">Unidades</span>
            <span className="num font-semibold">{units}</span>
          </div>
          {showPrice && (
            <div className="flex flex-col gap-1 border-t border-linea pt-4">
              <span className="text-gris">Total estimado</span>
              <span className="num font-display text-5xl leading-none">{fmtMoney(total)}</span>
            </div>
          )}
          {missing > 0 && showPrice && (
            <div className="flex flex-col gap-1.5">
              <div className="h-2 overflow-hidden rounded-full bg-piedra" aria-hidden>
                <div className="h-full bg-tinta" style={{ width: `${Math.min(100, (total / settings.minPurchase) * 100)}%` }} />
              </div>
              <p className="text-sm text-gris">
                Faltan {fmtMoney(missing)} para la compra mínima de {fmtMoney(settings.minPurchase)}.
              </p>
            </div>
          )}
        </section>

        <Panel as="div" className="rounded-[4px] p-5">
          <form onSubmit={submit} noValidate className="flex flex-col gap-4">
            <h2 className="font-display text-2xl">Tus datos</h2>
            <Field label="Nombre" htmlFor="o-name" error={errors.name}>
              <Input id="o-name" aria-invalid={!!errors.name} aria-describedby={errors.name ? "o-name-error" : undefined} autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            </Field>
            <Field label="Teléfono / WhatsApp" htmlFor="o-phone" error={errors.phone}>
              <Input id="o-phone" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "o-phone-error" : undefined} type="tel" autoComplete="tel" inputMode="tel" placeholder="11 2345 6789" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} />
            </Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Negocio" htmlFor="o-bus" hint="Opcional">
                <Input id="o-bus" name="organization" autoComplete="organization" placeholder="Nombre del local…" value={form.business} onChange={(e) => setForm({ ...form, business: e.target.value })} />
              </Field>
              <Field label="Ciudad" htmlFor="o-city" hint="Opcional">
                <Input id="o-city" name="city" autoComplete="address-level2" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
              </Field>
            </div>
            <Field label="Nota para el local" htmlFor="o-notes" hint="Opcional">
              <Textarea id="o-notes" rows={2} placeholder="Ej: envío por transporte, pago por transferencia…" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />
            </Field>
            {sendError && (
              <p role="alert" className="text-sm font-semibold text-peligro">
                {sendError}
              </p>
            )}
            <Button type="submit" size="lg" variant="whatsapp" className="w-full" disabled={sending}>
              <WhatsappLogoIcon size={22} /> {sending ? "Enviando…" : "Enviar pedido por WhatsApp"}
            </Button>
            {!settings.whatsapp && <p className="text-sm text-gris">El local aún no cargó su WhatsApp: el pedido igual queda registrado en el panel.</p>}
          </form>
        </Panel>
      </aside>
    </div>
  );
}
