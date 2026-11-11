"use client";

import { useMemo } from "react";
import { useDB } from "./store";
import { salePrice } from "./pricing";
import type { Product } from "./types";

/** Devuelve una función que calcula el precio de venta con los datos actuales. */
export function usePricer() {
  const suppliers = useDB((s) => s.suppliers);
  const settings = useDB((s) => s.settings);
  return useMemo(() => (p: Pick<Product, "cost" | "coefficient" | "supplierId" | "priceOverride">) => salePrice(p, suppliers, settings), [suppliers, settings]);
}

export function useHasDemo() {
  return useDB((s) => s.products.some((p) => p.demo) || s.suppliers.some((x) => x.demo));
}
