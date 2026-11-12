"use client";

import { create } from "zustand";
import { createJSONStorage, persist, type StateStorage } from "zustand/middleware";
import { del, get, set } from "idb-keyval";
import { useSyncExternalStore } from "react";
import type {
  Client,
  ImportRecord,
  LineItem,
  Order,
  OrderStatus,
  Product,
  Remito,
  Settings,
  StockMovement,
  Supplier,
} from "./types";
import { CATEGORIAS, LEGACY_CATEGORIAS, LEGACY_MEDIDAS, MEDIDAS, defaultSettings, demoClients, demoOrders, demoProducts, demoSuppliers } from "./seed";
import { uid } from "./format";

const idbStorage: StateStorage = {
  getItem: async (name) => (await get<string>(name)) ?? null,
  setItem: async (name, value) => {
    await set(name, value);
  },
  removeItem: async (name) => {
    await del(name);
  },
};

export interface DBState {
  settings: Settings;
  products: Product[];
  suppliers: Supplier[];
  clients: Client[];
  orders: Order[];
  remitos: Remito[];
  movements: StockMovement[];
  imports: ImportRecord[];
}

export interface ImportChange {
  productId: string | null;
  data: Partial<Product> & { code: string };
  /** Stock a aplicar por variante (medida/color). */
  stock?: { size: string; color: string; qty: number }[];
}

interface Actions {
  updateSettings: (patch: Partial<Settings>) => void;
  saveProduct: (p: Product, movements?: { variantId: string; delta: number }[], reason?: string) => void;
  deleteProduct: (id: string) => void;
  setProductsActive: (ids: string[], active: boolean) => void;
  adjustStock: (productId: string, variantId: string, delta: number, reason: string) => void;
  setStock: (productId: string, variantId: string, value: number, reason: string) => void;
  bulkUpdateProducts: (updates: { id: string; patch: Partial<Product> }[]) => void;
  applyImport: (changes: ImportChange[], stockMode: "none" | "add" | "replace", record: Omit<ImportRecord, "id" | "at">) => void;
  saveSupplier: (s: Supplier) => void;
  deleteSupplier: (id: string) => void;
  saveClient: (c: Client) => void;
  deleteClient: (id: string) => void;
  createOrder: (o: Omit<Order, "id" | "number" | "createdAt" | "status" | "remitoId">) => Order;
  setOrderStatus: (id: string, status: OrderStatus) => void;
  createRemito: (r: Omit<Remito, "id" | "number" | "createdAt" | "status" | "stockDiscounted">, discountStock: boolean) => Remito;
  setRemitoStatus: (id: string, status: Remito["status"]) => void;
  clearDemo: () => void;
  loadDemo: () => void;
  resetAll: () => void;
  replaceAll: (db: DBState) => void;
}

function initialDB(): DBState {
  const products = demoProducts();
  return {
    settings: { ...defaultSettings, nextOrder: 2 },
    products,
    suppliers: demoSuppliers(),
    clients: demoClients(),
    orders: demoOrders(products),
    remitos: [],
    movements: [],
    imports: [],
  };
}

function emptyDB(settings: Settings): DBState {
  return { settings, products: [], suppliers: [], clients: [], orders: [], remitos: [], movements: [], imports: [] };
}

function applyStockToItems(products: Product[], items: LineItem[], sign: 1 | -1, reason: string, movements: StockMovement[]) {
  const now = Date.now();
  const byId = new Map(products.map((p) => [p.id, p]));
  const touched = new Set<string>();
  for (const it of items) {
    if (!it.productId || !it.variantId) continue;
    const p = byId.get(it.productId);
    if (!p) continue;
    const variants = p.variants.map((v) => (v.id === it.variantId ? { ...v, stock: v.stock + sign * it.qty } : v));
    byId.set(p.id, { ...p, variants, updatedAt: now });
    touched.add(p.id);
    movements.unshift({ id: uid("m"), at: now, productId: p.id, variantId: it.variantId, delta: sign * it.qty, reason });
  }
  return products.map((p) => (touched.has(p.id) ? byId.get(p.id)! : p));
}

export const useDB = create<DBState & Actions>()(
  persist(
    (setState, getState) => ({
      ...initialDB(),

      updateSettings: (patch) => setState((s) => ({ settings: { ...s.settings, ...patch } })),

      saveProduct: (p, moves = [], reason = "Ajuste manual") =>
        setState((s) => {
          const now = Date.now();
          const exists = s.products.some((x) => x.id === p.id);
          const next = { ...p, updatedAt: now };
          const logged = moves.filter((m) => m.delta).map((m) => ({ id: uid("m"), at: now, productId: p.id, variantId: m.variantId, delta: m.delta, reason }));
          return {
            products: exists ? s.products.map((x) => (x.id === p.id ? next : x)) : [next, ...s.products],
            movements: [...logged, ...s.movements].slice(0, 2000),
          };
        }),

      deleteProduct: (id) => setState((s) => ({ products: s.products.filter((p) => p.id !== id) })),

      setProductsActive: (ids, active) =>
        setState((s) => ({ products: s.products.map((p) => (ids.includes(p.id) ? { ...p, active } : p)) })),

      adjustStock: (productId, variantId, delta, reason) =>
        setState((s) => {
          if (!delta) return {};
          const now = Date.now();
          return {
            products: s.products.map((p) =>
              p.id === productId
                ? { ...p, updatedAt: now, variants: p.variants.map((v) => (v.id === variantId ? { ...v, stock: v.stock + delta } : v)) }
                : p,
            ),
            movements: [{ id: uid("m"), at: now, productId, variantId, delta, reason }, ...s.movements].slice(0, 2000),
          };
        }),

      setStock: (productId, variantId, value, reason) => {
        const p = getState().products.find((x) => x.id === productId);
        const v = p?.variants.find((x) => x.id === variantId);
        if (!v) return;
        getState().adjustStock(productId, variantId, value - v.stock, reason);
      },

      bulkUpdateProducts: (updates) =>
        setState((s) => {
          const map = new Map(updates.map((u) => [u.id, u.patch]));
          const now = Date.now();
          return { products: s.products.map((p) => (map.has(p.id) ? { ...p, ...map.get(p.id), updatedAt: now } : p)) };
        }),

      applyImport: (changes, stockMode, record) =>
        setState((s) => {
          const now = Date.now();
          const products = [...s.products];
          const movements = [...s.movements];
          const index = new Map(products.map((p, i) => [p.id, i]));
          let created = 0;
          let updated = 0;
          for (const ch of changes) {
            let p: Product;
            const i = ch.productId ? index.get(ch.productId) : undefined;
            if (i !== undefined) {
              p = { ...products[i], ...stripUndefined(ch.data), updatedAt: now };
              updated++;
            } else {
              p = {
                id: uid("p"),
                code: ch.data.code,
                name: ch.data.name || ch.data.code,
                description: ch.data.description ?? "",
                category: ch.data.category || "Sin categoría",
                supplierId: ch.data.supplierId ?? null,
                cost: ch.data.cost ?? 0,
                coefficient: null,
                priceOverride: null,
                images: [],
                variants: [],
                active: false,
                featured: false,
                createdAt: now,
                updatedAt: now,
              };
              created++;
            }
            if (stockMode !== "none" && ch.stock?.length) {
              const variants = [...p.variants];
              for (const st of ch.stock) {
                const size = st.size || "Único";
                const color = st.color || "Único";
                const vi = variants.findIndex((v) => v.size.toLowerCase() === size.toLowerCase() && v.color.toLowerCase() === color.toLowerCase());
                const prev = vi >= 0 ? variants[vi].stock : 0;
                const next = stockMode === "add" ? prev + st.qty : st.qty;
                if (vi >= 0) variants[vi] = { ...variants[vi], stock: next };
                else variants.push({ id: uid("v"), size, color, stock: next });
                const v = vi >= 0 ? variants[vi] : variants[variants.length - 1];
                if (next !== prev) movements.unshift({ id: uid("m"), at: now, productId: p.id, variantId: v.id, delta: next - prev, reason: `Importación ${record.fileName}` });
              }
              p = { ...p, variants };
            }
            if (i !== undefined) products[i] = p;
            else {
              products.unshift(p);
              index.clear();
              products.forEach((x, k) => index.set(x.id, k));
            }
          }
          return {
            products,
            movements: movements.slice(0, 2000),
            imports: [{ ...record, created, updated, id: uid("i"), at: now }, ...s.imports].slice(0, 100),
          };
        }),

      saveSupplier: (sup) =>
        setState((s) => ({
          suppliers: s.suppliers.some((x) => x.id === sup.id) ? s.suppliers.map((x) => (x.id === sup.id ? sup : x)) : [...s.suppliers, sup],
        })),

      deleteSupplier: (id) =>
        setState((s) => ({
          suppliers: s.suppliers.filter((x) => x.id !== id),
          products: s.products.map((p) => (p.supplierId === id ? { ...p, supplierId: null } : p)),
        })),

      saveClient: (c) =>
        setState((s) => ({
          clients: s.clients.some((x) => x.id === c.id) ? s.clients.map((x) => (x.id === c.id ? c : x)) : [c, ...s.clients],
        })),

      deleteClient: (id) => setState((s) => ({ clients: s.clients.filter((x) => x.id !== id) })),

      createOrder: (o) => {
        const s = getState();
        const order: Order = { ...o, id: uid("o"), number: s.settings.nextOrder, createdAt: Date.now(), status: "nuevo", remitoId: null };
        setState({ orders: [order, ...s.orders], settings: { ...s.settings, nextOrder: s.settings.nextOrder + 1 } });
        return order;
      },

      setOrderStatus: (id, status) => setState((s) => ({ orders: s.orders.map((o) => (o.id === id ? { ...o, status } : o)) })),

      createRemito: (r, discountStock) => {
        const s = getState();
        const remito: Remito = {
          ...r,
          id: uid("r"),
          number: s.settings.nextRemito,
          createdAt: Date.now(),
          status: "emitido",
          stockDiscounted: discountStock,
        };
        const movements = [...s.movements];
        const label = `Remito ${remito.number}`;
        const products = discountStock ? applyStockToItems(s.products, r.items, -1, label, movements) : s.products;
        const orders = r.orderId
          ? s.orders.map((o) => (o.id === r.orderId ? { ...o, status: "remitido" as const, remitoId: remito.id } : o))
          : s.orders;
        setState({
          remitos: [remito, ...s.remitos],
          products,
          movements: movements.slice(0, 2000),
          orders,
          settings: { ...s.settings, nextRemito: s.settings.nextRemito + 1 },
        });
        return remito;
      },

      setRemitoStatus: (id, status) =>
        setState((s) => {
          const r = s.remitos.find((x) => x.id === id);
          if (!r) return {};
          let products = s.products;
          const movements = [...s.movements];
          let stockDiscounted = r.stockDiscounted;
          if (status === "anulado" && r.stockDiscounted) {
            products = applyStockToItems(s.products, r.items, 1, `Anulación remito ${r.number}`, movements);
            stockDiscounted = false;
          }
          return {
            products,
            movements,
            remitos: s.remitos.map((x) => (x.id === id ? { ...x, status, stockDiscounted } : x)),
          };
        }),

      clearDemo: () =>
        setState((s) => ({
          products: s.products.filter((p) => !p.demo),
          suppliers: s.suppliers.filter((x) => !x.demo),
          clients: s.clients.filter((x) => !x.demo),
          orders: s.orders.filter((x) => !x.demo),
          remitos: s.remitos.filter((x) => !x.demo),
          movements: s.movements.filter((m) => !m.productId.startsWith("p-demo")),
        })),

      loadDemo: () =>
        setState((s) => {
          const d = initialDB();
          const keep = <T extends { id: string; demo?: boolean }>(a: T[], b: T[]) => [...b, ...a.filter((x) => !x.demo)];
          return {
            products: keep(s.products, d.products),
            suppliers: keep(s.suppliers, d.suppliers),
            clients: keep(s.clients, d.clients),
            orders: keep(s.orders, d.orders),
          };
        }),

      resetAll: () => setState(emptyDB({ ...defaultSettings })),

      replaceAll: (db) => setState({ ...emptyDB(defaultSettings), ...db, settings: { ...defaultSettings, ...db.settings } }),
    }),
    {
      name: "almaymoda-db",
      version: 4,
      migrate: (persisted, version) => (version < 4 ? refreshDemo(persisted as Partial<DBState>) : persisted) as DBState,
      storage: createJSONStorage(() => idbStorage),
      partialize: (s) => ({
        settings: s.settings,
        products: s.products,
        suppliers: s.suppliers,
        clients: s.clients,
        orders: s.orders,
        remitos: s.remitos,
        movements: s.movements,
        imports: s.imports,
      }),
      merge: (persisted, current) => {
        const p = (persisted ?? {}) as Partial<DBState>;
        return { ...current, ...p, settings: { ...current.settings, ...(p.settings ?? {}) } };
      },
    },
  ),
);

const sameList = (a: string[] | undefined, b: string[]) => !!a && a.length === b.length && a.every((x, i) => x === b[i]);

/**
 * v1 → v2: la tienda es de accesorios, no de ropa. v2 → v4: los ejemplos suman fotos provisorias.
 * Renueva los artículos de ejemplo y los valores por defecto que nadie tocó.
 * Lo que cargaron los dueños no se modifica.
 */
function refreshDemo(p: Partial<DBState>): Partial<DBState> {
  const s = p.settings;
  const settings = s && {
    ...s,
    categories: sameList(s.categories, LEGACY_CATEGORIAS) ? CATEGORIAS : s.categories,
    // Suma las medidas nuevas de los ejemplos sin quitar las que agregaron los dueños.
    sizes: sameList(s.sizes, LEGACY_MEDIDAS) ? MEDIDAS : [...MEDIDAS.filter((m) => s.sizes.includes(m) || !LEGACY_MEDIDAS.includes(m)), ...s.sizes.filter((m) => !MEDIDAS.includes(m))],
    storeName: s.storeName === "almaymoda" ? defaultSettings.storeName : s.storeName,
    photoBackground: s.photoBackground === "#F3EEF1" ? defaultSettings.photoBackground : s.photoBackground,
  };
  const hadDemo = (p.products ?? []).some((x) => x.demo);
  if (!hadDemo) return { ...p, settings };
  const products = demoProducts();
  const own = <T extends { demo?: boolean }>(a: T[] | undefined) => (a ?? []).filter((x) => !x.demo);
  return {
    ...p,
    settings,
    products: [...products, ...own(p.products)],
    suppliers: [...demoSuppliers(), ...own(p.suppliers)],
    clients: [...demoClients(), ...own(p.clients)],
    orders: [...demoOrders(products), ...own(p.orders)],
    remitos: own(p.remitos),
    movements: (p.movements ?? []).filter((m) => !m.productId.startsWith("p-demo")),
  };
}

function stripUndefined<T extends object>(o: T): Partial<T> {
  return Object.fromEntries(Object.entries(o).filter(([, v]) => v !== undefined)) as Partial<T>;
}

/** true cuando los datos guardados en el dispositivo ya se cargaron. */
export function useHydrated() {
  return useSyncExternalStore(
    (cb) => useDB.persist.onFinishHydration(cb),
    () => useDB.persist.hasHydrated(),
    () => false,
  );
}

export function exportDB(): DBState {
  const s = useDB.getState();
  return {
    settings: s.settings,
    products: s.products,
    suppliers: s.suppliers,
    clients: s.clients,
    orders: s.orders,
    remitos: s.remitos,
    movements: s.movements,
    imports: s.imports,
  };
}
