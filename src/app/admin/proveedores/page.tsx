"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { PlusIcon, TruckIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtCoef, fmtDoc, parseNumber, uid } from "@/lib/format";
import { totalStock } from "@/lib/pricing";
import { whatsappUrl } from "@/lib/share";
import type { DocType, Supplier, TaxCategory } from "@/lib/types";
import { Button, ConfirmButton, Dialog, EmptyState, Field, Input, Panel, Select, Textarea, buttonClass } from "@/components/comun/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

const TAX_CATEGORIES: Exclude<TaxCategory, "">[] = ["Responsable Inscripto", "Monotributista", "Exento", "Consumidor Final"];
const DOC_LENGTH: Record<DocType, string> = { CUIT: "11 números", DNI: "7 u 8 números" };

const withDefaults = (s: Supplier): Supplier => ({
  legalName: "",
  address: "",
  city: "",
  postalCode: "",
  taxCategory: "",
  docType: "CUIT",
  docNumber: "",
  ...s,
});

const blank = (): Supplier => withDefaults({ id: uid("s"), name: "", contact: "", phone: "", email: "", coefficient: null, notes: "" });

/** Bloque del formulario con título chico y una línea arriba que lo separa del anterior. */
function FormSection({ title, first, children }: { title: string; first?: boolean; children: React.ReactNode }) {
  return (
    <section className={first ? "" : "border-t border-linea pt-5"}>
      <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.12em] text-gris">{title}</h3>
      <div className="grid gap-4 sm:grid-cols-6">{children}</div>
    </section>
  );
}

function docError(type: DocType, digits: string) {
  if (!digits) return "";
  if (type === "CUIT" && digits.length !== 11) return "El CUIT tiene 11 números.";
  if (type === "DNI" && (digits.length < 7 || digits.length > 8)) return "El DNI tiene 7 u 8 números.";
  return "";
}

export default function ProveedoresPage() {
  const suppliers = useDB((s) => s.suppliers);
  const products = useDB((s) => s.products);
  const general = useDB((s) => s.settings.coefficient);
  const saveSupplier = useDB((s) => s.saveSupplier);
  const deleteSupplier = useDB((s) => s.deleteSupplier);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [coefText, setCoefText] = useState("");
  const [error, setError] = useState("");
  const [docErr, setDocErr] = useState("");

  const open = (s: Supplier) => {
    setEditing(withDefaults(s));
    setDocErr("");
    setCoefText(s.coefficient ? fmtCoef(s.coefficient) : "");
    setError("");
  };

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) return setError("Poné el nombre.");
    const dErr = docError(editing.docType ?? "CUIT", editing.docNumber ?? "");
    setDocErr(dErr);
    if (dErr) return;
    const c = parseNumber(coefText);
    const trim = (v?: string) => (v ?? "").trim();
    saveSupplier({
      ...editing,
      name: editing.name.trim(),
      legalName: trim(editing.legalName),
      address: trim(editing.address),
      city: trim(editing.city),
      postalCode: trim(editing.postalCode),
      coefficient: c && c > 0 ? c : null,
      demo: false,
    });
    toast.success("Proveedor guardado");
    setEditing(null);
  };

  const f = (k: keyof Supplier) => ({
    value: String(editing?.[k] ?? ""),
    onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setEditing((s) => (s ? { ...s, [k]: e.target.value } : s)),
  });

  const exists = editing && suppliers.some((s) => s.id === editing.id);

  return (
    <div>
      <PageHeader
        title="Proveedores"
        description="Cada proveedor puede tener su coeficiente. Al importar su lista, los artículos nuevos quedan asignados a él."
        actions={
          <Button variant="accent" onClick={() => open(blank())}>
            <PlusIcon size={18} weight="bold" /> Nuevo proveedor
          </Button>
        }
      />
      <div className={pagePad}>
        {suppliers.length === 0 ? (
          <Panel>
            <EmptyState icon={<TruckIcon size={40} />} title="Todavía no hay proveedores" action={<Button onClick={() => open(blank())}>Cargar un proveedor</Button>}>
              Cargalos para poder darles un coeficiente y filtrar artículos por proveedor.
            </EmptyState>
          </Panel>
        ) : (
          <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
            {suppliers.map((s) => {
              const items = products.filter((p) => p.supplierId === s.id);
              return (
                <li key={s.id}>
                  <Panel as="article" className="flex h-full flex-col gap-3 p-5">
                    <div className="flex items-start justify-between gap-3">
                      <button type="button" onClick={() => open(s)} className="min-w-0 text-left">
                        <h2 className="truncate font-display text-2xl hover:text-acento">{s.name}</h2>
                        {(s.legalName || s.docNumber) && (
                          <p className="truncate text-sm text-tinta">
                            {[s.legalName, s.docNumber && `${s.docType ?? "CUIT"} ${fmtDoc(s.docType ?? "CUIT", s.docNumber)}`].filter(Boolean).join(" · ")}
                          </p>
                        )}
                        <p className="text-sm text-gris">{[s.contact, s.phone, s.email].filter(Boolean).join(" · ") || "Sin datos de contacto"}</p>
                      </button>
                      <span className="hang-tag shrink-0 text-[0.8rem]">× {fmtCoef(s.coefficient ?? general)}</span>
                    </div>
                    <p className="num text-sm text-gris">
                      {items.length} artículos · {items.reduce((a, p) => a + totalStock(p), 0)} unidades
                      {!s.coefficient && " · usa el coeficiente general"}
                    </p>
                    <div className="mt-auto flex flex-wrap gap-2">
                      <Button size="sm" variant="secondary" className="min-h-11" onClick={() => open(s)}>
                        Editar
                      </Button>
                      <Link href="/admin/importar" className={buttonClass("secondary", "sm", "min-h-11")}>
                        Importar su lista
                      </Link>
                      {s.phone && (
                        <a href={whatsappUrl(s.phone, "Hola! ¿Me pasás la lista de precios actualizada?")} target="_blank" rel="noreferrer" aria-label={`WhatsApp a ${s.name}`} className={buttonClass("secondary", "sm", "min-h-11 min-w-11")}>
                          <WhatsappLogoIcon size={18} />
                        </a>
                      )}
                    </div>
                  </Panel>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      <Dialog
        open={!!editing}
        onClose={() => setEditing(null)}
        title={exists ? "Editar proveedor" : "Nuevo proveedor"}
        wide
        footer={
          <>
            {exists && editing && (
              <div className="mr-auto">
                <ConfirmButton
                  up
                  confirmLabel="Sí, borrar"
                  onConfirm={() => {
                    deleteSupplier(editing.id);
                    setEditing(null);
                    toast.success("Proveedor borrado. Sus artículos quedaron sin proveedor.");
                  }}
                >
                  Borrar
                </ConfirmButton>
              </div>
            )}
            <Button variant="ghost" onClick={() => setEditing(null)}>
              Cancelar
            </Button>
            <Button onClick={save}>Guardar</Button>
          </>
        }
      >
        {editing && (
          <div className="flex flex-col gap-5">
            <FormSection title="General" first>
              <Field label="Nombre" htmlFor="sp-name" error={error} className="sm:col-span-4">
                <Input id="sp-name" placeholder="Como lo llaman ustedes" {...f("name")} />
              </Field>
              <Field label="Coeficiente" htmlFor="sp-coef" hint={`Vacío = general (${fmtCoef(general)})`} className="sm:col-span-2">
                <Input id="sp-coef" inputMode="decimal" className="num" value={coefText} onChange={(e) => setCoefText(e.target.value)} />
              </Field>
            </FormSection>

            <FormSection title="Facturación">
              <Field label="Razón social" htmlFor="sp-legal" className="sm:col-span-6">
                <Input id="sp-legal" placeholder="Como figura en las facturas" {...f("legalName")} />
              </Field>
              <Field label="Categoría" htmlFor="sp-tax" className="sm:col-span-2">
                <Select id="sp-tax" value={editing.taxCategory ?? ""} onChange={(e) => setEditing((s) => (s ? { ...s, taxCategory: e.target.value as TaxCategory } : s))}>
                  <option value="">Sin indicar</option>
                  {TAX_CATEGORIES.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Documento" htmlFor="sp-doctype" className="sm:col-span-1">
                <Select
                  id="sp-doctype"
                  value={editing.docType ?? "CUIT"}
                  onChange={(e) => {
                    setDocErr("");
                    setEditing((s) => (s ? { ...s, docType: e.target.value as DocType } : s));
                  }}
                >
                  <option value="CUIT">CUIT</option>
                  <option value="DNI">DNI</option>
                </Select>
              </Field>
              <Field label={`Número de ${editing.docType ?? "CUIT"}`} htmlFor="sp-doc" error={docErr} hint={`${DOC_LENGTH[editing.docType ?? "CUIT"]}, sin guiones ni puntos`} className="sm:col-span-3">
                <Input
                  id="sp-doc"
                  inputMode="numeric"
                  className="num"
                  maxLength={editing.docType === "DNI" ? 8 : 11}
                  placeholder={editing.docType === "DNI" ? "12345678" : "20123456789"}
                  aria-invalid={!!docErr}
                  aria-describedby={docErr ? "sp-doc-error" : undefined}
                  value={editing.docNumber ?? ""}
                  onChange={(e) => {
                    setDocErr("");
                    const digits = e.target.value.replace(/\D/g, "");
                    setEditing((s) => (s ? { ...s, docNumber: digits } : s));
                  }}
                />
              </Field>
            </FormSection>

            <FormSection title="Ubicación">
              <Field label="Domicilio" htmlFor="sp-address" className="sm:col-span-6">
                <Input id="sp-address" placeholder="Calle y número" autoComplete="off" {...f("address")} />
              </Field>
              <Field label="Localidad" htmlFor="sp-city" className="sm:col-span-4">
                <Input id="sp-city" {...f("city")} />
              </Field>
              <Field label="Código postal" htmlFor="sp-cp" className="sm:col-span-2">
                <Input id="sp-cp" placeholder="8000" maxLength={8} {...f("postalCode")} />
              </Field>
            </FormSection>

            <FormSection title="Contacto">
              <Field label="Persona" htmlFor="sp-contact" className="sm:col-span-2">
                <Input id="sp-contact" placeholder="Con quién hablan" {...f("contact")} />
              </Field>
              <Field label="Teléfono / WhatsApp" htmlFor="sp-phone" className="sm:col-span-2">
                <Input id="sp-phone" type="tel" inputMode="tel" {...f("phone")} />
              </Field>
              <Field label="Email" htmlFor="sp-mail" className="sm:col-span-2">
                <Input id="sp-mail" type="email" placeholder="email@ejemplo.com" {...f("email")} />
              </Field>
            </FormSection>

            <FormSection title="Otros">
              <Field label="Notas" htmlFor="sp-notes" className="sm:col-span-6">
                <Textarea id="sp-notes" rows={2} placeholder="Días de entrega, forma de pago, lo que haga falta" {...f("notes")} />
              </Field>
            </FormSection>
          </div>
        )}
      </Dialog>
    </div>
  );
}
