"use client";

import Link from "next/link";
import { PlusIcon, PackageIcon, FileArrowUpIcon, ReceiptIcon, ChatCircleTextIcon, WarningIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtDateTime, fmtMoney, fmtNumber } from "@/lib/format";
import { totalStock } from "@/lib/pricing";
import { usePricer, useHasDemo } from "@/lib/hooks";
import { Badge, ButtonLink, Panel } from "@/components/ui";
import { ProductImage } from "@/components/product-image";
import { PageHeader, pagePad } from "@/components/admin/shell";

export default function AdminHome() {
  const products = useDB((s) => s.products);
  const orders = useDB((s) => s.orders);
  const low = useDB((s) => s.settings.lowStock);
  const pricer = usePricer();
  const hasDemo = useHasDemo();

  const pending = orders.filter((o) => o.status === "nuevo").sort((a, b) => b.createdAt - a.createdAt);
  const active = products.filter((p) => p.active);
  const restock = active
    .map((p) => ({ p, t: totalStock(p) }))
    .filter((x) => x.t <= low)
    .sort((a, b) => a.t - b.t)
    .slice(0, 8);
  const units = products.reduce((a, p) => a + totalStock(p), 0);
  const costValue = products.reduce((a, p) => a + totalStock(p) * p.cost, 0);
  const saleValue = products.reduce((a, p) => a + totalStock(p) * pricer(p), 0);
  const todayRaw = new Intl.DateTimeFormat("es-AR", { weekday: "long", day: "numeric", month: "long" }).format(new Date());
  const today = todayRaw.charAt(0).toUpperCase() + todayRaw.slice(1);

  const actions = [
    { href: "/admin/stock", label: "Ingreso de stock", desc: "Sumar mercadería que llegó", icon: PackageIcon },
    { href: "/admin/importar", label: "Importar lista", desc: "Excel, PDF o Access del proveedor", icon: FileArrowUpIcon },
    { href: "/admin/remitos/nuevo", label: "Nuevo remito", desc: "Para un pedido de WhatsApp", icon: ReceiptIcon },
  ];

  return (
    <div className="flex flex-col gap-8">
      <PageHeader title="Hoy" description={today} />

      <div className={`${pagePad} grid gap-3 md:grid-cols-[1.25fr_1fr_1fr_1fr]`}>
        <Link href="/admin/productos/nuevo" className="flex min-h-28 flex-col justify-between gap-3 rounded-2xl bg-fucsia p-5 text-sobre-fucsia hover:bg-fucsia-hover">
          <PlusIcon size={28} weight="bold" />
          <span>
            <span className="block font-display text-2xl">Cargar artículo</span>
            <span className="text-sm opacity-90">Foto, talles, stock y precio</span>
          </span>
        </Link>
        {actions.map((a) => (
          <Link key={a.href} href={a.href} className="flex items-center gap-4 rounded-2xl border border-linea bg-papel p-4 hover:border-linea-fuerte md:flex-col md:items-start md:justify-between">
            <a.icon size={26} className="shrink-0 text-fucsia" />
            <span className="min-w-0">
              <span className="block font-semibold">{a.label}</span>
              <span className="text-sm text-gris">{a.desc}</span>
            </span>
          </Link>
        ))}
      </div>

      {hasDemo && (
        <div className={pagePad}>
          <p className="rounded-xl bg-fucsia-suave px-4 py-3 text-sm">
            Hay datos de ejemplo cargados para probar. Cuando quieran empezar con los reales, bórrenlos desde{" "}
            <Link href="/admin/ajustes#datos" className="font-semibold underline underline-offset-2">
              Ajustes
            </Link>
            .
          </p>
        </div>
      )}

      <div className={`${pagePad} grid gap-6 lg:grid-cols-2`}>
        <Panel className="flex flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-linea px-5 py-4">
            <h2 className="flex items-center gap-2 font-semibold">
              <ChatCircleTextIcon size={20} className="text-fucsia" /> Pedidos web sin atender
            </h2>
            <Link href="/admin/pedidos" className="text-sm font-semibold text-gris hover:text-tinta">
              Ver todos
            </Link>
          </header>
          {pending.length ? (
            <ul className="divide-y divide-linea">
              {pending.slice(0, 5).map((o) => {
                const total = o.items.reduce((a, i) => a + i.qty * i.unitPrice, 0);
                return (
                  <li key={o.id} className="flex flex-wrap items-center justify-between gap-3 px-5 py-3">
                    <div className="min-w-0">
                      <p className="font-semibold">
                        N° {o.number} · {o.customer.name}
                      </p>
                      <p className="text-sm text-gris">
                        {fmtDateTime(o.createdAt)} · {o.items.reduce((a, i) => a + i.qty, 0)} u. · <span className="num">{fmtMoney(total)}</span>
                      </p>
                    </div>
                    <ButtonLink href={`/admin/remitos/nuevo?pedido=${o.id}`} size="sm" variant="secondary">
                      Armar remito
                    </ButtonLink>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-5 py-8 text-gris">No hay pedidos nuevos. Cuando una clienta envíe un pedido desde la tienda aparece acá.</p>
          )}
        </Panel>

        <Panel className="flex flex-col">
          <header className="flex items-center justify-between gap-3 border-b border-linea px-5 py-4">
            <h2 className="flex items-center gap-2 font-semibold">
              <WarningIcon size={20} className="text-alerta" /> Para reponer
            </h2>
            <Link href="/admin/productos?estado=bajo" className="text-sm font-semibold text-gris hover:text-tinta">
              Ver todos
            </Link>
          </header>
          {restock.length ? (
            <ul className="divide-y divide-linea">
              {restock.map(({ p, t }) => (
                <li key={p.id}>
                  <Link href={`/admin/productos/editar?id=${p.id}`} className="flex items-center gap-3 px-5 py-2.5 hover:bg-malva/50">
                    <div className="w-10 shrink-0 overflow-hidden rounded-lg">
                      <ProductImage product={p} sizes="sm" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="truncate font-semibold">{p.name}</p>
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
        </Panel>
      </div>

      <dl className={`${pagePad} grid grid-cols-2 gap-x-6 gap-y-4 text-sm md:flex md:flex-wrap md:gap-10`}>
        {[
          ["Artículos publicados", fmtNumber(active.length)],
          ["Unidades en stock", fmtNumber(units)],
          ["Stock a costo", fmtMoney(costValue)],
          ["Stock a precio de venta", fmtMoney(saleValue)],
        ].map(([k, v]) => (
          <div key={k} className="flex flex-col">
            <dt className="text-gris">{k}</dt>
            <dd className="num font-display text-2xl">{v}</dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
