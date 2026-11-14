import clsx from "clsx";

/*
  Logo de Alma y Moda reconstruido con tipografía a partir de su foto de perfil de Instagram:
  círculo piedra, "AM" en una Didone clara, la firma "Alma y Moda" cruzada y "MAYORISTA" abajo.
  Es una reconstrucción: cuando el cliente entregue el archivo original, reemplazarlo acá.
  Usa unidades em para escalar con font-size: el tamaño se controla desde className.
*/
export function LogoMark({ className, title = "Alma y Moda, mayorista" }: { className?: string; title?: string }) {
  return (
    <span {...(title ? { role: "img", "aria-label": title } : { "aria-hidden": true })} className={clsx("relative inline-grid aspect-square w-[1em] shrink-0 place-items-center overflow-hidden rounded-full bg-marca text-[#241f1b] select-none", className)}>
      <span aria-hidden className="col-start-1 row-start-1 -translate-y-[0.06em] font-display text-[0.62em] leading-none font-normal tracking-[-0.04em] text-white">
        AM
      </span>
      <span aria-hidden className="col-start-1 row-start-1 -rotate-[4deg] font-firma text-[0.185em] leading-none whitespace-nowrap">
        Alma y Moda
      </span>
      <span aria-hidden className="col-start-1 row-start-1 translate-y-[4.3em] pl-[0.26em] text-[0.064em] font-semibold tracking-[0.26em] text-white">
        MAYORISTA
      </span>
    </span>
  );
}

/** Firma suelta, para el pie: la parte del logo que se lee como nombre. */
export function Firma({ className, children = "Alma y Moda" }: { className?: string; children?: React.ReactNode }) {
  return <span className={clsx("font-firma leading-none", className)}>{children}</span>;
}
