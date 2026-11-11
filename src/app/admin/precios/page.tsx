"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useDB } from "@/lib/store";
import { fmtCoef, fmtMoney, parseNumber } from "@/lib/format";
import { salePrice } from "@/lib/pricing";
import type { Product, Rounding, Supplier } from "@/lib/types";
import { Button, Field, Input, Panel, Segmented, Select } from "@/components/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

type Action = "aumento" | "coef" | "quitar-coef";

export default function PreciosPage() {
  const settings = useDB((s) => s.settings);
  const suppliers = useDB((s) => s.suppliers);
  const products = useDB((s) => s.products);
  const updateSettings = useDB((s) => s.updateSettings);
  const saveSupplier = useDB((s) => s.saveSupplier);
  const bulkUpdate = useDB((s) => s.bulkUpdateProducts);

  const [globalText, setGlobalText] = useState(fmtCoef(settings.coefficient));
  const [supText, setSupText] = useState<Record<string, string>>(() => Object.fromEntries(suppliers.map((s) => [s.id, s.coefficient ? fmtCoef(s.coefficient) : ""])));

  const [scope, setScope] = useState<"todos" | "proveedor" | "categoria">("proveedor");
  const [scopeValue, setScopeValue] = useState(suppliers[0]?.id ?? "");
  const [action, setAction] = useState<Action>("aumento");
  const [valueText, setValueText] = useState("");

  const saveCoefs = () => {
    const g = parseNumber(globalText);
    if (!g || g <= 0) return toast.error("El coeficiente general tiene que ser mayor a 0.");
    updateSettings({ coefficient: g });
    suppliers.forEach((s) => {
      const v = parseNumber(supText[s.id]);
      const next = v && v > 0 ? v : null;
      if (next !== s.coefficient) saveSupplier({ ...s, coefficient: next });
    });
    toast.success("Coeficientes guardados. Los precios de venta ya están recalculados.");
  };

  const affected = useMemo(
    () =>
      products.filter((p) => {
        if (scope === "todos") return true;
        if (scope === "proveedor") return (p.supplierId ?? "") === scopeValue;
        return p.category === scopeValue;
      }),
    [products, scope, scopeValue],
  );

  const value = parseNumber(valueText);
  const patchFor = (p: Product): Partial<Product> | null => {
    if (action === "aumento") return value ? { cost: Math.round(p.cost * (1 + value / 100) * 100) / 100 } : null;
    if (action === "coef") return value && value > 0 ? { coefficient: value } : null;
    return p.coefficient ? { coefficient: null } : null;
  };

  const preview = affected
    .map((p) => {
      const patch = patchFor(p);
      if (!patch) return null;
      const next = { ...p, ...patch };
      return { p, before: salePrice(p, suppliers, settings), after: salePrice(next, suppliers, settings), fixed: !!p.priceOverride };
    })
    .filter((x): x is NonNullable<typeof x> => !!x);

  const apply = () => {
    const updates = affected.map((p) => ({ id: p.id, patch: patchFor(p) })).filter((u): u is { id: string; patch: Partial<Product> } => !!u.patch);
    bulkUpdate(updates);
    toast.success(`${updates.length} artículos actualizados`);
    setValueText("");
  };

  const scopeLabel = scope === "todos" ? "todos los artículos" : scope === "proveedor" ? suppliers.find((s) => s.id === scopeValue)?.name ?? "sin proveedor" : scopeValue;

  return (
    <div>
      <PageHeader title="Precios y coeficientes" description="El precio de venta de cada artículo es su costo por un coeficiente. Primero se usa el del artículo, si no tiene el del proveedor, y si no el general." />
      <div className={`${pagePad} grid gap-6 xl:grid-cols-2`}>
        <Panel className="flex flex-col gap-5 p-5">
          <h2 className="font-semibold">Coeficientes</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Coeficiente general" htmlFor="g-coef" hint="Ej: 1,8 = costo + 80%">
              <Input id="g-coef" inputMode="decimal" className="num" value={globalText} onChange={(e) => setGlobalText(e.target.value)} />
            </Field>
            <Field label="Redondear precios a" htmlFor="g-round">
              <Select id="g-round" value={settings.rounding} onChange={(e) => updateSettings({ rounding: Number(e.target.value) as Rounding })}>
                {[1, 10, 50, 100, 500].map((r) => (
                  <option key={r} value={r}>
                    {r === 1 ? "Sin redondeo" : `$${r} hacia arriba`}
                  </option>
                ))}
              </Select>
            </Field>
          </div>
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Por proveedor</p>
            {suppliers.length === 0 ? (
              <p className="text-sm text-gris">Cargá proveedores para poder darles un coeficiente propio.</p>
            ) : (
              <ul className="divide-y divide-linea rounded-xl border border-linea">
                {suppliers.map((s: Supplier) => (
                  <li key={s.id} className="flex items-center justify-between gap-3 px-3 py-2">
                    <label htmlFor={`sc-${s.id}`} className="min-w-0">
                      <span className="block truncate font-semibold">{s.name}</span>
                      <span className="text-sm text-gris">{products.filter((p) => p.supplierId === s.id).length} artículos</span>
                    </label>
                    <Input id={`sc-${s.id}`} inputMode="decimal" className="num w-28 text-right" placeholder={`${fmtCoef(settings.coefficient)} (gral.)`} value={supText[s.id] ?? ""} onChange={(e) => setSupText({ ...supText, [s.id]: e.target.value })} />
                  </li>
                ))}
              </ul>
            )}
            <p className="text-sm text-gris">Vacío = usa el coeficiente general.</p>
          </div>
          <Button onClick={saveCoefs} className="self-start">
            Guardar coeficientes
          </Button>
        </Panel>

        <Panel className="flex flex-col gap-5 p-5">
          <h2 className="font-semibold">Cambio en bloque</h2>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">A qué artículos</span>
            <Segmented
              label="Alcance"
              value={scope}
              onChange={(v) => {
                setScope(v);
                setScopeValue(v === "proveedor" ? suppliers[0]?.id ?? "" : v === "categoria" ? settings.categories[0] ?? "" : "");
              }}
              options={[
                { value: "proveedor", label: "Un proveedor" },
                { value: "categoria", label: "Una categoría" },
                { value: "todos", label: "Todos" },
              ]}
            />
            {scope === "proveedor" && (
              <Select aria-label="Proveedor" value={scopeValue} onChange={(e) => setScopeValue(e.target.value)}>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
                <option value="">Sin proveedor</option>
              </Select>
            )}
            {scope === "categoria" && (
              <Select aria-label="Categoría" value={scopeValue} onChange={(e) => setScopeValue(e.target.value)}>
                {[...new Set([...settings.categories, ...products.map((p) => p.category)])].map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </Select>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold">Qué hacer</span>
            <Segmented
              label="Acción"
              value={action}
              onChange={(v) => {
                setAction(v);
                setValueText("");
              }}
              options={[
                { value: "aumento", label: "Aumentar costo %" },
                { value: "coef", label: "Coeficiente propio" },
                { value: "quitar-coef", label: "Quitar coef. propio" },
              ]}
            />
            {action !== "quitar-coef" && (
              <Input
                aria-label={action === "aumento" ? "Porcentaje de aumento" : "Coeficiente"}
                inputMode="decimal"
                className="num"
                placeholder={action === "aumento" ? "Ej: 12 (o -5 para bajar)" : "Ej: 1,9"}
                value={valueText}
                onChange={(e) => setValueText(e.target.value)}
              />
            )}
          </div>

          {preview.length > 0 ? (
            <div className="flex flex-col gap-2">
              <p className="text-sm text-gris">
                Cambia el precio de <span className="font-semibold text-tinta">{preview.filter((x) => x.before !== x.after).length}</span> de {affected.length} artículos de {scopeLabel}.
              </p>
              <ul className="max-h-72 divide-y divide-linea overflow-y-auto rounded-xl border border-linea text-sm">
                {preview.slice(0, 60).map(({ p, before, after, fixed }) => (
                  <li key={p.id} className="flex items-center justify-between gap-3 px-3 py-2">
                    <span className="min-w-0 truncate">
                      <span className="num text-gris">{p.code}</span> {p.name}
                    </span>
                    <span className="num shrink-0">
                      {fixed ? (
                        <span className="text-gris">precio fijo</span>
                      ) : (
                        <>
                          <span className="text-gris">{fmtMoney(before)}</span> → <span className="font-semibold">{fmtMoney(after)}</span>
                        </>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
              <Button variant="accent" size="lg" onClick={apply}>
                Aplicar a {preview.length} artículos
              </Button>
            </div>
          ) : (
            <p className="rounded-xl bg-piedra px-4 py-3 text-sm text-gris">
              {affected.length === 0 ? `No hay artículos en ${scopeLabel}.` : action === "quitar-coef" ? "Ningún artículo de este grupo tiene coeficiente propio." : "Escribí el valor para ver cómo quedan los precios antes de aplicar."}
            </p>
          )}
        </Panel>
      </div>
    </div>
  );
}
