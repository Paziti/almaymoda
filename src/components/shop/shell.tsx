"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { InstagramLogoIcon, WhatsappLogoIcon, UserIcon, ShoppingBagIcon, MapPinIcon, ClockIcon } from "@phosphor-icons/react";
import { useDB, useHydrated } from "@/lib/store";
import { useSession } from "@/lib/session";
import { useHasDemo } from "@/lib/hooks";
import { whatsappUrl } from "@/lib/share";
import { Spinner } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoMark } from "@/components/logo";

/** Logo + nombre. Escala con el font-size del contenedor. */
export function Wordmark({ className, nameClassName }: { className?: string; nameClassName?: string }) {
  const name = useDB((s) => s.settings.storeName);
  return (
    <span className={clsx("inline-flex items-center gap-[0.35em]", className)}>
      <LogoMark className="text-[1.75em]" title="" />
      <span className={clsx("font-display tracking-tight", nameClassName)}>{name || "Alma y Moda"}</span>
    </span>
  );
}

export function ShopShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  const pathname = usePathname();
  const cart = useSession((s) => s.cart);
  const products = useDB((s) => s.products);
  // Sólo cuenta líneas cuyo artículo y variante siguen existiendo (igual que la pantalla del pedido).
  const cartUnits = cart.reduce((a, l) => (products.some((p) => p.id === l.productId && p.variants.some((v) => v.id === l.variantId)) ? a + l.qty : a), 0);
  const settings = useDB((s) => s.settings);
  const hasDemo = useHasDemo();
  // Categorías del pie: sólo las que tienen artículos publicados (nada de enlaces a páginas vacías).
  const footerCats = settings.categories.filter((c) => products.some((p) => p.active && p.category === c)).slice(0, 6);

  const nav = [
    { href: "/catalogo", label: "Catálogo" },
    { href: "/cuenta", label: "Mi cuenta", icon: UserIcon },
  ];

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#contenido" className="sr-only focus:not-sr-only focus:absolute focus:left-3 focus:top-3 focus:z-50 focus:rounded-lg focus:bg-papel focus:px-3 focus:py-2">
        Saltar al contenido
      </a>
      {hydrated && hasDemo && (
        <div className="bg-acento-suave text-tinta text-sm">
          <p className="mx-auto max-w-6xl px-4 py-2 text-center">
            Estás viendo artículos y fotos de ejemplo. Los precios y el stock son de prueba.
          </p>
        </div>
      )}
      <header className="sticky top-0 z-30 border-b border-linea bg-lienzo/95 backdrop-blur supports-[backdrop-filter]:bg-lienzo/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-1 px-3 sm:gap-2 sm:px-4">
          <Link href="/" className="mr-auto text-[1.35rem] leading-none sm:text-[1.6rem]" aria-label="Inicio, Alma y Moda">
            <Wordmark nameClassName="max-[400px]:sr-only" />
          </Link>
          <nav aria-label="Principal" className="flex items-center gap-0.5 sm:gap-1">
            {nav.map((n) => {
              const active = pathname.startsWith(n.href);
              const Icon = n.icon;
              return (
                <Link
                  key={n.href}
                  href={n.href}
                  aria-current={active ? "page" : undefined}
                  className={clsx("inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl px-2.5 text-[0.95rem] font-semibold hover:bg-piedra sm:px-3", active && "bg-piedra")}
                >
                  {Icon && <Icon size={20} className="sm:hidden" aria-hidden />}
                  <span className={clsx(Icon && "max-sm:sr-only")}>{n.label}</span>
                </Link>
              );
            })}
            <ThemeToggle className="hidden size-11 items-center justify-center rounded-xl hover:bg-piedra sm:inline-flex" />
            <Link href="/pedido" className="ml-1 inline-flex min-h-11 items-center gap-1.5 rounded-xl bg-tinta pl-2.5 pr-1.5 sm:gap-2 sm:pl-3 sm:pr-2 text-[0.95rem] font-semibold text-lienzo hover:opacity-90" aria-label={`Mi pedido, ${cartUnits} unidades`}>
              <ShoppingBagIcon size={20} aria-hidden />
              <span className="max-sm:sr-only">Pedido</span>
              <span className="num min-w-7 rounded-md bg-lienzo/15 px-1.5 py-0.5 text-center text-sm">{hydrated ? cartUnits : 0}</span>
            </Link>
          </nav>
        </div>
      </header>

      <main id="contenido" className="flex-1">
        {hydrated ? children : <Spinner label="Cargando catálogo" />}
      </main>

      <footer className="banda mt-24">
        <div className="mx-auto max-w-6xl px-4">
          <div className="grid gap-12 py-14 md:grid-cols-12 md:gap-8 md:py-16">
            {/* Marca */}
            <div className="flex flex-col items-start gap-5 md:col-span-5">
              <LogoMark className="text-[5.5rem]" title="Alma y Moda, mayorista" />
              <p className="max-w-[34ch] text-lg leading-relaxed">Mayoristas de accesorios en Bahía Blanca. Carteras, mochilas, billeteras, materos y térmicos para tu local.</p>
              {settings.whatsapp ? (
                <a href={whatsappUrl(settings.whatsapp, "Hola! Quería hacer una consulta por compra mayorista.")} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-tinta px-4 font-semibold text-lienzo transition-opacity hover:opacity-90">
                  <WhatsappLogoIcon size={20} aria-hidden /> Escribinos por WhatsApp
                </a>
              ) : (
                settings.instagram && (
                  <a href={settings.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-tinta px-4 font-semibold text-lienzo transition-opacity hover:opacity-90">
                    <InstagramLogoIcon size={20} aria-hidden /> Seguinos en Instagram
                  </a>
                )
              )}
            </div>

            {/* Enlaces reales, agrupados por lo que la clienta viene a hacer */}
            <div className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 md:col-span-7">
              {footerCats.length > 0 && (
                <nav aria-label="Categorías" className="flex flex-col gap-3">
                  <h2 className="text-sm font-semibold text-gris">Categorías</h2>
                  <ul className="flex flex-col">
                    {footerCats.map((c) => (
                      <li key={c}>
                        <Link href={`/catalogo?cat=${encodeURIComponent(c)}`} className="inline-flex min-h-10 items-center underline-offset-4 hover:underline">
                          {c}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
              <nav aria-label="Tu compra" className="flex flex-col gap-3">
                <h2 className="text-sm font-semibold text-gris">Tu compra</h2>
                <ul className="flex flex-col">
                  {[
                    ["/catalogo", "Catálogo completo"],
                    ["/#t-how", "Cómo hacer un pedido"],
                    ["/pedido", "Mi pedido"],
                    ["/cuenta", "Mi cuenta"],
                  ].map(([href, label]) => (
                    <li key={href}>
                      <Link href={href} className="inline-flex min-h-10 items-center underline-offset-4 hover:underline">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
              <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
                <h2 className="text-sm font-semibold text-gris">Contacto</h2>
                <ul className="flex flex-col">
                  {settings.whatsapp && (
                    <li>
                      <a href={whatsappUrl(settings.whatsapp, "Hola! Quería hacer una consulta.")} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 underline-offset-4 hover:underline">
                        <WhatsappLogoIcon size={18} aria-hidden /> WhatsApp
                      </a>
                    </li>
                  )}
                  {settings.instagram && (
                    <li>
                      <a href={settings.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-10 items-center gap-2 underline-offset-4 hover:underline">
                        <InstagramLogoIcon size={18} aria-hidden /> Instagram
                      </a>
                    </li>
                  )}
                  {settings.email && (
                    <li>
                      <a href={`mailto:${settings.email}`} className="inline-flex min-h-10 items-center break-all underline-offset-4 hover:underline">
                        {settings.email}
                      </a>
                    </li>
                  )}
                </ul>
                <p className="flex items-start gap-2 text-gris">
                  <MapPinIcon size={18} className="mt-0.5 shrink-0" aria-hidden />
                  <span>{settings.address || "Bahía Blanca, Buenos Aires"}</span>
                </p>
                <p className="flex items-start gap-2 text-gris">
                  <ClockIcon size={18} className="mt-0.5 shrink-0" aria-hidden />
                  <span>Lunes a viernes</span>
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 border-t border-linea py-6 text-sm text-gris sm:flex-row sm:items-center sm:justify-between">
            <p>© {new Date().getFullYear()} {settings.storeName || "Alma y Moda"}. Venta exclusiva por mayor.</p>
            <div className="flex items-center gap-2">
              <ThemeToggle className="inline-flex size-11 items-center justify-center rounded-xl hover:bg-piedra hover:text-tinta" />
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
