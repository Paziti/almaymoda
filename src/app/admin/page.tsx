"use client";

import Link from "next/link";
import clsx from "clsx";
import { PackageIcon, FileArrowUpIcon, ReceiptIcon, TagIcon, CaretRightIcon, InfoIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtDate, fmtDateTime, fmtMoney, fmtNumber } from "@/lib/format";
import { totalStock } from "@/lib/pricing";
import { usePricer, useHasDemo } from "@/lib/hooks";
import { remitoTotals } from "@/lib/remito-pdf";
import { remitoStatus } from "@/lib/labels";
import { Badge, ButtonLink, Panel } from "@/components/ui";
import { ProductImage } from "@/components/product-image";
import { pagePad } from "@/components/admin/shell";

function greeting(h: number) {
  if (h < 13) return "Buen día";
  if (h < 20) return "Buenas tardes";
  return "Buenas noches";
}

/** Bloque con título y enlace "Ver todos": la unidad visual del inicio. */
function Section({ title, href, linkLabel = "Ver todos", children, className }: { title: string; href?: string; linkLabel?: string; children: React.ReactNode; className?: string }) {
  return (
    <Panel className={clsx("flex flex-col overflow-hidden rounded-xl", className)}>
      <header className="flex items-center justify-between gap-3 border-b border-linea px-5 py-3.5">
        <h2 className="font-semibold">{title}</h2>
        {href && (
          <Link href={href} className="inline-flex min-h-9 items-center gap-1 text-sm font-semibold text-gris hover:text-tinta">
            {linkLabel} <CaretRightIcon size={14} aria-hidden />
          </Link>
        )}
      </header>
      {children}
    </Panel>
  );
}

export default function AdminHome() {
  const products = useDB((s) => s.products);
  const orders = useDB((s) => s.orders);
  const remitos = useDB((s) => s.remitos);
  const low = useDB((s) => s.settings.lowStock);
  const pricer = usePricer();
  const hasDemo = useHasDemo();

  const now = new Date();
  const monthStart = new Date(now.getFullYear(), now.getMonth(), 1).getTime();
  const monthName = new Intl.DateTimeFormat("es-AR", { month: "long" }).format(now);
  const todayRaw = new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" }).format(now);
  const today = todayRaw.charAt(0).toUpperCase() + todayRaw.slice(1);

  const pending = orders.filter((o) => o.status === "nuevo").sort((a, b) => b.createdAt - a.createdAt);
  const active = products.filter((p) => p.active);
  const hidden = products.length - active.length;
  const restock = active
    .map((p) => ({ p, t: totalStock(p) }))
    .filter((x) => x.t <= low)
    .sort((a, b) => a.t - b.t)
    .slice(0, 6);
  const units = products.reduce((a, p) => a + totalStock(p), 0);
  const saleValue = products.reduce((a, p) => a + totalStock(p) * pricer(p), 0);
  const monthRemitos = remitos.filter((r) => r.status !== "anulado" && r.createdAt >= monthStart);
  const monthTotal = monthRemitos.reduce((a, r) => a + remitoTotals(r).total, 0);
  const lastRemitos = [...remitos].sort((a, b) => b.createdAt - a.createdAt).slice(0, 5);

  const kpis = [
    { label: "Pedidos sin atender", value: fmtNumber(pending.length), note: pending.length ? "Esperan respuesta" : "Todo al día", href: "/admin/pedidos", strong: pending.length > 0 },
    { label: `Remitos de ${monthName}`, value: fmtMoney(monthTotal), note: monthRemitos.length === 1 ? "1 remito" : `${monthRemitos.length} remitos`, href: "/admin/remitos" },
    { label: "Artículos publicados", value: fmtNumber(active.length), note: hidden ? `${hidden} ocultos` : "Ninguno oculto", href: "/admin/productos" },
    { label: "Stock a precio de venta", value: fmtMoney(saleValue), note: `${fmtNumber(units)} unidades`, href: "/admin/productos" },
  ];

  const shortcuts = [
    { href: "/admin/stock", label: "Ingreso de stock", desc: "Sumar la mercadería que llegó", icon: PackageIcon },
    { href: "/admin/importar", label: "Importar lista", desc: "Excel, PDF o Access del proveedor", icon: FileArrowUpIcon },
    { href: "/admin/precios", label: "Precios y coeficientes", desc: "Actualizar por proveedor", icon: TagIcon },
  ];

  return (
    <div className="flex flex-col gap-6 pb-4">
      <div className={`${pagePad} flex flex-wrap items-end justify-between gap-4 pt-6 md:pt-10`}>
        <div>
          <p className="text-sm text-gris">{today}</p>
          <h1 className="font-display text-[2.1rem] leading-tight md:text-[2.5rem]">{greeting(now.getHours())}</h1>
        </div>
        <div className="flex flex-wrap gap-2">
          <ButtonLink href="/admin/remitos/nuevo" variant="secondary">
            <ReceiptIcon size={18} aria-hidden /> Nuevo remito
          </ButtonLink>
        </div>
      </div>

      {hasDemo && (
        <div className={pagePad}>
          <p className="flex items-start gap-2.5 rounded-xl border border-linea bg-papel px-4 py-3 text-sm">
            <InfoIcon size={18} className="mt-0.5 shrink-0 text-acento" aria-hidden />
            <span>
              Hay artículos y pedidos de ejemplo para probar el sistema. Cuando empiecen con los reales, bórrenlos desde{" "}
              <Link href="/admin/ajustes#datos" className="font-semibold underline underline-offset-2">
                Ajustes
              </Link>
              .
            </span>
          </p>
        </div>
      )}

      {/* Indicadores: números reales de los datos cargados */}
      <div className={`${pagePad} grid grid-cols-2 gap-3 lg:grid-cols-4`}>
        {kpis.map((k) => (
          <Link
            key={k.label}
            href={k.href}
            className={clsx(
              "group flex flex-col gap-1 rounded-xl border p-4 transition-colors md:p-5",
              k.strong ? "border-transparent bg-tinta text-lienzo hover:opacity-95" : "border-linea bg-papel hover:border-linea-fuerte",
            )}
          >
            <span className={clsx("text-sm", k.strong ? "text-lienzo/75" : "text-gris")}>{k.label}</span>
            <span className="num break-words font-display text-[1.35rem] leading-tight sm:text-[1.65rem] md:text-3xl">{k.value}</span>
            <span className={clsx("text-xs", k.strong ? "text-lienzo/75" : "text-gris")}>{k.note}</span>
          </Link>
        ))}
      </div>

      <div className={`${pagePad} grid gap-6 lg:grid-cols-3`}>
        <div className="flex flex-col gap-6 lg:col-span-2">
          <Section title="Pedidos web sin atender" href="/admin/pedidos">
            {pending.length ? (
              <ul className="divide-y divide-linea">
                {pending.slice(0, 5).map((o) => {
                  const total = o.items.reduce((a, i) => a + i.qty * i.unitPrice, 0);
                  const u = o.items.reduce((a, i) => a + i.qty, 0);
                  return (
                    <li key={o.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-semibold">
                          <span className="num text-gris">N° {o.number}</span> {o.customer.name}
                          {o.customer.business && <span className="font-normal text-gris">, {o.customer.business}</span>}
                        </p>
                        <p className="text-sm text-gris">
                          {fmtDateTime(o.createdAt)}, {u} u.
                        </p>
                      </div>
                      <span className="num font-semibold">{fmtMoney(total)}</span>
                      <ButtonLink href={`/admin/remitos/nuevo?pedido=${o.id}`} size="sm" variant="secondary">
                        Armar remito
                      </ButtonLink>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <p className="px-5 py-8 text-gris">No hay pedidos nuevos. Cuando una clienta envíe un pedido desde la tienda, aparece acá.</p>
            )}
          </Section>

          <Section title="Últimos remitos" href="/admin/remitos">
            {lastRemitos.length ? (
              <ul className="divide-y divide-linea">
                {lastRemitos.map((r) => {
                  const st = remitoStatus[r.status];
                  return (
                    <li key={r.id}>
                      <Link href={`/admin/remitos/ver?id=${r.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3 hover:bg-piedra/40">
                        <span className="num w-16 shrink-0 text-sm text-gris">N° {r.number}</span>
                        <span className="min-w-0 flex-1 truncate font-medium">{r.customer.name || "Sin cliente"}</span>
                        <span className="text-sm text-gris">{fmtDate(r.createdAt)}</span>
                        <Badge tone={st.tone}>{st.label}</Badge>
                        <span className="num w-28 text-right font-semibold">{fmtMoney(remitoTotals(r).total)}</span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            ) : (
              <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-6">
                <p className="text-gris">Todavía no hicieron remitos. Se arman desde un pedido web o a mano.</p>
                <ButtonLink href="/admin/remitos/nuevo" size="sm">
                  Hacer el primero
                </ButtonLink>
              </div>
            )}
          </Section>
        </div>

        <div className="flex flex-col gap-6">
          <Section title="Para reponer" href="/admin/productos?estado=bajo">
            {restock.length ? (
              <ul className="divide-y divide-linea">
                {restock.map(({ p, t }) => (
                  <li key={p.id}>
                    <Link href={`/admin/productos/editar?id=${p.id}`} className="flex items-center gap-3 px-5 py-2.5 hover:bg-piedra/40">
                      <div className="w-10 shrink-0 overflow-hidden rounded-md">
                        <ProductImage product={p} sizes="sm" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">{p.name}</p>
                        <p className="num text-sm text-gris">{p.code}</p>
                      </div>
                      <Badge tone={t <= 0 ? "peligro" : "alerta"}>{t <= 0 ? "Sin stock" : `${t} u.`}</Badge>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="px-5 py-8 text-gris">Todos los artículos publicados tienen más de {low} unidades.</p>
            )}
          </Section>

          <Section title="Atajos">
            <ul className="divide-y divide-linea">
              {shortcuts.map((a) => (
                <li key={a.href}>
                  <Link href={a.href} className="flex items-center gap-3 px-5 py-3 hover:bg-piedra/40">
                    <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-piedra text-tinta">
                      <a.icon size={18} aria-hidden />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-medium">{a.label}</span>
                      <span className="block truncate text-sm text-gris">{a.desc}</span>
                    </span>
                    <CaretRightIcon size={16} className="shrink-0 text-gris" aria-hidden />
                  </Link>
                </li>
              ))}
            </ul>
          </Section>
        </div>
      </div>
    </div>
  );
}
