"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import clsx from "clsx";
import { MagnifyingGlassIcon, HandbagIcon, UserIcon, ChatCircleTextIcon, ArrowElbowDownLeftIcon, type Icon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { normalizeText } from "@/lib/format";

export interface CommandPage {
  href: string;
  label: string;
  icon: Icon;
  keywords?: string;
}

interface Result {
  id: string;
  href: string;
  label: string;
  hint?: string;
  icon: Icon;
  group: string;
}

/**
 * Buscador general del panel (Ctrl/⌘ + K): secciones, artículos, clientes y pedidos.
 * Se maneja con flechas, Enter y Escape.
 */
export function CommandPalette({ open, onClose, pages }: { open: boolean; onClose: () => void; pages: CommandPage[] }) {
  const router = useRouter();
  const products = useDB((s) => s.products);
  const clients = useDB((s) => s.clients);
  const orders = useDB((s) => s.orders);
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const dialog = useRef<HTMLDialogElement>(null);
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) {
      d.showModal();
      setQ("");
      setSel(0);
      input.current?.focus();
    }
    if (!open && d.open) d.close();
  }, [open]);

  const results = useMemo<Result[]>(() => {
    const n = normalizeText(q.trim());
    const match = (t: string) => !n || normalizeText(t).includes(n);
    const out: Result[] = pages.filter((p) => match(`${p.label} ${p.keywords ?? ""}`)).map((p) => ({ id: p.href, href: p.href, label: p.label, icon: p.icon, group: "Secciones" }));
    if (n) {
      out.push(
        ...products
          .filter((p) => match(`${p.name} ${p.code} ${p.category}`))
          .slice(0, 6)
          .map((p) => ({ id: p.id, href: `/admin/productos/editar?id=${p.id}`, label: p.name, hint: p.code, icon: HandbagIcon, group: "Artículos" })),
        ...clients
          .filter((c) => match(`${c.name} ${c.business} ${c.phone} ${c.city}`))
          .slice(0, 4)
          .map((c) => ({ id: c.id, href: `/admin/clientes?c=${c.id}`, label: c.name, hint: c.business || c.city, icon: UserIcon, group: "Clientes" })),
        ...orders
          .filter((o) => match(`${o.number} ${o.customer.name} ${o.customer.business}`))
          .slice(0, 4)
          .map((o) => ({ id: o.id, href: `/admin/pedidos?id=${o.id}`, label: `Pedido N° ${o.number}`, hint: o.customer.name, icon: ChatCircleTextIcon, group: "Pedidos web" })),
      );
    }
    return out;
  }, [q, pages, products, clients, orders]);

  const go = (r: Result | undefined) => {
    if (!r) return;
    onClose();
    router.push(r.href);
  };

  return (
    <dialog
      ref={dialog}
      onClose={onClose}
      onClick={(e) => e.target === dialog.current && onClose()}
      aria-label="Buscar en el panel"
      className="mx-auto mt-[12vh] w-[calc(100%-24px)] max-w-xl overflow-hidden rounded-2xl border border-linea bg-papel p-0 text-tinta shadow-2xl"
    >
      {open && (
        <div className="flex max-h-[70vh] flex-col">
          <div className="flex items-center gap-3 border-b border-linea px-4">
            <MagnifyingGlassIcon size={20} className="shrink-0 text-gris" aria-hidden />
            <input
              ref={input}
              type="text"
              role="combobox"
              aria-expanded="true"
              aria-controls="cmd-list"
              aria-activedescendant={results[sel] ? `cmd-${results[sel].id}` : undefined}
              autoComplete="off"
              spellCheck={false}
              placeholder="Buscar artículos, clientes, pedidos o secciones…"
              className="sin-contorno h-14 min-w-0 flex-1 bg-transparent text-base placeholder:text-gris"
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setSel(0);
              }}
              onKeyDown={(e) => {
                if (e.key === "ArrowDown") {
                  e.preventDefault();
                  setSel((s) => Math.min(results.length - 1, s + 1));
                } else if (e.key === "ArrowUp") {
                  e.preventDefault();
                  setSel((s) => Math.max(0, s - 1));
                } else if (e.key === "Enter") {
                  e.preventDefault();
                  go(results[sel]);
                }
              }}
            />
            <kbd className="hidden rounded-md border border-linea px-1.5 py-0.5 text-xs text-gris sm:block">Esc</kbd>
          </div>
          <ul id="cmd-list" role="listbox" className="overflow-y-auto p-2">
            {results.length === 0 && <li className="px-3 py-8 text-center text-gris">No hay resultados para “{q}”.</li>}
            {results.map((r, i) => {
              const header = i === 0 || results[i - 1].group !== r.group;
              const Ic = r.icon;
              return (
                <li key={`${r.group}-${r.id}`} role="presentation">
                  {header && <p className="px-3 pb-1 pt-3 text-xs font-semibold text-gris">{r.group}</p>}
                  <button
                    type="button"
                    id={`cmd-${r.id}`}
                    role="option"
                    aria-selected={i === sel}
                    onMouseMove={() => setSel(i)}
                    onClick={() => go(r)}
                    className={clsx("flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left", i === sel ? "bg-piedra" : "")}
                  >
                    <Ic size={18} className="shrink-0 text-gris" aria-hidden />
                    <span className="min-w-0 flex-1 truncate font-medium">{r.label}</span>
                    {r.hint && <span className="num shrink-0 truncate text-sm text-gris">{r.hint}</span>}
                    {i === sel && <ArrowElbowDownLeftIcon size={16} className="shrink-0 text-gris" aria-hidden />}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </dialog>
  );
}
