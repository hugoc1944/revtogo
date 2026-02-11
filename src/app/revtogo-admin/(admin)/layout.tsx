"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { AdminShell } from "./components/AdminShell";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pathname = usePathname();

  const isFindRoute =
    pathname?.startsWith("/revtogo-admin/find");

  return (
    <AdminShell hideSidebar={isFindRoute}>
      {children}
    </AdminShell>
  );
}
