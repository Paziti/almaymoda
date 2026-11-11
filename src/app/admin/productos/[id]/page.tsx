"use client";

import { useParams } from "next/navigation";
import { useDB } from "@/lib/store";
import { ProductForm } from "@/components/admin/product-form";
import { ButtonLink, EmptyState } from "@/components/ui";

export default function Page() {
  const { id } = useParams<{ id: string }>();
  const product = useDB((s) => s.products.find((p) => p.id === id));
  if (!product) {
    return (
      <EmptyState title="No encontramos este artículo" action={<ButtonLink href="/admin/productos">Volver a artículos</ButtonLink>}>
        Puede que lo hayan eliminado.
      </EmptyState>
    );
  }
  return <ProductForm key={product.id} initial={product} />;
}
