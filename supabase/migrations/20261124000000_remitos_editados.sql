-- ─────────────────────────────────────────────────────────────────────────────
-- Alma y Moda · edición de remitos
--
-- Un remito emitido se puede corregir desde el panel (mismo número). edited_at
-- guarda cuándo se editó por última vez; null = nunca se editó.
--
-- Se corre una vez: SQL Editor → New query → Run.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.remitos add column if not exists edited_at timestamptz;
