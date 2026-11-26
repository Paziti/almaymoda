"use client";

/**
 * Puente entre el store (src/lib/store.ts) y Supabase. Sólo actúa si REMOTE es true.
 *
 * · Visitantes (tienda): carga el catálogo público (vista shop_catalog) y los datos del local.
 *   No guarda nada en la base salvo los pedidos, que van por la función create_order.
 * · Dueños (panel, con mail y contraseña): carga todas las tablas y, cada vez que el store
 *   cambia, compara el antes y el después y escribe en la base sólo lo que cambió.
 *   Así las pantallas del panel siguen usando las mismas acciones de siempre.
 */

import { create } from "zustand";
import { toast } from "sonner";
import { REMOTE, supabase, PHOTO_BUCKET } from "./supabase";
import { useDB, type DBState } from "./store";
import { defaultSettings } from "./seed";
import { uid } from "./format";
import type { AccountAdjustment, Client, ImportRecord, LineItem, Order, Payment, Product, Remito, Settings, StockMovement, Supplier, Variant } from "./types";
import { dayFromISO, dayToISO } from "./cuentas";

/* ───────────── Estado de la conexión ───────────── */

export type RemoteMode = "cargando" | "tienda" | "duenos";

interface RemoteStatus {
  mode: RemoteMode;
  /** Mail de quien ingresó (aunque no sea dueño). */
  email: string | null;
  /** Ingresó con una cuenta que no está en la tabla owners. */
  notOwner: boolean;
  /** Escrituras pendientes de terminar. */
  saving: number;
  /** La última carga desde la base falló (sin conexión, base caída). */
  error: boolean;
}

export const useRemote = create<RemoteStatus>(() => ({ mode: "cargando", email: null, notOwner: false, saving: 0, error: false }));

/* ───────────── Conversión filas ↔ tipos ───────────── */

type Row = Record<string, unknown>;

const ms = (v: unknown) => (v ? new Date(String(v)).getTime() : Date.now());
const iso = (v: number | undefined) => new Date(v ?? Date.now()).toISOString();
const num = (v: unknown) => (v === null || v === undefined ? null : Number(v));
const str = (v: unknown) => (v === null || v === undefined ? "" : String(v));

function variantsFrom(rows: Row[]): Variant[] {
  return rows.map((v) => ({ id: str(v.id), size: str(v.size), color: str(v.color), stock: Number(v.stock ?? 0) }));
}

const productFrom = (r: Row, variants: Variant[]): Product => ({
  id: str(r.id),
  code: str(r.code),
  barcode: r.barcode ? str(r.barcode) : undefined,
  name: str(r.name),
  description: str(r.description),
  category: str(r.category),
  supplierId: (r.supplier_id as string) ?? null,
  brand: str(r.brand),
  cost: Number(r.cost ?? 0),
  coefficient: num(r.coefficient),
  priceOverride: num(r.price_override),
  retailPrice: num(r.retail_price),
  images: (r.images as string[]) ?? [],
  variants,
  active: !!r.active,
  featured: !!r.featured,
  onSale: !!r.on_sale,
  salePercent: num(r.sale_percent) ?? undefined,
  swatch: (r.swatch as string) ?? undefined,
  demo: !!r.demo,
  createdAt: ms(r.created_at),
  updatedAt: ms(r.updated_at),
});

const productTo = (p: Product): Row => ({
  id: p.id,
  code: p.code,
  barcode: p.barcode || null,
  name: p.name,
  description: p.description,
  category: p.category,
  supplier_id: p.supplierId,
  brand: p.brand ?? "",
  cost: p.cost,
  coefficient: p.coefficient,
  price_override: p.priceOverride,
  retail_price: p.retailPrice ?? null,
  images: p.images,
  active: p.active,
  featured: p.featured,
  on_sale: !!p.onSale,
  sale_percent: p.salePercent ?? null,
  swatch: p.swatch ?? null,
  demo: !!p.demo,
  created_at: iso(p.createdAt),
});

/** Artículo de la vista pública: trae el precio ya calculado y no trae costo. */
const shopProductFrom = (r: Row): Product => ({
  id: str(r.id),
  code: str(r.code),
  name: str(r.name),
  description: str(r.description),
  category: str(r.category),
  supplierId: null,
  cost: 0,
  coefficient: null,
  priceOverride: null,
  images: (r.images as string[]) ?? [],
  variants: variantsFrom((r.variants as Row[]) ?? []),
  active: true,
  featured: !!r.featured,
  onSale: !!r.on_sale,
  salePercent: num(r.sale_percent) ?? undefined,
  shopPrices: { price: Number(r.price ?? 0), regular: num(r.regular_price) ?? undefined },
  swatch: (r.swatch as string) ?? undefined,
  demo: !!r.demo,
  createdAt: ms(r.created_at),
  updatedAt: ms(r.updated_at),
});

const supplierFrom = (r: Row): Supplier => ({
  id: str(r.id),
  name: str(r.name),
  legalName: str(r.legal_name),
  address: str(r.address),
  city: str(r.city),
  postalCode: str(r.postal_code),
  taxCategory: str(r.tax_category) as Supplier["taxCategory"],
  docType: (str(r.doc_type) || "CUIT") as Supplier["docType"],
  docNumber: str(r.doc_number),
  contact: str(r.contact),
  phone: str(r.phone),
  email: str(r.email),
  coefficient: num(r.coefficient),
  brand: str(r.brand),
  notes: str(r.notes),
  demo: !!r.demo,
});

const supplierTo = (s: Supplier): Row => ({
  id: s.id,
  name: s.name,
  legal_name: s.legalName ?? "",
  address: s.address ?? "",
  city: s.city ?? "",
  postal_code: s.postalCode ?? "",
  tax_category: s.taxCategory ?? "",
  doc_type: s.docType ?? "CUIT",
  doc_number: s.docNumber ?? "",
  contact: s.contact,
  phone: s.phone,
  email: s.email,
  coefficient: s.coefficient,
  brand: s.brand ?? "",
  notes: s.notes,
  demo: !!s.demo,
});

const clientFrom = (r: Row): Client => ({
  id: str(r.id),
  name: str(r.name),
  business: str(r.business),
  phone: str(r.phone),
  email: str(r.email),
  city: str(r.city),
  address: str(r.address),
  cuit: str(r.cuit),
  notes: str(r.notes),
  retail: !!r.retail,
  demo: !!r.demo,
  createdAt: ms(r.created_at),
});

const clientTo = (c: Client): Row => ({
  id: c.id,
  name: c.name,
  business: c.business,
  phone: c.phone,
  email: c.email,
  city: c.city,
  address: c.address,
  cuit: c.cuit,
  notes: c.notes,
  retail: !!c.retail,
  demo: !!c.demo,
  created_at: iso(c.createdAt),
});

const orderFrom = (r: Row): Order => ({
  id: str(r.id),
  number: Number(r.number),
  createdAt: ms(r.created_at),
  clientId: (r.client_id as string) ?? null,
  customer: r.customer as Order["customer"],
  items: (r.items as LineItem[]) ?? [],
  notes: str(r.notes),
  status: r.status as Order["status"],
  remitoId: (r.remito_id as string) ?? null,
  demo: !!r.demo,
});

const orderTo = (o: Order): Row => ({
  id: o.id,
  number: o.number,
  client_id: o.clientId,
  customer: o.customer,
  items: o.items,
  notes: o.notes,
  status: o.status,
  remito_id: o.remitoId,
  demo: !!o.demo,
  created_at: iso(o.createdAt),
});

const remitoFrom = (r: Row): Remito => ({
  id: str(r.id),
  number: Number(r.number),
  createdAt: ms(r.created_at),
  clientId: (r.client_id as string) ?? null,
  customer: r.customer as Remito["customer"],
  items: (r.items as LineItem[]) ?? [],
  notes: str(r.notes),
  discount: Number(r.discount ?? 0),
  priceList: (r.price_list as Remito["priceList"]) ?? "mayorista",
  status: r.status as Remito["status"],
  dueDate: r.due_date ? dayFromISO(str(r.due_date)) : null,
  stockDiscounted: !!r.stock_discounted,
  orderId: (r.order_id as string) ?? null,
  editedAt: r.edited_at ? ms(r.edited_at) : null,
  demo: !!r.demo,
});

const remitoTo = (r: Remito): Row => ({
  // Solo se manda si se editó: así los remitos nuevos se guardan aunque falte correr la migración de edited_at.
  ...(r.editedAt ? { edited_at: iso(r.editedAt) } : {}),
  id: r.id,
  number: r.number,
  client_id: r.clientId,
  customer: r.customer,
  items: r.items,
  notes: r.notes,
  discount: r.discount,
  price_list: r.priceList ?? "mayorista",
  status: r.status,
  due_date: r.dueDate ? dayToISO(r.dueDate) : null,
  stock_discounted: r.stockDiscounted,
  order_id: r.orderId,
  demo: !!r.demo,
  created_at: iso(r.createdAt),
});

const paymentFrom = (r: Row): Payment => ({
  id: str(r.id),
  clientId: str(r.client_id),
  at: dayFromISO(str(r.at)),
  amount: Number(r.amount),
  method: r.method as Payment["method"],
  notes: str(r.notes),
  remitoId: (r.remito_id as string) ?? null,
  cheque:
    r.method === "cheque"
      ? {
          bank: str(r.cheque_bank),
          number: str(r.cheque_number),
          owner: str(r.cheque_owner),
          due: r.cheque_due ? dayFromISO(str(r.cheque_due)) : dayFromISO(str(r.at)),
          status: (r.cheque_status as NonNullable<Payment["cheque"]>["status"]) ?? "cartera",
        }
      : undefined,
  createdAt: ms(r.created_at),
  demo: !!r.demo,
});

const paymentTo = (p: Payment): Row => ({
  id: p.id,
  client_id: p.clientId,
  at: dayToISO(p.at),
  amount: p.amount,
  method: p.method,
  notes: p.notes,
  remito_id: p.remitoId,
  cheque_bank: p.cheque?.bank ?? null,
  cheque_number: p.cheque?.number ?? null,
  cheque_owner: p.cheque?.owner ?? null,
  cheque_due: p.cheque ? dayToISO(p.cheque.due) : null,
  cheque_status: p.cheque?.status ?? null,
  demo: !!p.demo,
  created_at: iso(p.createdAt),
});

const adjustmentFrom = (r: Row): AccountAdjustment => ({
  id: str(r.id),
  clientId: str(r.client_id),
  at: dayFromISO(str(r.at)),
  amount: Number(r.amount),
  reason: str(r.reason),
  createdAt: ms(r.created_at),
  demo: !!r.demo,
});

const adjustmentTo = (a: AccountAdjustment): Row => ({
  id: a.id,
  client_id: a.clientId,
  at: dayToISO(a.at),
  amount: a.amount,
  reason: a.reason,
  demo: !!a.demo,
  created_at: iso(a.createdAt),
});

const movementFrom = (r: Row): StockMovement => ({
  id: str(r.id),
  at: ms(r.at),
  productId: str(r.product_id),
  variantId: str(r.variant_id),
  delta: Number(r.delta),
  reason: str(r.reason),
});

const importFrom = (r: Row): ImportRecord => ({
  id: str(r.id),
  at: ms(r.at),
  fileName: str(r.file_name),
  supplierId: (r.supplier_id as string) ?? null,
  created: Number(r.created ?? 0),
  updated: Number(r.updated ?? 0),
  stockRows: Number(r.stock_rows ?? 0),
});

const importTo = (i: ImportRecord): Row => ({
  id: i.id,
  at: iso(i.at),
  file_name: i.fileName,
  supplier_id: i.supplierId,
  created: i.created,
  updated: i.updated,
  stock_rows: i.stockRows,
});

/** Ajustes sin el PIN (los dueños entran con mail y contraseña). */
function settingsTo(s: Settings): Row {
  const { pin: _pin, ...rest } = s;
  void _pin;
  return rest as Row;
}

/* ───────────── Lectura ───────────── */

function db() {
  if (!supabase) throw new Error("Supabase no está configurado");
  return supabase;
}

/** Trae todas las filas de a 1000 (el máximo que devuelve Supabase por consulta). */
async function fetchAll(table: string, order: string, ascending = true, limit = Infinity): Promise<Row[]> {
  const out: Row[] = [];
  for (let from = 0; out.length < limit; from += 1000) {
    const { data, error } = await db()
      .from(table)
      .select("*")
      .order(order, { ascending })
      .range(from, Math.min(from + 999, limit - 1));
    if (error) throw error;
    out.push(...(data as Row[]));
    if (!data || data.length < 1000) break;
  }
  return out;
}

/* Copia del último catálogo público en este navegador: la tienda se ve al instante y después se actualiza. */
const SHOP_CACHE = "almaymoda-catalogo";

function shopState(settings: Settings, products: Product[]): DBState {
  return { settings, products, suppliers: [], clients: [], orders: [], remitos: [], movements: [], imports: [], payments: [], adjustments: [] };
}

function applyCachedShop() {
  try {
    const raw = localStorage.getItem(SHOP_CACHE);
    if (!raw) return;
    const c = JSON.parse(raw) as { settings: Settings; products: Product[] };
    if (c?.settings && Array.isArray(c.products)) apply(shopState({ ...defaultSettings, ...c.settings }, c.products));
  } catch {
    // Sin copia (navegación privada, datos borrados): se espera a la base.
  }
}

function saveShopCache(settings: Settings, products: Product[]) {
  try {
    localStorage.setItem(SHOP_CACHE, JSON.stringify({ settings, products }));
  } catch {
    // Si no hay lugar, la próxima visita simplemente espera a la base.
  }
}

async function loadShop() {
  const [catalog, local] = await Promise.all([fetchAll("shop_catalog", "created_at"), db().from("shop_settings").select("*").maybeSingle()]);
  if (local.error) throw local.error;
  const l = (local.data ?? {}) as Row;
  const settings: Settings = {
    ...defaultSettings,
    storeName: str(l.store_name) || defaultSettings.storeName,
    whatsapp: str(l.whatsapp),
    email: str(l.email),
    instagram: str(l.instagram),
    address: str(l.address),
    categories: (l.categories as string[]) ?? defaultSettings.categories,
    sizes: (l.sizes as string[]) ?? defaultSettings.sizes,
    minPurchase: Number(l.min_purchase ?? 0),
    lowStock: Number(l.low_stock ?? defaultSettings.lowStock),
    pricesRequireLogin: !!l.prices_require_login,
  };
  const products = catalog.map(shopProductFrom);
  apply(shopState(settings, products));
  saveShopCache(settings, products);
  useRemote.setState({ mode: "tienda", error: false });
}

async function loadOwner() {
  const [settingsRow, products, variants, suppliers, clients, orders, remitos, movements, imports, payments, adjustments] = await Promise.all([
    db().from("settings").select("data").eq("id", 1).maybeSingle(),
    fetchAll("products", "created_at", false),
    fetchAll("variants", "position"),
    fetchAll("suppliers", "created_at"),
    fetchAll("clients", "created_at", false),
    fetchAll("orders", "created_at", false),
    fetchAll("remitos", "created_at", false),
    fetchAll("stock_movements", "at", false, 2000),
    fetchAll("imports", "at", false, 100),
    fetchAll("payments", "at", false),
    fetchAll("account_adjustments", "at", false),
  ]);
  if (settingsRow.error) throw settingsRow.error;
  const byProduct = new Map<string, Row[]>();
  for (const v of variants) {
    const k = str(v.product_id);
    byProduct.set(k, [...(byProduct.get(k) ?? []), v]);
  }
  apply({
    settings: { ...defaultSettings, ...((settingsRow.data?.data as Partial<Settings>) ?? {}) },
    products: products.map((p) => productFrom(p, variantsFrom(byProduct.get(str(p.id)) ?? []))),
    suppliers: suppliers.map(supplierFrom),
    clients: clients.map(clientFrom),
    orders: orders.map(orderFrom),
    remitos: remitos.map(remitoFrom),
    movements: movements.map(movementFrom),
    imports: imports.map(importFrom),
    payments: payments.map(paymentFrom),
    adjustments: adjustments.map(adjustmentFrom),
  });
  useRemote.setState({ mode: "duenos", error: false });
}

/* ───────────── Escritura (sólo dueños) ───────────── */

let applying = false;

/** Carga datos que vienen de la base sin que se vuelvan a escribir. */
function apply(state: DBState) {
  applying = true;
  try {
    useDB.setState({ ...state, ready: true });
  } finally {
    applying = false;
  }
}

function diff<T extends { id: string }>(prev: T[], next: T[]) {
  const before = new Map(prev.map((x) => [x.id, x]));
  const ids = new Set(next.map((x) => x.id));
  return {
    changed: next.filter((x) => before.get(x.id) !== x),
    added: next.filter((x) => !before.has(x.id)),
    removed: prev.filter((x) => !ids.has(x.id)).map((x) => x.id),
  };
}

async function check<T extends { error: unknown }>(q: PromiseLike<T>) {
  const r = await q;
  if (r.error) throw r.error;
  return r;
}

const quoted = (ids: string[]) => `(${ids.map((i) => `"${i.replace(/"/g, "")}"`).join(",")})`;

/** Sube las fotos nuevas (vienen como data:...) al bucket y devuelve las URLs públicas. */
async function uploadPhotos(p: Product): Promise<string[] | null> {
  if (!p.images.some((i) => i.startsWith("data:"))) return null;
  const out: string[] = [];
  for (const img of p.images) {
    if (!img.startsWith("data:")) {
      out.push(img);
      continue;
    }
    const blob = await (await fetch(img)).blob();
    const ext = blob.type === "image/png" ? "png" : blob.type === "image/jpeg" ? "jpg" : "webp";
    const path = `${p.id}/${uid("f")}.${ext}`;
    await check(db().storage.from(PHOTO_BUCKET).upload(path, blob, { contentType: blob.type, upsert: false }));
    out.push(db().storage.from(PHOTO_BUCKET).getPublicUrl(path).data.publicUrl);
  }
  return out;
}

async function writeSettings(s: Settings) {
  // El número de pedido lo avanza la base cuando entra un pedido web: nunca se pisa con uno más viejo.
  const cur = await check(db().from("settings").select("data").eq("id", 1).maybeSingle());
  const server = (cur.data?.data ?? {}) as Partial<Settings>;
  const data = { ...settingsTo(s), nextOrder: Math.max(server.nextOrder ?? 1, s.nextOrder ?? 1) };
  await check(db().from("settings").upsert({ id: 1, data }));
}

async function writeProducts(changed: Product[]) {
  if (!changed.length) return;
  const final: Product[] = [];
  for (const p of changed) {
    const images = await uploadPhotos(p);
    final.push(images ? { ...p, images } : p);
  }
  await check(db().from("products").upsert(final.map(productTo)));

  const rows = final.flatMap((p) => p.variants.map((v, i) => ({ id: v.id, product_id: p.id, size: v.size, color: v.color, stock: v.stock, position: i })));
  if (rows.length) await check(db().from("variants").upsert(rows));
  for (const p of final) {
    const q = db().from("variants").delete().eq("product_id", p.id);
    await check(p.variants.length ? q.not("id", "in", quoted(p.variants.map((v) => v.id))) : q);
  }

  // Si se subieron fotos, el store pasa a guardar las URLs en lugar de las imágenes enteras.
  const uploaded = new Map(final.filter((p, i) => p.images !== changed[i].images).map((p) => [p.id, p.images]));
  if (uploaded.size) {
    apply({ ...pick(useDB.getState()), products: useDB.getState().products.map((p) => (uploaded.has(p.id) ? { ...p, images: uploaded.get(p.id)! } : p)) });
  }
}

const upsert = async <T>(table: string, items: T[], to: (x: T) => Row) => {
  if (items.length) await check(db().from(table).upsert(items.map(to)));
};
const remove = async (table: string, ids: string[]) => {
  if (ids.length) await check(db().from(table).delete().in("id", ids));
};

async function writeDiff(prev: DBState, next: DBState) {
  if (prev.settings !== next.settings) await writeSettings(next.settings);

  const suppliers = diff(prev.suppliers, next.suppliers);
  const products = diff(prev.products, next.products);
  const clients = diff(prev.clients, next.clients);
  const orders = diff(prev.orders, next.orders);
  const remitos = diff(prev.remitos, next.remitos);
  const imports = diff(prev.imports, next.imports);
  const movements = diff(prev.movements, next.movements);
  const payments = diff(prev.payments, next.payments);
  const adjustments = diff(prev.adjustments, next.adjustments);

  // Altas y cambios, respetando qué tabla apunta a cuál.
  await upsert("suppliers", suppliers.changed, supplierTo);
  await writeProducts(products.changed);
  await upsert("clients", clients.changed, clientTo);
  await upsert("remitos", remitos.changed.map((r) => ({ ...r, orderId: r.orderId && next.orders.some((o) => o.id === r.orderId) ? r.orderId : null })), remitoTo);
  await upsert("orders", orders.changed, orderTo);
  await upsert("imports", imports.changed, importTo);
  await upsert("payments", payments.changed, paymentTo);
  await upsert("account_adjustments", adjustments.changed, adjustmentTo);
  if (movements.added.length) {
    const known = new Set(next.products.flatMap((p) => p.variants.map((v) => v.id)));
    const rows = movements.added
      .filter((m) => known.has(m.variantId))
      .map((m) => ({ at: iso(m.at), product_id: m.productId, variant_id: m.variantId, delta: m.delta, reason: m.reason }));
    if (rows.length) await check(db().from("stock_movements").insert(rows));
  }

  // Bajas: primero lo que depende de otras tablas.
  await remove("payments", payments.removed);
  await remove("account_adjustments", adjustments.removed);
  await remove("remitos", remitos.removed);
  await remove("orders", orders.removed);
  await remove("clients", clients.removed);
  await remove("products", products.removed);
  await remove("suppliers", suppliers.removed);
  await remove("imports", imports.removed);
}

const pick = (s: DBState): DBState => ({
  settings: s.settings,
  products: s.products,
  suppliers: s.suppliers,
  clients: s.clients,
  orders: s.orders,
  remitos: s.remitos,
  movements: s.movements,
  imports: s.imports,
  payments: s.payments,
  adjustments: s.adjustments,
});

let queue: Promise<void> = Promise.resolve();

function enqueue(prev: DBState, next: DBState) {
  useRemote.setState((s) => ({ saving: s.saving + 1 }));
  queue = queue
    .then(() => writeDiff(prev, next))
    .catch((err: { message?: string }) => {
      console.error("[almaymoda] Error al guardar en la base", err);
      toast.error("No se pudo guardar en la base. Revisá la conexión y recargá la página.", { description: err?.message });
    })
    .finally(() => useRemote.setState((s) => ({ saving: s.saving - 1 })));
}

/* ───────────── Ingreso de dueños ───────────── */

async function refresh() {
  try {
    const { data } = await db().auth.getSession();
    const user = data.session?.user ?? null;
    if (!user) {
      useRemote.setState({ email: null, notOwner: false });
      // await: sin él, si la carga falla, el error escapa del try y no se muestra el estado de error.
      return await loadShop();
    }
    const owner = await db().from("owners").select("user_id").eq("user_id", user.id).maybeSingle();
    useRemote.setState({ email: user.email ?? null, notOwner: !owner.data });
    return await (owner.data ? loadOwner() : loadShop());
  } catch (err) {
    // La tienda y el panel muestran su propio estado de error con un botón para reintentar.
    console.error("[almaymoda] Error al cargar los datos", err);
    useRemote.setState({ error: true });
  }
}

/** Vuelve a intentar la carga después de un error. */
export function retryRemote() {
  useRemote.setState({ error: false });
  return refresh();
}

export async function signIn(email: string, password: string) {
  const { error } = await db().auth.signInWithPassword({ email: email.trim(), password });
  if (error) return error.message === "Invalid login credentials" ? "El mail o la contraseña no son correctos." : error.message;
  await refresh();
  return useRemote.getState().notOwner ? "Esa cuenta no tiene acceso al panel." : null;
}

export async function signOut() {
  await queue;
  await db().auth.signOut();
  await refresh();
}

/* ───────────── Arranque ───────────── */

let started = false;

/** Arranca la conexión una sola vez (en el navegador y sólo si hay claves). */
export function startRemote() {
  if (started || !REMOTE || typeof window === "undefined") return;
  started = true;
  useDB.subscribe((next, prev) => {
    if (applying || useRemote.getState().mode !== "duenos") return;
    enqueue(pick(prev), pick(next));
  });
  // En la tienda se muestra la copia guardada mientras llega lo de la base. El panel espera a la base.
  if (!window.location.pathname.startsWith("/admin")) applyCachedShop();
  void refresh();
}

startRemote();
