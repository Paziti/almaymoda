"use client";

import { useState } from "react";
import { toast } from "sonner";
import { XIcon, DownloadSimpleIcon, UploadSimpleIcon } from "@phosphor-icons/react";
import { exportDB, useDB, type DBState } from "@/lib/store";
import { fmtCoef, parseNumber, remitoNumber } from "@/lib/format";
import { downloadBlob } from "@/lib/share";
import { useHasDemo } from "@/lib/hooks";
import type { Settings } from "@/lib/types";
import { Button, ConfirmButton, Field, Input, Panel, Switch, Textarea } from "@/components/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

const PHOTO_BGS = [
  { value: "#E5DCD2", label: "Piedra (color del logo)" },
  { value: "#FFFFFF", label: "Blanco" },
  { value: "#F3EEE8", label: "Arena clara" },
  { value: "#E6ECEF", label: "Gris azulado" },
];

function ListEditor({ label, items, onChange, placeholder }: { label: string; items: string[]; onChange: (v: string[]) => void; placeholder: string }) {
  const [value, setValue] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-semibold">{label}</p>
      <div className="flex flex-wrap gap-2">
        {items.map((it) => (
          <span key={it} className="inline-flex min-h-10 items-center gap-1 rounded-lg bg-piedra pl-3 text-sm font-semibold">
            {it}
            <button type="button" aria-label={`Quitar ${it}`} className="flex size-10 items-center justify-center rounded-lg hover:bg-linea" onClick={() => onChange(items.filter((x) => x !== it))}>
              <XIcon size={14} />
            </button>
          </span>
        ))}
      </div>
      <form
        className="flex gap-2"
        onSubmit={(e) => {
          e.preventDefault();
          const v = value.trim();
          if (v && !items.includes(v)) onChange([...items, v]);
          setValue("");
        }}
      >
        <Input aria-label={`Agregar a ${label}`} placeholder={placeholder} value={value} onChange={(e) => setValue(e.target.value)} className="max-w-xs" />
        <Button type="submit" variant="secondary">
          Agregar
        </Button>
      </form>
    </div>
  );
}

export default function AjustesPage() {
  const settings = useDB((s) => s.settings);
  const updateSettings = useDB((s) => s.updateSettings);
  const clearDemo = useDB((s) => s.clearDemo);
  const loadDemo = useDB((s) => s.loadDemo);
  const resetAll = useDB((s) => s.resetAll);
  const replaceAll = useDB((s) => s.replaceAll);
  const hasDemo = useHasDemo();

  const [form, setForm] = useState<Settings>(settings);
  const [coefText, setCoefText] = useState(fmtCoef(settings.coefficient));
  const [minText, setMinText] = useState(settings.minPurchase ? String(settings.minPurchase) : "");
  const [pin2, setPin2] = useState(settings.pin);

  const set = <K extends keyof Settings>(k: K, v: Settings[K]) => setForm((f) => ({ ...f, [k]: v }));
  const text = (k: keyof Settings) => ({ value: String(form[k] ?? ""), onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => set(k, e.target.value as never) });

  const save = () => {
    const coef = parseNumber(coefText);
    if (!coef || coef <= 0) return toast.error("El coeficiente general tiene que ser mayor a 0.");
    if (pin2.length < 4) return toast.error("El PIN tiene que tener al menos 4 números.");
    updateSettings({ ...form, coefficient: coef, minPurchase: parseNumber(minText) ?? 0, pin: pin2, nextRemito: Math.max(1, Math.round(form.nextRemito)) });
    toast.success("Ajustes guardados");
  };

  const exportBackup = () => {
    const data = JSON.stringify(exportDB());
    downloadBlob(new Blob([data], { type: "application/json" }), `almaymoda-respaldo-${new Date().toISOString().slice(0, 10)}.json`);
  };

  const importBackup = async (file: File | undefined) => {
    if (!file) return;
    try {
      const db = JSON.parse(await file.text()) as DBState;
      if (!db || !Array.isArray(db.products) || !db.settings) throw new Error();
      replaceAll(db);
      setForm({ ...settings, ...db.settings });
      toast.success(`Respaldo cargado: ${db.products.length} artículos`);
    } catch {
      toast.error("Ese archivo no es un respaldo de almaymoda.");
    }
  };

  return (
    <div className="pb-24 lg:pb-0">
      <PageHeader title="Ajustes" />
      <div className={`${pagePad} grid gap-6 xl:grid-cols-2`}>
        <Panel className="flex flex-col gap-4 p-5">
          <h2 className="font-semibold">Datos del local</h2>
          <p className="-mt-2 text-sm text-gris">Salen en el remito y en el pie de la tienda.</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre de la tienda" htmlFor="s-name">
              <Input id="s-name" {...text("storeName")} />
            </Field>
            <Field label="Razón social" htmlFor="s-legal">
              <Input id="s-legal" {...text("legalName")} />
            </Field>
            <Field label="CUIT" htmlFor="s-cuit">
              <Input id="s-cuit" inputMode="numeric" {...text("cuit")} />
            </Field>
            <Field label="Teléfono" htmlFor="s-phone">
              <Input id="s-phone" type="tel" {...text("phone")} />
            </Field>
            <Field label="WhatsApp para pedidos" htmlFor="s-wa" hint="Con código de área, ej: 11 2345 6789. Acá llegan los pedidos de la tienda.">
              <Input id="s-wa" type="tel" inputMode="tel" {...text("whatsapp")} />
            </Field>
            <Field label="Email" htmlFor="s-mail">
              <Input id="s-mail" type="email" {...text("email")} />
            </Field>
            <Field label="Dirección" htmlFor="s-addr" className="sm:col-span-2">
              <Input id="s-addr" {...text("address")} />
            </Field>
            <Field label="Instagram" htmlFor="s-ig" className="sm:col-span-2">
              <Input id="s-ig" type="url" {...text("instagram")} />
            </Field>
          </div>
        </Panel>

        <div className="flex flex-col gap-6">
          <Panel className="flex flex-col gap-4 p-5">
            <h2 className="font-semibold">Venta</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Coeficiente general" htmlFor="s-coef" hint="Se usa si el artículo y el proveedor no tienen uno propio">
                <Input id="s-coef" inputMode="decimal" className="num" value={coefText} onChange={(e) => setCoefText(e.target.value)} />
              </Field>
              <Field label="Compra mínima ($)" htmlFor="s-min" hint="0 = sin mínimo">
                <Input id="s-min" inputMode="decimal" className="num" value={minText} onChange={(e) => setMinText(e.target.value)} />
              </Field>
              <Field label="Avisar stock bajo desde" htmlFor="s-low" hint="Unidades totales del artículo">
                <Input id="s-low" inputMode="numeric" className="num" value={form.lowStock} onChange={(e) => set("lowStock", parseInt(e.target.value.replace(/\D/g, "") || "0", 10))} />
              </Field>
            </div>
            <Switch checked={form.pricesRequireLogin} onChange={(v) => set("pricesRequireLogin", v)} label="Precios sólo para clientes" description="Quien no ingresó con su teléfono ve el catálogo sin precios" />
          </Panel>

          <Panel className="flex flex-col gap-4 p-5">
            <h2 className="font-semibold">Remitos</h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Punto de venta" htmlFor="s-pos">
                <Input id="s-pos" inputMode="numeric" className="num" {...text("pointOfSale")} />
              </Field>
              <Field label="Próximo número" htmlFor="s-next" hint={`Sale como ${remitoNumber(form.pointOfSale, form.nextRemito)}`}>
                <Input id="s-next" inputMode="numeric" className="num" value={form.nextRemito} onChange={(e) => set("nextRemito", parseInt(e.target.value.replace(/\D/g, "") || "1", 10))} />
              </Field>
            </div>
            <Field label="Leyenda al pie" htmlFor="s-foot">
              <Textarea id="s-foot" rows={2} {...text("remitoFooter")} />
            </Field>
          </Panel>
        </div>

        <Panel className="flex flex-col gap-5 p-5">
          <h2 className="font-semibold">Catálogo</h2>
          <ListEditor label="Categorías" items={form.categories} onChange={(v) => set("categories", v)} placeholder="Ej: Shorts" />
          <ListEditor label="Medidas disponibles" items={form.sizes} onChange={(v) => set("sizes", v)} placeholder="Ej: 1,5 L" />
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold">Fondo de las fotos recortadas por la IA</p>
            <div className="flex flex-wrap gap-2" role="radiogroup" aria-label="Fondo de las fotos">
              {PHOTO_BGS.map((b) => (
                <button
                  key={b.value}
                  type="button"
                  role="radio"
                  aria-checked={form.photoBackground === b.value}
                  onClick={() => set("photoBackground", b.value)}
                  className={`flex min-h-11 items-center gap-2 rounded-xl border px-3 text-sm font-semibold ${form.photoBackground === b.value ? "border-tinta" : "border-linea-fuerte"}`}
                >
                  <span className="size-5 rounded-full border border-linea-fuerte" style={{ background: b.value }} />
                  {b.label}
                </button>
              ))}
            </div>
          </div>
        </Panel>

        <Panel className="flex flex-col gap-4 p-5">
          <h2 className="font-semibold">Acceso al panel</h2>
          <Field label="PIN" htmlFor="s-pin" hint="Lo piden al entrar al panel desde cada dispositivo">
            <Input id="s-pin" inputMode="numeric" className="num max-w-40" value={pin2} onChange={(e) => setPin2(e.target.value.replace(/\D/g, "").slice(0, 8))} />
          </Field>
          {pin2 === "1234" && <p className="text-sm font-semibold text-alerta">Siguen con el PIN de prueba. Cámbienlo antes de compartir el link.</p>}
        </Panel>

        <Panel className="flex flex-col gap-4 p-5 xl:col-span-2" as="section">
          <h2 id="datos" className="font-semibold">
            Datos
          </h2>
          <p className="-mt-2 max-w-3xl text-sm text-gris">
            En esta versión de prueba todo se guarda en este dispositivo. Descarguen un respaldo seguido; con el respaldo pueden pasar los datos a otro teléfono o compu. En la etapa 2 los datos pasan a una base en la nube compartida.
          </p>
          <div className="flex flex-wrap gap-2">
            <Button variant="secondary" onClick={exportBackup}>
              <DownloadSimpleIcon size={18} /> Descargar respaldo
            </Button>
            <label className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-xl border border-linea-fuerte bg-papel px-4 font-semibold hover:bg-piedra">
              <UploadSimpleIcon size={18} /> Cargar respaldo
              <input type="file" accept="application/json,.json" className="sr-only" onChange={(e) => (importBackup(e.target.files?.[0]), (e.target.value = ""))} />
            </label>
            {hasDemo ? (
              <ConfirmButton confirmLabel="Sí, borrar ejemplos" onConfirm={() => (clearDemo(), toast.success("Datos de ejemplo borrados"))}>
                Borrar datos de ejemplo
              </ConfirmButton>
            ) : (
              <Button variant="ghost" onClick={() => (loadDemo(), toast.success("Datos de ejemplo cargados"))}>
                Cargar datos de ejemplo
              </Button>
            )}
            <ConfirmButton confirmLabel="Sí, borrar todo" onConfirm={() => (resetAll(), setForm(useDB.getState().settings), toast.success("Se borró todo"))}>
              Borrar todo
            </ConfirmButton>
          </div>
        </Panel>
      </div>

      <div className="safe-bottom fixed inset-x-0 bottom-16 z-30 border-t border-linea bg-papel p-3 lg:static lg:mt-6 lg:border-0 lg:bg-transparent lg:px-8">
        <Button size="lg" className="w-full lg:w-auto" onClick={save}>
          Guardar ajustes
        </Button>
      </div>
    </div>
  );
}
