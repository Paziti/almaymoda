"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { BankIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtDate, fmtMoney } from "@/lib/format";
import { chequeStatusLabel, daysBetween, startOfDay } from "@/lib/cuentas";
import type { ChequeStatus, Payment } from "@/lib/types";
import { Badge, EmptyState, Panel, Segmented, Select } from "@/components/comun/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

type Cheque = Payment & { cheque: NonNullable<Payment["cheque"]> };

function cuando(due: number) {
  const d = daysBetween(startOfDay(), due);
  if (d < 0) return { text: `Se puede cobrar desde hace ${-d} ${d === -1 ? "día" : "días"}`, tone: "ok" as const };
  if (d === 0) return { text: "Se puede cobrar hoy", tone: "ok" as const };
  if (d <= 7) return { text: `Se cobra en ${d} ${d === 1 ? "día" : "días"}`, tone: "alerta" as const };
  return { text: `Se cobra el ${fmtDate(due)}`, tone: "neutral" as const };
}

export default function ChequesPage() {
  const payments = useDB((s) => s.payments);
  const clients = useDB((s) => s.clients);
  const savePayment = useDB((s) => s.savePayment);
  const [filtro, setFiltro] = useState<ChequeStatus | "todos">("cartera");

  const cheques = useMemo(() => payments.filter((p): p is Cheque => p.method === "cheque" && !!p.cheque), [payments]);
  const list = useMemo(() => cheques.filter((c) => filtro === "todos" || c.cheque.status === filtro).sort((a, b) => a.cheque.due - b.cheque.due), [cheques, filtro]);
  const name = (id: string) => clients.find((c) => c.id === id)?.name ?? "Clienta borrada";
  const total = list.reduce((a, c) => a + c.amount, 0);
  const count = (s: ChequeStatus) => cheques.filter((c) => c.cheque.status === s).length;

  const setStatus = (c: Cheque, status: ChequeStatus) => {
    savePayment({ ...c, cheque: { ...c.cheque, status } });
    toast.success(status === "rechazado" ? "Cheque rechazado: el monto vuelve a la deuda de la clienta" : `Cheque ${chequeStatusLabel[status].toLowerCase()}`);
  };

  return (
    <div>
      <PageHeader title="Cheques" description="Los cheques que recibieron, ordenados por fecha de cobro. Se cargan al registrar un pago con cheque." />
      <div className={`${pagePad} flex flex-col gap-4`}>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Segmented
            label="Estado"
            value={filtro}
            onChange={setFiltro}
            options={[
              { value: "cartera", label: `En cartera (${count("cartera")})` },
              { value: "depositado", label: `Depositados (${count("depositado")})` },
              { value: "cobrado", label: "Cobrados" },
              { value: "rechazado", label: "Rechazados" },
              { value: "todos", label: "Todos" },
            ]}
          />
          {list.length > 0 && (
            <p className="text-sm text-gris">
              {list.length} {list.length === 1 ? "cheque" : "cheques"} · <span className="num font-semibold text-tinta">{fmtMoney(total)}</span>
            </p>
          )}
        </div>

        {list.length === 0 ? (
          <Panel>
            <EmptyState icon={<BankIcon size={40} />} title={cheques.length ? "No hay cheques en esta lista" : "Todavía no hay cheques"}>
              {cheques.length ? "Probá con otro estado." : "Aparecen cuando registran un pago con cheque, desde un remito o desde la cuenta de una clienta."}
            </EmptyState>
          </Panel>
        ) : (
          <Panel as="div">
            <ul className="divide-y divide-linea">
              {list.map((c) => {
                const w = cuando(c.cheque.due);
                return (
                  <li key={c.id} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
                    <div className="min-w-0 flex-1">
                      <p className="flex flex-wrap items-center gap-2">
                        <span className="num font-display text-2xl">{fmtMoney(c.amount)}</span>
                        {c.cheque.status === "cartera" && <Badge tone={w.tone}>{w.text}</Badge>}
                      </p>
                      <p className="text-sm text-gris">
                        <Link href={`/admin/cuentas/cliente?id=${c.clientId}`} className="font-semibold text-tinta hover:text-acento">
                          {name(c.clientId)}
                        </Link>
                        {" · "}
                        {[c.cheque.bank, `N° ${c.cheque.number}`, c.cheque.owner && `firma ${c.cheque.owner}`].filter(Boolean).join(" · ")} · cobro {fmtDate(c.cheque.due)}
                      </p>
                    </div>
                    <Select aria-label={`Estado del cheque ${c.cheque.number}`} className="min-h-10 w-40! shrink-0" value={c.cheque.status} onChange={(e) => setStatus(c, e.target.value as ChequeStatus)}>
                      {(Object.keys(chequeStatusLabel) as ChequeStatus[]).map((s) => (
                        <option key={s} value={s}>
                          {chequeStatusLabel[s]}
                        </option>
                      ))}
                    </Select>
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
