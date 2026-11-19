/**
 * Cuentas corrientes de las clientas.
 *
 * Saldo = remitos no anulados + ajustes − pagos (los cheques rechazados no cuentan como pago).
 * Los pagos bajan el saldo general: se cancelan primero las deudas más viejas.
 * Lo que queda sin cubrir y ya pasó su vencimiento es la deuda vencida.
 */

import type { AccountAdjustment, ChequeStatus, Payment, PaymentMethod, Remito } from "./types";

const DAY = 86_400_000;

/* ───────────── Fechas por día (sin hora) ───────────── */

/** Inicio del día local de una fecha. */
export const startOfDay = (t: number = Date.now()) => {
  const d = new Date(t);
  d.setHours(0, 0, 0, 0);
  return d.getTime();
};

export const addDays = (t: number, days: number) => startOfDay(t + days * DAY + DAY / 2);

/** 'AAAA-MM-DD' de una fecha local (para inputs type="date" y columnas date de la base). */
export function dayToISO(t: number) {
  const d = new Date(t);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

/** Inicio del día local de un 'AAAA-MM-DD'. */
export function dayFromISO(s: string) {
  const [y, m, d] = s.slice(0, 10).split("-").map(Number);
  return new Date(y, (m || 1) - 1, d || 1).getTime();
}

export const daysBetween = (from: number, to: number) => Math.round((startOfDay(to) - startOfDay(from)) / DAY);

/* ───────────── Etiquetas ───────────── */

export const methodLabel: Record<PaymentMethod, string> = {
  efectivo: "Efectivo",
  transferencia: "Transferencia",
  mercadopago: "Mercado Pago",
  cheque: "Cheque",
  otro: "Otro",
};

export const chequeStatusLabel: Record<ChequeStatus, string> = {
  cartera: "En cartera",
  depositado: "Depositado",
  cobrado: "Cobrado",
  rechazado: "Rechazado",
};

/** Un pago cuenta para el saldo salvo que sea un cheque rechazado. */
export const paymentCounts = (p: Payment) => !(p.method === "cheque" && p.cheque?.status === "rechazado");

/* ───────────── Cálculo ───────────── */

export type MoveKind = "remito" | "pago" | "ajuste";

export interface AccountMove {
  id: string;
  kind: MoveKind;
  at: number;
  /** Suma a la deuda. */
  debit: number;
  /** Baja la deuda. */
  credit: number;
  /** Saldo después de este movimiento. */
  balance: number;
  dueDate?: number;
  remito?: Remito;
  payment?: Payment;
  adjustment?: AccountAdjustment;
}

export interface Account {
  clientId: string;
  /** Lo que debe. Negativo = saldo a favor. */
  balance: number;
  /** Parte del saldo que ya venció. */
  overdue: number;
  /** Días de atraso de la deuda vencida más vieja (0 si no hay). */
  overdueDays: number;
  /** Próximo vencimiento de lo que todavía no venció. */
  nextDue?: number;
  lastPayment?: Payment;
  /** Movimientos del más viejo al más nuevo, con el saldo acumulado. */
  moves: AccountMove[];
}

export interface Ledger {
  remitos: Remito[];
  payments: Payment[];
  adjustments: AccountAdjustment[];
}

/** Total del remito con el descuento (mismo cálculo que remitoTotals de remito-pdf, sin cargar la librería de PDF). */
export function remitoAmount(r: Pick<Remito, "items" | "discount">) {
  const subtotal = r.items.reduce((a, i) => a + i.qty * i.unitPrice, 0);
  return subtotal - Math.round((subtotal * (r.discount || 0)) / 100);
}

/** Cuenta corriente de una clienta. */
export function accountOf(clientId: string, data: Ledger, today = Date.now()): Account {
  const moves: Omit<AccountMove, "balance">[] = [];

  for (const r of data.remitos) {
    if (r.clientId !== clientId || r.status === "anulado") continue;
    const amount = remitoAmount(r);
    if (amount <= 0) continue;
    moves.push({ id: r.id, kind: "remito", at: r.createdAt, debit: amount, credit: 0, dueDate: r.dueDate ?? startOfDay(r.createdAt), remito: r });
  }
  for (const p of data.payments) {
    if (p.clientId !== clientId) continue;
    moves.push({ id: p.id, kind: "pago", at: p.at, debit: 0, credit: paymentCounts(p) ? p.amount : 0, payment: p });
  }
  for (const a of data.adjustments) {
    if (a.clientId !== clientId) continue;
    moves.push({ id: a.id, kind: "ajuste", at: a.at, debit: Math.max(0, a.amount), credit: Math.max(0, -a.amount), dueDate: a.amount > 0 ? a.at : undefined, adjustment: a });
  }

  // Por día; dentro del mismo día, primero lo que suma deuda y después los pagos, en el orden en que se cargaron.
  const loadedAt = (m: Omit<AccountMove, "balance">) => m.payment?.createdAt ?? m.adjustment?.createdAt ?? m.at;
  moves.sort((a, b) => startOfDay(a.at) - startOfDay(b.at) || (a.kind === "pago" ? 1 : 0) - (b.kind === "pago" ? 1 : 0) || loadedAt(a) - loadedAt(b));

  let balance = 0;
  const withBalance: AccountMove[] = moves.map((m) => {
    balance += m.debit - m.credit;
    return { ...m, balance };
  });

  // Los pagos cancelan primero las deudas más viejas (por vencimiento).
  let credit = withBalance.reduce((a, m) => a + m.credit, 0);
  const charges = withBalance.filter((m) => m.debit > 0).sort((a, b) => (a.dueDate ?? a.at) - (b.dueDate ?? b.at));
  const day = startOfDay(today);
  let overdue = 0;
  let oldest: number | undefined;
  let nextDue: number | undefined;
  for (const c of charges) {
    const covered = Math.min(credit, c.debit);
    credit -= covered;
    const open = c.debit - covered;
    if (open <= 0) continue;
    const due = c.dueDate ?? c.at;
    if (due < day) {
      overdue += open;
      if (oldest === undefined || due < oldest) oldest = due;
    } else if (nextDue === undefined || due < nextDue) {
      nextDue = due;
    }
  }

  const payments = data.payments.filter((p) => p.clientId === clientId && paymentCounts(p));
  const lastPayment = payments.sort((a, b) => b.at - a.at || b.createdAt - a.createdAt)[0];

  return {
    clientId,
    balance: Math.round(balance),
    overdue: Math.round(overdue),
    overdueDays: oldest !== undefined ? daysBetween(oldest, today) : 0,
    nextDue,
    lastPayment,
    moves: withBalance,
  };
}

/** Cuentas de todas las clientas que tienen algún movimiento. */
export function allAccounts(data: Ledger, today = Date.now()): Account[] {
  const ids = new Set<string>();
  for (const r of data.remitos) if (r.clientId && r.status !== "anulado") ids.add(r.clientId);
  for (const p of data.payments) ids.add(p.clientId);
  for (const a of data.adjustments) ids.add(a.clientId);
  return [...ids].map((id) => accountOf(id, data, today));
}
