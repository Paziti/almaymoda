"use client";

import { useState } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { PlusIcon, TruckIcon, WhatsappLogoIcon } from "@phosphor-icons/react";
import { useDB } from "@/lib/store";
import { fmtCoef, parseNumber, uid } from "@/lib/format";
import { totalStock } from "@/lib/pricing";
import { whatsappUrl } from "@/lib/share";
import type { Supplier } from "@/lib/types";
import { Button, ConfirmButton, Dialog, EmptyState, Field, Input, Panel, Textarea, buttonClass } from "@/components/ui";
import { PageHeader, pagePad } from "@/components/admin/shell";

const blank = (): Supplier => ({ id: uid("s"), name: "", contact: "", phone: "", email: "", coefficient: null, notes: "" });

export default function ProveedoresPage() {
  const suppliers = useDB((s) => s.suppliers);
  const products = useDB((s) => s.products);
  const general = useDB((s) => s.settings.coefficient);
  const saveSupplier = useDB((s) => s.saveSupplier);
  const deleteSupplier = useDB((s) => s.deleteSupplier);
  const [editing, setEditing] = useState<Supplier | null>(null);
  const [coefText, setCoefText] = useState("");
  const [error, setError] = useState("");

  const open = (s: Supplier) => {
    setEditing(s);
    setCoefText(s.coefficient ? fmtCoef(s.coefficient) : "");
    setError("");
  };

  const save = () => {
    if (!editing) return;
    if (!editing.name.trim()) return setError("Poné el nombre.");
    const c = parseNumber(coefText);
    saveSupplier({ ...editing, name: editing.name.trim(), coefficient: c && c > 0 ? c : null, demo: false });
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
                        <h2 className="truncate font-display text-2xl hover:text-fucsia">{s.name}</h2>
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
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Nombre" htmlFor="sp-name" error={error} className="sm:col-span-2">
              <Input id="sp-name" {...f("name")} />
            </Field>
            <Field label="Contacto" htmlFor="sp-contact">
              <Input id="sp-contact" placeholder="Con quién hablan" {...f("contact")} />
            </Field>
            <Field label="Teléfono / WhatsApp" htmlFor="sp-phone">
              <Input id="sp-phone" type="tel" inputMode="tel" {...f("phone")} />
            </Field>
            <Field label="Email" htmlFor="sp-mail">
              <Input id="sp-mail" type="email" placeholder="email@ejemplo.com" {...f("email")} />
            </Field>
            <Field label="Coeficiente" htmlFor="sp-coef" hint={`Vacío = general (${fmtCoef(general)})`}>
              <Input id="sp-coef" inputMode="decimal" className="num" value={coefText} onChange={(e) => setCoefText(e.target.value)} />
            </Field>
            <Field label="Notas" htmlFor="sp-notes" className="sm:col-span-2">
              <Textarea id="sp-notes" rows={2} {...f("notes")} />
            </Field>
          </div>
        )}
      </Dialog>
    </div>
  );
}
