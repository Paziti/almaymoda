"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { Spinner } from "@/components/comun/ui";

function Nuevo() {
  // "Guardar y cargar otro" cambia ?r= para arrancar un formulario limpio.
  const params = useSearchParams();
  const r = params.get("r") ?? "0";
  // Viene de pistolear un código que no estaba cargado.
  const barcode = params.get("barras") ?? undefined;
  return <ProductForm key={r} initialBarcode={barcode} />;
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <Nuevo />
    </Suspense>
  );
}
