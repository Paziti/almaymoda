"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { ProductForm } from "@/components/admin/product-form";
import { Spinner } from "@/components/ui";

function Nuevo() {
  // "Guardar y cargar otro" cambia ?r= para arrancar un formulario limpio.
  const r = useSearchParams().get("r") ?? "0";
  return <ProductForm key={r} />;
}

export default function Page() {
  return (
    <Suspense fallback={<Spinner />}>
      <Nuevo />
    </Suspense>
  );
}
