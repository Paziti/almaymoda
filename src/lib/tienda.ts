"use client";

/**
 * Contrato entre la tienda (lo que ven las clientas) y la parte de atrás.
 *
 * La tienda (src/app/(tienda) y src/components/tienda) SOLO lee y escribe datos
 * a través de este archivo. Lo mantiene quien trabaja en la parte de atrás:
 * en la etapa 2 (Supabase) cambia lo de adentro, pero los nombres y lo que
 * devuelve cada función siguen iguales, así la tienda no se toca.
 *
 * Si a la tienda le falta algún dato, se pide acá; no se importa store/session directo.
 */

import { useMemo } from "react";
import { useDB, useHydrated } from "./store";
import { useSession, type CartLine } from "./session";
import { usePricer, useHasDemo } from "./hooks";
import { now, uid } from "./format";
import type { Client, LineItem, Order, OrderStatus, Product, Variant } from "./types";

export type { CartLine, Order, OrderStatus, Product, Variant, LineItem };
export type Clienta = Pick<Client, "id" | "name" | "business" | "phone" | "email" | "city">;

// Utilidades de presentación que la tienda puede usar libremente.
export { fmtMoney, fmtDate, normalizeText } from "./format";
export { totalStock } from "./pricing";
export { variantLabel } from "./labels";
export { whatsappUrl } from "./share";

/* ───────────── Datos del local ───────────── */

/** Datos públicos del local (nunca incluye PIN, costos ni numeración interna). */
export function useLocal() {
  const s = useDB((x) => x.settings);
  return useMemo(
    () => ({
      storeName: s.storeName,
      whatsapp: s.whatsapp,
      email: s.email,
      instagram: s.instagram,
      address: s.address,
      categories: s.categories,
      sizes: s.sizes,
      minPurchase: s.minPurchase,
      lowStock: s.lowStock,
    }),
    [s],
  );
}

/** true cuando los datos ya cargaron (antes conviene mostrar un spinner). */
export const useListo = useHydrated;

/** true si todavía hay artículos de ejemplo cargados. */
export const useHayEjemplos = useHasDemo;

/* ───────────── Catálogo ───────────── */

/** Artículos publicados (los inactivos no se muestran en la tienda). */
export function useCatalogo(): Product[] {
  const products = useDB((s) => s.products);
  return useMemo(() => products.filter((p) => p.active), [products]);
}

/** Un artículo publicado por id, o undefined si no existe o está oculto. */
export function useArticulo(id: string | null | undefined): Product | undefined {
  return useDB((s) => (id ? s.products.find((p) => p.id === id && p.active) : undefined));
}

/** Función que devuelve el precio de venta de un artículo. */
export const usePrecio = usePricer;

/** false si el local pide ingresar para ver precios y la clienta no ingresó. */
export function useVerPrecios() {
  const requireLogin = useDB((s) => s.settings.pricesRequireLogin);
  const clientId = useSession((s) => s.clientId);
  return !requireLogin || !!clientId;
}

/* ───────────── Carrito ───────────── */

export function useCarrito() {
  const cart = useSession((s) => s.cart);
  const setQty = useSession((s) => s.setQty);
  const addMany = useSession((s) => s.addMany);
  const clearCart = useSession((s) => s.clearCart);
  return { cart, setQty, addMany, clearCart };
}

/* ───────────── Clienta ───────────── */

const ultimos8 = (phone: string) => phone.replace(/\D/g, "").slice(-8);

export function useClienta() {
  const clientId = useSession((s) => s.clientId);
  const login = useSession((s) => s.login);
  const logout = useSession((s) => s.logout);
  const clients = useDB((s) => s.clients);
  const orders = useDB((s) => s.orders);
  const saveClient = useDB((s) => s.saveClient);

  const clienta = clients.find((c) => c.id === clientId) as Clienta | undefined;
  const pedidos = useMemo(
    () => (clientId ? orders.filter((o) => o.clientId === clientId).sort((a, b) => b.createdAt - a.createdAt) : []),
    [orders, clientId],
  );

  return {
    clienta,
    pedidos,
    /** Ingresa con el teléfono. Devuelve false si no hay cuenta con ese número. */
    ingresar(phone: string) {
      const d = ultimos8(phone);
      const c = d.length >= 8 ? clients.find((x) => ultimos8(x.phone) === d) : undefined;
      if (c) login(c.id);
      return !!c;
    },
    /** Crea la cuenta y deja a la clienta ingresada. */
    registrar(datos: Omit<Clienta, "id">) {
      const c: Client = { ...datos, id: uid("c"), name: datos.name.trim(), address: "", cuit: "", notes: "Alta desde la tienda", createdAt: now() };
      saveClient(c);
      login(c.id);
    },
    salir: logout,
  };
}

/* ───────────── Pedidos ───────────── */

export interface NuevoPedido {
  customer: { name: string; phone: string; business: string; city: string };
  items: LineItem[];
  notes: string;
}

/**
 * Registra el pedido: da de alta o actualiza a la clienta por teléfono,
 * la deja ingresada y guarda el pedido para que lo vean en el panel.
 */
export function useEnviarPedido() {
  const clients = useDB((s) => s.clients);
  const saveClient = useDB((s) => s.saveClient);
  const createOrder = useDB((s) => s.createOrder);
  const login = useSession((s) => s.login);

  return (p: NuevoPedido): Order => {
    const { name, phone, business, city } = p.customer;
    const d = ultimos8(phone);
    const found = d.length >= 8 ? clients.find((c) => ultimos8(c.phone) === d) : undefined;
    const client: Client = found
      ? { ...found, name: name || found.name, business: business || found.business, city: city || found.city }
      : { id: uid("c"), name, business, phone, email: "", city, address: "", cuit: "", notes: "Alta desde la tienda", createdAt: now() };
    saveClient(client);
    login(client.id);
    return createOrder({ clientId: client.id, customer: p.customer, items: p.items, notes: p.notes });
  };
}
