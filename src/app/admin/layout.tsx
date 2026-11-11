import type { Metadata } from "next";
import { Suspense } from "react";
import { AdminShell } from "@/components/admin/shell";
import { Spinner } from "@/components/ui";

export const metadata: Metadata = { title: "Panel", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<Spinner label="Abriendo el panel" />}>
      <AdminShell>{children}</AdminShell>
    </Suspense>
  );
}
