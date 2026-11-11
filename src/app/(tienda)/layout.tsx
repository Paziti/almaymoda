import { Suspense } from "react";
import { ShopShell } from "@/components/shop/shell";
import { Spinner } from "@/components/ui";

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Spinner label="Cargando catálogo" />}>
      <ShopShell>{children}</ShopShell>
    </Suspense>
  );
}
