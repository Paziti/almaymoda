"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useDB } from "@/lib/store";
import { parseNumber, uid } from "@/lib/format";
import { dayFromISO, dayToISO, methodLabel, startOfDay } from "@/lib/cuentas";
import type { Payment, PaymentMethod } from "@/lib/types";
import { Button, Dialog, Field, Input, Segmented, Select, Textarea } from "@/components/comun/ui";

/* ───────────── Datos de un pago mientras se carga ───────────── */

export interface PaymentDraft {
  amount: string;
  at: string;
  method: PaymentMethod;
  notes: string;
  bank: string;
  number: string;
  owner: string;
  due: string;
}

export const emptyDraft = (amount = ""): PaymentDraft => ({
  amount,
  at: dayToISO(Date.now()),
  method: "efectivo",
  notes: "",
  bank: "",
  number: "",
  owner: "",
  due: dayToISO(Date.now()),
});

/** Arma el pago. Devuelve un texto de error si falta algo. */
export function draftToPayment(d: PaymentDraft, clientId: string, opts: { amount?: number; remitoId?: string | null } = {}): Payment | string {
  const amount = opts.amount ?? parseNumber(d.amount) ?? 0;
  if (!(amount > 0)) return "Poné el monto.";
  if (d.method === "cheque" && !d.number.trim()) return "Poné el número del cheque.";
  return {
    id: uid("pg"),
    clientId,
    at: d.at ? dayFromISO(d.at) : startOfDay(),
    amount: Math.round(amount * 100) / 100,
    method: d.method,
    notes: d.notes.trim(),
    remitoId: opts.remitoId ?? null,
    cheque:
      d.method === "cheque"
        ? { bank: d.bank.trim(), number: d.number.trim(), owner: d.owner.trim(), due: d.due ? dayFromISO(d.due) : startOfDay(), status: "cartera" }
        : undefined,
    createdAt: Date.now(),
  };
}

const METHODS: PaymentMethod[] = ["efectivo", "transferencia", "mercadopago", "cheque", "otro"];

/** Medio de pago y, si es cheque, sus datos. */
export function PaymentFields({ value, onChange, idPrefix, showAmount = true, showDate = true }: { value: PaymentDraft; onChange: (d: PaymentDraft) => void; idPrefix: string; showAmount?: boolean; showDate?: boolean }) {
  const set = (k: keyof PaymentDraft) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => onChange({ ...value, [k]: e.target.value });
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {showAmount && (
        <Field label="Monto" htmlFor={`${idPrefix}-amount`}>
          <Input id={`${idPrefix}-amount`} inputMode="decimal" className="num" value={value.amount} onChange={set("amount")} />
        </Field>
      )}
      {showDate && (
        <Field label="Fecha" htmlFor={`${idPrefix}-at`}>
          <Input id={`${idPrefix}-at`} type="date" value={value.at} onChange={set("at")} />
        </Field>
      )}
      <Field label="Medio de pago" htmlFor={`${idPrefix}-method`} className={showAmount && showDate ? "sm:col-span-2" : undefined}>
        <Select id={`${idPrefix}-method`} value={value.method} onChange={set("method")}>
          {METHODS.map((m) => (
            <option key={m} value={m}>
              {methodLabel[m]}
            </option>
          ))}
        </Select>
      </Field>
      {value.method === "cheque" && (
        <>
          <Field label="Banco" htmlFor={`${idPrefix}-bank`}>
            <Input id={`${idPrefix}-bank`} value={value.bank} onChange={set("bank")} />
          </Field>
          <Field label="Número de cheque" htmlFor={`${idPrefix}-number`}>
            <Input id={`${idPrefix}-number`} inputMode="numeric" className="num" value={value.number} onChange={set("number")} />
          </Field>
          <Field label="Librador" htmlFor={`${idPrefix}-owner`} hint="Quién firma, si no es la clienta">
            <Input id={`${idPrefix}-owner`} value={value.owner} onChange={set("owner")} />
          </Field>
          <Field label="Fecha de cobro" htmlFor={`${idPrefix}-due`} hint="Desde cuándo se puede cobrar">
            <Input id={`${idPrefix}-due`} type="date" value={value.due} onChange={set("due")} />
          </Field>
        </>
      )}
    </div>
  );
}

/* ───────────── Registrar un pago ───────────── */

export function PaymentDialog({ open, onClose, clientId, clientName, suggested }: { open: boolean; onClose: () => void; clientId: string; clientName: string; suggested?: number }) {
  const savePayment = useDB((s) => s.savePayment);
  const [draft, setDraft] = useState(() => emptyDraft(suggested && suggested > 0 ? String(suggested) : ""));
  const [error, setError] = useState("");

  const save = () => {
    const p = draftToPayment(draft, clientId);
    if (typeof p === "string") return setError(p);
    savePayment(p);
    toast.success("Pago registrado");
    setDraft(emptyDraft());
    setError("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Pago de ${clientName}`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={save}>Registrar pago</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <PaymentFields idPrefix="pd" value={draft} onChange={setDraft} />
        <Field label="Nota (opcional)" htmlFor="pd-notes">
          <Textarea id="pd-notes" rows={2} value={draft.notes} onChange={(e) => setDraft({ ...draft, notes: e.target.value })} />
        </Field>
        {error && (
          <p role="alert" className="text-sm font-semibold text-peligro">
            {error}
          </p>
        )}
      </div>
    </Dialog>
  );
}

/* ───────────── Saldo anterior o ajuste ───────────── */

export function AdjustmentDialog({ open, onClose, clientId, clientName }: { open: boolean; onClose: () => void; clientId: string; clientName: string }) {
  const saveAdjustment = useDB((s) => s.saveAdjustment);
  const [kind, setKind] = useState<"debe" | "favor">("debe");
  const [amount, setAmount] = useState("");
  const [at, setAt] = useState(() => dayToISO(Date.now()));
  const [reason, setReason] = useState("Saldo anterior (fichero)");
  const [error, setError] = useState("");

  const save = () => {
    const n = parseNumber(amount) ?? 0;
    if (!(n > 0)) return setError("Poné el monto.");
    saveAdjustment({ id: uid("aj"), clientId, at: dayFromISO(at), amount: kind === "debe" ? n : -n, reason: reason.trim(), createdAt: Date.now() });
    toast.success("Saldo cargado");
    setAmount("");
    setError("");
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      title={`Saldo anterior o ajuste · ${clientName}`}
      footer={
        <>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={save}>Guardar</Button>
        </>
      }
    >
      <div className="flex flex-col gap-4">
        <p className="text-sm text-gris">Para pasar lo que tenían anotado en el fichero, o corregir el saldo a mano.</p>
        <Segmented
          label="Tipo"
          value={kind}
          onChange={setKind}
          options={[
            { value: "debe", label: "La clienta debe" },
            { value: "favor", label: "Saldo a favor" },
          ]}
        />
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="Monto" htmlFor="aj-amount" error={error}>
            <Input id="aj-amount" inputMode="decimal" className="num" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Field>
          <Field label="Fecha" htmlFor="aj-at">
            <Input id="aj-at" type="date" value={at} onChange={(e) => setAt(e.target.value)} />
          </Field>
        </div>
        <Field label="Motivo" htmlFor="aj-reason">
          <Input id="aj-reason" value={reason} onChange={(e) => setReason(e.target.value)} />
        </Field>
      </div>
    </Dialog>
  );
}
