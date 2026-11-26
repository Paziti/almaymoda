-- ─────────────────────────────────────────────────────────────────────────────
-- Alma y Moda · marcas
--
-- El remito muestra la marca de cada artículo, no el proveedor: muchos
-- proveedores son importadores (Target, Lesedife) y no se muestran.
--
-- products.brand: marca propia del artículo. Vacía = la del proveedor.
-- suppliers.brand: marca por defecto de los artículos del proveedor. Vacía en
-- los importadores, así sus artículos salen sin marca hasta que se les cargue.
--
-- Se corre una vez: SQL Editor → New query → Run.
-- ─────────────────────────────────────────────────────────────────────────────

alter table public.products add column if not exists brand text not null default '';
alter table public.suppliers add column if not exists brand text not null default '';
