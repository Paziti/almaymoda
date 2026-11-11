"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { normalizeText } from "@/lib/format";
import { totalStock } from "@/lib/pricing";
import { usePricer } from "@/lib/hooks";
import { Button, EmptyState, Input, Select, Spinner, Switch } from "@/components/ui";
import { ProductCard } from "@/components/shop/product-card";

type Sort = "nuevos" | "precio-asc" | "precio-desc" | "nombre";

function Catalogo() {
  const params = useSearchParams();
  const products = useDB((s) => s.products);
  const settings = useDB((s) => s.settings);
  const pricer = usePricer();

  // Los filtros viven en la URL: un link compartido o el botón "atrás" muestran lo mismo.
  const cat = params.get("cat") ?? "";
  const size = params.get("medida") ?? "";
  const onlyStock = params.get("stock") !== "todos";
  const sort = (["nuevos", "precio-asc", "precio-desc", "nombre"].includes(params.get("orden") ?? "") ? params.get("orden") : "nuevos") as Sort;
  // La búsqueda se tipea en estado local (respuesta inmediata) y se copia a la URL.
  const [q, setQState] = useState(params.get("q") ?? "");

  const setParams = (changes: Record<string, string>) => {
    // Se parte de la URL actual y no de `params`: si dos cambios llegan seguidos, el segundo no pisa al primero.
    const sp = new URLSearchParams(window.location.search);
    for (const [k, v] of Object.entries(changes)) {
      if (v) sp.set(k, v);
      else sp.delete(k);
    }
    // replaceState nativo es síncrono (router.replace no) y Next lo integra con useSearchParams.
    window.history.replaceState(null, "", `/catalogo${sp.size ? `?${sp}` : ""}`);
  };
  const setQ = (v: string) => {
    setQState(v);
    setParams({ q: v });
  };
  const setSize = (v: string) => setParams({ medida: v });
  const setSort = (v: Sort) => setParams({ orden: v === "nuevos" ? "" : v });
  const setOnlyStock = (v: boolean) => setParams({ stock: v ? "" : "todos" });

  const visible = products.filter((p) => p.active);
  const cats = settings.categories.filter((c) => visible.some((p) => p.category === c));
  const sizesAvailable = settings.sizes.filter((s) => s !== "Único" && visible.some((p) => p.variants.some((v) => v.size === s && v.stock > 0)));

  const setCat = (c: string) => setParams({ cat: c });

  const nq = normalizeText(q);
  const list = (() => {
    const out = visible.filter((p) => {
      if (cat && p.category !== cat) return false;
      if (onlyStock && totalStock(p) <= 0) return false;
      if (size && !p.variants.some((v) => v.size === size && v.stock > 0)) return false;
      if (nq && !normalizeText(`${p.name} ${p.code} ${p.category} ${p.variants.map((v) => v.color).join(" ")}`).includes(nq)) return false;
      return true;
    });
    const by: Record<Sort, (a: (typeof out)[0], b: (typeof out)[0]) => number> = {
      nuevos: (a, b) => b.createdAt - a.createdAt,
      "precio-asc": (a, b) => pricer(a) - pricer(b),
      "precio-desc": (a, b) => pricer(b) - pricer(a),
      nombre: (a, b) => a.name.localeCompare(b.name),
    };
    return out.sort(by[sort]);
  })();

  const filtered = !!(q || cat || size);

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-8 pt-8 md:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-tinta pb-4">
        <h1 className="font-display text-[clamp(3.2rem,11vw,7.5rem)] leading-[0.88] tracking-[-0.03em]">{cat || "Catálogo"}</h1>
        <p className="num pb-2 text-gris">{list.length === 1 ? "1 artículo" : `${list.length} artículos`}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <MagnifyingGlassIcon size={20} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gris" />
          <Input type="search" name="q" autoComplete="off" spellCheck={false} aria-label="Buscar artículos" placeholder="Buscar por nombre, código o color…" value={q} onChange={(e) => setQ(e.target.value)} className="pl-11" />
        </div>
        <div role="group" aria-label="Categorías" className="scroll-x sin-barra -mx-4 flex gap-x-6 px-4 pb-1">
          {["", ...cats].map((c) => (
            <button
              key={c || "todas"}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={clsx(
                "min-h-11 shrink-0 border-b-2 font-display text-2xl leading-none transition-colors",
                cat === c ? "border-tinta italic text-tinta" : "border-transparent text-gris hover:text-tinta",
              )}
            >
              {c || "Todas"}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
          {sizesAvailable.length > 0 && (
            <Select aria-label="Medida" value={size} onChange={(e) => setSize(e.target.value)} className="sm:w-44">
              <option value="">Medidas</option>
              {sizesAvailable.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </Select>
          )}
          <Select aria-label="Ordenar" value={sort} onChange={(e) => setSort(e.target.value as Sort)} className="sm:w-48">
            <option value="nuevos">Más nuevos</option>
            <option value="precio-asc">Menor precio</option>
            <option value="precio-desc">Mayor precio</option>
            <option value="nombre">Nombre A-Z</option>
          </Select>
          <div className="col-span-2 sm:ml-auto sm:w-64">
            <Switch checked={onlyStock} onChange={setOnlyStock} label="Sólo con stock" />
          </div>
        </div>
      </div>

      {list.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <EmptyState title="Todavía no hay artículos publicados">Los dueños los cargan desde el panel.</EmptyState>
      ) : (
        <EmptyState
          title="No encontramos artículos"
          action={
            filtered && (
              <Button
                variant="secondary"
                onClick={() => {
                  setQState("");
                  setParams({ q: "", medida: "", cat: "" });
                }}
              >
                <XIcon size={16} /> Quitar filtros
              </Button>
            )
          }
        >
          Probá con otra palabra o sacá algún filtro.
        </EmptyState>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <Catalogo />
    </Suspense>
  );
}
