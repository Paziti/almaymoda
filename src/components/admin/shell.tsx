"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, useSyncExternalStore } from "react";
import clsx from "clsx";
import {
  HouseIcon,
  TShirtIcon,
  PackageIcon,
  FileArrowUpIcon,
  TagIcon,
  ReceiptIcon,
  UsersIcon,
  TruckIcon,
  GearIcon,
  ChatCircleTextIcon,
  StorefrontIcon,
  SignOutIcon,
  PlusIcon,
  ListIcon,
  LockIcon,
  type Icon,
} from "@phosphor-icons/react";
import { useDB, useHydrated } from "@/lib/store";
import { adminAuth } from "@/lib/session";
import { Button, Field, Input, Spinner } from "@/components/ui";
import { ThemeToggle } from "@/components/theme-toggle";
import { Wordmark } from "@/components/shop/shell";

interface NavItem {
  href: string;
  label: string;
  icon: Icon;
  exact?: boolean;
}

const NAV: { group: string; items: NavItem[] }[] = [
  {
    group: "Día a día",
    items: [
      { href: "/admin", label: "Inicio", icon: HouseIcon, exact: true },
      { href: "/admin/pedidos", label: "Pedidos web", icon: ChatCircleTextIcon },
      { href: "/admin/remitos", label: "Remitos", icon: ReceiptIcon },
    ],
  },
  {
    group: "Mercadería",
    items: [
      { href: "/admin/productos", label: "Artículos", icon: TShirtIcon },
      { href: "/admin/stock", label: "Ingreso de stock", icon: PackageIcon },
      { href: "/admin/importar", label: "Importar lista", icon: FileArrowUpIcon },
      { href: "/admin/precios", label: "Precios y coeficientes", icon: TagIcon },
    ],
  },
  {
    group: "Contactos",
    items: [
      { href: "/admin/clientes", label: "Clientes", icon: UsersIcon },
      { href: "/admin/proveedores", label: "Proveedores", icon: TruckIcon },
      { href: "/admin/ajustes", label: "Ajustes", icon: GearIcon },
    ],
  },
];

const isActive = (pathname: string, item: NavItem) => (item.exact ? pathname === item.href : pathname.startsWith(item.href));

function PinGate() {
  const pin = useDB((s) => s.settings.pin);
  const [value, setValue] = useState("");
  const [error, setError] = useState("");
  return (
    <div className="flex min-h-dvh items-center justify-center px-4">
      <form
        className="flex w-full max-w-sm flex-col gap-5 rounded-2xl border border-linea bg-papel p-6"
        onSubmit={(e) => {
          e.preventDefault();
          if (value === pin) {
            adminAuth.unlock();
          } else {
            setError("PIN incorrecto. Probá de nuevo.");
            setValue("");
          }
        }}
      >
        <div className="flex flex-col gap-1">
          <Wordmark className="text-4xl" />
          <h1 className="flex items-center gap-2 font-semibold">
            <LockIcon size={18} /> Panel de dueños
          </h1>
        </div>
        <Field label="PIN" htmlFor="pin" error={error} hint={pin === "1234" ? "PIN de prueba: 1234. Cambialo en Ajustes." : undefined}>
          <Input id="pin" type="password" inputMode="numeric" autoComplete="current-password" autoFocus value={value} onChange={(e) => setValue(e.target.value)} />
        </Field>
        <Button type="submit" size="lg">
          Entrar
        </Button>
        <Link href="/" className="text-center text-sm text-gris hover:text-tinta">
          Volver a la tienda
        </Link>
      </form>
    </div>
  );
}

export function AdminShell({ children }: { children: React.ReactNode }) {
  const hydrated = useHydrated();
  const pathname = usePathname();
  const unlocked = useSyncExternalStore(adminAuth.subscribe, adminAuth.isUnlocked, () => false);
  const [moreOpen, setMoreOpen] = useState(false);
  const newOrders = useDB((s) => s.orders.filter((o) => o.status === "nuevo").length);
  useEffect(() => {
    if (!moreOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMoreOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [moreOpen]);

  if (!hydrated) return <Spinner label="Abriendo el panel" />;
  if (!unlocked) return <PinGate />;

  const lock = () => adminAuth.lock();

  const navLink = (item: NavItem) => {
    const active = isActive(pathname, item);
    const Icon = item.icon;
    return (
      <Link
        key={item.href}
        href={item.href}
        onClick={() => setMoreOpen(false)}
        aria-current={active ? "page" : undefined}
        className={clsx("flex min-h-11 items-center gap-3 rounded-xl px-3 font-semibold transition-colors", active ? "bg-tinta text-lienzo" : "text-tinta hover:bg-malva")}
      >
        <Icon size={20} weight={active ? "fill" : "regular"} />
        <span className="flex-1">{item.label}</span>
        {item.href === "/admin/pedidos" && newOrders > 0 && <span className={clsx("num rounded-md px-1.5 text-xs font-bold", active ? "bg-lienzo text-tinta" : "bg-fucsia text-sobre-fucsia")}>{newOrders}</span>}
      </Link>
    );
  };

  const bottom: NavItem[] = [
    { href: "/admin", label: "Inicio", icon: HouseIcon, exact: true },
    { href: "/admin/productos", label: "Artículos", icon: TShirtIcon },
    { href: "/admin/remitos", label: "Remitos", icon: ReceiptIcon },
  ];

  return (
    <div className="min-h-dvh lg:grid lg:grid-cols-[260px_1fr]">
      {/* Barra lateral (escritorio) */}
      <aside className="sticky top-0 hidden h-dvh flex-col gap-6 overflow-y-auto border-r border-linea bg-papel px-4 py-5 lg:flex">
        <div className="flex items-center justify-between px-2">
          <Link href="/admin" className="text-3xl">
            <Wordmark />
          </Link>
          <ThemeToggle />
        </div>
        <Link href="/admin/productos/nuevo" className="flex min-h-12 items-center justify-center gap-2 rounded-xl bg-fucsia font-semibold text-sobre-fucsia hover:bg-fucsia-hover">
          <PlusIcon size={20} weight="bold" /> Cargar artículo
        </Link>
        <nav aria-label="Panel" className="flex flex-col gap-5">
          {NAV.map((g) => (
            <div key={g.group} className="flex flex-col gap-1">
              <p className="px-3 pb-1 text-sm text-gris">{g.group}</p>
              {g.items.map(navLink)}
            </div>
          ))}
        </nav>
        <div className="mt-auto flex flex-col gap-1 border-t border-linea pt-4">
          <Link href="/" className="flex min-h-11 items-center gap-3 rounded-xl px-3 font-semibold hover:bg-malva">
            <StorefrontIcon size={20} /> Ver la tienda
          </Link>
          <button type="button" onClick={lock} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-left font-semibold hover:bg-malva">
            <SignOutIcon size={20} /> Bloquear panel
          </button>
        </div>
      </aside>

      {/* Encabezado (teléfono) */}
      <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-linea bg-lienzo/95 px-3 backdrop-blur lg:hidden">
        <Link href="/admin" className="px-1 text-2xl">
          <Wordmark />
        </Link>
        <div className="flex items-center">
          <ThemeToggle />
        </div>
      </header>

      <main className="min-w-0 pb-28 lg:pb-10">{children}</main>

      {/* Navegación inferior (teléfono): lo más usado + botón central de carga */}
      <nav aria-label="Panel" className="safe-bottom fixed inset-x-0 bottom-0 z-40 border-t border-linea bg-papel lg:hidden">
        <div className="mx-auto grid h-16 max-w-md grid-cols-5 items-center px-1">
          {bottom.slice(0, 2).map((item) => (
            <BottomLink key={item.href} item={item} active={isActive(pathname, item)} />
          ))}
          <Link href="/admin/productos/nuevo" aria-label="Cargar artículo" className="mx-auto flex size-13 items-center justify-center rounded-2xl bg-fucsia text-sobre-fucsia shadow-lg shadow-fucsia/25">
            <PlusIcon size={26} weight="bold" />
          </Link>
          <BottomLink item={bottom[2]} active={isActive(pathname, bottom[2])} />
          <button type="button" onClick={() => setMoreOpen(true)} aria-expanded={moreOpen} className="relative flex h-full flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold text-gris">
            <ListIcon size={22} />
            Más
            {newOrders > 0 && <span className="absolute right-4 top-2 size-2.5 rounded-full bg-fucsia" aria-label={`${newOrders} pedidos nuevos`} />}
          </button>
        </div>
      </nav>

      {moreOpen && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Más secciones">
          <button type="button" aria-label="Cerrar" className="absolute inset-0 bg-tinta/40" onClick={() => setMoreOpen(false)} />
          <div className="safe-bottom absolute inset-x-0 bottom-0 max-h-[85dvh] overflow-y-auto rounded-t-3xl bg-papel px-4 pb-4 pt-3">
            <div className="mx-auto mb-3 h-1.5 w-12 rounded-full bg-linea-fuerte" />
            <nav className="flex flex-col gap-4">
              {NAV.map((g) => (
                <div key={g.group} className="flex flex-col gap-1">
                  <p className="px-3 text-sm text-gris">{g.group}</p>
                  {g.items.map(navLink)}
                </div>
              ))}
              <div className="flex flex-col gap-1 border-t border-linea pt-3">
                <Link href="/" className="flex min-h-11 items-center gap-3 rounded-xl px-3 font-semibold hover:bg-malva">
                  <StorefrontIcon size={20} /> Ver la tienda
                </Link>
                <button type="button" onClick={lock} className="flex min-h-11 items-center gap-3 rounded-xl px-3 text-left font-semibold hover:bg-malva">
                  <SignOutIcon size={20} /> Bloquear panel
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
}

function BottomLink({ item, active }: { item: NavItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link href={item.href} aria-current={active ? "page" : undefined} className={clsx("flex h-full flex-col items-center justify-center gap-0.5 text-[0.7rem] font-semibold", active ? "text-tinta" : "text-gris")}>
      <Icon size={22} weight={active ? "fill" : "regular"} />
      {item.label}
    </Link>
  );
}

/** Encabezado estándar de cada pantalla del panel. */
export function PageHeader({ title, description, actions, back }: { title: string; description?: React.ReactNode; actions?: React.ReactNode; back?: { href: string; label: string } }) {
  return (
    <div className="flex flex-col gap-3 px-4 pb-5 pt-5 md:px-8 md:pt-8">
      {back && (
        <Link href={back.href} className="w-fit text-sm font-semibold text-gris hover:text-tinta">
          ← {back.label}
        </Link>
      )}
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="min-w-0">
          <h1 className="font-display text-4xl leading-tight md:text-[2.75rem]">{title}</h1>
          {description && <p className="mt-1 max-w-2xl text-gris">{description}</p>}
        </div>
        {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
      </div>
    </div>
  );
}

export const pagePad = "px-4 md:px-8";
