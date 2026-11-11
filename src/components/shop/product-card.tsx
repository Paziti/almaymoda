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
    <Link href={`/producto/${product.id}`} className="group flex flex-col gap-2.5 min-w-0 rounded-2xl">
      <div className="relative overflow-hidden rounded-2xl">
        <ProductImage product={product} showLabel={stock > 0} className="transition-transform duration-500 group-hover:scale-[1.03]" />
        {stock <= 0 && <span className="absolute inset-x-0 top-0 bg-tinta/85 py-1.5 text-center text-sm font-semibold text-lienzo">Sin stock</span>}
        <div className="absolute bottom-2.5 left-2.5">
          <PriceTag value={showPrice ? fmtMoney(price) : "Ver precio"} size="sm" />
        </div>
      </div>
      <div className="flex flex-col gap-0.5 px-0.5">
        <h3 className="font-semibold leading-snug group-hover:text-fucsia">{product.name}</h3>
        <p className="text-sm text-gris">
          <span className="num">{product.code}</span>
          {sizes.length > 0 && <> · {sizes.join(" ")}</>}
        </p>
        {stock > 0 && stock <= low && <p className="text-sm font-semibold text-alerta">Quedan {stock}</p>}
      </div>
    </Link>
  );
}
