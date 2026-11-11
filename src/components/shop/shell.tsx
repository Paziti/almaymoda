"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";
import { InstagramLogoIcon, WhatsappLogoIcon, UserIcon, ShoppingBagIcon } from "@phosphor-icons/react";
import { useDB, useHydrated } from "@/lib/store";
import { useSession } from "@/lib/session";
import { useHasDemo } from "@/lib/hooks";
import { whatsappUrl } from "@/lib/share";
import { Spinner } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";

export function Wordmark({ className }: { className?: string }) {
  const name = useDB((s) => s.settings.storeName);
  return <span className={clsx("font-display italic tracking-tight", className)}>{name || "almaymoda"}</span>;
}

export function ShopShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  const pathname = usePathname();
  const cartUnits = useSession((s) => s.cart.reduce((a, l) => a + l.qty, 0));
  const settings = useDB((s) => s.settings);
  const hasDemo = useHasDemo();

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
        <div className="bg-fucsia-suave text-tinta text-sm">
          <p className="mx-auto max-w-6xl px-4 py-2 text-center">
            Estás viendo artículos de ejemplo. Se reemplazan desde el{" "}
            <Link href="/admin" className="font-semibold underline underline-offset-2">
              panel de dueños
            </Link>
            .
          </p>
        </div>
      )}
      <header className="sticky top-0 z-30 border-b border-linea bg-lienzo/95 backdrop-blur supports-[backdrop-filter]:bg-lienzo/80">
        <div className="mx-auto flex h-16 max-w-6xl items-center gap-1 px-3 sm:gap-2 sm:px-4">
          <Link href="/" className="mr-auto text-[1.7rem] leading-none sm:text-[2.1rem]" aria-label="Inicio">
            <Wordmark />
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
                  className={clsx("inline-flex min-h-11 min-w-11 items-center justify-center gap-2 rounded-xl px-2.5 text-[0.95rem] font-semibold hover:bg-malva sm:px-3", active && "bg-malva")}
                >
                  {Icon && <Icon size={20} className="sm:hidden" aria-hidden />}
                  <span className={clsx(Icon && "max-sm:sr-only")}>{n.label}</span>
                </Link>
              );
            })}
            <ThemeToggle className="hidden size-11 items-center justify-center rounded-xl hover:bg-malva sm:inline-flex" />
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

      <footer className="banda mt-24 overflow-hidden">
        <div className="mx-auto flex max-w-6xl flex-col gap-10 px-4 pb-8 pt-14">
          <div className="grid gap-8 sm:grid-cols-[1.4fr_1fr]">
            <div className="flex flex-col gap-3">
              <p className="max-w-sm text-lg">Venta por mayor. Elegí talles y cantidades en el catálogo y mandanos el pedido por WhatsApp.</p>
              {settings.address && <p className="text-gris">{settings.address}</p>}
            </div>
            <div className="flex flex-col gap-1 sm:items-end">
              {settings.instagram && (
                <a href={settings.instagram} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline">
                  <InstagramLogoIcon size={22} /> @mayorista_almaymoda
                </a>
              )}
              {settings.whatsapp && (
                <a href={whatsappUrl(settings.whatsapp, "Hola! Quería hacer una consulta.")} target="_blank" rel="noreferrer" className="inline-flex min-h-11 items-center gap-2 font-semibold underline-offset-4 hover:underline">
                  <WhatsappLogoIcon size={22} /> WhatsApp
                </a>
              )}
              <div className="flex items-center gap-2 sm:justify-end">
                <Link href="/admin" className="inline-flex min-h-11 items-center text-sm text-gris hover:text-tinta">
                  Panel de dueños
                </Link>
                <ThemeToggle className="inline-flex size-11 items-center justify-center rounded-xl text-gris hover:bg-malva sm:hidden" />
              </div>
            </div>
          </div>
          {/* Masthead: el nombre de la marca como cabecera de revista */}
          <Link href="/" aria-label="Volver al inicio" className="block border-t border-linea pt-4">
            <Wordmark className="block break-words pb-[0.12em] text-[clamp(4rem,17vw,13.5rem)] leading-[1]" />
          </Link>
        </div>
      </footer>
    </div>
  );
}
