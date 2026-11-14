import { Suspense } from "react";
import { ShopShell } from "@/components/tienda/shell";
import { Spinner } from "@/components/comun/ui";

export default function TiendaLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Spinner label="Cargando catálogo" />}>
      <ShopShell>{children}</ShopShell>
    </Suspense>
  );
}
