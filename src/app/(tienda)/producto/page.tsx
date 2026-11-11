"use client";

import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import clsx from "clsx";
import { toast } from "sonner";
import { ArrowLeftIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { useSession } from "@/lib/session";
import { fmtMoney } from "@/lib/format";
import { totalStock } from "@/lib/pricing";
import { usePricer } from "@/lib/hooks";
import { Button, ButtonLink, EmptyState, PriceTag, Stepper } from "@/components/ui";
import { ProductImage } from "@/components/product-image";
import { ProductCard, usePriceVisible } from "@/components/shop/product-card";

export default function ProductoPage() {
  // Ruta única con ?id=: la key reinicia cantidades y foto al pasar de un artículo a otro.
  const id = useSearchParams().get("id") ?? "";
  return <ProductoView key={id} id={id} />;
}

function ProductoView({ id }: { id: string }) {
  const router = useRouter();
  const product = useDB((s) => s.products.find((p) => p.id === id && p.active));
  const all = useDB((s) => s.products);
  const cart = useSession((s) => s.cart);
  const addMany = useSession((s) => s.addMany);
  const pricer = usePricer();
  const showPrice = usePriceVisible();
  const [img, setImg] = useState(0);
  const [qty, setQty] = useState<Record<string, number>>({});

  if (!product) {
    return (
      <EmptyState title="Este artículo no está disponible" action={<ButtonLink href="/catalogo">Volver al catálogo</ButtonLink>}>
        Puede que se haya agotado o que lo hayan sacado del catálogo.
      </EmptyState>
    );
  }

  const price = pricer(product);
  const colors = [...new Set(product.variants.map((v) => v.color))];
  const sizes = [...new Set(product.variants.map((v) => v.size))];
  const inCart = (vid: string) => cart.find((l) => l.productId === product.id && l.variantId === vid)?.qty ?? 0;
  const units = Object.values(qty).reduce((a, b) => a + b, 0);
  const related = all.filter((p) => p.active && p.id !== product.id && p.category === product.category && totalStock(p) > 0).slice(0, 4);

  const add = () => {
    const lines = Object.entries(qty)
      .filter(([, q]) => q > 0)
      .map(([variantId, q]) => ({ productId: product.id, variantId, qty: q }));
    addMany(lines);
    setQty({});
    toast.success(`${units} ${units === 1 ? "unidad agregada" : "unidades agregadas"} al pedido`, {
      action: { label: "Ver pedido", onClick: () => router.push("/pedido") },
    });
  };

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-16 px-4 py-6">
      <div className="grid gap-8 md:grid-cols-[1.1fr_1fr] md:gap-14">
        <div className="flex flex-col gap-3 md:sticky md:top-20 md:self-start">
          <Link href="/catalogo" className="inline-flex min-h-11 w-fit items-center gap-2 text-sm font-semibold text-gris hover:text-tinta">
            <ArrowLeftIcon size={16} /> Catálogo
          </Link>
          <div className="overflow-hidden rounded-[4px]">
            <ProductImage product={product} index={img} />
          </div>
          {product.images.length > 1 && (
            <div className="flex gap-2" role="group" aria-label="Fotos">
              {product.images.map((_, i) => (
                <button key={i} type="button" onClick={() => setImg(i)} aria-label={`Foto ${i + 1}`} aria-pressed={img === i} className={clsx("w-16 overflow-hidden rounded-[4px] border-2", img === i ? "border-tinta" : "border-transparent")}>
                  <ProductImage product={product} index={i} />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="flex flex-col gap-8 md:pt-14">
          <div className="flex flex-col gap-4">
            <p className="flex gap-3 text-sm text-gris">
              <Link href={`/catalogo?cat=${encodeURIComponent(product.category)}`} className="font-semibold text-tinta underline-offset-4 hover:underline">
                {product.category}
              </Link>
              <span className="num">{product.code}</span>
            </p>
            <h1 className="font-display text-[clamp(2.6rem,7vw,4.6rem)] leading-[0.95] tracking-[-0.02em]">{product.name}</h1>
            <div>
              {showPrice ? (
                <PriceTag value={`${fmtMoney(price)} c/u`} size="lg" tone="accent" />
              ) : (
                <Link href="/cuenta" className="font-semibold text-fucsia underline underline-offset-4">
                  Ingresá con tu teléfono para ver el precio
                </Link>
              )}
            </div>
            {product.description && <p className="max-w-[50ch] text-lg leading-relaxed text-gris">{product.description}</p>}
          </div>

          <section aria-labelledby="t-curva" className="flex flex-col gap-4">
            <h2 id="t-curva" className="border-t border-tinta pt-4 font-display text-2xl">
              Cantidades por talle
            </h2>
            {product.variants.length === 0 && <p className="text-gris">Sin talles cargados. Consultanos por WhatsApp.</p>}
            {colors.map((color) => (
              <div key={color} className="flex flex-col gap-2 rounded-[4px] border border-linea bg-papel p-4">
                {colors.length > 1 || color !== "Único" ? <h3 className="font-semibold">{color}</h3> : null}
                <ul className="flex flex-col divide-y divide-linea">
                  {sizes.map((size) => {
                    const v = product.variants.find((x) => x.color === color && x.size === size);
                    if (!v) return null;
                    const available = Math.max(0, v.stock - inCart(v.id));
                    return (
                      <li key={v.id} className="flex items-center justify-between gap-3 py-2">
                        <div className="flex min-w-0 flex-col">
                          <span className="font-semibold">Talle {size}</span>
                          <span className={clsx("text-sm", v.stock <= 0 ? "text-peligro" : "text-gris")}>
                            {v.stock <= 0 ? "Sin stock" : `${available} disponibles${inCart(v.id) ? ` · ${inCart(v.id)} en tu pedido` : ""}`}
                          </span>
                        </div>
                        {v.stock > 0 && <Stepper label={`talle ${size} ${color}`} value={qty[v.id] ?? 0} max={available} onChange={(n) => setQty((q) => ({ ...q, [v.id]: n }))} />}
                      </li>
                    );
                  })}
                </ul>
              </div>
            ))}
          </section>

          <div className="sticky bottom-3 z-10 flex flex-col gap-2 rounded-2xl bg-lienzo/95 py-2 backdrop-blur md:static md:bg-transparent md:p-0">
            <Button size="lg" variant={units === 0 ? "primary" : "accent"} disabled={units === 0} onClick={add} className="w-full">
              {units === 0 ? "Elegí cantidades para agregar" : `Agregar ${units} ${units === 1 ? "unidad" : "unidades"}${showPrice ? ` · ${fmtMoney(units * price)}` : ""}`}
            </Button>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section aria-labelledby="t-rel" className="flex flex-col gap-6">
          <h2 id="t-rel" className="border-t border-tinta pt-4 font-display text-[clamp(2rem,5vw,3.2rem)] leading-none">
            Más {product.category.toLowerCase()}
          </h2>
          <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
