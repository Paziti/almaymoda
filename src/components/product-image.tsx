"use client";

import clsx from "clsx";
import type { CSSProperties } from "react";
import type { Product } from "@/lib/types";

/* Siluetas para artículos sin foto: muestran el tipo de prenda y su color real, y se rotulan como "Sin foto". */
const SHAPES: Record<string, string> = {
  remera: "M36 22 L22 28 L12 46 L24 52 L28 44 L28 104 L72 104 L72 44 L76 52 L88 46 L78 28 L64 22 C61 30 39 30 36 22 Z",
  top: "M38 24 L38 34 C30 40 28 48 30 58 L30 102 L70 102 L70 58 C72 48 70 40 62 34 L62 24 L58 24 L56 34 C52 37 48 37 44 34 L42 24 Z",
  camisa: "M38 20 L22 27 L10 70 L22 73 L30 46 L30 106 L70 106 L70 46 L78 73 L90 70 L78 27 L62 20 L56 30 L50 26 L44 30 Z M50 30 L50 106",
  pantalon: "M30 18 L70 18 L76 108 L58 108 L51 46 L49 46 L42 108 L24 108 Z",
  vestido: "M40 18 L40 30 C34 34 34 42 36 48 L22 108 L78 108 L64 48 C66 42 66 34 60 30 L60 18 L56 18 L54 28 L46 28 L44 18 Z",
  pollera: "M32 36 L68 36 L80 100 L20 100 Z",
  buzo: "M38 20 C40 12 60 12 62 20 L80 28 L92 82 L80 84 L72 48 L72 104 L28 104 L28 48 L20 84 L8 82 L20 28 Z",
  campera: "M38 18 L20 26 L10 84 L22 86 L28 48 L28 106 L49 106 L49 26 L51 26 L51 106 L72 106 L72 48 L78 86 L90 84 L80 26 L62 18 L56 28 L44 28 Z",
};

function shapeFor(category: string) {
  const c = category.toLowerCase();
  if (c.includes("jean") || c.includes("pantal")) return SHAPES.pantalon;
  if (c.includes("vestid")) return SHAPES.vestido;
  if (c.includes("poller")) return SHAPES.pollera;
  if (c.includes("buzo")) return SHAPES.buzo;
  if (c.includes("camper") || c.includes("chaleco")) return SHAPES.campera;
  if (c.includes("camisa")) return SHAPES.camisa;
  if (c.includes("top")) return SHAPES.top;
  return SHAPES.remera;
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
  const src = product.images[index];
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
        <path d={shapeFor(product.category)} fill={fill} stroke="#221b26" strokeOpacity="0.28" strokeWidth="1.1" strokeLinejoin="round" />
      </svg>
      {showLabel && sizes === "md" && (
        <span className="absolute right-2 top-2 rounded-md bg-[var(--foto)]/90 px-1.5 py-0.5 text-[0.7rem] font-semibold text-[var(--foto-texto)]">Sin foto</span>
      )}
    </div>
  );
}
