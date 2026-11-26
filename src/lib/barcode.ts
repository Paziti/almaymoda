import { normalizeText } from "./format";
import type { Product } from "./types";

/**
 * La pistola lectora funciona como un teclado: escribe los números y aprieta Enter.
 * Un código de barras son sólo dígitos, de 8 (EAN-8) a 14 (GTIN-14).
 */
export const cleanBarcode = (s: string) => s.replace(/\D/g, "");

export const looksLikeBarcode = (s: string) => /^\d{8,14}$/.test(s.trim());

/** Texto en el que buscan los buscadores del panel: código, nombre y código de barras. */
export const productSearchText = (p: Pick<Product, "code" | "name" | "barcode" | "brand">) => `${p.code} ${p.name} ${p.barcode ?? ""} ${p.brand ?? ""}`;

/** Artículo que coincide exacto con lo tipeado o pistoleado: por código de barras o por código. */
export function findExact<T extends Pick<Product, "code" | "barcode">>(products: T[], q: string): T | undefined {
  const digits = cleanBarcode(q);
  if (looksLikeBarcode(q)) {
    const byBarcode = products.find((p) => p.barcode && p.barcode === digits);
    if (byBarcode) return byBarcode;
  }
  const nq = normalizeText(q);
  return nq ? products.find((p) => normalizeText(p.code) === nq) : undefined;
}

/** Busca artículos: primero el que coincide exacto, después los que contienen el texto. */
export function searchProducts<T extends Pick<Product, "code" | "name" | "barcode">>(products: T[], q: string, limit = 8): T[] {
  const nq = normalizeText(q);
  if (!nq) return [];
  const exact = findExact(products, q);
  const rest = products.filter((p) => p !== exact && normalizeText(productSearchText(p)).includes(nq));
  return (exact ? [exact, ...rest] : rest).slice(0, limit);
}

/** Link para cargar un artículo nuevo, con el código de barras ya puesto si lo que buscaron parece uno. */
export const newProductHref = (q: string) => (looksLikeBarcode(q) ? `/admin/productos/nuevo?barras=${cleanBarcode(q)}` : "/admin/productos/nuevo");
