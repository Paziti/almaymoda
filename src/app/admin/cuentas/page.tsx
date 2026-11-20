"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import clsx from "clsx";
import { MagnifyingGlassIcon, WalletIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtDate, fmtMoney, normalizeText } from "@/lib/format";
import { allAccounts, paymentCounts } from "@/lib/cuentas";
import { Badge, EmptyState, Input, Panel, Segmented } from "@/components/comun/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

type Filtro = "deben" | "vencidas" | "favor" | "todas";

export default function CuentasPage() {
  const clients = useDB((s) => s.clients);
  const remitos = useDB((s) => s.remitos);
  const payments = useDB((s) => s.payments);
  const adjustments = useDB((s) => s.adjustments);
  const [filtro, setFiltro] = useState<Filtro>("deben");
  const [q, setQ] = useState("");

  const accounts = useMemo(() => allAccounts({ remitos, payments, adjustments }), [remitos, payments, adjustments]);
  const byId = useMemo(() => new Map(clients.map((c) => [c.id, c])), [clients]);

  const toCollect = accounts.reduce((a, x) => a + Math.max(0, x.balance), 0);
  const overdue = accounts.reduce((a, x) => a + x.overdue, 0);
  const debtors = accounts.filter((x) => x.balance > 0).length;
  const inWallet = payments.filter((p) => p.method === "cheque" && p.cheque?.status === "cartera" && paymentCounts(p));
  const walletTotal = inWallet.reduce((a, p) => a + p.amount, 0);

  const list = useMemo(() => {
    const nq = normalizeText(q);
    return accounts
      .filter((a) => {
        if (filtro === "deben" && a.balance <= 0) return false;
        if (filtro === "vencidas" && a.overdue <= 0) return false;
        if (filtro === "favor" && a.balance >= 0) return false;
        const c = byId.get(a.clientId);
        return !nq || normalizeText(`${c?.name ?? ""} ${c?.business ?? ""} ${c?.city ?? ""}`).includes(nq);
      })
      .sort((a, b) => b.overdue - a.overdue || b.balance - a.balance);
  }, [accounts, filtro, q, byId]);

  const kpis = [
    { label: "A cobrar", value: fmtMoney(toCollect), note: debtors === 1 ? "1 clienta debe" : `${debtors} clientas deben` },
    { label: "Vencido", value: fmtMoney(overdue), note: overdue > 0 ? "Pasó la fecha de pago" : "Nada vencido", strong: overdue > 0 },
    { label: "Cheques en cartera", value: fmtMoney(walletTotal), note: inWallet.length === 1 ? "1 cheque" : `${inWallet.length} cheques`, href: "/admin/cheques" },
  ];

  return (
    <div>
      <PageHeader title="Cuentas corrientes" description="Quién debe, cuánto y desde cuándo. Se arma sola con los remitos y los pagos." />
      <div className={`${pagePad} flex flex-col gap-4`}>
        <div className="grid gap-3 sm:grid-cols-3">
          {kpis.map((k) => {
            const body = (
              <>
                <span className={clsx("text-sm", k.strong ? "text-lienzo/75" : "text-gris")}>{k.label}</span>
                <span className="num font-display text-3xl">{k.value}</span>
                <span className={clsx("text-sm", k.strong ? "text-lienzo/75" : "text-gris")}>{k.note}</span>
              </>
            );
            const cls = clsx("flex flex-col gap-1 rounded-xl border p-4 md:p-5", k.strong ? "border-transparent bg-tinta text-lienzo" : "border-linea bg-papel");
            return k.href ? (
              <Link key={k.label} href={k.href} className={clsx(cls, "hover:border-linea-fuerte")}>
                {body}
              </Link>
            ) : (
              <div key={k.label} className={cls}>
                {body}
              </div>
            );
          })}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-center">
          <div className="relative flex-1">
            <MagnifyingGlassIcon size={20} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gris" />
            <Input type="search" aria-label="Buscar clienta" placeholder="Nombre, negocio o ciudad" className="pl-11" value={q} onChange={(e) => setQ(e.target.value)} />
          </div>
          <Segmented
            label="Mostrar"
            value={filtro}
            onChange={setFiltro}
            options={[
              { value: "deben", label: "Deben" },
              { value: "vencidas", label: "Vencidas" },
              { value: "favor", label: "A favor" },
              { value: "todas", label: "Todas" },
            ]}
          />
        </div>

        {list.length === 0 ? (
          <Panel>
            <EmptyState icon={<WalletIcon size={40} />} title={accounts.length ? "Nadie en esta lista" : "Todavía no hay cuentas corrientes"}>
              {accounts.length
                ? "Probá con otro filtro."
                : "Aparecen cuando hacen un remito en cuenta corriente, registran un pago o cargan el saldo anterior de una clienta desde su ficha."}
            </EmptyState>
          </Panel>
        ) : (
          <Panel as="div" className="overflow-hidden">
            <div className="hidden grid-cols-[1fr_140px_140px_150px] gap-4 border-b border-linea px-5 py-2.5 text-sm text-gris md:grid">
              <span>Clienta</span>
              <span className="text-right">Saldo</span>
              <span className="text-right">Vencido</span>
              <span className="text-right">Último pago</span>
            </div>
            <ul className="divide-y divide-linea">
              {list.map((a) => {
                const c = byId.get(a.clientId);
                return (
                  <li key={a.clientId}>
                    <Link href={`/admin/cuentas/cliente?id=${a.clientId}`} className="grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1 px-5 py-3 hover:bg-piedra/40 md:grid-cols-[1fr_140px_140px_150px]">
                      <span className="min-w-0">
                        <span className="block truncate font-semibold">{c?.name ?? "Clienta borrada"}</span>
                        <span className="block truncate text-sm text-gris">{[c?.business, c?.city].filter(Boolean).join(" · ") || "Sin datos"}</span>
                      </span>
                      <span className={clsx("num text-right font-semibold", a.balance < 0 && "text-ok")}>
                        {a.balance < 0 ? `A favor ${fmtMoney(-a.balance)}` : fmtMoney(a.balance)}
                      </span>
                      <span className="text-right max-md:col-start-2">
                        {a.overdue > 0 ? (
                          <Badge tone="peligro">
                            {fmtMoney(a.overdue)} · {a.overdueDays} d
                          </Badge>
                        ) : a.nextDue ? (
                          <span className="text-sm text-gris">Vence {fmtDate(a.nextDue)}</span>
                        ) : (
                          <span className="text-sm text-gris">Sin vencimientos</span>
                        )}
                      </span>
                      <span className="hidden text-right text-sm text-gris md:block">{a.lastPayment ? `${fmtDate(a.lastPayment.at)} · ${fmtMoney(a.lastPayment.amount)}` : "Sin pagos"}</span>
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
