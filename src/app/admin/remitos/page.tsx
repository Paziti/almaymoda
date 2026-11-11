"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { PlusIcon, ReceiptIcon, MagnifyingGlassIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtDate, fmtMoney, normalizeText, remitoNumber } from "@/lib/format";
import { remitoTotals } from "@/lib/remito-pdf";
import { remitoStatus } from "@/lib/labels";
import { Badge, ButtonLink, EmptyState, Input, Panel } from "@/components/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

export default function RemitosPage() {
  const remitos = useDB((s) => s.remitos);
  const pos = useDB((s) => s.settings.pointOfSale);
  const [q, setQ] = useState("");

  const list = useMemo(() => {
    const nq = normalizeText(q);
    return remitos.filter((r) => !nq || normalizeText(`${r.number} ${r.customer.name} ${remitoNumber(pos, r.number)}`).includes(nq));
  }, [remitos, q, pos]);

  return (
    <div>
      <PageHeader
        title="Remitos"
        description="Para los pedidos que llegan por WhatsApp: elegís los artículos, se genera el PDF y lo mandás."
        actions={
          <ButtonLink href="/admin/remitos/nuevo" variant="accent">
            <PlusIcon size={18} weight="bold" /> Nuevo remito
          </ButtonLink>
        }
      />
      <div className={`${pagePad} flex flex-col gap-4`}>
        {remitos.length > 0 && (
          <div className="relative">
            <MagnifyingGlassIcon size={20} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gris" />
            <Input type="search" aria-label="Buscar remito" placeholder="Buscar por número o cliente" className="pl-11" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
        )}
        {remitos.length === 0 ? (
          <Panel>
            <EmptyState icon={<ReceiptIcon size={40} />} title="Todavía no hay remitos" action={<ButtonLink href="/admin/remitos/nuevo">Hacer el primero</ButtonLink>}>
              Armá uno desde un pedido web o desde cero para alguien que pidió por WhatsApp.
            </EmptyState>
          </Panel>
        ) : list.length === 0 ? (
          <Panel>
            <EmptyState title="Ningún remito coincide">Probá con otro número o nombre.</EmptyState>
          </Panel>
        ) : (
          <Panel as="div">
            <ul className="divide-y divide-linea">
              {list.map((r) => {
                const { total, units } = remitoTotals(r);
                return (
                  <li key={r.id}>
                    <Link href={`/admin/remitos/${r.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-1 px-5 py-3.5 hover:bg-malva/40">
                      <span className="hang-tag text-[0.8rem]">{remitoNumber(pos, r.number)}</span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{r.customer.name || "Sin nombre"}</span>
                        <span className="text-sm text-gris">
                          {fmtDate(r.createdAt)} · {units} u.
                        </span>
                      </span>
                      <Badge tone={remitoStatus[r.status].tone}>{remitoStatus[r.status].label}</Badge>
                      <span className="num w-28 text-right font-semibold">{fmtMoney(total)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Panel>
        )}
      </div>
    </div>
  );
}
