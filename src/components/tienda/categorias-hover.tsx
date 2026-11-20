"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import clsx from "clsx";
import { motion, useReducedMotion } from "motion/react";
import type { Product } from "@/lib/tienda";
import { ProductImage } from "@/components/comun/product-image";

export interface CategoriaVista {
  name: string;
  count: number;
  sample?: Product;
}

const cuenta = (n: number) => (n === 1 ? "1 artículo" : `${n} artículos`);

/** Nombre en grande que entra letra por letra. Decorativo: los enlaces ya tienen su texto. */
function Titular({ text, sub, accent, className }: { text: string; sub: string; accent: boolean; className: string }) {
  const reduce = useReducedMotion();
  return (
    <div className={clsx("flex-col items-center gap-2", className)} aria-hidden>
      <p key={text} className={clsx("flex overflow-hidden font-display text-[clamp(3.25rem,14vw,9.5rem)] leading-none tracking-[-0.03em]", accent ? "italic text-acento" : "text-tinta")}>
        {[...text].map((ch, i) => (
          <motion.span key={i} className="inline-block pb-[0.12em]" initial={reduce ? false : { y: "110%" }} animate={{ y: 0 }} transition={{ delay: i * 0.035, duration: 0.5, ease: [0.2, 0.7, 0.2, 1] }}>
            {ch}
          </motion.span>
        ))}
      </p>
      <p className="num text-gris">{sub}</p>
    </div>
  );
}

/**
 * Categorías con foto y el nombre en grande debajo.
 * - Celular: carrusel que se desliza con el dedo; la foto del centro es la activa y su nombre entra letra por letra.
 * - Con mouse (pantallas grandes): fila de miniaturas; la que se señala crece y muestra su nombre.
 * ponytail: el corte es por ancho (lg), no por tipo de puntero; una tablet apaisada ve la fila de mouse.
 */
export function CategoriasHover({ categories }: { categories: CategoriaVista[] }) {
  const [hover, setHover] = useState<CategoriaVista | null>(null);
  const [centro, setCentro] = useState(0);
  const lista = useRef<HTMLUListElement>(null);
  const actual = categories[centro] ?? categories[0];

  // Celular: la activa es la tarjeta más cercana al centro del carrusel.
  const alDeslizar = () => {
    const ul = lista.current;
    if (!ul || ul.scrollWidth <= ul.clientWidth) return;
    const medio = ul.scrollLeft + ul.clientWidth / 2;
    let mejor = 0;
    let dist = Infinity;
    [...ul.children].forEach((li, i) => {
      const el = li as HTMLElement;
      const d = Math.abs(el.offsetLeft + el.offsetWidth / 2 - medio);
      if (d < dist) {
        dist = d;
        mejor = i;
      }
    });
    setCentro(mejor);
  };

  return (
    <section aria-labelledby="t-cat" className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 md:py-24">
      <h2 id="t-cat" className="sr-only">
        Categorías
      </h2>

      <ul
        ref={lista}
        onScroll={alDeslizar}
        onMouseLeave={() => setHover(null)}
        className="scroll-x sin-barra relative -mx-4 flex snap-x snap-mandatory items-center gap-3 px-[21vw] lg:mx-0 lg:h-60 lg:justify-center lg:px-0"
      >
        {categories.map((c, i) => (
          <li
            key={c.name}
            className={clsx(
              "transition-[width,opacity,scale] duration-500 ease-[cubic-bezier(0.2,0.7,0.2,1)] max-lg:w-[58vw] max-lg:shrink-0 max-lg:snap-center",
              i !== centro && "max-lg:scale-90 max-lg:opacity-50",
              hover?.name === c.name ? "lg:w-44" : "lg:w-24",
            )}
          >
            <Link href={`/catalogo?cat=${encodeURIComponent(c.name)}`} onMouseEnter={() => setHover(c)} onFocus={() => setHover(c)} onBlur={() => setHover(null)} className="block overflow-hidden rounded-[4px]">
              {c.sample && <ProductImage product={c.sample} showLabel={false} />}
              <span className="sr-only">
                {c.name}, {cuenta(c.count)}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      {actual && <Titular className="flex lg:hidden" text={actual.name} sub={`${cuenta(actual.count)} · tocá la foto para verlos`} accent />}
      <Titular className="hidden lg:flex" text={hover?.name ?? "Categorías"} sub={hover ? `${cuenta(hover.count)} · entrá para verlos` : "Elegí una categoría"} accent={!!hover} />
    </section>
  );
}
