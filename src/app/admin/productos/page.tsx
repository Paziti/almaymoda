"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon, PlusIcon, HandbagIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtMoney, normalizeText } from "@/lib/format";
import { stockLevel, totalStock } from "@/lib/pricing";
import { usePricer } from "@/lib/hooks";
import { Badge, ButtonLink, EmptyState, Input, Panel, PriceTag, Select, Spinner } from "@/components/ui";
import { ProductImage } from "@/components/product-image";
import { PageHeader, pagePad } from "@/components/admin/shell";

type Estado = "todos" | "sin" | "bajo" | "ocultos";

function Lista() {
  const params = useSearchParams();
  const products = useDB((s) => s.products);
  const suppliers = useDB((s) => s.suppliers);
  const settings = useDB((s) => s.settings);
  const pricer = usePricer();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState("");
  const [sup, setSup] = useState("");
  const [estado, setEstado] = useState<Estado>((params.get("estado") as Estado) || "todos");

  const list = useMemo(() => {
    const nq = normalizeText(q);
    return products
      .filter((p) => {
        if (cat && p.category !== cat) return false;
        if (sup && (p.supplierId ?? "") !== (sup === "-" ? "" : sup)) return false;
        const lvl = stockLevel(p, settings.lowStock);
        if (estado === "sin" && lvl !== "sin") return false;
        if (estado === "bajo" && lvl === "ok") return false;
        if (estado === "ocultos" && p.active) return false;
        if (nq && !normalizeText(`${p.name} ${p.code}`).includes(nq)) return false;
        return true;
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [products, q, cat, sup, estado, settings.lowStock]);

  const categories = [...new Set([...settings.categories, ...products.map((p) => p.category)])];

  return (
    <div>
      <PageHeader
        title="Artículos"
        description={`${products.length} en total · ${products.filter((p) => p.active).length} publicados en la tienda`}
        actions={
          <ButtonLink href="/admin/productos/nuevo" variant="accent">
            <PlusIcon size={18} weight="bold" /> Cargar artículo
          </ButtonLink>
        }
      />
      <div className={`${pagePad} flex flex-col gap-4`}>
        <div className="grid gap-3 md:grid-cols-[1fr_auto_auto_auto]">
          <div className="relative">
            <MagnifyingGlassIcon size={20} className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-gris" />
            <Input type="search" aria-label="Buscar" placeholder="Buscar por nombre o código" className="pl-11" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
          </div>
          <div className="grid grid-cols-3 gap-2 md:contents">
            <Select aria-label="Categoría" value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="">Categoría</option>
              {categories.map((c) => (
                <option key={c}>{c}</option>
              ))}
            </Select>
            <Select aria-label="Proveedor" value={sup} onChange={(e) => setSup(e.target.value)}>
              <option value="">Proveedor</option>
              {suppliers.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
              <option value="-">Sin proveedor</option>
            </Select>
            <Select aria-label="Estado" value={estado} onChange={(e) => setEstado(e.target.value as Estado)}>
              <option value="todos">Todos</option>
              <option value="bajo">Stock bajo</option>
              <option value="sin">Sin stock</option>
              <option value="ocultos">Ocultos</option>
            </Select>
          </div>
        </div>

        {products.length === 0 ? (
          <Panel>
            <EmptyState
              icon={<HandbagIcon size={40} />}
              title="Todavía no hay artículos"
              action={
                <div className="flex flex-wrap justify-center gap-2">
                  <ButtonLink href="/admin/productos/nuevo" variant="accent">
                    Cargar el primero
                  </ButtonLink>
                  <ButtonLink href="/admin/importar" variant="secondary">
                    Importar una lista
                  </ButtonLink>
                </div>
              }
            >
              Cargalos uno por uno con foto, o importá la lista de un proveedor para crearlos todos juntos.
            </EmptyState>
          </Panel>
        ) : list.length === 0 ? (
          <Panel>
            <EmptyState title="Ningún artículo coincide">Probá con otro nombre o cambiá los filtros.</EmptyState>
          </Panel>
        ) : (
          <Panel as="div" className="overflow-hidden">
            <div className="hidden grid-cols-[56px_1fr_120px_90px_110px_130px] items-center gap-4 border-b border-linea px-4 py-2.5 text-sm text-gris md:grid">
              <span />
              <span>Artículo</span>
              <span>Proveedor</span>
              <span className="text-right">Stock</span>
              <span className="text-right">Costo</span>
              <span className="text-right">Venta</span>
            </div>
            <ul className="divide-y divide-linea">
              {list.map((p) => {
                const t = totalStock(p);
                const lvl = stockLevel(p, settings.lowStock);
                return (
                  <li key={p.id}>
                    <Link href={`/admin/productos/editar?id=${p.id}`} className="grid grid-cols-[56px_1fr_auto] items-center gap-x-3 gap-y-1 px-4 py-3 hover:bg-piedra/40 md:grid-cols-[56px_1fr_120px_90px_110px_130px] md:gap-4">
                      <div className="row-span-2 overflow-hidden rounded-lg md:row-span-1">
                        <ProductImage product={p} sizes="sm" />
                      </div>
                      <div className="min-w-0">
                        <p className="flex items-center gap-2 font-semibold">
                          <span className="truncate">{p.name}</span>
                          {!p.active && <EyeSlashIcon size={16} className="shrink-0 text-gris" aria-label="Oculto en la tienda" />}
                        </p>
                        <p className="num text-sm text-gris">
                          {p.code} · {p.category}
                        </p>
                      </div>
                      <span className="hidden truncate text-sm text-gris md:block">{suppliers.find((s) => s.id === p.supplierId)?.name ?? "Sin proveedor"}</span>
                      <span className="text-right md:order-none">
                        <Badge tone={lvl === "sin" ? "peligro" : lvl === "bajo" ? "alerta" : "neutral"}>{t} u.</Badge>
                      </span>
                      <span className="num hidden text-right text-sm text-gris md:block">{fmtMoney(p.cost)}</span>
                      <span className="col-start-2 col-end-4 flex items-center justify-between gap-2 md:col-auto md:justify-end">
                        <span className="num text-sm text-gris md:hidden">Costo {fmtMoney(p.cost)}</span>
                        <PriceTag value={fmtMoney(pricer(p))} size="sm" />
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Panel>
        )}
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <Lista />
    </Suspense>
  );
}
