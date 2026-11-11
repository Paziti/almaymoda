"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import {
  HouseIcon,
  HandbagIcon,
  PackageIcon,
  FileArrowUpIcon,
  TagIcon,
  ReceiptIcon,
  UsersIcon,
  TruckIcon,
  GearIcon,
  ChatCircleTextIcon,
  StorefrontIcon,
  LockSimpleIcon,
  PlusIcon,
  ListIcon,
  MagnifyingGlassIcon,
  EyeIcon,
  EyeSlashIcon,
  ArrowSquareOutIcon,
  type Icon,
} from "@phosphor-icons/react";
import { useDB, useHydrated } from "@/lib/store";
import { adminAuth } from "@/lib/session";
import { Button, Field, Input, Spinner } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { LogoMark } from "@/components/logo";
import { CommandPalette, type CommandPage } from "@/components/admin/command";

interface NavItem {
  href: string;
  label: string;
  icon: Icon;
  exact?: boolean;
  keywords?: string;
}

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Día a día",
    items: [
      { href: "/admin", label: "Inicio", icon: HouseIcon, exact: true, keywords: "resumen hoy" },
      { href: "/admin/pedidos", label: "Pedidos web", icon: ChatCircleTextIcon, keywords: "whatsapp tienda" },
      { href: "/admin/remitos", label: "Remitos", icon: ReceiptIcon, keywords: "ventas pdf" },
    ],
  },
  {
    group: "Mercadería",
    items: [
      { href: "/admin/productos", label: "Artículos", icon: HandbagIcon, keywords: "productos catálogo fotos" },
      { href: "/admin/stock", label: "Ingreso de stock", icon: PackageIcon, keywords: "mercadería depósito" },
      { href: "/admin/importar", label: "Importar lista", icon: FileArrowUpIcon, keywords: "excel pdf access jaque" },
      { href: "/admin/precios", label: "Precios y coeficientes", icon: TagIcon, keywords: "aumento lista" },
    ],
  },
  {
    group: "Contactos",
    items: [
      { href: "/admin/clientes", label: "Clientes", icon: UsersIcon, keywords: "clientas revendedoras" },
      { href: "/admin/proveedores", label: "Proveedores", icon: TruckIcon },
      { href: "/admin/ajustes", label: "Ajustes", icon: GearIcon, keywords: "pin whatsapp datos" },
    ],
  },
];

const PAGES: CommandPage[] = [...NAV.flatMap((g) => g.items), { href: "/admin/productos/nuevo", label: "Cargar artículo", icon: PlusIcon, keywords: "nuevo producto" }, { href: "/admin/remitos/nuevo", label: "Nuevo remito", icon: ReceiptIcon }];

const isActive = (pathname: string, item: NavItem) => (item.exact ? pathname === item.href : pathname.startsWith(item.href));

/* ---------- Ingreso ---------- */

function PinGate() {
  const pin = useDB((s) => s.settings.pin);
  const name = useDB((s) => s.settings.storeName) || "Alma y Moda";
  const [value, setValue] = useState("");
  const [show, setShow] = useState(false);
  const [error, setError] = useState("");
  return (
    <div className="grid min-h-dvh lg:grid-cols-[1.05fr_1fr]">
      {/* Lado de marca (escritorio) */}
      <aside className="banda relative hidden flex-col justify-between p-12 lg:flex">
        <LogoMark className="text-[6.5rem]" title={`${name}, mayorista`} />
        <div className="flex max-w-md flex-col gap-4">
          <p className="font-display text-5xl leading-[1.05]">Pedidos, stock, precios y remitos en un solo lugar.</p>
          <p className="text-lg text-gris">El panel de los dueños de {name}.</p>
        </div>
        <p className="text-sm text-gris">Acceso sólo para el equipo.</p>
      </aside>

      {/* Formulario */}
      <main className="flex items-center justify-center px-5 py-12">
        <form
          noValidate
          className="flex w-full max-w-sm flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            if (value === pin) {
              adminAuth.unlock();
            } else {
              setError(value ? "El PIN no es correcto. Probá de nuevo." : "Escribí el PIN.");
              setValue("");
              document.getElementById("pin")?.focus();
            }
          }}
        >
          <LogoMark className="text-[4.5rem] lg:hidden" title={`${name}, mayorista`} />
          <div className="flex flex-col gap-2">
            <h1 className="font-display text-4xl leading-tight">Ingresá al panel</h1>
            <p className="text-gris">Escribí el PIN de los dueños para ver pedidos, stock y remitos.</p>
          </div>
          <Field label="PIN" htmlFor="pin" error={error} hint={pin === "1234" ? "PIN de prueba: 1234. Cambialo en Ajustes." : undefined}>
            <div className="relative">
              <Input
                id="pin"
                name="pin"
                type={show ? "text" : "password"}
                inputMode="numeric"
                autoComplete="current-password"
                aria-invalid={!!error}
                aria-describedby={error ? "pin-error" : undefined}
                className="pr-12 text-lg tracking-[0.3em]"
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
              <button type="button" onClick={() => setShow((v) => !v)} aria-label={show ? "Ocultar PIN" : "Mostrar PIN"} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-gris hover:text-tinta">
                {show ? <EyeSlashIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
          </Field>
          <Button type="submit" size="lg" className="w-full">
            Entrar
          </Button>
          <Link href="/" className="inline-flex min-h-11 items-center justify-center gap-2 text-sm text-gris hover:text-tinta">
            <StorefrontIcon size={18} aria-hidden /> Ir a la tienda
          </Link>
        </form>
      </main>
    </div>
  );
}

/* ---------- Armazón ---------- */

export function AdminShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  const pathname = usePathname();
  const unlocked = useSyncExternalStore(adminAuth.subscribe, adminAuth.isUnlocked, () => false);
  const [moreOpen, setMoreOpen] = useState(false);
  const [cmdOpen, setCmdOpen] = useState(false);
  const newOrders = useDB((s) => s.orders.filter((o) => o.status === "nuevo").length);
  const name = useDB((s) => s.settings.storeName) || "Alma y Moda";

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmdOpen((v) => !v);
      }
      if (e.key === "Escape") setMoreOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  if (!hydrated) return <Spinner label="Abriendo el panel" />;
  if (!unlocked) return <PinGate />;

  const lock = () => adminAuth.lock();

  const navLink = (item: NavItem) => {
    const active = isActive(pathname, item);
    const Ic = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMoreOpen(false)}
        aria-current={active ? "page" : undefined}
        className={clsx(
          "flex min-h-10 items-center gap-3 rounded-lg px-2.5 text-[0.925rem] transition-colors max-lg:min-h-11",
          active ? "bg-piedra font-semibold text-tinta" : "font-medium text-tinta/80 hover:bg-piedra/60 hover:text-tinta",
        )}
      >
        <Ic size={19} weight={active ? "fill" : "regular"} aria-hidden />
        <span className="flex-1">{item.label}</span>
        {item.href === "/admin/pedidos" && newOrders > 0 && (
          <span className="num min-w-5 rounded-full bg-acento px-1.5 text-center text-xs font-bold leading-5 text-sobre-acento" aria-label={`${newOrders} sin atender`}>
            {newOrders}
          </span>
        )}
      </Link>
    );
  };

  const bottom: NavItem[] = [
    { href: "/admin", label: "Inicio", icon: HouseIcon, exact: true },
    { href: "/admin/productos", label: "Artículos", icon: HandbagIcon },
    { href: "/admin/pedidos", label: "Pedidos", icon: ChatCircleTextIcon },
  ];

  const searchButton = (
    <button type="button" onClick={() => setCmdOpen(true)} className="flex h-10 w-full items-center gap-2.5 rounded-lg border border-linea bg-lienzo px-3 text-sm text-gris transition-colors hover:border-linea-fuerte hover:text-tinta">
      <MagnifyingGlassIcon size={17} aria-hidden />
      <span className="flex-1 text-left">Buscar…</span>
      <kbd className="rounded border border-linea bg-papel px-1.5 font-sans text-[0.7rem]">Ctrl K</kbd>
    </button>
  );

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[256px_1fr]">
      {/* Barra lateral (escritorio) */}
      <aside className="sticky top-0 hidden h-dvh flex-col gap-5 overflow-y-auto border-r border-linea bg-papel px-3 py-4 lg:flex">
        <Link href="/admin" className="flex items-center gap-3 rounded-lg px-1.5 py-1">
          <LogoMark className="text-[2.6rem]" title="" />
          <span className="flex min-w-0 flex-col">
            <span className="truncate font-display text-lg leading-tight">{name}</span>
            <span className="text-xs text-gris">Panel de dueños</span>
          </span>
        </Link>
        <div className="flex flex-col gap-2">
          {searchButton}
          <Link href="/admin/productos/nuevo" className="flex h-10 items-center justify-center gap-2 rounded-lg bg-acento text-sm font-semibold text-sobre-acento transition-colors hover:bg-acento-hover">
            <PlusIcon size={18} weight="bold" aria-hidden /> Cargar artículo
          </Link>
        </div>
        <nav aria-label="Panel" className="flex flex-col gap-5">
          {NAV.map((g) => (
            <div key={g.group} className="flex flex-col gap-0.5">
              <p className="px-2.5 pb-1 text-xs font-semibold text-gris">{g.group}</p>
              {g.items.map(navLink)}
            </div>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-0.5 border-t border-linea pt-3">
          <Link href="/" target="_blank" className="flex min-h-10 items-center gap-3 rounded-lg px-2.5 text-[0.925rem] font-medium text-tinta/80 hover:bg-piedra/60 hover:text-tinta">
            <StorefrontIcon size={19} aria-hidden /> <span className="flex-1">Ver la tienda</span> <ArrowSquareOutIcon size={15} className="text-gris" aria-label="(se abre en otra pestaña)" />
          </Link>
          <div className="flex items-center gap-1">
            <button type="button" onClick={lock} className="flex min-h-10 flex-1 items-center gap-3 rounded-lg px-2.5 text-left text-[0.925rem] font-medium text-tinta/80 hover:bg-piedra/60 hover:text-tinta">
              <LockSimpleIcon size={19} aria-hidden /> Bloquear panel
            </button>
            <ThemeToggle className="inline-flex size-10 items-center justify-center rounded-lg text-gris hover:bg-piedra/60 hover:text-tinta" />
          </div>
        </div>
      </aside>

      {/* Encabezado (teléfono) */}
      <header className="sticky top-0 z-30 flex h-14 items-center gap-2 border-b border-linea bg-papel/95 px-3 backdrop-blur lg:hidden">
        <Link href="/admin" className="mr-auto flex items-center gap-2.5">
          <LogoMark className="text-[2.2rem]" title="" />
          <span className="font-display text-lg leading-none">{name}</span>
        </Link>
        <button type="button" onClick={() => setCmdOpen(true)} aria-label="Buscar" className="inline-flex size-11 items-center justify-center rounded-lg hover:bg-piedra">
          <MagnifyingGlassIcon size={21} />
        </button>
        <ThemeToggle className="inline-flex size-11 items-center justify-center rounded-lg hover:bg-piedra" />
      </header>

      <main className="min-w-0 pb-28 lg:pb-12">
        <div className="mx-auto w-full max-w-[1240px]">{children}</div>
      </main>

      {/* Navegación inferior (teléfono): lo más usado + botón central de carga */}
      <nav aria-label="Panel" className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-linea bg-papel/95 backdrop-blur lg:hidden">
        <div className="mx-auto grid h-16 max-w-md grid-cols-5 items-center px-1">
          {bottom.slice(0, 2).map((item) => (
            <BottomLink key={item.href} item={item} active={isActive(pathname, item)} />
          ))}
          <Link href="/admin/productos/nuevo" aria-label="Cargar artículo" className="mx-auto flex size-12 items-center justify-center rounded-full bg-acento text-sobre-acento">
            <PlusIcon size={24} weight="bold" />
          </Link>
          <BottomLink item={bottom[2]} active={isActive(pathname, bottom[2])} badge={newOrders} />
          <button type="button" onClick={() => setMoreOpen(true)} aria-expanded={moreOpen} className="flex h-full flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold text-gris">
            <ListIcon size={22} />
            Más
          </button>
        </div>
      </nav>

      {moreOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Más secciones">
          <button type="button" aria-label="Cerrar" className="absolute inset-0 bg-tinta/40" onClick={() => setMoreOpen(false)} />
          <div className="safe-bottom absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-papel px-4 pb-4 pt-3 [overscroll-behavior:contain]">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-linea-fuerte" />
            <nav className="flex flex-col gap-4">
              {NAV.map((g) => (
                <div key={g.group} className="flex flex-col gap-0.5">
                  <p className="px-2.5 pb-1 text-xs font-semibold text-gris">{g.group}</p>
                  {g.items.map(navLink)}
                </div>
              ))}
              <div className="flex flex-col gap-0.5 border-t border-linea pt-3">
                <Link href="/" className="flex min-h-11 items-center gap-3 rounded-lg px-2.5 font-medium hover:bg-piedra">
                  <StorefrontIcon size={19} /> Ver la tienda
                </Link>
                <button type="button" onClick={lock} className="flex min-h-11 items-center gap-3 rounded-lg px-2.5 text-left font-medium hover:bg-piedra">
                  <LockSimpleIcon size={19} /> Bloquear panel
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      <CommandPalette open={cmdOpen} onClose={() => setCmdOpen(false)} pages={PAGES} />
    </div>
  );
}

function BottomLink({ item, active, badge = 0 }: { item: NavItem; active: boolean; badge?: number }) {
  const Ic = item.icon;
  return (
    <Link href={item.href} aria-current={active ? "page" : undefined} className={clsx("relative flex h-full flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold", active ? "text-tinta" : "text-gris")}>
      <Ic size={22} weight={active ? "fill" : "regular"} aria-hidden />
      {item.label}
      {badge > 0 && (
        <span className="num absolute right-[calc(50%-1.35rem)] top-2 min-w-4 rounded-full bg-acento px-1 text-center text-[0.65rem] font-bold leading-4 text-sobre-acento" aria-label={`${badge} sin atender`}>
          {badge}
        </span>
      )}
    </Link>
  );
}

/** Encabezado estándar de cada pantalla del panel. */
export function PageHeader({ title, description, actions, back }: { title: string; description?: React.ReactNode; actions?: React.ReactNode; back?: { href: string; label: string } }) {
  return (
    <div className="flex flex-col gap-3 px-4 pb-6 pt-6 md:px-10 md:pt-10">
      {back && (
        <Link href={back.href} className="w-fit text-sm font-semibold text-gris hover:text-tinta">
          ← {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div className="min-w-0">
          <h1 className="font-display text-[2.1rem] leading-tight md:text-[2.5rem]">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-gris">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export const pagePad = "px-4 md:px-10";
