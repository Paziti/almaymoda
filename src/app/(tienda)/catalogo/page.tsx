"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
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
  const router = useRouter();
  const products = useDB((s) => s.products);
  const settings = useDB((s) => s.settings);
  const pricer = usePricer();

  const cat = params.get("cat") ?? "";
  const [q, setQ] = useState(params.get("q") ?? "");
  const [size, setSize] = useState("");
  const [onlyStock, setOnlyStock] = useState(true);
  const [sort, setSort] = useState<Sort>("nuevos");

  const visible = products.filter((p) => p.active);
  const cats = settings.categories.filter((c) => visible.some((p) => p.category === c));
  const sizesAvailable = settings.sizes.filter((s) => visible.some((p) => p.variants.some((v) => v.size === s && v.stock > 0)));

  const setCat = (c: string) => {
    const sp = new URLSearchParams(params.toString());
    if (c) sp.set("cat", c);
    else sp.delete("cat");
    router.replace(`/catalogo${sp.size ? `?${sp}` : ""}`, { scroll: false });
  };

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
    <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-8">
      <div className="flex flex-col gap-1">
        <h1 className="font-display text-5xl">{cat || "Catálogo"}</h1>
        <p className="text-gris num">{list.length === 1 ? "1 artículo" : `${list.length} artículos`}</p>
      </div>

      <div className="flex flex-col gap-4">
        <div className="relative">
          <MagnifyingGlassIcon size={20} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gris" />
          <Input type="search" aria-label="Buscar artículos" placeholder="Buscar por nombre, código o color" value={q} onChange={(e) => setQ(e.target.value)} className="pl-11" />
        </div>
        <div role="group" aria-label="Categorías" className="scroll-x -mx-4 flex gap-2 px-4 pb-1">
          {["", ...cats].map((c) => (
            <button
              key={c || "todas"}
              type="button"
              aria-pressed={cat === c}
              onClick={() => setCat(c)}
              className={clsx("min-h-10 shrink-0 rounded-full border px-4 text-sm font-semibold transition-colors", cat === c ? "border-tinta bg-tinta text-lienzo" : "border-linea-fuerte bg-papel hover:bg-malva")}
            >
              {c || "Todas"}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center">
          <Select aria-label="Talle" value={size} onChange={(e) => setSize(e.target.value)} className="sm:w-40">
            <option value="">Todos los talles</option>
            {sizesAvailable.map((s) => (
              <option key={s} value={s}>
                Talle {s}
              </option>
            ))}
          </Select>
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
        <div className="grid grid-cols-2 gap-x-4 gap-y-8 md:grid-cols-3 lg:grid-cols-4">
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
                  setQ("");
                  setSize("");
                  setCat("");
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
