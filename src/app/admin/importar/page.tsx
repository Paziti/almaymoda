"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import clsx from "clsx";
import { toast } from "sonner";
import { FileArrowUpIcon, CheckCircleIcon, DownloadSimpleIcon, WarningIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtDateTime, fmtMoney, fmtNumber, parseNumber } from "@/lib/format";
import { salePrice } from "@/lib/pricing";
import { ACCEPTED, parseFile, type ParseResult } from "@/lib/import/parse";
import { buildDiff, diffToChanges, FIELD_LABELS, guessMapping, type BuildOptions, type DiffKind, type DiffRow, type FieldKey } from "@/lib/import/mapping";
import { Badge, Button, ButtonLink, Field, Input, Panel, Segmented, Select, Spinner, Switch } from "@/components/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

type Step = 1 | 2 | 3 | 4;
const rowLabel: Record<DiffKind, string> = { cambia: "Cambia", nuevo: "Nuevo", igual: "Sin cambios", error: "Con problemas" };
const STEPS = ["Archivo", "Columnas", "Revisar", "Listo"];

const kindInfo: Record<DiffKind, { label: string; tone: "acento" | "ok" | "neutral" | "peligro" }> = {
  cambia: { label: "Cambian", tone: "acento" },
  nuevo: { label: "Nuevos", tone: "ok" },
  igual: { label: "Sin cambios", tone: "neutral" },
  error: { label: "Con problemas", tone: "peligro" },
};

export default function ImportarPage() {
  const products = useDB((s) => s.products);
  const suppliers = useDB((s) => s.suppliers);
  const settings = useDB((s) => s.settings);
  const imports = useDB((s) => s.imports);
  const applyImport = useDB((s) => s.applyImport);

  const [step, setStep] = useState<Step>(1);
  const [fileName, setFileName] = useState("");
  const [parsing, setParsing] = useState(false);
  const [error, setError] = useState("");
  const [result, setResult] = useState<ParseResult | null>(null);
  const [tableIdx, setTableIdx] = useState(0);
  const [mapping, setMapping] = useState<FieldKey[]>([]);
  const [dragging, setDragging] = useState(false);
  const [opts, setOpts] = useState<BuildOptions>({ supplierId: null, updateCost: true, updateName: false, createNew: true, costAdjustPct: 0 });
  const [pctText, setPctText] = useState("");
  const [stockMode, setStockMode] = useState<"none" | "add" | "replace">("add");
  const [rows, setRows] = useState<DiffRow[]>([]);
  const [filter, setFilter] = useState<DiffKind | "todos">("todos");
  const [done, setDone] = useState<{ created: number; updated: number } | null>(null);

  const table = result?.tables[tableIdx];

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setError("");
    setParsing(true);
    setFileName(file.name);
    try {
      const r = await parseFile(file);
      if (!r.tables.length) throw new Error(r.warnings[0] ?? "No se encontraron datos en el archivo.");
      setResult(r);
      setTableIdx(0);
      setMapping(guessMapping(r.tables[0]));
      setStep(2);
    } catch (e) {
      console.error(e);
      setError((e as Error).message || "No se pudo leer el archivo.");
    } finally {
      setParsing(false);
    }
  };

  const chooseTable = (i: number) => {
    if (!result) return;
    setTableIdx(i);
    setMapping(guessMapping(result.tables[i]));
  };

  const hasStock = mapping.includes("stock");
  const canContinue = mapping.includes("code") && (mapping.includes("cost") || hasStock);

  const toReview = () => {
    if (!table) return;
    const o = { ...opts, costAdjustPct: parseNumber(pctText) ?? 0 };
    setOpts(o);
    setRows(buildDiff(table, mapping, products, o));
    setFilter("todos");
    setStep(3);
  };

  const counts = useMemo(() => {
    const c: Record<DiffKind, number> = { cambia: 0, nuevo: 0, igual: 0, error: 0 };
    rows.forEach((r) => c[r.kind]++);
    return c;
  }, [rows]);

  const selected = rows.filter((r) => r.selected && (r.kind === "nuevo" || r.kind === "cambia"));
  const shown = filter === "todos" ? rows : rows.filter((r) => r.kind === filter);

  const apply = () => {
    const changes = diffToChanges(rows, opts);
    applyImport(changes, hasStock ? stockMode : "none", {
      fileName,
      supplierId: opts.supplierId,
      created: 0,
      updated: 0,
      stockRows: changes.reduce((a, c) => a + (c.stock?.length ?? 0), 0),
    });
    const created = changes.filter((c) => !c.productId).length;
    setDone({ created, updated: changes.length - created });
    setStep(4);
    toast.success("Importación aplicada");
  };

  const reset = () => {
    setStep(1);
    setResult(null);
    setRows([]);
    setDone(null);
    setFileName("");
    setError("");
  };

  const downloadTemplate = async () => {
    const XLSX = await import("xlsx");
    const ws = XLSX.utils.aoa_to_sheet([
      ["Código", "Descripción", "Costo", "Stock", "Talle", "Color", "Categoría"],
      ["JN-4001", "Jean mom tiro alto", 14500, 10, "38", "Celeste", "Jeans"],
      ["JN-4001", "Jean mom tiro alto", 14500, 8, "40", "Celeste", "Jeans"],
      ["RM-1020", "Remera básica algodón", 4200, 24, "M", "Negro", "Remeras"],
    ]);
    ws["!cols"] = [{ wch: 12 }, { wch: 32 }, { wch: 10 }, { wch: 8 }, { wch: 8 }, { wch: 12 }, { wch: 14 }];
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Artículos");
    XLSX.writeFile(wb, "planilla-modelo-almaymoda.xlsx");
  };

  const supplierFor = (id: string | null) => suppliers.find((s) => s.id === id);

  return (
    <div>
      <PageHeader title="Importar lista" description="Subí la lista de precios o de stock tal como la manda el proveedor. Antes de cambiar nada te mostramos qué artículos son nuevos y qué precios cambian." />

      <ol className={`${pagePad} mb-6 flex gap-2`} aria-label="Pasos">
        {STEPS.map((s, i) => (
          <li key={s} aria-current={step === i + 1 ? "step" : undefined} className="flex flex-1 flex-col gap-1.5">
            <span className={clsx("h-1.5 rounded-full", step > i ? "bg-fucsia" : "bg-linea")} />
            <span className={clsx("text-xs font-semibold sm:text-sm", step === i + 1 ? "text-tinta" : "text-gris")}>{s}</span>
          </li>
        ))}
      </ol>

      <div className={`${pagePad} flex flex-col gap-6`}>
        {step === 1 && (
          <>
            <label
              onDragOver={(e) => {
                e.preventDefault();
                setDragging(true);
              }}
              onDragLeave={() => setDragging(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragging(false);
                handleFile(e.dataTransfer.files[0]);
              }}
              className={clsx(
                "flex cursor-pointer flex-col items-center gap-3 rounded-2xl border-2 border-dashed px-6 py-12 text-center transition-colors",
                dragging ? "border-fucsia bg-fucsia-suave" : "border-linea-fuerte bg-papel hover:border-fucsia",
              )}
            >
              {parsing ? (
                <Spinner label={`Leyendo ${fileName}`} />
              ) : (
                <>
                  <FileArrowUpIcon size={44} className="text-fucsia" />
                  <span className="font-display text-3xl">Elegí o arrastrá el archivo</span>
                  <span className="max-w-md text-gris">Excel (.xlsx, .xls), CSV, PDF con texto, o la base de Access de Jaque (.mdb, .accdb).</span>
                  <span className="mt-2 inline-flex min-h-11 items-center rounded-xl bg-tinta px-5 font-semibold text-lienzo">Elegir archivo</span>
                </>
              )}
              <input type="file" accept={ACCEPTED} className="sr-only" onChange={(e) => (handleFile(e.target.files?.[0]), (e.target.value = ""))} disabled={parsing} />
            </label>
            {error && (
              <p role="alert" className="flex items-start gap-2 rounded-xl bg-peligro-suave px-4 py-3 text-peligro">
                <WarningIcon size={20} className="mt-0.5 shrink-0" /> {error}
              </p>
            )}
            <div className="flex flex-wrap items-center gap-3 text-sm text-gris">
              <span>¿El proveedor no tiene una lista ordenada?</span>
              <Button variant="secondary" size="sm" onClick={downloadTemplate}>
                <DownloadSimpleIcon size={16} /> Descargar planilla modelo
              </Button>
            </div>
            {imports.length > 0 && (
              <Panel className="flex flex-col">
                <h2 className="border-b border-linea px-5 py-3 font-semibold">Importaciones anteriores</h2>
                <ul className="divide-y divide-linea text-sm">
                  {imports.slice(0, 8).map((i) => (
                    <li key={i.id} className="flex flex-wrap justify-between gap-2 px-5 py-2.5">
                      <span className="min-w-0 truncate font-semibold">{i.fileName}</span>
                      <span className="text-gris">
                        {fmtDateTime(i.at)} · {i.created} nuevos · {i.updated} actualizados{supplierFor(i.supplierId) ? ` · ${supplierFor(i.supplierId)!.name}` : ""}
                      </span>
                    </li>
                  ))}
                </ul>
              </Panel>
            )}
          </>
        )}

        {step === 2 && result && table && (
          <>
            <Panel className="flex flex-col gap-4 p-5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="font-semibold">{fileName}</h2>
                <span className="num text-sm text-gris">{fmtNumber(table.rows.length)} filas</span>
              </div>
              {result.tables.length > 1 && (
                <Field label={result.kind === "access" ? "Tabla de la base" : result.kind === "pdf" ? "Forma de leer el PDF" : "Hoja"} htmlFor="tbl" hint={result.kind === "access" ? "Las tablas que parecen de artículos aparecen primero." : undefined}>
                  <Select id="tbl" value={tableIdx} onChange={(e) => chooseTable(Number(e.target.value))}>
                    {result.tables.map((t, i) => (
                      <option key={i} value={i}>
                        {t.name}
                      </option>
                    ))}
                  </Select>
                </Field>
              )}
              <p className="text-sm text-gris">Revisá qué es cada columna. Las reconocimos por el encabezado; si alguna está mal, cambiala.</p>
              <ul className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {table.headers.map((h, c) => {
                  const samples = table.rows
                    .slice(0, 40)
                    .map((r) => r[c])
                    .filter(Boolean)
                    .slice(0, 3);
                  return (
                    <li key={c} className={clsx("flex flex-col gap-2 rounded-xl border p-3", mapping[c] !== "ignore" ? "border-fucsia bg-fucsia-suave/40" : "border-linea")}>
                      <div className="min-w-0">
                        <p className="truncate font-semibold">{h}</p>
                        <p className="truncate text-sm text-gris">{samples.join(" · ") || "vacía"}</p>
                      </div>
                      <Select
                        aria-label={`Qué es la columna ${h}`}
                        value={mapping[c]}
                        onChange={(e) => {
                          const v = e.target.value as FieldKey;
                          setMapping((m) => m.map((x, k) => (k === c ? v : v !== "ignore" && x === v ? "ignore" : x)));
                        }}
                      >
                        {(Object.keys(FIELD_LABELS) as FieldKey[]).map((k) => (
                          <option key={k} value={k}>
                            {FIELD_LABELS[k]}
                          </option>
                        ))}
                      </Select>
                    </li>
                  );
                })}
              </ul>
              {!canContinue && <p className="text-sm font-semibold text-alerta">Marcá al menos la columna de Código y la de Costo o Stock.</p>}
            </Panel>

            <Panel className="grid gap-5 p-5 md:grid-cols-2">
              <Field label="Proveedor de esta lista" htmlFor="sup" hint="Los artículos nuevos quedan asignados a este proveedor y usan su coeficiente.">
                <Select id="sup" value={opts.supplierId ?? ""} onChange={(e) => setOpts({ ...opts, supplierId: e.target.value || null })}>
                  <option value="">Sin proveedor</option>
                  {suppliers.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Ajustar el costo leído (%)" htmlFor="pct" hint="Ej: 21 si la lista viene sin IVA, o -10 si tiene un descuento.">
                <Input id="pct" inputMode="decimal" className="num" placeholder="0" value={pctText} onChange={(e) => setPctText(e.target.value)} />
              </Field>
              <div className="flex flex-col gap-1">
                <Switch checked={opts.updateCost} onChange={(v) => setOpts({ ...opts, updateCost: v })} label="Actualizar costos" description="El precio de venta se recalcula con el coeficiente" />
                <Switch checked={opts.createNew} onChange={(v) => setOpts({ ...opts, createNew: v })} label="Crear artículos nuevos" description="Quedan ocultos hasta que les pongas foto" />
                <Switch checked={opts.updateName} onChange={(v) => setOpts({ ...opts, updateName: v })} label="Pisar nombres" description="Usar la descripción del archivo en los que ya existen" />
              </div>
              {hasStock && (
                <div className="flex flex-col gap-2">
                  <span className="text-sm font-semibold">Stock del archivo</span>
                  <Segmented
                    label="Stock del archivo"
                    value={stockMode}
                    onChange={setStockMode}
                    options={[
                      { value: "add", label: "Sumar" },
                      { value: "replace", label: "Reemplazar" },
                      { value: "none", label: "No tocar" },
                    ]}
                  />
                  <p className="text-sm text-gris">
                    {stockMode === "add" ? "Para mercadería que llegó: se suma a lo que ya hay." : stockMode === "replace" ? "Para un conteo completo: el stock queda igual al del archivo." : "Sólo se actualizan precios."}
                  </p>
                </div>
              )}
            </Panel>

            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" onClick={reset}>
                Cambiar archivo
              </Button>
              <Button size="lg" disabled={!canContinue} onClick={toReview}>
                Ver los cambios
              </Button>
            </div>
          </>
        )}

        {step === 3 && (
          <>
            <div role="group" aria-label="Filtrar" className="flex flex-wrap gap-2">
              {(["todos", "cambia", "nuevo", "igual", "error"] as const).map((k) => (
                <button
                  key={k}
                  type="button"
                  aria-pressed={filter === k}
                  onClick={() => setFilter(k)}
                  className={clsx("inline-flex min-h-11 items-center gap-2 rounded-xl border px-4 font-semibold", filter === k ? "border-tinta bg-tinta text-lienzo" : "border-linea-fuerte bg-papel hover:bg-malva")}
                >
                  {k === "todos" ? "Todos" : kindInfo[k].label}
                  <span className="num text-sm opacity-80">{k === "todos" ? rows.length : counts[k]}</span>
                </button>
              ))}
            </div>

            <Panel as="div" className="overflow-hidden">
              <div className="flex items-center justify-between gap-3 border-b border-linea px-4 py-2.5 text-sm">
                <span className="text-gris">
                  <span className="num font-semibold text-tinta">{selected.length}</span> cambios seleccionados
                </span>
                <div className="flex gap-1">
                  <Button size="sm" variant="ghost" onClick={() => setRows((rs) => rs.map((r) => (shown.includes(r) && (r.kind === "nuevo" || r.kind === "cambia") ? { ...r, selected: true } : r)))}>
                    Marcar todos
                  </Button>
                  <Button size="sm" variant="ghost" onClick={() => setRows((rs) => rs.map((r) => (shown.includes(r) ? { ...r, selected: false } : r)))}>
                    Ninguno
                  </Button>
                </div>
              </div>
              {shown.length === 0 ? (
                <p className="px-5 py-8 text-gris">No hay filas en este grupo.</p>
              ) : (
                <ul className="max-h-[65dvh] divide-y divide-linea overflow-y-auto">
                  {shown.slice(0, 400).map((r) => {
                    const actionable = r.kind === "nuevo" || r.kind === "cambia";
                    const supplierId = r.product?.supplierId ?? opts.supplierId;
                    const newSale = r.cost !== null ? salePrice({ cost: r.cost, coefficient: r.product?.coefficient ?? null, supplierId, priceOverride: r.product?.priceOverride ?? null }, suppliers, settings) : null;
                    const pct = r.oldCost && r.cost !== null && r.kind === "cambia" ? ((r.cost - r.oldCost) / r.oldCost) * 100 : null;
                    return (
                      <li key={r.key}>
                        <label className={clsx("grid grid-cols-[28px_1fr] gap-x-3 gap-y-1 px-4 py-3 sm:grid-cols-[28px_1fr_auto]", actionable ? "cursor-pointer hover:bg-malva/40" : "opacity-80")}>
                          <input
                            type="checkbox"
                            className="mt-1 size-5 accent-[var(--fucsia)]"
                            disabled={!actionable}
                            checked={r.selected}
                            onChange={(e) => setRows((rs) => rs.map((x) => (x.key === r.key ? { ...x, selected: e.target.checked } : x)))}
                          />
                          <div className="min-w-0">
                            <p className="flex flex-wrap items-center gap-2">
                              <span className="num font-semibold">{r.code || "Sin código"}</span>
                              <Badge tone={kindInfo[r.kind].tone}>{r.kind === "error" ? r.error : rowLabel[r.kind]}</Badge>
                            </p>
                            <p className="truncate text-sm text-gris">{r.name}</p>
                          </div>
                          <div className="col-start-2 flex flex-wrap items-baseline gap-x-4 gap-y-1 text-sm sm:col-start-3 sm:justify-end sm:text-right">
                            {r.cost !== null && (
                              <span className="num">
                                {r.kind === "cambia" && r.oldCost !== null && r.oldCost !== r.cost && <span className="text-gris line-through">{fmtMoney(r.oldCost)}</span>} <span className="font-semibold">{fmtMoney(r.cost)}</span>
                                {pct !== null && Math.abs(pct) >= 0.1 && (
                                  <span className={clsx("ml-1 font-semibold", pct > 0 ? "text-fucsia" : "text-ok")}>
                                    {pct > 0 ? "+" : ""}
                                    {pct.toFixed(1).replace(".", ",")}%
                                  </span>
                                )}
                              </span>
                            )}
                            {newSale !== null && actionable && <span className="num text-gris">venta {fmtMoney(newSale)}</span>}
                            {r.stockTotal !== 0 && hasStock && stockMode !== "none" && (
                              <span className="num font-semibold text-ok">
                                {stockMode === "add" ? "+" : "="}
                                {r.stockTotal} u.
                              </span>
                            )}
                          </div>
                        </label>
                      </li>
                    );
                  })}
                  {shown.length > 400 && <li className="px-4 py-3 text-sm text-gris">Se muestran las primeras 400 filas de {shown.length}. Al aplicar se usan todas las marcadas.</li>}
                </ul>
              )}
            </Panel>

            <div className="flex flex-wrap gap-2">
              <Button variant="ghost" onClick={() => setStep(2)}>
                Volver a columnas
              </Button>
              <Button size="lg" variant="accent" disabled={!selected.length} onClick={apply}>
                Aplicar {selected.length} {selected.length === 1 ? "cambio" : "cambios"}
              </Button>
            </div>
          </>
        )}

        {step === 4 && done && (
          <Panel className="flex flex-col items-center gap-4 px-6 py-12 text-center">
            <CheckCircleIcon size={56} weight="duotone" className="text-ok" />
            <h2 className="font-display text-4xl">Lista importada</h2>
            <p className="text-gris">
              {done.updated} artículos actualizados y {done.created} nuevos.
              {done.created > 0 && " Los nuevos quedaron ocultos: poneles foto y talles y publicalos."}
            </p>
            <div className="flex flex-wrap justify-center gap-2">
              <ButtonLink href={done.created > 0 ? "/admin/productos?estado=ocultos" : "/admin/productos"}>{done.created > 0 ? "Ver los nuevos" : "Ver artículos"}</ButtonLink>
              <Button variant="secondary" onClick={reset}>
                Importar otra lista
              </Button>
            </div>
          </Panel>
        )}

        <p className="text-sm text-gris">
          Para cambiar precios en bloque sin archivo (por ejemplo, un aumento general del proveedor) usá{" "}
          <Link href="/admin/precios" className="font-semibold text-fucsia underline">
            Precios y coeficientes
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
