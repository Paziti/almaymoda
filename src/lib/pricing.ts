import type { Product, Rounding, Settings, Supplier } from "./types";

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
