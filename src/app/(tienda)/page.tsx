"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "motion/react";
import { useCatalogo, useEstadoCatalogo, useLocal, useOfertas, usePrecioAntes, type Product } from "@/lib/tienda";
import { CatalogoVacio, ErrorCatalogo, GrillaCargando } from "@/components/tienda/estado-catalogo";
import { ProductCard } from "@/components/tienda/product-card";
import { Portada } from "@/components/tienda/portada";
import { CategoriasHover } from "@/components/tienda/categorias-hover";

/** Marcas que se ven en las publicaciones de @mayorista_almaymoda. */
const MARCAS = ["Trendy", "Discovery", "Oreiro Love", "Head", "Wilson", "Unicross", "Amayra", "Chimola", "Influencer", "Basilea"];

/** Grilla de tarjetas que entran escalonadas una sola vez al llegar con el scroll. */
function Grilla({ items, antes }: { items: Product[]; antes?: (p: Product) => number | undefined }) {
  const reduce = useReducedMotion();
  return (
    <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
      {items.map((p, i) => (
        <motion.div
          key={p.id}
          className="min-w-0"
          {...(reduce
            ? {}
            : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: "-60px" }, transition: { delay: (i % 4) * 0.08, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] as const } })}
        >
          <ProductCard product={p} antes={antes?.(p)} />
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  const visible = useCatalogo();
  const settings = useLocal();
  // Ofertas reales: las prenden los dueños desde el panel ("En oferta" en la ficha del artículo).
  const ofertas = useOfertas().slice(0, 4);
  const antes = usePrecioAntes();
  const estado = useEstadoCatalogo();

  const latest = [...visible].sort((a, b) => b.createdAt - a.createdAt).slice(0, 8);
  const categories = settings.categories
    .map((c) => {
      const items = visible.filter((p) => p.category === c);
      return {
        name: c,
        count: items.length,
        sample: items.find((p) => p.images.length > 0) ?? items[0],
      };
    })
    .filter((c) => c.count > 0);

  return (
    <div className="flex flex-col">
      <Portada />

      {/* Marcas que trabaja el local (las que muestran en su Instagram) */}
      <section aria-label="Marcas que trabajamos" className="bg-piedra py-5">
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

      {/* Categorías con foto: al pasar el mouse crece la foto y aparece el nombre en grande */}
      {categories.length > 0 && <CategoriasHover categories={categories} />}

      {/* Ofertas: van en la franja oscura. Sin ofertas activas la sección no existe y la franja pasa a "Recién llegados". */}
      {ofertas.length > 0 && (
        <section aria-labelledby="t-ofertas" className="banda">
          <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:py-24">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <h2 id="t-ofertas" className="font-display text-[clamp(2.25rem,6vw,4rem)] italic leading-[0.95] tracking-[-0.02em]">
                Ofertas
              </h2>
              <p className="text-gris">Artículos rebajados, con el precio anterior tachado.</p>
            </div>
            <Grilla items={ofertas} antes={antes} />
          </div>
        </section>
      )}

      {/* Recién llegados */}
      <section aria-labelledby="t-new" className={ofertas.length > 0 ? undefined : "banda"}>
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-16 md:py-24">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="t-new" className="font-display text-[clamp(2.25rem,6vw,4rem)] leading-[0.95] tracking-[-0.02em]">
              Recién llegados
            </h2>
            <Link href="/catalogo" className="inline-flex min-h-11 items-center border-b border-current font-semibold hover:opacity-80">
              Ver todo el catálogo
            </Link>
          </div>
          {estado === "cargando" ? <GrillaCargando /> : estado === "error" ? <ErrorCatalogo /> : latest.length ? <Grilla items={latest} /> : <CatalogoVacio />}
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
