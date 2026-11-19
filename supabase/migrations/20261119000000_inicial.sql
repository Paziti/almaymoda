-- ─────────────────────────────────────────────────────────────────────────────
-- Alma y Moda · base inicial (etapa 2)
--
-- Reemplaza los datos guardados en cada dispositivo (IndexedDB) por Supabase.
-- Los nombres de columnas siguen a src/lib/types.ts en snake_case.
--
-- Seguridad:
--   · Todas las tablas tienen RLS y sólo los dueños (tabla owners) las leen y escriben.
--   · La tienda NO lee tablas: lee las vistas shop_catalog y shop_settings, que muestran
--     el precio de venta ya calculado y nunca el costo, el coeficiente ni el código de barras.
--   · Los pedidos web entran por la función create_order, que recalcula los precios en la
--     base (no confía en el precio que manda el navegador).
--
-- Se corre una sola vez: SQL Editor → New query → pegar todo → Run.
-- ─────────────────────────────────────────────────────────────────────────────

-- ───────────── Dueños ─────────────

create table public.owners (
  user_id uuid primary key references auth.users (id) on delete cascade,
  name text not null default '',
  created_at timestamptz not null default now()
);

/** true si quien hace la consulta es dueño. security definer para poder leer owners desde las políticas. */
create function public.is_owner()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (select 1 from public.owners where user_id = (select auth.uid()));
$$;

-- ───────────── Ajustes (una sola fila) ─────────────
-- Se guardan como JSON con las mismas claves que Settings en types.ts.
-- El PIN de prueba ya no se usa: los dueños entran con mail y contraseña.

create table public.settings (
  id smallint primary key default 1 check (id = 1),
  data jsonb not null,
  updated_at timestamptz not null default now()
);

insert into public.settings (id, data) values (1, jsonb_build_object(
  'storeName', 'Alma y Moda',
  'legalName', '',
  'cuit', '',
  'address', '',
  'phone', '',
  'whatsapp', '',
  'email', '',
  'instagram', 'https://www.instagram.com/mayorista_almaymoda/',
  'coefficient', 1.8,
  'rounding', 100,
  'retailMarkup', 30,
  'minPurchase', 0,
  'pricesRequireLogin', false,
  'lowStock', 6,
  'pointOfSale', '0001',
  'nextRemito', 1,
  'nextOrder', 1,
  'remitoFooter', 'Documento no válido como factura.',
  'photoBackground', '#E5DCD2',
  'categories', jsonb_build_array('Carteras', 'Bolsos', 'Mochilas', 'Billeteras', 'Materos', 'Térmicos', 'Botellas', 'Viaje'),
  'sizes', jsonb_build_array('Único', 'Chico', 'Mediano', 'Grande', '160 ml', '280 ml', '500 ml', '750 ml', '1 L', '1,2 L', '1,3 L')
));

-- ───────────── Proveedores ─────────────

create table public.suppliers (
  id text primary key,
  name text not null,
  legal_name text not null default '',
  address text not null default '',
  city text not null default '',
  postal_code text not null default '',
  tax_category text not null default '' check (tax_category in ('', 'Responsable Inscripto', 'Monotributista', 'Exento', 'Consumidor Final')),
  doc_type text not null default 'CUIT' check (doc_type in ('CUIT', 'DNI')),
  doc_number text not null default '',
  contact text not null default '',
  phone text not null default '',
  email text not null default '',
  coefficient numeric(6, 3) check (coefficient > 0),
  notes text not null default '',
  demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- ───────────── Artículos y variantes ─────────────

create table public.products (
  id text primary key,
  code text not null default '',
  barcode text check (barcode ~ '^[0-9]+$'),
  name text not null,
  description text not null default '',
  category text not null default '',
  supplier_id text references public.suppliers (id) on delete set null,
  cost numeric(12, 2) not null default 0 check (cost >= 0),
  coefficient numeric(6, 3) check (coefficient > 0),
  price_override numeric(12, 2) check (price_override > 0),
  retail_price numeric(12, 2) check (retail_price > 0),
  -- Rutas de las fotos dentro del bucket "fotos" (o URLs completas para las de ejemplo).
  images text[] not null default '{}',
  active boolean not null default true,
  featured boolean not null default false,
  on_sale boolean not null default false,
  sale_percent numeric(5, 2) check (sale_percent between 1 and 90),
  swatch text,
  demo boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create unique index products_barcode_key on public.products (barcode) where barcode is not null;
create index products_supplier_idx on public.products (supplier_id);
create index products_code_idx on public.products (code);

create table public.variants (
  id text primary key,
  product_id text not null references public.products (id) on delete cascade,
  size text not null default 'Único',
  color text not null default 'Único',
  stock integer not null default 0,
  position smallint not null default 0
);

create index variants_product_idx on public.variants (product_id);

-- ───────────── Clientas ─────────────

create table public.clients (
  id text primary key,
  name text not null,
  business text not null default '',
  phone text not null default '',
  -- Últimos 8 dígitos del teléfono: así se reconoce a la misma clienta aunque escriba el número distinto.
  phone_key text generated always as (right(regexp_replace(phone, '\D', '', 'g'), 8)) stored,
  email text not null default '',
  city text not null default '',
  address text not null default '',
  cuit text not null default '',
  notes text not null default '',
  retail boolean not null default false,
  demo boolean not null default false,
  created_at timestamptz not null default now()
);

create index clients_phone_key_idx on public.clients (phone_key);

-- ───────────── Pedidos web y remitos ─────────────
-- Los renglones se guardan como foto del momento (código, nombre, precio), igual que LineItem.

create table public.orders (
  id text primary key,
  number integer not null unique,
  client_id text references public.clients (id) on delete set null,
  customer jsonb not null,
  items jsonb not null,
  notes text not null default '',
  status text not null default 'nuevo' check (status in ('nuevo', 'confirmado', 'remitido', 'cancelado')),
  remito_id text,
  demo boolean not null default false,
  created_at timestamptz not null default now()
);

create table public.remitos (
  id text primary key,
  number integer not null unique,
  client_id text references public.clients (id) on delete set null,
  customer jsonb not null,
  items jsonb not null,
  notes text not null default '',
  discount numeric(5, 2) not null default 0,
  price_list text not null default 'mayorista' check (price_list in ('mayorista', 'minorista')),
  status text not null default 'emitido' check (status in ('emitido', 'entregado', 'anulado')),
  stock_discounted boolean not null default false,
  order_id text references public.orders (id) on delete set null,
  demo boolean not null default false,
  created_at timestamptz not null default now()
);

alter table public.orders add constraint orders_remito_fk foreign key (remito_id) references public.remitos (id) on delete set null;

-- ───────────── Movimientos de stock e importaciones ─────────────

create table public.stock_movements (
  id bigint generated always as identity primary key,
  at timestamptz not null default now(),
  product_id text not null references public.products (id) on delete cascade,
  variant_id text not null references public.variants (id) on delete cascade,
  delta integer not null,
  reason text not null default ''
);

create index stock_movements_product_idx on public.stock_movements (product_id, at desc);

create table public.imports (
  id text primary key,
  at timestamptz not null default now(),
  file_name text not null default '',
  supplier_id text references public.suppliers (id) on delete set null,
  created integer not null default 0,
  updated integer not null default 0,
  stock_rows integer not null default 0
);

-- ───────────── updated_at automático ─────────────

create function public.touch_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at := now();
  return new;
end;
$$;

create trigger products_touch before update on public.products for each row execute function public.touch_updated_at();
create trigger suppliers_touch before update on public.suppliers for each row execute function public.touch_updated_at();
create trigger settings_touch before update on public.settings for each row execute function public.touch_updated_at();

-- ───────────── Permisos (RLS): sólo dueños ─────────────

alter table public.owners enable row level security;
alter table public.settings enable row level security;
alter table public.suppliers enable row level security;
alter table public.products enable row level security;
alter table public.variants enable row level security;
alter table public.clients enable row level security;
alter table public.orders enable row level security;
alter table public.remitos enable row level security;
alter table public.stock_movements enable row level security;
alter table public.imports enable row level security;

-- Cada usuario ve sólo su propia fila: así el panel sabe si quien entró es dueño.
create policy "ver mi fila" on public.owners for select to authenticated using (user_id = (select auth.uid()));

create policy "duenos" on public.settings for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "duenos" on public.suppliers for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "duenos" on public.products for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "duenos" on public.variants for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "duenos" on public.clients for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "duenos" on public.orders for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "duenos" on public.remitos for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "duenos" on public.stock_movements for all to authenticated using (public.is_owner()) with check (public.is_owner());
create policy "duenos" on public.imports for all to authenticated using (public.is_owner()) with check (public.is_owner());

-- Nadie anónimo toca tablas (aunque el proyecto dé acceso automático a las tablas nuevas).
revoke all on all tables in schema public from anon;
grant select, insert, update, delete on all tables in schema public to authenticated;

-- ───────────── Lo que ve la tienda ─────────────
-- Vistas con los permisos de su dueño (security_invoker = false): muestran sólo columnas
-- públicas de los artículos publicados, aunque las tablas estén cerradas.

create view public.shop_catalog with (security_invoker = false) as
with s as (
  select
    (data ->> 'coefficient')::numeric as coef,
    greatest(coalesce((data ->> 'rounding')::numeric, 1), 1) as step
  from public.settings
  where id = 1
),
base as (
  select
    p.*,
    s.step,
    (p.on_sale and p.sale_percent is not null) as in_offer,
    case
      when p.price_override is not null then p.price_override
      else ceil(p.cost * coalesce(p.coefficient, sp.coefficient, s.coef) / s.step) * s.step
    end as regular
  from public.products p
  cross join s
  left join public.suppliers sp on sp.id = p.supplier_id
  where p.active
)
select
  b.id,
  b.code,
  b.name,
  b.description,
  b.category,
  b.images,
  b.featured,
  b.swatch,
  b.demo,
  b.created_at,
  b.updated_at,
  b.in_offer as on_sale,
  case when b.in_offer then b.sale_percent end as sale_percent,
  -- Precio que paga la clienta (con la oferta aplicada si está prendida).
  case when b.in_offer then ceil(b.regular * (1 - b.sale_percent / 100) / b.step) * b.step else b.regular end as price,
  -- Precio anterior para mostrar tachado; null si no está en oferta.
  case when b.in_offer then b.regular end as regular_price,
  coalesce(
    (select jsonb_agg(jsonb_build_object('id', v.id, 'size', v.size, 'color', v.color, 'stock', greatest(v.stock, 0)) order by v.position, v.id)
     from public.variants v where v.product_id = b.id),
    '[]'::jsonb
  ) as variants
from base b;

create view public.shop_settings with (security_invoker = false) as
select
  data ->> 'storeName' as store_name,
  data ->> 'whatsapp' as whatsapp,
  data ->> 'email' as email,
  data ->> 'instagram' as instagram,
  data ->> 'address' as address,
  data -> 'categories' as categories,
  data -> 'sizes' as sizes,
  coalesce((data ->> 'minPurchase')::numeric, 0) as min_purchase,
  coalesce((data ->> 'lowStock')::int, 0) as low_stock,
  coalesce((data ->> 'pricesRequireLogin')::boolean, false) as prices_require_login
from public.settings
where id = 1;

grant select on public.shop_catalog, public.shop_settings to anon, authenticated;

-- ───────────── Funciones ─────────────

/**
 * Pedido desde la tienda. Lo puede llamar cualquiera (anónimo).
 * customer: { name, phone, business, city }   items: [{ variantId, qty }]
 * Reconoce a la clienta por los últimos 8 dígitos del teléfono (o la da de alta),
 * calcula los precios con shop_catalog y devuelve { id, number, items }.
 */
create function public.create_order(customer jsonb, items jsonb, notes text default '')
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_key text := right(regexp_replace(coalesce(customer ->> 'phone', ''), '\D', '', 'g'), 8);
  v_name text := left(trim(coalesce(customer ->> 'name', '')), 120);
  v_business text := left(trim(coalesce(customer ->> 'business', '')), 120);
  v_city text := left(trim(coalesce(customer ->> 'city', '')), 120);
  v_phone text := left(trim(coalesce(customer ->> 'phone', '')), 40);
  v_client text;
  v_lines jsonb;
  v_count int;
  v_total numeric;
  v_min numeric;
  v_number int;
  v_id text := 'o_' || replace(gen_random_uuid()::text, '-', '');
begin
  if length(v_key) < 8 then raise exception 'Poné un teléfono válido.'; end if;
  if v_name = '' then raise exception 'Poné tu nombre.'; end if;
  if jsonb_typeof(items) <> 'array' or jsonb_array_length(items) = 0 then raise exception 'El pedido está vacío.'; end if;
  if jsonb_array_length(items) > 200 then raise exception 'El pedido tiene demasiados renglones.'; end if;

  select
    jsonb_agg(jsonb_build_object(
      'productId', c.id, 'variantId', v.id, 'code', c.code, 'name', c.name,
      'size', v.size, 'color', v.color, 'qty', e.qty, 'unitPrice', c.price
    ) order by e.ord),
    count(*),
    sum(c.price * e.qty)
  into v_lines, v_count, v_total
  from (
    select x.ord, x.j ->> 'variantId' as variant_id, (x.j ->> 'qty')::int as qty
    from jsonb_array_elements(items) with ordinality as x (j, ord)
  ) e
  join public.variants v on v.id = e.variant_id
  join public.shop_catalog c on c.id = v.product_id
  where e.qty between 1 and 9999;

  if v_count is distinct from jsonb_array_length(items) then
    raise exception 'Algún artículo del pedido ya no está disponible. Revisá el carrito.';
  end if;

  select coalesce((data ->> 'minPurchase')::numeric, 0) into v_min from public.settings where id = 1;
  if v_total < v_min then raise exception 'La compra mínima es de $%.', v_min; end if;

  -- Clienta: la misma si coincide el teléfono; si no, alta nueva.
  select id into v_client from public.clients where phone_key = v_key order by created_at limit 1;
  if v_client is null then
    v_client := 'c_' || replace(gen_random_uuid()::text, '-', '');
    insert into public.clients (id, name, business, phone, city, notes)
    values (v_client, v_name, v_business, v_phone, v_city, 'Alta desde la tienda');
  else
    update public.clients
    set name = v_name,
        business = coalesce(nullif(v_business, ''), business),
        city = coalesce(nullif(v_city, ''), city)
    where id = v_client;
  end if;

  update public.settings
  set data = jsonb_set(data, '{nextOrder}', to_jsonb(coalesce((data ->> 'nextOrder')::int, 1) + 1))
  where id = 1
  returning coalesce((data ->> 'nextOrder')::int, 2) - 1 into v_number;

  insert into public.orders (id, number, client_id, customer, items, notes)
  values (
    v_id, v_number, v_client,
    jsonb_build_object('name', v_name, 'phone', v_phone, 'business', v_business, 'city', v_city),
    v_lines,
    left(coalesce(notes, ''), 2000)
  );

  return jsonb_build_object('id', v_id, 'number', v_number, 'items', v_lines);
end;
$$;

/** Suma o resta stock a una variante y deja el movimiento anotado. Sólo dueños. */
create function public.adjust_stock(variant_id text, delta integer, reason text default '')
returns integer
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_product text;
  v_stock int;
begin
  if not public.is_owner() then raise exception 'Sin permiso.'; end if;
  update public.variants v set stock = v.stock + delta where v.id = adjust_stock.variant_id
  returning v.product_id, v.stock into v_product, v_stock;
  if v_product is null then raise exception 'La variante no existe.'; end if;
  if delta <> 0 then
    insert into public.stock_movements (product_id, variant_id, delta, reason) values (v_product, adjust_stock.variant_id, delta, reason);
  end if;
  return v_stock;
end;
$$;

/** Mueve el stock de los renglones de un remito (sign -1 descuenta, +1 devuelve). Uso interno. */
create function public.apply_items_stock(items jsonb, sign integer, reason text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  it jsonb;
begin
  for it in select * from jsonb_array_elements(items) loop
    if it ->> 'variantId' is not null and exists (select 1 from public.variants where id = it ->> 'variantId') then
      update public.variants set stock = stock + sign * (it ->> 'qty')::int where id = it ->> 'variantId';
      insert into public.stock_movements (product_id, variant_id, delta, reason)
      select product_id, id, sign * (it ->> 'qty')::int, reason from public.variants where id = it ->> 'variantId';
    end if;
  end loop;
end;
$$;

/**
 * Emite un remito: le da el número que sigue, descuenta el stock si se pide
 * y marca el pedido web como remitido. Sólo dueños. Devuelve { id, number }.
 */
create function public.create_remito(remito jsonb, discount_stock boolean)
returns jsonb
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_id text := coalesce(remito ->> 'id', 'r_' || replace(gen_random_uuid()::text, '-', ''));
  v_number int;
  v_order text := remito ->> 'orderId';
begin
  if not public.is_owner() then raise exception 'Sin permiso.'; end if;

  update public.settings
  set data = jsonb_set(data, '{nextRemito}', to_jsonb(coalesce((data ->> 'nextRemito')::int, 1) + 1))
  where id = 1
  returning coalesce((data ->> 'nextRemito')::int, 2) - 1 into v_number;

  insert into public.remitos (id, number, client_id, customer, items, notes, discount, price_list, stock_discounted, order_id)
  values (
    v_id, v_number, remito ->> 'clientId', remito -> 'customer', remito -> 'items',
    coalesce(remito ->> 'notes', ''), coalesce((remito ->> 'discount')::numeric, 0),
    coalesce(remito ->> 'priceList', 'mayorista'), discount_stock, v_order
  );

  if discount_stock then
    perform public.apply_items_stock(remito -> 'items', -1, 'Remito ' || v_number);
  end if;

  if v_order is not null then
    update public.orders set status = 'remitido', remito_id = v_id where id = v_order;
  end if;

  return jsonb_build_object('id', v_id, 'number', v_number);
end;
$$;

/** Cambia el estado de un remito; al anularlo devuelve el stock que había descontado. Sólo dueños. */
create function public.set_remito_status(remito_id text, status text)
returns void
language plpgsql
security definer
set search_path = ''
as $$
declare
  r public.remitos;
begin
  if not public.is_owner() then raise exception 'Sin permiso.'; end if;
  select * into r from public.remitos where id = set_remito_status.remito_id for update;
  if r.id is null then raise exception 'El remito no existe.'; end if;
  if set_remito_status.status = 'anulado' and r.stock_discounted then
    perform public.apply_items_stock(r.items, 1, 'Anulación remito ' || r.number);
    update public.remitos set status = 'anulado', stock_discounted = false where id = r.id;
  else
    update public.remitos set status = set_remito_status.status where id = r.id;
  end if;
end;
$$;

-- Quién puede llamar cada función.
revoke execute on all functions in schema public from public, anon;
grant execute on function public.create_order(jsonb, jsonb, text) to anon, authenticated;
grant execute on function public.is_owner() to authenticated;
grant execute on function public.adjust_stock(text, integer, text) to authenticated;
grant execute on function public.create_remito(jsonb, boolean) to authenticated;
grant execute on function public.set_remito_status(text, text) to authenticated;
revoke execute on function public.apply_items_stock(jsonb, integer, text) from authenticated;

-- ───────────── Fotos ─────────────
-- Bucket público: cualquiera ve las fotos por su URL; sólo los dueños suben, cambian o borran.

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values ('fotos', 'fotos', true, 5242880, array['image/jpeg', 'image/png', 'image/webp']);

create policy "fotos: duenos suben" on storage.objects for insert to authenticated
  with check (bucket_id = 'fotos' and public.is_owner());
create policy "fotos: duenos cambian" on storage.objects for update to authenticated
  using (bucket_id = 'fotos' and public.is_owner());
create policy "fotos: duenos borran" on storage.objects for delete to authenticated
  using (bucket_id = 'fotos' and public.is_owner());
