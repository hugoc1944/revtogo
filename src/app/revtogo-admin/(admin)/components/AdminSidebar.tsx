"use client";

import { useRouter, usePathname } from "next/navigation";

export function AdminSidebar() {
  const router = useRouter();
  const pathname = usePathname();

  const isActive = (path: string) =>
    pathname?.startsWith(path);

  return (
    <aside className="w-64 bg-white border-r px-4 py-6 flex flex-col">

      {/* Logo / Title */}
      <h2 className="font-semibold text-lg mb-8 tracking-tight">
        Revtogo Admin
      </h2>

      {/* FIND+ Highlighted Button */}
      <button
        onClick={() => router.push("/revtogo-admin/find")}
        className={`
          mb-8
          w-full
          px-4 py-3
          rounded-2xl
          text-left
          font-semibold
          text-sm
          shadow-lg
          transition-all
          ${
            isActive("/revtogo-admin/find")
              ? "bg-gradient-to-r from-purple-600 to-purple-500 text-white"
              : "bg-gradient-to-r from-purple-600 to-purple-500 text-white hover:scale-[1.03]"
          }
        `}
      >
        🚀 Revtogo Find+
      </button>

      {/* Navigation */}
      <nav className="space-y-4 text-sm flex-1">

        <NavItem
          label="Pedidos de Design"
          path="/revtogo-admin/design-requests"
          active={isActive("/revtogo-admin/design-requests")}
          router={router}
        />

        <NavItem
          label="Contactos"
          path="/revtogo-admin/contacts"
          active={isActive("/revtogo-admin/contacts")}
          router={router}
        />

        <NavItem
          label="Clientes"
          path="/revtogo-admin/clients"
          active={isActive("/revtogo-admin/clients")}
          router={router}
        />

        <NavItem
          label="Placas"
          path="/revtogo-admin/plates"
          active={isActive("/revtogo-admin/plates")}
          router={router}
        />
      </nav>
    </aside>
  );
}

/* ===============================
   Nav Item Component
================================ */

function NavItem({
  label,
  path,
  active,
  router,
}: {
  label: string;
  path: string;
  active: boolean;
  router: any;
}) {
  return (
    <button
      onClick={() => router.push(path)}
      className={`
        block w-full text-left px-3 py-2 rounded-lg transition
        ${
          active
            ? "bg-black/5 font-semibold text-black"
            : "text-gray-600 hover:bg-gray-50"
        }
      `}
    >
      {label}
    </button>
  );
}
