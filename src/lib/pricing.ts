import type { PriceList, Product, Rounding, Settings, Supplier } from "./types";

export function roundPrice(value: number, rounding: Rounding) {
  if (!Number.isFinite(value) || value <= 0) return 0;
  const step = rounding || 1;
  return Math.ceil(value / step) * step;
}

export type CoefSource = "articulo" | "proveedor" | "general";

export function effectiveCoefficient(
  p: Pick<Product, "coefficient" | "supplierId">,
  suppliers: Supplier[],
  settings: Settings,
): { value: number; source: CoefSource } {
  if (p.coefficient && p.coefficient > 0) return { value: p.coefficient, source: "articulo" };
  const sup = p.supplierId ? suppliers.find((s) => s.id === p.supplierId) : undefined;
  if (sup?.coefficient && sup.coefficient > 0) return { value: sup.coefficient, source: "proveedor" };
  return { value: settings.coefficient, source: "general" };
}

export function salePrice(
  p: Pick<Product, "cost" | "coefficient" | "supplierId" | "priceOverride">,
  suppliers: Supplier[],
  settings: Settings,
) {
  if (p.priceOverride && p.priceOverride > 0) return p.priceOverride;
  const { value } = effectiveCoefficient(p, suppliers, settings);
  return roundPrice(p.cost * value, settings.rounding);
}

type Priced = Pick<Product, "cost" | "coefficient" | "supplierId" | "priceOverride" | "retailPrice">;

/** Precio minorista: el fijo del artículo, o el mayorista más el recargo de Ajustes. */
export function retailPrice(p: Priced, suppliers: Supplier[], settings: Settings) {
  if (p.retailPrice && p.retailPrice > 0) return p.retailPrice;
  return retailFromWholesale(salePrice(p, suppliers, settings), settings);
}

export const retailFromWholesale = (wholesale: number, settings: Pick<Settings, "retailMarkup" | "rounding">) =>
  roundPrice(wholesale * (1 + (settings.retailMarkup ?? 0) / 100), settings.rounding);

export function priceFor(list: PriceList, p: Priced, suppliers: Supplier[], settings: Settings) {
  return list === "minorista" ? retailPrice(p, suppliers, settings) : salePrice(p, suppliers, settings);
}

/** Descuento que se propone al prender la oferta de un artículo. */
export const DEFAULT_SALE_PERCENT = 20;

type OnSale = Pick<Product, "onSale" | "salePercent">;

/** true si la oferta está prendida y tiene un descuento válido. */
export const isOnSale = (p: OnSale) => !!p.onSale && (p.salePercent ?? 0) > 0 && (p.salePercent ?? 0) < 100;

/** Precio con el descuento aplicado, redondeado igual que el resto de los precios. */
export const discounted = (regular: number, percent: number, rounding: Rounding) => roundPrice(regular * (1 - percent / 100), rounding);

/** Precio que paga la clienta en la tienda: el mayorista, o el de oferta si está prendida. */
export function shopPrice(p: Pick<Product, "cost" | "coefficient" | "supplierId" | "priceOverride" | "shopPrices"> & OnSale, suppliers: Supplier[], settings: Settings) {
  if (p.shopPrices) return p.shopPrices.price;
  const regular = salePrice(p, suppliers, settings);
  return isOnSale(p) ? discounted(regular, p.salePercent!, settings.rounding) : regular;
}

export const totalStock = (p: Pick<Product, "variants">) =>
  p.variants.reduce((acc, v) => acc + Math.max(0, v.stock), 0);

export function stockLevel(p: Pick<Product, "variants">, low: number): "sin" | "bajo" | "ok" {
  const t = totalStock(p);
  if (t <= 0) return "sin";
  if (t <= low) return "bajo";
  return "ok";
}

export const coefSourceLabel: Record<CoefSource, string> = {
  articulo: "propio del artículo",
  proveedor: "del proveedor",
  general: "general",
};
