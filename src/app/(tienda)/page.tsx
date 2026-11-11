"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { WhatsappLogoIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { totalStock } from "@/lib/pricing";
import { fmtMoney } from "@/lib/format";
import { usePricer } from "@/lib/hooks";
import { whatsappUrl } from "@/lib/share";
import { ButtonLink, EmptyState, PriceTag, buttonClass } from "@/components/ui";
import { ProductImage } from "@/components/product-image";
import { ProductCard, usePriceVisible } from "@/components/shop/product-card";

export default function Home() {
  const products = useDB((s) => s.products);
  const settings = useDB((s) => s.settings);
  const pricer = usePricer();
  const showPrice = usePriceVisible();
  const reduce = useReducedMotion();

  const visible = products.filter((p) => p.active);
  const featured = [...visible.filter((p) => p.featured && totalStock(p) > 0), ...visible.filter((p) => !p.featured)].slice(0, 3);
  const latest = [...visible].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);
  const categories = settings.categories
    .map((c) => ({ name: c, count: visible.filter((p) => p.category === c).length }))
    .filter((c) => c.count > 0);

  // Disposición escalonada del collage: la pieza central más grande, las otras desplazadas.
  const collage = [
    "col-start-1 row-start-1 row-span-2 mt-10",
    "col-start-2 row-start-1 row-span-3",
    "col-start-3 row-start-2 row-span-2",
  ];

  return (
    <div className="flex flex-col">
      {/* Portada */}
      <section className="mx-auto grid w-full max-w-6xl items-center gap-10 px-4 pb-14 pt-10 md:grid-cols-[1.05fr_1fr] md:pt-16">
        <div className="flex flex-col gap-6">
          <h1 className="font-display text-[clamp(2.6rem,7.5vw,5.2rem)] font-medium leading-[0.98] tracking-tight">Moda por mayor, con el stock a la vista</h1>
          <p className="max-w-[44ch] text-lg text-gris">
            Elegí talles y cantidades de cada artículo, armá el pedido y mandalo por WhatsApp. Te respondemos confirmando stock y forma de pago.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/catalogo" size="lg">
              Ver el catálogo
            </ButtonLink>
            {settings.whatsapp && (
              <a href={whatsappUrl(settings.whatsapp, "Hola! Quería hacer una consulta por compra mayorista.")} target="_blank" rel="noreferrer" className={buttonClass("secondary", "lg")}>
                <WhatsappLogoIcon size={20} /> Consultar por WhatsApp
              </a>
            )}
          </div>
          {settings.minPurchase > 0 && <p className="text-sm text-gris">Compra mínima {fmtMoney(settings.minPurchase)}.</p>}
        </div>

        {featured.length > 0 && (
          <div className="grid grid-cols-3 grid-rows-[repeat(4,minmax(0,auto))] gap-3" aria-label="Destacados">
            {featured.map((p, i) => (
              <motion.div
                key={p.id}
                className={collage[i]}
                initial={reduce ? false : { opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.12 * i, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <Link href={`/producto/${p.id}`} className="group relative block overflow-hidden rounded-2xl">
                  <ProductImage product={p} showLabel={false} className="transition-transform duration-500 group-hover:scale-[1.03]" />
                  <span className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)]">
                    <PriceTag value={showPrice ? fmtMoney(pricer(p)) : p.code} size="sm" tone={i === 1 ? "accent" : undefined} />
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Categorías */}
      {categories.length > 0 && (
        <section aria-labelledby="t-cat" className="border-y border-linea bg-papel">
          <div className="mx-auto flex max-w-6xl flex-col gap-4 px-4 py-8 md:flex-row md:items-baseline md:gap-10">
            <h2 id="t-cat" className="shrink-0 text-sm font-semibold text-gris">
              Categorías
            </h2>
            <ul className="scroll-x -mx-4 flex gap-x-7 gap-y-2 px-4 pb-1 md:mx-0 md:flex-wrap md:px-0">
              {categories.map((c) => (
                <li key={c.name} className="shrink-0">
                  <Link href={`/catalogo?cat=${encodeURIComponent(c.name)}`} className="group inline-flex min-h-11 items-baseline gap-1.5">
                    <span className="font-display text-[1.7rem] leading-none group-hover:text-fucsia group-hover:italic">{c.name}</span>
                    <span className="num text-sm text-gris">{c.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      {/* Ingresos */}
      <section aria-labelledby="t-new" className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 pt-14">
        <div className="flex items-end justify-between gap-4">
          <h2 id="t-new" className="font-display text-4xl md:text-5xl">
            Últimos ingresos
          </h2>
          <Link href="/catalogo" className="inline-flex min-h-11 items-center font-semibold underline-offset-4 hover:underline">
            Ver todo
          </Link>
        </div>
        {latest.length ? (
          <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
            {latest.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : (
          <EmptyState title="Todavía no hay artículos publicados">Los dueños los cargan desde el panel. Volvé en un rato.</EmptyState>
        )}
      </section>

      {/* Cómo comprar: es una secuencia real del sistema */}
      <section aria-labelledby="t-how" className="mx-auto mt-20 grid w-full max-w-6xl gap-8 px-4 md:grid-cols-[0.8fr_1.2fr]">
        <h2 id="t-how" className="font-display text-4xl md:text-5xl">
          Cómo hacer un pedido
        </h2>
        <ol className="grid gap-px overflow-hidden rounded-2xl border border-linea bg-linea sm:grid-cols-3">
          {[
            ["Elegí", "Entrá a cada artículo y poné cuántas unidades querés de cada talle y color."],
            ["Enviá", "En tu pedido completá nombre y teléfono y mandalo por WhatsApp con un toque."],
            ["Confirmamos", "Te respondemos con el stock confirmado, el total y la forma de pago y envío."],
          ].map(([t, d], i) => (
            <li key={t} className="flex flex-col gap-2 bg-papel p-5">
              <span className="font-display text-3xl italic text-fucsia">{i + 1}</span>
              <span className="font-semibold">{t}</span>
              <span className="text-gris">{d}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
