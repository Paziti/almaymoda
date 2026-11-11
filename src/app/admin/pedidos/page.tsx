"use client";

import { useState } from "react";
import Link from "next/link";
import { ChatCircleTextIcon, WhatsappLogoIcon, CaretDownIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtDateTime, fmtMoney } from "@/lib/format";
import { whatsappUrl } from "@/lib/share";
import type { OrderStatus } from "@/lib/types";
import { Badge, Button, ButtonLink, EmptyState, Panel, Segmented, buttonClass } from "@/components/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

const status: Record<OrderStatus, { label: string; tone: "acento" | "ok" | "neutral" | "peligro" }> = {
  nuevo: { label: "Nuevo", tone: "acento" },
  confirmado: { label: "Confirmado", tone: "ok" },
  remitido: { label: "Con remito", tone: "neutral" },
  cancelado: { label: "Cancelado", tone: "peligro" },
};

export default function PedidosPage() {
  const orders = useDB((s) => s.orders);
  const setStatus = useDB((s) => s.setOrderStatus);
  const remitos = useDB((s) => s.remitos);
  const [filter, setFilter] = useState<"abiertos" | "todos">("abiertos");

  const list = orders.filter((o) => filter === "todos" || o.status === "nuevo" || o.status === "confirmado").sort((a, b) => b.createdAt - a.createdAt);

  return (
    <div>
      <PageHeader title="Pedidos web" description="Lo que las clientas envían desde la tienda. Cada pedido se convierte en remito con un toque." />
      <div className={`${pagePad} flex flex-col gap-4`}>
        <Segmented
          label="Mostrar"
          value={filter}
          onChange={setFilter}
          options={[
            { value: "abiertos", label: "Para atender" },
            { value: "todos", label: "Todos" },
          ]}
        />
        {list.length === 0 ? (
          <Panel>
            <EmptyState icon={<ChatCircleTextIcon size={40} />} title={filter === "abiertos" ? "No hay pedidos para atender" : "Todavía no llegaron pedidos"}>
              Cuando una clienta envíe su pedido desde la tienda, aparece acá con el detalle de talles y cantidades.
            </EmptyState>
          </Panel>
        ) : (
          <ul className="flex flex-col gap-3">
            {list.map((o) => {
              const total = o.items.reduce((a, i) => a + i.qty * i.unitPrice, 0);
              const units = o.items.reduce((a, i) => a + i.qty, 0);
              const remito = remitos.find((r) => r.id === o.remitoId);
              const open = o.status === "nuevo" || o.status === "confirmado";
              return (
                <li key={o.id}>
                  <Panel as="article" className="overflow-hidden">
                    <details className="group">
                      <summary className="flex cursor-pointer list-none flex-wrap items-center gap-x-4 gap-y-1 px-5 py-4 [&::-webkit-details-marker]:hidden">
                        <div className="min-w-0 flex-1">
                          <p className="flex flex-wrap items-center gap-2 font-semibold">
                            N° {o.number} · {o.customer.name}
                            <Badge tone={status[o.status].tone}>{status[o.status].label}</Badge>
                          </p>
                          <p className="text-sm text-gris">
                            {fmtDateTime(o.createdAt)}
                            {o.customer.business && ` · ${o.customer.business}`}
                            {o.customer.city && ` · ${o.customer.city}`}
                          </p>
                        </div>
                        <span className="num text-right">
                          <span className="block font-semibold">{fmtMoney(total)}</span>
                          <span className="text-sm text-gris">{units} u.</span>
                        </span>
                        <CaretDownIcon size={18} className="text-gris transition-transform group-open:rotate-180" aria-hidden />
                      </summary>
                      <div className="flex flex-col gap-4 border-t border-linea px-5 py-4">
                        <ul className="divide-y divide-linea text-sm">
                          {o.items.map((i, k) => (
                            <li key={k} className="flex justify-between gap-3 py-1.5">
                              <span className="min-w-0">
                                <span className="num font-semibold">{i.qty} ×</span> <span className="num text-gris">{i.code}</span> {i.name} · T.{i.size}
                                {i.color !== "Único" && ` ${i.color}`}
                              </span>
                              <span className="num shrink-0">{fmtMoney(i.qty * i.unitPrice)}</span>
                            </li>
                          ))}
                        </ul>
                        {o.notes && <p className="rounded-lg bg-malva px-3 py-2 text-sm">Nota: {o.notes}</p>}
                        <div className="flex flex-wrap gap-2">
                          {open && (
                            <ButtonLink href={`/admin/remitos/nuevo?pedido=${o.id}`} variant="primary">
                              Armar remito
                            </ButtonLink>
                          )}
                          {remito && (
                            <ButtonLink href={`/admin/remitos/ver?id=${remito.id}`} variant="secondary">
                              Ver remito
                            </ButtonLink>
                          )}
                          {o.customer.phone && (
                            <a href={whatsappUrl(o.customer.phone, `Hola ${o.customer.name}! Recibimos tu pedido N° ${o.number}.`)} target="_blank" rel="noreferrer" className={buttonClass("secondary")}>
                              <WhatsappLogoIcon size={18} /> Escribirle
                            </a>
                          )}
                          {o.status === "nuevo" && (
                            <Button variant="ghost" onClick={() => setStatus(o.id, "confirmado")}>
                              Marcar confirmado
                            </Button>
                          )}
                          {open && (
                            <Button variant="ghost" className="text-peligro" onClick={() => setStatus(o.id, "cancelado")}>
                              Cancelar pedido
                            </Button>
                          )}
                          {o.status === "cancelado" && (
                            <Button variant="ghost" onClick={() => setStatus(o.id, "nuevo")}>
                              Reabrir
                            </Button>
                          )}
                        </div>
                        {o.clientId && (
                          <Link href={`/admin/clientes?c=${o.clientId}`} className="text-sm font-semibold text-gris hover:text-tinta">
                            Ver ficha de la clienta
                          </Link>
                        )}
                      </div>
                    </details>
                  </Panel>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
