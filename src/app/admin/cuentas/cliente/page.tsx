"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { toast } from "sonner";
import { PlusIcon, ReceiptIcon, TrashIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtDate, fmtMoney, remitoNumber } from "@/lib/format";
import { whatsappUrl } from "@/lib/share";
import { accountOf, chequeStatusLabel, methodLabel, type AccountMove } from "@/lib/cuentas";
import type { ChequeStatus } from "@/lib/types";
import { Badge, Button, ButtonLink, ConfirmButton, EmptyState, Panel, Select, Spinner, buttonClass } from "@/components/comun/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";
import { AdjustmentDialog, PaymentDialog } from "@/components/admin/cobro";

const statusTone: Record<ChequeStatus, "neutral" | "ok" | "alerta" | "peligro"> = { cartera: "alerta", depositado: "neutral", cobrado: "ok", rechazado: "peligro" };

function Cuenta() {
  const id = useSearchParams().get("id") ?? "";
  const client = useDB((s) => s.clients.find((c) => c.id === id));
  const remitos = useDB((s) => s.remitos);
  const payments = useDB((s) => s.payments);
  const adjustments = useDB((s) => s.adjustments);
  const pos = useDB((s) => s.settings.pointOfSale);
  const storeName = useDB((s) => s.settings.storeName);
  const savePayment = useDB((s) => s.savePayment);
  const deletePayment = useDB((s) => s.deletePayment);
  const deleteAdjustment = useDB((s) => s.deleteAdjustment);
  const [paying, setPaying] = useState(false);
  const [adjusting, setAdjusting] = useState(false);

  const acc = useMemo(() => accountOf(id, { remitos, payments, adjustments }), [id, remitos, payments, adjustments]);

  if (!client) {
    return (
      <div className={pagePad}>
        <PageHeader title="Cuenta corriente" back={{ href: "/admin/cuentas", label: "Cuentas corrientes" }} />
        <Panel>
          <EmptyState title="No encontramos a esta clienta">Puede que la hayan borrado.</EmptyState>
        </Panel>
      </div>
    );
  }

  const reminder =
    client.phone && acc.balance > 0
      ? whatsappUrl(client.phone, `Hola ${client.name}! Te escribimos de ${storeName}. Te recordamos que tenés un saldo pendiente de ${fmtMoney(acc.balance)}${acc.overdue > 0 ? ` (${fmtMoney(acc.overdue)} ya vencido)` : ""}. Cualquier duda, avisanos. ¡Gracias!`)
      : null;

  const setChequeStatus = (m: AccountMove, status: ChequeStatus) => {
    const p = m.payment;
    if (!p?.cheque) return;
    savePayment({ ...p, cheque: { ...p.cheque, status } });
    toast.success(status === "rechazado" ? "Cheque rechazado: el monto vuelve a la deuda" : `Cheque ${chequeStatusLabel[status].toLowerCase()}`);
  };

  const moves = [...acc.moves].reverse();

  return (
    <div>
      <PageHeader
        title={client.name}
        description={[client.business, client.city, client.phone].filter(Boolean).join(" · ") || undefined}
        back={{ href: "/admin/cuentas", label: "Cuentas corrientes" }}
        actions={
          <div className="flex flex-wrap gap-2">
            <Button variant="accent" onClick={() => setPaying(true)}>
              <PlusIcon size={18} weight="bold" /> Registrar pago
            </Button>
            <ButtonLink href={`/admin/remitos/nuevo?cliente=${client.id}`} variant="secondary">
              <ReceiptIcon size={18} /> Remito
            </ButtonLink>
            {reminder && (
              <a href={reminder} target="_blank" rel="noreferrer" className={buttonClass("whatsapp", "md")}>
                <WhatsappLogoIcon size={18} /> Recordar saldo
              </a>
            )}
          </div>
        }
      />
      <div className={`${pagePad} flex flex-col gap-4`}>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className={clsx("flex flex-col gap-1 rounded-xl border p-4 md:p-5", acc.overdue > 0 ? "border-transparent bg-tinta text-lienzo" : "border-linea bg-papel")}>
            <span className={clsx("text-sm", acc.overdue > 0 ? "text-lienzo/75" : "text-gris")}>{acc.balance < 0 ? "Saldo a favor" : "Saldo"}</span>
            <span className="num font-display text-3xl">{fmtMoney(Math.abs(acc.balance))}</span>
            <span className={clsx("text-sm", acc.overdue > 0 ? "text-lienzo/75" : "text-gris")}>
              {acc.overdue > 0 ? `${fmtMoney(acc.overdue)} vencido hace ${acc.overdueDays} ${acc.overdueDays === 1 ? "día" : "días"}` : acc.nextDue ? `Próximo vencimiento ${fmtDate(acc.nextDue)}` : acc.balance > 0 ? "Nada vencido" : "Al día"}
            </span>
          </div>
          <div className="flex flex-col gap-1 rounded-xl border border-linea bg-papel p-4 md:p-5">
            <span className="text-sm text-gris">Último pago</span>
            <span className="num font-display text-3xl">{acc.lastPayment ? fmtMoney(acc.lastPayment.amount) : "Sin pagos"}</span>
            <span className="text-sm text-gris">{acc.lastPayment ? `${fmtDate(acc.lastPayment.at)} · ${methodLabel[acc.lastPayment.method]}` : "Todavía no pagó nada"}</span>
          </div>
          <button type="button" onClick={() => setAdjusting(true)} className="flex flex-col items-start gap-1 rounded-xl border border-dashed border-linea-fuerte p-4 text-left hover:bg-piedra/40 md:p-5">
            <span className="text-sm font-semibold">Saldo anterior o ajuste</span>
            <span className="text-sm text-gris">Para pasar lo que tenían en el fichero, o corregir el saldo a mano.</span>
          </button>
        </div>

        <Panel as="div" className="overflow-hidden">
          <h2 className="border-b border-linea px-5 py-3 font-semibold">Movimientos</h2>
          {moves.length === 0 ? (
            <EmptyState title="Sin movimientos">Los remitos de esta clienta y sus pagos van a aparecer acá.</EmptyState>
          ) : (
            <ul className="divide-y divide-linea">
              {moves.map((m) => (
                <li key={`${m.kind}-${m.id}`} className="flex flex-wrap items-center gap-x-4 gap-y-2 px-5 py-3">
                  <div className="min-w-0 flex-1">
                    {m.kind === "remito" && m.remito && (
                      <>
                        <Link href={`/admin/remitos/ver?id=${m.remito.id}`} className="font-semibold hover:text-acento">
                          Remito N° {remitoNumber(pos, m.remito.number)}
                        </Link>
                        <p className="text-sm text-gris">
                          {fmtDate(m.at)}
                          {m.remito.dueDate ? ` · vence ${fmtDate(m.remito.dueDate)}` : " · contado"}
                        </p>
                      </>
                    )}
                    {m.kind === "pago" && m.payment && (
                      <>
                        <p className="flex flex-wrap items-center gap-2 font-semibold">
                          Pago · {methodLabel[m.payment.method]}
                          {m.payment.cheque && <Badge tone={statusTone[m.payment.cheque.status]}>{chequeStatusLabel[m.payment.cheque.status]}</Badge>}
                        </p>
                        <p className="text-sm text-gris">
                          {fmtDate(m.at)}
                          {m.payment.cheque && ` · ${[m.payment.cheque.bank, `N° ${m.payment.cheque.number}`, m.payment.cheque.owner].filter(Boolean).join(" · ")} · cobro ${fmtDate(m.payment.cheque.due)}`}
                          {m.payment.notes && ` · ${m.payment.notes}`}
                        </p>
                      </>
                    )}
                    {m.kind === "ajuste" && m.adjustment && (
                      <>
                        <p className="font-semibold">{m.adjustment.reason || "Ajuste"}</p>
                        <p className="text-sm text-gris">{fmtDate(m.at)}</p>
                      </>
                    )}
                  </div>

                  {m.payment?.cheque && (
                    <Select aria-label="Estado del cheque" className="min-h-10 w-40! shrink-0" value={m.payment.cheque.status} onChange={(e) => setChequeStatus(m, e.target.value as ChequeStatus)}>
                      {(Object.keys(chequeStatusLabel) as ChequeStatus[]).map((s) => (
                        <option key={s} value={s}>
                          {chequeStatusLabel[s]}
                        </option>
                      ))}
                    </Select>
                  )}

                  <div className="flex items-center gap-3">
                    <span className={clsx("num w-28 text-right font-semibold", m.payment && !m.credit ? "text-gris line-through" : m.credit > 0 ? "text-peligro" : undefined)}>
                      {m.debit > 0 ? `+ ${fmtMoney(m.debit)}` : `− ${fmtMoney(m.credit || m.payment?.amount || 0)}`}
                    </span>
                    <span className="num hidden w-28 text-right text-sm text-gris sm:block">Saldo {fmtMoney(m.balance)}</span>
                    {m.kind === "pago" && (
                      <ConfirmButton size="sm" confirmLabel="Sí, borrar" onConfirm={() => (deletePayment(m.id), toast.success("Pago borrado"))}>
                        <TrashIcon size={16} /> <span className="sr-only">Borrar pago</span>
                      </ConfirmButton>
                    )}
                    {m.kind === "ajuste" && (
                      <ConfirmButton size="sm" confirmLabel="Sí, borrar" onConfirm={() => (deleteAdjustment(m.id), toast.success("Ajuste borrado"))}>
                        <TrashIcon size={16} /> <span className="sr-only">Borrar ajuste</span>
                      </ConfirmButton>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Panel>
      </div>

      {paying && <PaymentDialog open onClose={() => setPaying(false)} clientId={client.id} clientName={client.name} suggested={acc.overdue || acc.balance} />}
      {adjusting && <AdjustmentDialog open onClose={() => setAdjusting(false)} clientId={client.id} clientName={client.name} />}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <Cuenta />
    </Suspense>
  );
}
