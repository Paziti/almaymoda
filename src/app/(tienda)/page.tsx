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

/** Marcas que se ven en las publicaciones de @mayorista_almaymoda. */
const MARCAS = ["Trendy", "Discovery", "Oreiro Love", "Head", "Wilson", "Unicross", "Amayra", "Chimola", "Influencer", "Basilea"];

export default function Home() {
  const products = useDB((s) => s.products);
  const settings = useDB((s) => s.settings);
  const pricer = usePricer();
  const showPrice = usePriceVisible();
  const reduce = useReducedMotion();

  const visible = products.filter((p) => p.active);
  const inStock = visible.filter((p) => totalStock(p) > 0);
  const featured = [...visible.filter((p) => p.featured && totalStock(p) > 0), ...visible.filter((p) => !p.featured)].slice(0, 3);
  const latest = [...visible].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);
  const categories = settings.categories
    .map((c) => {
      const items = visible.filter((p) => p.category === c);
      return {
        name: c,
        count: items.length,
        swatches: [...new Set(items.map((p) => p.swatch).filter(Boolean))].slice(0, 5) as string[],
        sample: items.find((p) => p.images.length > 0),
      };
    })
    .filter((c) => c.count > 0);

  // Collage de tapa: pieza principal alta, una segunda que la pisa abajo y una tercera arriba.
  const collage = [
    "relative z-0 ml-auto w-[68%]",
    "absolute bottom-[12%] left-0 z-10 w-[38%] ring-[6px] ring-lienzo",
    "absolute right-[-3%] top-[-7%] z-10 w-[27%] ring-[6px] ring-lienzo max-md:hidden",
  ];
  const enter = (i: number) =>
    reduce ? {} : { initial: { opacity: 0, y: 28 }, animate: { opacity: 1, y: 0 }, transition: { delay: 0.25 + 0.14 * i, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] as const } };

  return (
    <div className="flex flex-col">
      {/* Tapa */}
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-4 pb-16 pt-8 md:grid-cols-12 md:gap-6 md:pb-24 md:pt-14">
        <div className="flex flex-col gap-7 md:col-span-7 md:pt-6">
          <h1 className="font-display text-[clamp(3.5rem,12.5vw,7.4rem)] font-medium leading-[0.86] tracking-[-0.03em]">
            <span className="linea-tapa">
              <span>Accesorios</span>
            </span>
            <span className="linea-tapa">
              <span>por mayor</span>
            </span>
          </h1>
          <p className="max-w-[40ch] text-lg leading-relaxed text-gris md:text-xl">
            Carteras, mochilas, bolsos, billeteras, materos y térmicos. Elegí colores y cantidades, armá el pedido y mandalo por WhatsApp. Te respondemos confirmando stock y forma de pago.
          </p>
          <div className="flex flex-wrap gap-3">
            <ButtonLink href="/catalogo" size="lg" variant="accent">
              Ver el catálogo
            </ButtonLink>
            {settings.whatsapp && (
              <a href={whatsappUrl(settings.whatsapp, "Hola! Quería hacer una consulta por compra mayorista.")} target="_blank" rel="noreferrer" className={buttonClass("secondary", "lg")}>
                <WhatsappLogoIcon size={20} /> Consultar por WhatsApp
              </a>
            )}
          </div>

          {/* Líneas de tapa: datos reales del catálogo cargado */}
          {visible.length > 0 && (
            <dl className="mt-2 grid max-w-xl grid-cols-2 border-t border-tinta/80 sm:grid-cols-3">
              <div className="flex flex-col gap-1 border-r border-linea py-4 pr-4">
                <dt className="order-2 text-sm text-gris">artículos con stock</dt>
                <dd className="num font-display text-4xl leading-none">{inStock.length}</dd>
              </div>
              <div className="flex flex-col gap-1 py-4 pl-4 sm:border-r sm:border-linea sm:pr-4">
                <dt className="order-2 text-sm text-gris">{categories.length === 1 ? "categoría" : "categorías"}</dt>
                <dd className="num font-display text-4xl leading-none">{categories.length}</dd>
              </div>
              <div className="col-span-2 flex flex-col gap-1 border-t border-linea py-4 sm:col-span-1 sm:border-t-0 sm:pl-4">
                <dt className="order-2 text-sm text-gris">{settings.minPurchase > 0 ? "compra mínima" : "de compra"}</dt>
                <dd className="num whitespace-nowrap font-display text-4xl leading-none">{settings.minPurchase > 0 ? fmtMoney(settings.minPurchase) : "Sin mínimo"}</dd>
              </div>
            </dl>
          )}
        </div>

        {featured.length > 0 && (
          <div className="relative mx-auto w-full max-w-md md:col-span-5 md:max-w-none md:self-start" aria-label="Destacados">
            {featured.map((p, i) => (
              <motion.div key={p.id} className={collage[i]} {...enter(i)}>
                <Link href={`/producto?id=${p.id}`} className="group relative block overflow-hidden rounded-[4px]">
                  <ProductImage product={p} showLabel={false} className="transition-transform duration-700 group-hover:scale-[1.04]" />
                  <span className={i === 0 ? "absolute bottom-3 right-3" : "absolute bottom-2.5 left-2.5 max-w-[calc(100%-1.25rem)]"}>
                    <PriceTag value={showPrice ? fmtMoney(pricer(p)) : p.code} size="sm" tone={i === 0 ? "accent" : undefined} />
                  </span>
                </Link>
                {i === 0 && (
                  <p className="mt-3 text-right text-sm text-gris">
                    <span className="font-semibold text-tinta">{p.name}</span>, {p.category.toLowerCase()}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* Marcas que trabaja el local (las que muestran en su Instagram) */}
      <section aria-label="Marcas que trabajamos" className="border-y border-linea py-5">
        <div className="marquesina" aria-hidden>
          <div className="marquesina-pista">
            {[...MARCAS, ...MARCAS].map((m, i) => (
              <span key={i} className="flex shrink-0 items-center gap-10 pr-10 font-display text-[clamp(1.6rem,3.4vw,2.6rem)] italic leading-none text-tinta/85">
                {m}
                <span className="size-1.5 rounded-full bg-acento" />
              </span>
            ))}
          </div>
        </div>
        <p className="sr-only">Marcas que trabajamos: {MARCAS.join(", ")}.</p>
      </section>

      {/* Índice de categorías */}
      {categories.length > 0 && (
        <section aria-labelledby="t-cat" className="mx-auto grid w-full max-w-6xl gap-6 px-4 pb-20 pt-16 md:grid-cols-12 md:pb-28 md:pt-24">
          <div className="md:col-span-3">
            <h2 id="t-cat" className="font-display text-3xl md:sticky md:top-24">
              Índice
            </h2>
          </div>
          <ul className="border-t border-tinta md:col-span-9">
            {categories.map((c) => (
              <li key={c.name} className="relative border-b border-linea">
                <Link href={`/catalogo?cat=${encodeURIComponent(c.name)}`} className="group flex min-h-16 items-center justify-between gap-4 py-3 md:py-4">
                  <span className="font-display text-[clamp(2rem,6vw,3.6rem)] leading-none transition-transform duration-300 group-hover:translate-x-2 group-hover:italic">{c.name}</span>
                  {/* Con mouse: una foto de la categoría asoma al pasar, como en un índice de revista */}
                  {c.sample && (
                    <span className="pointer-events-none absolute right-[30%] top-1/2 z-10 hidden w-24 -translate-y-1/2 rotate-[4deg] scale-90 overflow-hidden rounded-[4px] opacity-0 shadow-xl ring-4 ring-lienzo transition-[opacity,scale,rotate] duration-300 group-hover:rotate-[-3deg] group-hover:scale-100 group-hover:opacity-100 lg:block" aria-hidden>
                      <ProductImage product={c.sample} showLabel={false} />
                    </span>
                  )}
                  <span className="flex shrink-0 items-center gap-3">
                    <span className="hidden -space-x-1.5 sm:flex" aria-hidden>
                      {c.swatches.map((s) => (
                        <span key={s} className="size-5 rounded-full ring-2 ring-lienzo" style={{ background: s }} />
                      ))}
                    </span>
                    <span className="num text-sm text-gris">{c.count === 1 ? "1 artículo" : `${c.count} artículos`}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Recién llegados, en la franja oscura */}
      <section aria-labelledby="t-new" className="banda">
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="t-new" className="font-display text-[clamp(2.6rem,8vw,5.5rem)] leading-[0.9] tracking-[-0.02em]">
              Recién llegados
            </h2>
            <Link href="/catalogo" className="inline-flex min-h-11 items-center border-b border-current font-semibold hover:opacity-80">
              Ver todo el catálogo
            </Link>
          </div>
          {latest.length ? (
            <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
              {latest.map((p, i) => (
                <motion.div
                  key={p.id}
                  className="min-w-0"
                  {...(reduce
                    ? {}
                    : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { delay: (i % 4) * 0.08, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const } })}
                >
                  <ProductCard product={p} />
                </motion.div>
              ))}
            </div>
          ) : (
            <EmptyState title="Todavía no hay artículos publicados">Los dueños los cargan desde el panel. Volvé en un rato.</EmptyState>
          )}
        </div>
      </section>

      {/* Cómo hacer un pedido: es la secuencia real del sistema, por eso va numerada */}
      <section aria-labelledby="t-how" className="mx-auto grid w-full max-w-6xl gap-10 px-4 pt-20 md:grid-cols-12 md:pt-28">
        <h2 id="t-how" className="font-display text-[clamp(2.4rem,6vw,4rem)] leading-[0.95] md:col-span-4">
          Cómo hacer un pedido
        </h2>
        <ol className="grid gap-10 sm:grid-cols-3 sm:gap-6 md:col-span-8">
          {[
            ["Elegí", "Entrá a cada artículo y poné cuántas unidades querés de cada color."],
            ["Enviá", "En tu pedido completá nombre y teléfono y mandalo por WhatsApp con un toque."],
            ["Confirmamos", "Te respondemos con el stock confirmado, el total y la forma de pago y envío."],
          ].map(([t, d], i) => (
            <li key={t} className="flex flex-col gap-3 border-t border-tinta pt-4">
              <span className="numeral font-display text-7xl leading-none" aria-hidden>
                {i + 1}
              </span>
              <span className="text-lg font-semibold">{t}</span>
              <span className="text-gris">{d}</span>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
