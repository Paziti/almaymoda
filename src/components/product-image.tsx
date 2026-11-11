"use client";

import clsx from "clsx";
import type { CSSProperties } from "react";
import type { Product } from "@/lib/types";

/* Siluetas para artículos sin foto: muestran el tipo de accesorio y su color real, y se rotulan como "Sin foto". */
const SHAPES: Record<string, string> = {
  cartera: "M24 58 Q24 52 30 52 L70 52 Q76 52 76 58 L78 98 Q78 104 72 104 L28 104 Q22 104 22 98 Z M30 52 C30 12 70 12 70 52 L65 52 C65 20 35 20 35 52 Z",
  bolso: "M18 50 L82 50 L76 106 L24 106 Z M31 50 C31 20 49 20 49 50 L44 50 C44 28 36 28 36 50 Z M51 50 C51 20 69 20 69 50 L64 50 C64 28 56 28 56 50 Z",
  rinonera: "M14 62 Q50 46 86 62 L82 88 Q50 102 18 88 Z M14 62 L4 58 L4 66 L16 70 Z M86 62 L96 58 L96 66 L84 70 Z",
  mochila: "M28 36 Q28 22 50 22 Q72 22 72 36 L74 100 Q74 108 66 108 L34 108 Q26 108 26 100 Z M42 22 C42 10 58 10 58 22 L54 22 C54 15 46 15 46 22 Z M34 70 L66 70 L66 96 Q66 100 62 100 L38 100 Q34 100 34 96 Z",
  billetera: "M16 44 L84 44 Q88 44 88 48 L88 92 Q88 96 84 96 L16 96 Q12 96 12 92 L12 48 Q12 44 16 44 Z M58 60 L88 60 L88 80 L58 80 Z",
  matero: "M22 50 L78 50 L80 104 L20 104 Z M36 50 C36 30 64 30 64 50 L59 50 C59 37 41 37 41 50 Z M21 70 L79 70 L79 74 L21 74 Z",
  termico: "M30 24 L70 24 L72 32 L66 108 L34 108 L28 32 Z M71 44 L80 44 Q86 44 86 50 L86 76 Q86 82 80 82 L68 82 L69 74 L78 74 L78 52 L70 52 Z M50 24 L55 6 L59 7 L54 24 Z",
  botella: "M42 12 L58 12 L58 26 Q70 32 70 44 L70 104 Q70 112 62 112 L38 112 Q30 112 30 104 L30 44 Q30 32 42 26 Z",
  valija: "M24 32 L76 32 Q82 32 82 38 L82 100 Q82 106 76 106 L24 106 Q18 106 18 100 L18 38 Q18 32 24 32 Z M42 32 L42 14 L58 14 L58 32 L54 32 L54 18 L46 18 L46 32 Z M26 106 L33 106 L33 113 L26 113 Z M67 106 L74 106 L74 113 L67 113 Z",
  necessaire: "M14 54 Q14 46 22 46 L78 46 Q86 46 86 54 L86 94 Q86 102 78 102 L22 102 Q14 102 14 94 Z M60 46 L68 37 L72 41 L65 49 Z",
};

function shapeFor(category: string, name: string) {
  const t = `${category} ${name}`.toLowerCase();
  if (t.includes("valija")) return SHAPES.valija;
  if (t.includes("necessaire") || t.includes("neceser") || t.includes("cosmet")) return SHAPES.necessaire;
  if (t.includes("riñon") || t.includes("rinon")) return SHAPES.rinonera;
  if (t.includes("mochila")) return SHAPES.mochila;
  if (t.includes("billeter") || t.includes("tarjeter") || t.includes("monedero")) return SHAPES.billetera;
  if (t.includes("matero")) return SHAPES.matero;
  if (t.includes("botella")) return SHAPES.botella;
  if (t.includes("térmic") || t.includes("termic") || t.includes("termo") || t.includes("vaso")) return SHAPES.termico;
  if (t.includes("cartera")) return SHAPES.cartera;
  return SHAPES.bolso;
}

export function ProductImage({
  product,
  index = 0,
  className,
  sizes = "md",
  showLabel = true,
  aspect = "aspect-[4/5]",
}: {
  product: Pick<Product, "images" | "name" | "category" | "swatch">;
  index?: number;
  className?: string;
  sizes?: "sm" | "md";
  showLabel?: boolean;
  aspect?: string;
}) {
  const raw = product.images[index];
  // Las fotos de ejemplo son rutas del sitio; las que cargan los dueños son data URLs.
  const src = raw?.startsWith("/") ? `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${raw}` : raw;
  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img src={src} alt={product.name} className={clsx(aspect, "w-full object-cover bg-[var(--foto)]", className)} loading="lazy" decoding="async" />
    );
  }
  const fill = product.swatch ?? "var(--linea-fuerte)";
  return (
    <div
      role="img"
      aria-label={`${product.name}, sin foto`}
      className={clsx("foto-tinte relative w-full overflow-hidden", aspect, className)}
      style={{ "--swatch": fill } as CSSProperties}
    >
      <svg viewBox="0 0 100 125" className="absolute inset-0 m-auto h-[80%] w-[80%] drop-shadow-[0_10px_14px_rgb(34_27_38/0.14)]" aria-hidden="true">
        <path d={shapeFor(product.category, product.name)} fill={fill} stroke="#241f1b" strokeOpacity="0.28" strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
      {showLabel && sizes === "md" && (
        <span className="absolute right-2 top-2 rounded-md bg-[var(--foto)]/90 px-1.5 py-0.5 text-[0.7rem] font-semibold text-[var(--foto-texto)]">Sin foto</span>
      )}
    </div>
  );
}
