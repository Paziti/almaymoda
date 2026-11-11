"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { MagnifyingGlassIcon, PackageIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { variantLabel } from "@/lib/labels";
import { fmtDateTime, normalizeText } from "@/lib/format";
import { totalStock } from "@/lib/pricing";
import type { Product } from "@/lib/types";
import { Button, EmptyState, Input, Panel, Segmented } from "@/components/ui";
import { ProductImage } from "@/components/product-image";
import { PageHeader, pagePad } from "@/components/admin/shell";

export default function StockPage() {
  const products = useDB((s) => s.products);
  const movements = useDB((s) => s.movements);
  const saveProduct = useDB((s) => s.saveProduct);
  const [q, setQ] = useState("");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [mode, setMode] = useState<"sumar" | "contar">("sumar");
  const [values, setValues] = useState<Record<string, number>>({});
  const searchRef = useRef<HTMLInputElement>(null);

  const selected = products.find((p) => p.id === selectedId) ?? null;

  const results = useMemo(() => {
    const nq = normalizeText(q);
    if (!nq) return [];
    const exact = products.filter((p) => normalizeText(p.code) === nq);
    const rest = products.filter((p) => !exact.includes(p) && normalizeText(`${p.code} ${p.name}`).includes(nq));
    return [...exact, ...rest].slice(0, 8);
  }, [q, products]);

  const pick = (p: Product) => {
    setSelectedId(p.id);
    setValues({});
    setQ("");
  };

  const commit = () => {
    if (!selected) return;
    const moves: { variantId: string; delta: number }[] = [];
    const variants = selected.variants.map((v) => {
      const entered = values[v.id];
      if (entered === undefined) return v;
      const next = mode === "sumar" ? v.stock + entered : entered;
      if (next !== v.stock) moves.push({ variantId: v.id, delta: next - v.stock });
      return { ...v, stock: Math.max(0, next) };
    });
    if (!moves.length) {
      toast("No hay cambios para guardar.");
      return;
    }
    saveProduct({ ...selected, variants }, moves, mode === "sumar" ? "Ingreso de mercadería" : "Conteo de stock");
    const added = moves.reduce((a, m) => a + m.delta, 0);
    toast.success(`${selected.name}: ${added >= 0 ? "+" : ""}${added} unidades`);
    setSelectedId(null);
    setValues({});
    searchRef.current?.focus();
  };

  const colors = selected ? [...new Set(selected.variants.map((v) => v.color))] : [];
  const sizes = selected ? [...new Set(selected.variants.map((v) => v.size))] : [];
  const nameOf = (id: string) => products.find((p) => p.id === id);

  return (
    <div>
      <PageHeader title="Ingreso de stock" description="Buscá el artículo por código o nombre, tipeá las cantidades por color y medida y guardá. Pensado para hacerlo parado en el depósito." />
      <div className={`${pagePad} grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]`}>
        <div className="flex min-w-0 flex-col gap-4">
          <div className="relative">
            <MagnifyingGlassIcon size={20} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gris" />
            <Input
              ref={searchRef}
              type="search"
              autoFocus
              aria-label="Buscar artículo"
              placeholder="Código o nombre"
              className="min-h-13 pl-11 text-lg"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) pick(results[0]);
              }}
            />
            {results.length > 0 && (
              <ul className="absolute inset-x-0 top-full z-20 mt-1 overflow-hidden rounded-xl border border-linea bg-papel shadow-xl">
                {results.map((p) => (
                  <li key={p.id}>
                    <button type="button" onClick={() => pick(p)} className="flex w-full items-center gap-3 px-3 py-2 text-left hover:bg-piedra">
                      <div className="w-9 shrink-0 overflow-hidden rounded-md">
                        <ProductImage product={p} sizes="sm" />
                      </div>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate font-semibold">{p.name}</span>
                        <span className="num text-sm text-gris">{p.code}</span>
                      </span>
                      <span className="num text-sm text-gris">{totalStock(p)} u.</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}
            {q && results.length === 0 && (
              <p className="mt-2 text-sm text-gris">
                No hay artículos con “{q}”.{" "}
                <Link href="/admin/productos/nuevo" className="font-semibold text-acento underline">
                  Cargarlo como nuevo
                </Link>
              </p>
            )}
          </div>

          {selected ? (
            <Panel className="flex flex-col gap-4 p-5">
              <div className="flex items-center gap-3">
                <div className="w-14 shrink-0 overflow-hidden rounded-lg">
                  <ProductImage product={selected} sizes="sm" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-semibold">{selected.name}</p>
                  <p className="num text-sm text-gris">
                    {selected.code} · {totalStock(selected)} unidades hoy
                  </p>
                </div>
              </div>
              <Segmented
                label="Modo"
                value={mode}
                onChange={(m) => {
                  setMode(m);
                  setValues({});
                }}
                options={[
                  { value: "sumar", label: "Sumar lo que llegó" },
                  { value: "contar", label: "Corregir por conteo" },
                ]}
              />
              {selected.variants.length === 0 ? (
                <p className="text-gris">
                  Este artículo no tiene colores cargados.{" "}
                  <Link href={`/admin/productos/editar?id=${selected.id}`} className="font-semibold text-acento underline">
                    Agregar colores
                  </Link>
                </p>
              ) : (
                <div className="scroll-x -mx-5 px-5">
                  <table className="w-full border-separate border-spacing-1.5 text-sm">
                    <thead>
                      <tr>
                        <th className="text-left font-semibold text-gris">Color</th>
                        {sizes.map((s) => (
                          <th key={s} className="num min-w-16 text-center font-semibold text-gris">
                            {s}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {colors.map((c) => (
                        <tr key={c}>
                          <th scope="row" className="pr-2 text-left font-semibold whitespace-nowrap">
                            {c}
                          </th>
                          {sizes.map((s) => {
                            const v = selected.variants.find((x) => x.color === c && x.size === s);
                            if (!v) return <td key={s} />;
                            return (
                              <td key={s} className="align-top">
                                <input
                                  aria-label={`${mode === "sumar" ? "Sumar" : "Stock contado"} ${c} ${s}`}
                                  inputMode="numeric"
                                  placeholder={mode === "sumar" ? "+0" : String(v.stock)}
                                  className="num h-12 w-full min-w-16 rounded-lg border border-linea-fuerte bg-papel text-center text-base font-semibold placeholder:text-gris/70 focus:border-acento focus:outline-none"
                                  value={values[v.id] ?? ""}
                                  onChange={(e) => {
                                    const raw = e.target.value.replace(/\D/g, "");
                                    setValues((x) => {
                                      const n = { ...x };
                                      if (raw === "") delete n[v.id];
                                      else n[v.id] = parseInt(raw, 10);
                                      return n;
                                    });
                                  }}
                                />
                                <span className="num mt-0.5 block text-center text-xs text-gris">hay {v.stock}</span>
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="flex flex-wrap gap-2">
                <Button size="lg" onClick={commit} className="flex-1">
                  Guardar {mode === "sumar" ? "ingreso" : "conteo"}
                </Button>
                <Button size="lg" variant="ghost" onClick={() => setSelectedId(null)}>
                  Cancelar
                </Button>
              </div>
            </Panel>
          ) : (
            <Panel>
              <EmptyState icon={<PackageIcon size={40} />} title="Buscá un artículo para empezar">
                Escribí el código (o parte del nombre) y tocá Enter para abrir el primero de la lista.
              </EmptyState>
            </Panel>
          )}
        </div>

        <Panel className="flex flex-col self-start">
          <h2 className="border-b border-linea px-5 py-4 font-semibold">Últimos movimientos</h2>
          {movements.length ? (
            <ul className="max-h-[60dvh] divide-y divide-linea overflow-y-auto">
              {movements.slice(0, 40).map((m) => {
                const p = nameOf(m.productId);
                const v = p?.variants.find((x) => x.id === m.variantId);
                return (
                  <li key={m.id} className="flex items-start justify-between gap-3 px-5 py-2.5 text-sm">
                    <div className="min-w-0">
                      <p className="truncate font-semibold">{p?.name ?? "Artículo eliminado"}</p>
                      <p className="text-gris">
                        {v ? `${variantLabel(v.size, v.color)} · ` : ""}
                        {m.reason} · {fmtDateTime(m.at)}
                      </p>
                    </div>
                    <span className={`num font-semibold ${m.delta > 0 ? "text-ok" : "text-peligro"}`}>
                      {m.delta > 0 ? "+" : ""}
                      {m.delta}
                    </span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="px-5 py-8 text-sm text-gris">Acá aparece cada entrada y salida de stock: ingresos, remitos, importaciones y ajustes.</p>
          )}
        </Panel>
      </div>
    </div>
  );
}
