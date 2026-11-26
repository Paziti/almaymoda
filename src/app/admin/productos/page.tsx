"use client";

import Link from "next/link";
import { Suspense, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon, PlusIcon, HandbagIcon, EyeSlashIcon, TagIcon } from "@phosphor-icons/react";
import { toast } from "sonner";
import { useDB } from "@/lib/store";
import { fmtMoney, normalizeText } from "@/lib/format";
import { cleanBarcode, looksLikeBarcode, newProductHref, productSearchText } from "@/lib/barcode";
import { isOnSale, stockLevel, totalStock } from "@/lib/pricing";
import { brandOf } from "@/lib/remito-pdf";
import { useListPricer } from "@/lib/hooks";
import { Badge, Button, ButtonLink, Dialog, EmptyState, Field, Input, Panel, PriceTag, Select, Spinner } from "@/components/comun/ui";
import { ProductImage } from "@/components/comun/product-image";
import { PageHeader, pagePad } from "@/components/admin/shell";

type Estado = "todos" | "sin" | "bajo" | "ocultos" | "oferta";

function Lista() {
  const params = useSearchParams();
  const products = useDB((s) => s.products);
  const suppliers = useDB((s) => s.suppliers);
  const settings = useDB((s) => s.settings);
  const pricer = useListPricer();
  const [q, setQ] = useState(params.get("q") ?? "");
  const [cat, setCat] = useState("");
  const [sup, setSup] = useState("");
  const [estado, setEstado] = useState<Estado>((params.get("estado") as Estado) || "todos");
  const bulkUpdateProducts = useDB((s) => s.bulkUpdateProducts);
  const [brandDialog, setBrandDialog] = useState(false);
  const [brandText, setBrandText] = useState("");

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
        if (estado === "oferta" && !isOnSale(p)) return false;
        if (nq && !normalizeText(productSearchText(p)).includes(looksLikeBarcode(q) ? cleanBarcode(q) : nq)) return false;
        return true;
      })
      .sort((a, b) => b.updatedAt - a.updatedAt);
  }, [products, q, cat, sup, estado, settings.lowStock]);

  const categories = [...new Set([...settings.categories, ...products.map((p) => p.category)])];
  const knownBrands = [...new Set([...suppliers.map((s) => s.brand?.trim() ?? ""), ...products.map((p) => p.brand?.trim() ?? "")].filter(Boolean))].sort((a, b) => a.localeCompare(b, "es"));

  const applyBrand = () => {
    const brand = brandText.trim();
    bulkUpdateProducts(list.map((p) => ({ id: p.id, patch: { brand } })));
    toast.success(brand ? `Marca ${brand} en ${list.length} artículos` : `Se quitó la marca propia de ${list.length} artículos`);
    setBrandDialog(false);
  };

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
            <Input type="search" aria-label="Buscar" placeholder="Nombre, código o pistoleá el código de barras" className="pl-11" value={q} onChange={(e) => setQ(e.target.value)} autoFocus />
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
              <option value="oferta">En oferta</option>
            </Select>
          </div>
        </div>

        {list.length > 0 && (
          <div className="flex justify-end">
            <Button
              variant="secondary"
              size="sm"
              className="min-h-11"
              onClick={() => {
                setBrandText("");
                setBrandDialog(true);
              }}
            >
              <TagIcon size={18} /> Ponerles marca ({list.length})
            </Button>
          </div>
        )}

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
            {looksLikeBarcode(q) ? (
              <EmptyState
                title="Ese código de barras no está cargado"
                action={
                  <ButtonLink href={newProductHref(q)} variant="accent">
                    Cargar artículo con este código
                  </ButtonLink>
                }
              >
                Si el artículo ya existe, abrilo y pegale el código de barras.
              </EmptyState>
            ) : (
              <EmptyState title="Ningún artículo coincide">Probá con otro nombre o cambiá los filtros.</EmptyState>
            )}
          </Panel>
        ) : (
          <Panel as="div" className="overflow-hidden">
            <div className="hidden grid-cols-[56px_1fr_120px_90px_110px_130px] items-center gap-4 border-b border-linea px-4 py-2.5 text-sm text-gris md:grid">
              <span />
              <span>Artículo</span>
              <span>Proveedor / marca</span>
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
                          {isOnSale(p) && <Badge tone="acento">-{p.salePercent}%</Badge>}
                          {!p.active && <EyeSlashIcon size={16} className="shrink-0 text-gris" aria-label="Oculto en la tienda" />}
                        </p>
                        <p className="num text-sm text-gris">
                          {p.code} · {p.category}
                        </p>
                      </div>
                      <span className="hidden min-w-0 text-sm md:block">
                        <span className="block truncate text-gris">{suppliers.find((s) => s.id === p.supplierId)?.name ?? "Sin proveedor"}</span>
                        <span className="block truncate text-tinta">{brandOf(p.id, products, suppliers) || <span className="text-gris">Sin marca</span>}</span>
                      </span>
                      <span className="text-right md:order-none">
                        <Badge tone={lvl === "sin" ? "peligro" : lvl === "bajo" ? "alerta" : "neutral"}>{t} u.</Badge>
                      </span>
                      <span className="num hidden text-right text-sm text-gris md:block">{fmtMoney(p.cost)}</span>
                      <span className="col-start-2 col-end-4 flex items-center justify-between gap-2 md:col-auto md:justify-end">
                        <span className="num text-sm text-gris md:hidden">Costo {fmtMoney(p.cost)}</span>
                        <span className="flex flex-col items-end">
                          <PriceTag value={fmtMoney(pricer("mayorista", p))} size="sm" />
                          <span className="num text-xs text-gris">Min. {fmtMoney(pricer("minorista", p))}</span>
                        </span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </Panel>
        )}
      </div>

      <Dialog
        open={brandDialog}
        onClose={() => setBrandDialog(false)}
        title="Ponerles marca"
        footer={
          <>
            <Button variant="ghost" onClick={() => setBrandDialog(false)}>
              Cancelar
            </Button>
            <Button onClick={applyBrand}>{brandText.trim() ? `Aplicar a ${list.length}` : `Quitar marca propia a ${list.length}`}</Button>
          </>
        }
      >
        <form
          onSubmit={(e) => {
            e.preventDefault();
            applyBrand();
          }}
          className="flex flex-col gap-3"
        >
          <p className="text-sm text-gris">
            Se aplica a los {list.length} artículos que muestra la lista con los filtros de ahora. Es la marca que sale en el remito.
          </p>
          <Field label="Marca" htmlFor="bulk-brand" hint="Vacía = vuelven a usar la marca por defecto de su proveedor (o ninguna).">
            <Input id="bulk-brand" list="bulk-brand-list" autoComplete="off" placeholder="Ej.: Discovery" value={brandText} onChange={(e) => setBrandText(e.target.value)} autoFocus />
            <datalist id="bulk-brand-list">
              {knownBrands.map((b) => (
                <option key={b} value={b} />
              ))}
            </datalist>
          </Field>
        </form>
      </Dialog>
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
