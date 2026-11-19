-- ─────────────────────────────────────────────────────────────────────────────
-- Alma y Moda · cuentas corrientes, pagos y cheques
--
-- · Cada remito no anulado suma a la deuda de la clienta. due_date = cuándo vence
--   (null = contado: vence el mismo día).
-- · payments: lo que paga la clienta (efectivo, transferencia, Mercado Pago, cheque…).
--   Los cheques rechazados no cuentan como pago.
-- · account_adjustments: saldo anterior (lo que venía del fichero) y ajustes a mano.
--   Positivo = la clienta debe; negativo = saldo a favor.
--
-- Sólo los dueños ven y tocan estas tablas. Se corre una vez: SQL Editor → New query → Run.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.remitos add column if not exists due_date date;

create table if not exists public.payments (
  id text primary key,
  client_id text not null references public.clients (id) on delete cascade,
  at date not null default current_date,
  amount numeric(12, 2) not null check (amount > 0),
  method text not null default 'efectivo' check (method in ('efectivo', 'transferencia', 'mercadopago', 'cheque', 'otro')),
  notes text not null default '',
  -- Remito con el que se cobró (contado o pago parcial al emitirlo).
  remito_id text references public.remitos (id) on delete set null,
  cheque_bank text,
  cheque_number text,
  cheque_owner text,
  cheque_due date,
  cheque_status text check (cheque_status in ('cartera', 'depositado', 'cobrado', 'rechazado')),
  demo boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists payments_client_idx on public.payments (client_id, at);
create index if not exists payments_cheque_idx on public.payments (cheque_due) where method = 'cheque';

create table if not exists public.account_adjustments (
  id text primary key,
  client_id text not null references public.clients (id) on delete cascade,
  at date not null default current_date,
  amount numeric(12, 2) not null check (amount <> 0),
  reason text not null default '',
  demo boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists account_adjustments_client_idx on public.account_adjustments (client_id, at);

alter table public.payments enable row level security;
alter table public.account_adjustments enable row level security;

drop policy if exists "duenos" on public.payments;
drop policy if exists "duenos" on public.account_adjustments;
create policy "duenos" on public.payments for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "duenos" on public.account_adjustments for all to authenticated using (public.is_owner()) with check (public.is_owner());

revoke all on public.payments, public.account_adjustments from anon;
grant select, insert, update, delete on public.payments, public.account_adjustments to authenticated;
