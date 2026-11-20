"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import clsx from "clsx";
import { MagnifyingGlassIcon, XIcon } from "@phosphor-icons/react";
import { useCatalogo, useEstadoCatalogo, useLocal, usePrecio, normalizeText, totalStock } from "@/lib/tienda";
import { CatalogoVacio, ErrorCatalogo, GrillaCargando } from "@/components/tienda/estado-catalogo";
import { Button, EmptyState, Input, Select, Switch } from "@/components/comun/ui";
import { ProductCard } from "@/components/tienda/product-card";

type Sort = "nuevos" | "precio-asc" | "precio-desc" | "nombre";

function Catalogo() {
  const params = useSearchParams();
  const visible = useCatalogo();
  const settings = useLocal();
  const pricer = usePrecio();
  const estado = useEstadoCatalogo();

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
  // Si sólo coinciden artículos agotados, se avisa en lugar de decir que no hay nada.
  const agotadosQueCoinciden = onlyStock && !list.length ? visible.filter((p) => totalStock(p) <= 0 && (!cat || p.category === cat) && (!nq || normalizeText(`${p.name} ${p.code} ${p.category} ${p.variants.map((v) => v.color).join(" ")}`).includes(nq))).length : 0;

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 pb-8 pt-8 md:pt-12">
      <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-2 border-b border-tinta pb-4">
        <h1 className="font-display text-[clamp(2.25rem,7vw,4rem)] leading-[0.95] tracking-[-0.02em]">{cat || "Catálogo"}</h1>
        {estado === "listo" && visible.length > 0 && <p className="num pb-2 text-gris">{list.length === 1 ? "1 artículo" : `${list.length} artículos`}</p>}
      </div>

      {/* Sin artículos publicados, buscador y filtros no tienen nada que filtrar */}
      {estado !== "error" && !(estado === "listo" && visible.length === 0) && (
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
                "min-h-11 shrink-0 border-b-2 font-semibold transition-colors",
                cat === c ? "border-acento text-tinta" : "border-transparent text-gris hover:text-tinta",
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
      )}

      {estado === "cargando" ? (
        <GrillaCargando n={8} />
      ) : estado === "error" ? (
        <ErrorCatalogo />
      ) : list.length ? (
        <div className="grid grid-cols-2 gap-x-4 gap-y-10 md:grid-cols-3 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : visible.length === 0 ? (
        <CatalogoVacio />
      ) : agotadosQueCoinciden > 0 ? (
        <EmptyState
          title={agotadosQueCoinciden === 1 ? "Hay 1 artículo, pero está agotado" : `Hay ${agotadosQueCoinciden} artículos, pero están agotados`}
          action={
            <Button variant="secondary" onClick={() => setOnlyStock(false)}>
              Mostrar los agotados
            </Button>
          }
        >
          Podés verlos igual y consultarnos cuándo vuelven.
        </EmptyState>
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
    <Suspense fallback={<GrillaCargando n={8} className="mx-auto grid max-w-6xl grid-cols-2 gap-x-4 gap-y-10 px-4 pt-32 md:grid-cols-3 lg:grid-cols-4" />}>
      <Catalogo />
    </Suspense>
  );
}
