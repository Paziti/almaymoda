"use client";

import { useRouter } from "next/navigation";
import { useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { toast } from "sonner";
import { CameraIcon, ImageIcon, TrashIcon, StarIcon, PlusIcon, XIcon, CircleNotchIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import type { Product, Variant } from "@/lib/types";
import { fmtCoef, fmtMoney, now, parseNumber, uid } from "@/lib/format";
import { coefSourceLabel, effectiveCoefficient, roundPrice } from "@/lib/pricing";
import { processPhoto, type PhotoStage } from "@/lib/image";
import { Button, ConfirmButton, Field, Input, Panel, PriceTag, Segmented, Select, Switch, Textarea } from "@/components/ui";
import { PageHeader, pagePad } from "./shell";

const key = (color: string, size: string) => `${color}|${size}`;

const stageText: Record<PhotoStage, string> = {
  "cargando-modelo": "Preparando la IA (la primera vez tarda un poco)",
  "quitando-fondo": "Quitando el fondo",
  componiendo: "Centrando el artículo",
};

function blank(defaultCategory: string): Product {
  const now = Date.now();
  return {
    id: uid("p"),
    code: "",
    name: "",
    description: "",
    category: defaultCategory,
    supplierId: null,
    cost: 0,
    coefficient: null,
    priceOverride: null,
    images: [],
    variants: [],
    active: true,
    featured: false,
    createdAt: now,
    updatedAt: now,
  };
}

export function ProductForm({ initial }: { initial?: Product }) {
  const router = useRouter();
  const settings = useDB((s) => s.settings);
  const suppliers = useDB((s) => s.suppliers);
  const products = useDB((s) => s.products);
  const saveProduct = useDB((s) => s.saveProduct);
  const deleteProduct = useDB((s) => s.deleteProduct);
  const updateSettings = useDB((s) => s.updateSettings);

  const isNew = !initial;
  const [p, setP] = useState<Product>(() => initial ?? blank(settings.categories[0] ?? "Sin categoría"));
  const [costText, setCostText] = useState(initial ? String(initial.cost).replace(".", ",") : "");
  const [coefText, setCoefText] = useState(initial?.coefficient ? String(initial.coefficient).replace(".", ",") : "");
  const [fixedText, setFixedText] = useState(initial?.priceOverride ? String(initial.priceOverride) : "");
  const [priceMode, setPriceMode] = useState<"auto" | "coef" | "fijo">(initial?.priceOverride ? "fijo" : initial?.coefficient ? "coef" : "auto");

  const initSizes = initial ? [...new Set(initial.variants.map((v) => v.size))] : ["Único"];
  const initColors = initial ? [...new Set(initial.variants.map((v) => v.color))] : ["Único"];
  const [sizes, setSizes] = useState<string[]>(initSizes.length ? initSizes : ["Único"]);
  const [colors, setColors] = useState<string[]>(initColors.length ? initColors : ["Único"]);
  const [stock, setStock] = useState<Record<string, number>>(() => Object.fromEntries((initial?.variants ?? []).map((v) => [key(v.color, v.size), v.stock])));
  const ids = useRef<Record<string, string>>(Object.fromEntries((initial?.variants ?? []).map((v) => [key(v.color, v.size), v.id])));
  const [newColor, setNewColor] = useState("");
  const [newSize, setNewSize] = useState("");
  const [newCategory, setNewCategory] = useState<string | null>(null);

  const [removeBg, setRemoveBg] = useState(true);
  const [busy, setBusy] = useState<{ stage: PhotoStage; pct?: number } | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const cost = parseNumber(costText) ?? 0;
  const ownCoef = parseNumber(coefText);
  const inherited = effectiveCoefficient({ coefficient: null, supplierId: p.supplierId }, suppliers, settings);
  const coef = priceMode === "coef" && ownCoef ? ownCoef : inherited.value;
  const computed = roundPrice(cost * coef, settings.rounding);
  const finalPrice = priceMode === "fijo" ? parseNumber(fixedText) ?? 0 : computed;

  const units = Object.entries(stock)
    .filter(([k]) => colors.includes(k.split("|")[0]) && sizes.includes(k.split("|")[1]))
    .reduce((a, [, v]) => a + (v || 0), 0);

  const set = <K extends keyof Product>(k: K, v: Product[K]) => setP((x) => ({ ...x, [k]: v }));

  const onFiles = async (files: FileList | null) => {
    if (!files?.length) return;
    for (const file of Array.from(files)) {
      try {
        setBusy({ stage: removeBg ? "cargando-modelo" : "componiendo" });
        const url = await processPhoto(file, { removeBackground: removeBg, background: settings.photoBackground, onStage: (stage, pct) => setBusy({ stage, pct }) });
        setP((x) => ({ ...x, images: [...x.images, url] }));
      } catch (err) {
        console.error(err);
        try {
          const url = await processPhoto(file, { removeBackground: false, background: settings.photoBackground });
          setP((x) => ({ ...x, images: [...x.images, url] }));
          toast.error("No se pudo quitar el fondo. Se guardó la foto recortada tal cual.");
        } catch {
          toast.error("No se pudo abrir esa imagen. Probá con otra (JPG o PNG).");
        }
      }
    }
    setBusy(null);
  };

  const suggestCode = () => {
    const prefix = (p.category || "AR").normalize("NFD").replace(/[^A-Za-z]/g, "").slice(0, 2).toUpperCase() || "AR";
    const nums = products.filter((x) => x.code.startsWith(prefix + "-")).map((x) => parseInt(x.code.split("-")[1] ?? "0", 10) || 0);
    const next = (nums.length ? Math.max(...nums) : 1000) + 1;
    set("code", `${prefix}-${next}`);
  };

  const save = (andNew = false) => {
    const errs: Record<string, string> = {};
    if (!p.name.trim()) errs.name = "Poné un nombre.";
    if (!p.code.trim()) errs.code = "Poné un código (o tocá Generar).";
    else if (products.some((x) => x.id !== p.id && x.code.trim().toLowerCase() === p.code.trim().toLowerCase())) errs.code = "Ya hay otro artículo con este código.";
    if (priceMode === "fijo" && !(parseNumber(fixedText) ?? 0)) errs.price = "Poné el precio fijo.";
    if (priceMode !== "fijo" && cost <= 0) errs.cost = "Poné el costo para calcular el precio.";
    setErrors(errs);
    if (Object.keys(errs).length) {
      toast.error("Revisá los campos marcados.");
      return;
    }

    const variants: Variant[] = [];
    const moves: { variantId: string; delta: number }[] = [];
    for (const c of colors) {
      for (const s of sizes) {
        const k = key(c, s);
        const id = ids.current[k] ?? uid("v");
        ids.current[k] = id;
        const qty = Math.max(0, Math.round(stock[k] ?? 0));
        variants.push({ id, size: s, color: c, stock: qty });
        const prev = initial?.variants.find((v) => v.id === id)?.stock ?? 0;
        if (qty !== prev) moves.push({ variantId: id, delta: qty - prev });
      }
    }

    const product: Product = {
      ...p,
      name: p.name.trim(),
      code: p.code.trim(),
      cost,
      coefficient: priceMode === "coef" && ownCoef ? ownCoef : null,
      priceOverride: priceMode === "fijo" ? parseNumber(fixedText) : null,
      variants,
      demo: false,
    };
    saveProduct(product, moves, isNew ? "Alta de artículo" : "Ajuste manual");
    toast.success(isNew ? "Artículo cargado" : "Cambios guardados");
    if (andNew) {
      router.replace(`/admin/productos/nuevo?r=${now()}`);
    } else {
      router.push("/admin/productos");
    }
  };

  const allSizes = useMemo(() => [...new Set([...settings.sizes, ...sizes])], [settings.sizes, sizes]);
  const categories = [...new Set([...settings.categories, p.category].filter(Boolean))];

  return (
    <div className="pb-24 lg:pb-0">
      <PageHeader title={isNew ? "Cargar artículo" : p.name || "Artículo"} back={{ href: "/admin/productos", label: "Artículos" }} />
      <div className={`${pagePad} grid gap-6 lg:grid-cols-[minmax(0,1fr)_340px]`}>
        <div className="flex min-w-0 flex-col gap-6">
          {/* Fotos */}
          <Panel className="flex flex-col gap-4 p-5">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <h2 className="font-semibold">Fotos</h2>
              <div className="w-full sm:w-80">
                <Switch checked={removeBg} onChange={setRemoveBg} label="Quitar fondo con IA" description="Recorta el artículo y lo centra sobre fondo liso" />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-5">
              {p.images.map((src, i) => (
                <div key={i} className="group relative overflow-hidden rounded-xl border border-linea">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={src} alt={`Foto ${i + 1}`} className="aspect-[4/5] w-full object-cover" />
                  {i === 0 && <span className="absolute left-1.5 top-1.5 rounded-md bg-tinta px-1.5 py-0.5 text-[0.7rem] font-semibold text-lienzo">Principal</span>}
                  <div className="absolute inset-x-0 bottom-0 flex justify-between bg-gradient-to-t from-black/60 to-transparent p-1">
                    {i > 0 ? (
                      <button type="button" aria-label="Usar como principal" title="Usar como principal" className="flex size-10 items-center justify-center rounded-lg text-white hover:bg-white/20" onClick={() => set("images", [src, ...p.images.filter((_, k) => k !== i)])}>
                        <StarIcon size={18} />
                      </button>
                    ) : (
                      <span />
                    )}
                    <button type="button" aria-label="Quitar foto" title="Quitar foto" className="flex size-10 items-center justify-center rounded-lg text-white hover:bg-white/20" onClick={() => set("images", p.images.filter((_, k) => k !== i))}>
                      <TrashIcon size={18} />
                    </button>
                  </div>
                </div>
              ))}
              {busy && (
                <div className="flex aspect-[4/5] flex-col items-center justify-center gap-2 rounded-xl border border-dashed border-acento bg-acento-suave p-2 text-center text-xs font-semibold text-acento" role="status">
                  <CircleNotchIcon size={24} className="animate-spin" />
                  {stageText[busy.stage]}
                  {busy.pct !== undefined && busy.stage === "cargando-modelo" && <span className="num">{busy.pct}%</span>}
                </div>
              )}
            </div>
            <div className="grid grid-cols-2 gap-2 sm:flex">
              <label className={clsx("inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl bg-tinta px-4 font-semibold text-lienzo hover:opacity-90", busy && "pointer-events-none opacity-50")}>
                <CameraIcon size={20} /> Sacar foto
                <input type="file" accept="image/*" capture="environment" className="sr-only" onChange={(e) => (onFiles(e.target.files), (e.target.value = ""))} disabled={!!busy} />
              </label>
              <label className={clsx("inline-flex min-h-12 cursor-pointer items-center justify-center gap-2 rounded-xl border border-linea-fuerte bg-papel px-4 font-semibold hover:bg-piedra", busy && "pointer-events-none opacity-50")}>
                <ImageIcon size={20} /> Elegir de la galería
                <input type="file" accept="image/*" multiple className="sr-only" onChange={(e) => (onFiles(e.target.files), (e.target.value = ""))} disabled={!!busy} />
              </label>
            </div>
            <p className="text-sm text-gris">La IA corre en el mismo teléfono o compu: las fotos no se mandan a ningún servicio externo.</p>
          </Panel>

          {/* Datos */}
          <Panel className="flex flex-col gap-4 p-5">
            <h2 className="font-semibold">Datos del artículo</h2>
            <Field label="Nombre" htmlFor="f-name" error={errors.name}>
              <Input id="f-name" placeholder="Ej: Jean mom tiro alto" value={p.name} onChange={(e) => set("name", e.target.value)} />
            </Field>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Código" htmlFor="f-code" error={errors.code} hint="El mismo que usa el proveedor, así la importación lo reconoce">
                <div className="flex gap-2">
                  <Input id="f-code" className="num uppercase" value={p.code} onChange={(e) => set("code", e.target.value)} />
                  <Button variant="secondary" onClick={suggestCode}>
                    Generar
                  </Button>
                </div>
              </Field>
              <Field label="Categoría" htmlFor="f-cat">
                {newCategory === null ? (
                  <Select
                    id="f-cat"
                    value={p.category}
                    onChange={(e) => {
                      if (e.target.value === "__new") setNewCategory("");
                      else set("category", e.target.value);
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                    <option value="__new">+ Nueva categoría…</option>
                  </Select>
                ) : (
                  <div className="flex gap-2">
                    <Input id="f-cat" autoFocus placeholder="Nombre de la categoría" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
                    <Button
                      variant="secondary"
                      onClick={() => {
                        const c = newCategory.trim();
                        if (c) {
                          if (!settings.categories.includes(c)) updateSettings({ categories: [...settings.categories, c] });
                          set("category", c);
                        }
                        setNewCategory(null);
                      }}
                    >
                      Listo
                    </Button>
                  </div>
                )}
              </Field>
            </div>
            <Field label="Proveedor" htmlFor="f-sup">
              <Select id="f-sup" value={p.supplierId ?? ""} onChange={(e) => set("supplierId", e.target.value || null)}>
                <option value="">Sin proveedor</option>
                {suppliers.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </Select>
            </Field>
            <Field label="Descripción" htmlFor="f-desc" hint="Material, medidas, detalles. Se muestra en la tienda.">
              <Textarea id="f-desc" rows={3} value={p.description} onChange={(e) => set("description", e.target.value)} />
            </Field>
          </Panel>

          {/* Medidas, colores y stock */}
          <Panel className="flex flex-col gap-4 p-5">
            <div className="flex flex-wrap items-baseline justify-between gap-2">
              <h2 className="font-semibold">Medidas, colores y stock</h2>
              <span className="num text-sm text-gris">{units} unidades</span>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Medidas</p>
              <div className="flex flex-wrap gap-2">
                {allSizes.map((s) => {
                  const on = sizes.includes(s);
                  return (
                    <button
                      key={s}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSizes(on ? sizes.filter((x) => x !== s) : allSizes.filter((x) => x === s || sizes.includes(x)))}
                      className={clsx("num min-h-10 min-w-11 rounded-lg border px-3 text-sm font-semibold", on ? "border-tinta bg-tinta text-lienzo" : "border-linea-fuerte bg-papel hover:bg-piedra")}
                    >
                      {s}
                    </button>
                  );
                })}
                <form
                  className="flex gap-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const s = newSize.trim();
                    if (s && !sizes.includes(s)) setSizes([...sizes, s]);
                    setNewSize("");
                  }}
                >
                  <Input aria-label="Otra medida" placeholder="Otro" className="w-20 min-h-10" value={newSize} onChange={(e) => setNewSize(e.target.value)} />
                </form>
              </div>
            </div>
            <div className="flex flex-col gap-2">
              <p className="text-sm font-semibold">Colores</p>
              <div className="flex flex-wrap items-center gap-2">
                {colors.map((c) => (
                  <span key={c} className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-piedra pl-3 text-sm font-semibold">
                    {c}
                    <button type="button" aria-label={`Quitar color ${c}`} className="flex size-10 items-center justify-center rounded-lg hover:bg-linea" onClick={() => setColors(colors.length > 1 ? colors.filter((x) => x !== c) : ["Único"])}>
                      <XIcon size={14} />
                    </button>
                  </span>
                ))}
                <form
                  className="flex gap-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const c = newColor.trim();
                    if (c && !colors.includes(c)) setColors(colors[0] === "Único" && colors.length === 1 ? [c] : [...colors, c]);
                    setNewColor("");
                  }}
                >
                  <Input aria-label="Nuevo color" placeholder="Agregar color" className="w-36 min-h-10" value={newColor} onChange={(e) => setNewColor(e.target.value)} />
                  <Button type="submit" variant="secondary" size="sm" className="min-h-10" aria-label="Agregar color">
                    <PlusIcon size={16} />
                  </Button>
                </form>
              </div>
            </div>
            {sizes.length > 0 && (
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
                        {sizes.map((s) => (
                          <td key={s}>
                            <input
                              aria-label={`Stock ${c} ${s}`}
                              inputMode="numeric"
                              className="num h-11 w-full min-w-16 rounded-lg border border-linea-fuerte bg-papel text-center font-semibold focus:border-acento focus:outline-none"
                              value={stock[key(c, s)] ?? 0}
                              onFocus={(e) => e.currentTarget.select()}
                              onChange={(e) => setStock({ ...stock, [key(c, s)]: parseInt(e.target.value.replace(/\D/g, "") || "0", 10) })}
                            />
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </Panel>
        </div>

        {/* Precio y publicación */}
        <div className="flex flex-col gap-6 lg:sticky lg:top-6 lg:self-start">
          <Panel className="flex flex-col gap-4 p-5">
            <h2 className="font-semibold">Precio</h2>
            <Field label="Costo del proveedor" htmlFor="f-cost" error={errors.cost}>
              <Input id="f-cost" inputMode="decimal" className="num" placeholder="0" value={costText} onChange={(e) => setCostText(e.target.value)} />
            </Field>
            <Segmented
              label="Cómo se calcula el precio"
              value={priceMode}
              onChange={setPriceMode}
              options={[
                { value: "auto", label: `Coef. ${coefSourceLabel[inherited.source].split(" ").pop()}` },
                { value: "coef", label: "Coef. propio" },
                { value: "fijo", label: "Precio fijo" },
              ]}
            />
            {priceMode === "coef" && (
              <Field label="Coeficiente de este artículo" htmlFor="f-coef">
                <Input id="f-coef" inputMode="decimal" className="num" placeholder={fmtCoef(inherited.value)} value={coefText} onChange={(e) => setCoefText(e.target.value)} />
              </Field>
            )}
            {priceMode === "fijo" && (
              <Field label="Precio de venta fijo" htmlFor="f-fixed" error={errors.price} hint="No cambia aunque cambie el costo">
                <Input id="f-fixed" inputMode="decimal" className="num" value={fixedText} onChange={(e) => setFixedText(e.target.value)} />
              </Field>
            )}
            <div className="flex flex-col gap-2 rounded-xl bg-piedra p-4">
              {priceMode !== "fijo" && (
                <p className="num text-sm text-gris">
                  {fmtMoney(cost)} × {fmtCoef(coef)} = {fmtMoney(cost * coef)}
                  {settings.rounding > 1 && <> → redondeado a ${settings.rounding}</>}
                </p>
              )}
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold">Precio de venta</span>
                <PriceTag value={fmtMoney(finalPrice)} tone="accent" size="lg" />
              </div>
              {cost > 0 && finalPrice > 0 && <p className="num text-sm text-gris">Ganancia por unidad {fmtMoney(finalPrice - cost)}</p>}
            </div>
          </Panel>

          <Panel className="flex flex-col gap-2 p-5">
            <h2 className="font-semibold">En la tienda</h2>
            <Switch checked={p.active} onChange={(v) => set("active", v)} label="Publicado" description="Si lo apagás, no se ve en la tienda" />
            <Switch checked={p.featured} onChange={(v) => set("featured", v)} label="Destacado" description="Aparece en la portada" />
          </Panel>

          <div className="safe-bottom fixed inset-x-0 bottom-16 z-30 flex gap-2 border-t border-linea bg-papel p-3 lg:static lg:flex-col lg:border-0 lg:bg-transparent lg:p-0">
            <Button size="lg" className="flex-1" onClick={() => save(false)} disabled={!!busy}>
              Guardar
            </Button>
            {isNew ? (
              <Button size="lg" variant="secondary" className="flex-1" onClick={() => save(true)} disabled={!!busy}>
                Guardar y cargar otro
              </Button>
            ) : (
              <ConfirmButton
                up
                size="lg"
                confirmLabel="Sí, eliminar"
                onConfirm={() => {
                  deleteProduct(p.id);
                  toast.success("Artículo eliminado");
                  router.push("/admin/productos");
                }}
              >
                <TrashIcon size={18} /> <span className="max-sm:sr-only">Eliminar</span>
              </ConfirmButton>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
