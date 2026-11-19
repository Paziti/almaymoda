"use client";

import { useMemo } from "react";
import { useDB } from "./store";
import { isOnSale, priceFor, salePrice, shopPrice } from "./pricing";
import type { PriceList, Product } from "./types";

/** Devuelve una función que calcula el precio de venta con los datos actuales. */
export function usePricer() {
  const suppliers = useDB((s) => s.suppliers);
  const settings = useDB((s) => s.settings);
  return useMemo(() => (p: Pick<Product, "cost" | "coefficient" | "supplierId" | "priceOverride">) => salePrice(p, suppliers, settings), [suppliers, settings]);
}

type ShopPriced = Pick<Product, "cost" | "coefficient" | "supplierId" | "priceOverride" | "onSale" | "salePercent" | "shopPrices">;

/** Precio de la tienda: aplica la oferta si el artículo la tiene prendida. */
export function useShopPricer() {
  const suppliers = useDB((s) => s.suppliers);
  const settings = useDB((s) => s.settings);
  return useMemo(() => (p: ShopPriced) => shopPrice(p, suppliers, settings), [suppliers, settings]);
}

/** Precio sin la oferta, para mostrarlo tachado. undefined si el artículo no está en oferta. */
export function useRegularPricer() {
  const suppliers = useDB((s) => s.suppliers);
  const settings = useDB((s) => s.settings);
  return useMemo(() => (p: ShopPriced) => (p.shopPrices ? p.shopPrices.regular : isOnSale(p) ? salePrice(p, suppliers, settings) : undefined), [suppliers, settings]);
}

/** Como usePricer, pero eligiendo la lista: mayorista o minorista. Sólo para el panel. */
export function useListPricer() {
  const suppliers = useDB((s) => s.suppliers);
  const settings = useDB((s) => s.settings);
  return useMemo(
    () => (list: PriceList, p: Pick<Product, "cost" | "coefficient" | "supplierId" | "priceOverride" | "retailPrice">) => priceFor(list, p, suppliers, settings),
    [suppliers, settings],
  );
}

export function useHasDemo() {
  return useDB((s) => s.products.some((p) => p.demo) || s.suppliers.some((x) => x.demo));
}
