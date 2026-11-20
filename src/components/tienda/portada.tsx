"use client";

import { useRef } from "react";
import clsx from "clsx";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

/* Fotos de ambiente de public/portada (Unsplash, licencia libre). Para cambiarlas: reemplazar los archivos o esta lista. */
const FOTOS = ["08", "06", "12", "02", "16", "09", "20", "05", "11", "10", "17", "04", "15", "07", "18", "01"];
const BASE = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

/* Collage desparejo a propósito. Celular: grilla de 6, de a dos por fila. Escritorio: grilla de 12, de a tres. */
const MOVIL = ["max-md:col-start-1", "max-md:col-start-5 max-md:mt-[9vh]", "max-md:col-start-2 max-md:mt-[4vh]", "max-md:col-start-4"];
const ESCRITORIO = [
  "md:col-span-3 md:col-start-1",
  "md:col-span-2 md:col-start-6 md:mt-[16vh]",
  "md:col-span-3 md:col-start-10 md:mt-[6vh]",
  "md:col-span-2 md:col-start-2 md:mt-[10vh]",
  "md:col-span-3 md:col-start-5",
  "md:col-span-2 md:col-start-10 md:mt-[14vh]",
];

/** Cada foto se acerca (crece) al llegar al centro de la pantalla y se aleja al irse. */
function Foto({ nombre, className }: { nombre: string; className: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.55, 1, 0.55]);
  const opacity = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.3, 1, 1, 0.3]);

  return (
    <div ref={ref} className={className}>
      <motion.img src={`${BASE}/portada/${nombre}.jpg`} alt="" width={900} height={1125} decoding="async" style={reduce ? undefined : { scale, opacity }} className="aspect-[4/5] w-full rounded-[4px] bg-[var(--foto)] object-cover" />
    </div>
  );
}

/**
 * Portada: el nombre queda fijo en el centro mientras las fotos suben por detrás con el scroll.
 * El título va en modo "diferencia": se invierte sobre cada foto que le pasa por detrás.
 */
export function Portada() {
  const reduce = useReducedMotion();
  // La línea que invita a bajar se apaga apenas se empieza a scrollear.
  const { scrollY } = useScroll();
  const pista = useTransform(scrollY, [0, 160], [1, 0]);

  return (
    <section id="portada" aria-labelledby="t-portada" className="relative">
      <div className="pointer-events-none sticky top-0 z-10 flex h-dvh flex-col items-center justify-center gap-4 px-4 text-center text-white mix-blend-difference">
        <h1 id="t-portada" className="font-display text-[clamp(3.5rem,14vw,10rem)] font-medium leading-[0.9] tracking-[-0.03em]">
          <span className="linea-tapa !pb-[0.18em]">
            <span>Alma y Moda</span>
          </span>
        </h1>
        {/* En el celular va en dos líneas parejas en lugar de dejar "Blanca" sola abajo */}
        <p className="text-xs font-semibold uppercase tracking-[0.2em] sm:text-sm">
          <span className="block sm:inline">Mayorista de accesorios</span>
          <span className="hidden sm:inline"> · </span>
          <span className="block sm:inline">Bahía Blanca</span>
        </p>
        <motion.span style={{ opacity: pista }} className="absolute bottom-8 h-12 w-px overflow-hidden bg-white/25" aria-hidden>
          <motion.span className="block h-1/2 w-full bg-white" animate={reduce ? undefined : { y: ["-100%", "200%"] }} transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }} />
        </motion.span>
      </div>

      {/* Al abrir sólo se ve el título: las fotos entran desde abajo al scrollear y terminan de salir por arriba antes de soltarlo */}
      <div className="mx-auto grid max-w-6xl grid-cols-6 gap-x-3 gap-y-[6vh] px-4 pb-[100dvh] md:grid-cols-12 md:gap-x-6">
        {FOTOS.map((n, i) => (
          // En el celular van 8 fotos en vez de 16: el recorrido dura dos pantallas y no cuatro antes de llegar a los artículos.
          <Foto key={n} nombre={n} className={clsx("max-md:col-span-2", i >= 8 && "max-md:hidden", MOVIL[i % MOVIL.length], ESCRITORIO[i % ESCRITORIO.length])} />
        ))}
      </div>
    </section>
  );
}
