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
import { useShopPricer, useRegularPricer, useHasDemo } from "./hooks";
import { isOnSale, totalStock } from "./pricing";
import { now, uid } from "./format";
import { REMOTE, supabase } from "./supabase";
import { retryRemote, useRemote } from "./remote";
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

/** true cuando los datos ya cargaron. */
export const useListo = useHydrated;

export type EstadoCatalogo = "cargando" | "listo" | "error";

/**
 * En qué está el catálogo: mientras carga, las secciones con artículos muestran tarjetas de carga;
 * si la base no respondió (y no hay copia guardada), muestran el error con el botón para reintentar.
 * Lo que no depende de datos (portada, textos) se muestra siempre.
 */
export function useEstadoCatalogo(): EstadoCatalogo {
  const listo = useHydrated();
  const error = useRemote((s) => s.error);
  const hayArticulos = useDB((s) => s.products.length > 0);
  if (error && !hayArticulos) return "error";
  return listo ? "listo" : "cargando";
}

/** Vuelve a pedir el catálogo a la base después de un error. */
export const reintentarCarga = retryRemote;

/**
 * false mientras la tienda no pueda verificar quién es la clienta (con la base, sus datos quedan en su
 * celular y no se consulta su historial). La página "Mi cuenta" lo usa para no prometer lo que no muestra.
 */
export const HISTORIAL_PEDIDOS = !REMOTE;

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

/**
 * Función que devuelve el precio que paga la clienta.
 * Si el artículo está en oferta, ya devuelve el precio con descuento (también en el carrito y el pedido).
 */
export const usePrecio = useShopPricer;

/** Función que devuelve el precio anterior (sin oferta) para mostrarlo tachado; undefined si no está en oferta. */
export const usePrecioAntes = useRegularPricer;

/** true si el artículo está en oferta (se prende y se apaga desde el panel). */
export const enOferta = (p: Product) => isOnSale(p);

/** Artículos publicados en oferta, primero los que tienen stock. Vacío = no mostrar la sección. */
export function useOfertas(): Product[] {
  const catalogo = useCatalogo();
  return useMemo(() => {
    const o = catalogo.filter(isOnSale);
    return [...o.filter((p) => totalStock(p) > 0), ...o.filter((p) => totalStock(p) <= 0)];
  }, [catalogo]);
}

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
  const perfil = useSession((s) => s.perfil);
  const setPerfil = useSession((s) => s.setPerfil);
  const stored = useDB((s) => s.clients);
  // Con Supabase la tienda no lee la tabla de clientas: usa los datos guardados en este navegador.
  const clients = REMOTE ? (perfil ? [perfil] : []) : stored;
  const orders = useDB((s) => s.orders);
  const saveClient = useDB((s) => s.saveClient);

  const clienta = clients.find((c) => c.id === clientId) as Clienta | undefined;
  // Con Supabase el historial de pedidos todavía no se muestra (hace falta que la clienta confirme su identidad).
  const pedidos = useMemo(
    () => (clientId && !REMOTE ? orders.filter((o) => o.clientId === clientId).sort((a, b) => b.createdAt - a.createdAt) : []),
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
      if (REMOTE) setPerfil(c);
      else {
        saveClient(c);
        login(c.id);
      }
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

/** Manda el pedido a Supabase. La base recalcula los precios y devuelve el número. */
async function pedirEnLaBase(p: NuevoPedido): Promise<Order> {
  const { data, error } = await supabase!.rpc("create_order", {
    customer: p.customer,
    items: p.items.map((i) => ({ variantId: i.variantId, qty: i.qty })),
    notes: p.notes,
  });
  if (error) throw new Error(error.message);
  const r = data as { id: string; number: number; items: LineItem[] };
  return { id: r.id, number: r.number, createdAt: now(), clientId: null, customer: p.customer, items: r.items, notes: p.notes, status: "nuevo", remitoId: null };
}

/**
 * Registra el pedido y devuelve una promesa con el pedido ya numerado.
 * Funciona con y sin Supabase: usar esta en lugar de useEnviarPedido.
 * Si algo falla (por ejemplo, un artículo que se quedó sin publicar) la promesa se rechaza con un mensaje para mostrar.
 */
export function usePedir() {
  const enviar = useEnviarPedido();
  const perfil = useSession((s) => s.perfil);
  const setPerfil = useSession((s) => s.setPerfil);
  return async (p: NuevoPedido): Promise<Order> => {
    if (!REMOTE) return enviar(p);
    const order = await pedirEnLaBase(p);
    const { name, phone, business, city } = p.customer;
    const mismo = perfil && ultimos8(perfil.phone) === ultimos8(phone);
    setPerfil({
      ...(mismo ? perfil : { id: uid("c"), email: "", address: "", cuit: "", notes: "", createdAt: now() }),
      name,
      phone,
      business: business || (mismo ? perfil.business : ""),
      city: city || (mismo ? perfil.city : ""),
    });
    return order;
  };
}

/**
 * Registra el pedido: da de alta o actualiza a la clienta por teléfono,
 * la deja ingresada y guarda el pedido para que lo vean en el panel.
 * @deprecated Con Supabase el número llega después: usar usePedir. Acá, con Supabase, el pedido
 * se manda igual pero el número que devuelve es 0.
 */
export function useEnviarPedido() {
  const clients = useDB((s) => s.clients);
  const saveClient = useDB((s) => s.saveClient);
  const createOrder = useDB((s) => s.createOrder);
  const login = useSession((s) => s.login);

  return (p: NuevoPedido): Order => {
    if (REMOTE) {
      pedirEnLaBase(p).catch((err) => console.error("[almaymoda] No se pudo registrar el pedido", err));
      return { id: uid("o"), number: 0, createdAt: now(), clientId: null, customer: p.customer, items: p.items, notes: p.notes, status: "nuevo", remitoId: null };
    }
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
