"use client";

import { ArrowClockwiseIcon, InstagramLogoIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { useState } from "react";
import { reintentarCarga, useLocal, whatsappUrl } from "@/lib/tienda";
import { Button } from "@/components/comun/ui";

/**
 * Tarjetas de carga con la misma forma que las de artículo (foto 4:5, nombre y código), así la grilla
 * no salta cuando llegan los datos. El latido suave avisa que algo está por aparecer; con
 * "reducir movimiento" queda quieto (regla global de globals.css).
 */
export function GrillaCargando({ n = 4, className = "grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4" }: { n?: number; className?: string }) {
  return (
    <div className={className} role="status" aria-label="Cargando artículos">
      {Array.from({ length: n }, (_, i) => (
        <div key={i} className="flex min-w-0 flex-col gap-3" aria-hidden>
          <div className="aspect-[4/5] animate-pulse rounded-[4px] bg-[var(--foto)]" />
          <div className="h-4 w-4/5 animate-pulse rounded-[3px] bg-[var(--foto)]" />
          <div className="h-3 w-2/5 animate-pulse rounded-[3px] bg-[var(--foto)]" />
        </div>
      ))}
    </div>
  );
}

/** Ficha de artículo mientras carga: foto y bloque de texto con la misma diagramación que la real. */
export function FichaCargando() {
  return (
    <div className="mx-auto grid max-w-6xl gap-8 px-4 py-6 md:grid-cols-[1.1fr_1fr] md:gap-14" role="status" aria-label="Cargando artículo">
      <div className="flex flex-col gap-3 pt-14" aria-hidden>
        <div className="aspect-[4/5] animate-pulse rounded-[4px] bg-[var(--foto)]" />
      </div>
      <div className="flex flex-col gap-4 md:pt-28" aria-hidden>
        <div className="h-4 w-1/3 animate-pulse rounded-[3px] bg-[var(--foto)]" />
        <div className="h-12 w-4/5 animate-pulse rounded-[3px] bg-[var(--foto)]" />
        <div className="h-8 w-32 animate-pulse rounded-[3px] bg-[var(--foto)]" />
        <div className="mt-6 h-40 animate-pulse rounded-[4px] bg-[var(--foto)]" />
      </div>
    </div>
  );
}

/** La base no respondió y no hay copia guardada: se dice qué pasó, se ofrece reintentar y un canal directo. */
export function ErrorCatalogo() {
  const local = useLocal();
  const [probando, setProbando] = useState(false);
  const canal = local.whatsapp
    ? { href: whatsappUrl(local.whatsapp, "Hola! Quería ver el catálogo mayorista."), label: "Escribinos por WhatsApp", Icon: WhatsappLogoIcon }
    : local.instagram
      ? { href: local.instagram, label: "Miranos en Instagram", Icon: InstagramLogoIcon }
      : null;

  return (
    <div role="alert" className="flex flex-col items-center gap-4 px-6 py-12 text-center">
      <h3 className="font-display text-3xl">No pudimos cargar el catálogo</h3>
      <p className="max-w-md text-gris">Puede ser la conexión. Probá de nuevo en un momento.</p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button
          variant="secondary"
          loading={probando}
          onClick={async () => {
            setProbando(true);
            await reintentarCarga();
            setProbando(false);
          }}
        >
          <ArrowClockwiseIcon size={18} aria-hidden /> Reintentar
        </Button>
        {canal && (
          <a href={canal.href} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl px-4 font-semibold underline underline-offset-4 hover:opacity-80">
            <canal.Icon size={20} aria-hidden /> {canal.label}
          </a>
        )}
      </div>
    </div>
  );
}

/** Catálogo vacío de verdad: sin hablar del panel, con un canal para consultar mientras tanto. */
export function CatalogoVacio() {
  const local = useLocal();
  return (
    <div className="flex flex-col items-center gap-4 px-6 py-12 text-center">
      <h3 className="font-display text-3xl">Estamos armando el catálogo</h3>
      <p className="max-w-md text-gris">Pronto vas a ver acá los artículos con precio mayorista. Mientras tanto, consultanos.</p>
      {local.whatsapp ? (
        <a href={whatsappUrl(local.whatsapp, "Hola! Quería consultar por compra mayorista.")} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-tinta px-4 font-semibold text-lienzo hover:opacity-90">
          <WhatsappLogoIcon size={20} aria-hidden /> Escribinos por WhatsApp
        </a>
      ) : (
        local.instagram && (
          <a href={local.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-tinta px-4 font-semibold text-lienzo hover:opacity-90">
            <InstagramLogoIcon size={20} aria-hidden /> Miranos en Instagram
          </a>
        )
      )}
    </div>
  );
}
