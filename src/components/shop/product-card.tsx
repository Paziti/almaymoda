"use client";

import Link from "next/link";
import type { Product } from "@/lib/types";
import { fmtMoney } from "@/lib/format";
import { totalStock } from "@/lib/pricing";
import { usePricer } from "@/lib/hooks";
import { useDB } from "@/lib/store";
import { useSession } from "@/lib/session";
import { PriceTag } from "@/components/ui";
import { ProductImage } from "@/components/product-image";

export function usePriceVisible() {
  const requireLogin = useDB((s) => s.settings.pricesRequireLogin);
  const clientId = useSession((s) => s.clientId);
  return !requireLogin || !!clientId;
}

export function ProductCard({ product }: { product: Product }) {
  const price = usePricer()(product);
  const showPrice = usePriceVisible();
  const low = useDB((s) => s.settings.lowStock);
  const stock = totalStock(product);
  const sizes = [...new Set(product.variants.filter((v) => v.stock > 0).map((v) => v.size))];

  return (
    <Link href={`/producto?id=${product.id}`} className="group flex min-w-0 flex-col gap-3 rounded-[4px]">
      <div className="relative overflow-hidden rounded-[4px]">
        <ProductImage product={product} showLabel={stock > 0} className="transition-transform duration-700 group-hover:scale-[1.04]" />
        {stock <= 0 && <span className="absolute inset-x-0 top-0 bg-[#221b26]/85 py-1.5 text-center text-sm font-semibold text-[#fbf9f8]">Sin stock</span>}
        <div className="absolute bottom-2.5 left-2.5">
          <PriceTag value={showPrice ? fmtMoney(price) : "Ver precio"} size="sm" />
        </div>
      </div>
      <div className="flex flex-col gap-1">
        <h3 className="font-display text-xl leading-tight underline-offset-4 group-hover:underline">{product.name}</h3>
        <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm text-gris">
          <span className="num">{product.code}</span>
          {sizes.length > 0 && (
            <span className="flex flex-wrap gap-1">
              {sizes.map((s) => (
                <span key={s} className="num rounded-[3px] border border-linea px-1 text-xs leading-5">
                  {s}
                </span>
              ))}
            </span>
          )}
        </p>
        {stock > 0 && stock <= low && <p className="text-sm font-semibold text-alerta">Quedan {stock}</p>}
      </div>
    </Link>
  );
}
