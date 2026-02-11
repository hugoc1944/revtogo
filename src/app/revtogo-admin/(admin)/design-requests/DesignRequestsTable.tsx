"use client";

import { useState } from "react";
import { DesignRequestModal } from "./DesignRequestModal";
import { StatusBadge } from "./StatusBadge";

export function DesignRequestsTable({ requests }: { requests: any[] }) {
  // 👇 local state instead of using props directly
  const [rows, setRows] = useState(requests);
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-ink/10">
          <thead className="bg-ink/5">
            <tr>
              <th className="p-3 text-left">Negócio</th>
              <th className="p-3 text-left">Contacto</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Criado</th>
              <th className="p-3 text-left">Atualizado a</th>
              <th className="p-3 text-right"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((r) => (
              <tr
                key={r.id}
                className="border-t border-ink/10 hover:bg-ink/5"
              >
                <td className="p-3">{r.businessName}</td>
                <td className="p-3">{r.contactEmail}</td>

                <td className="p-3">
                  <StatusBadge status={r.status} />
                </td>

                <td className="p-3">
                  {new Date(r.createdAt).toLocaleDateString("pt-PT")}
                </td>

                <td className="p-3">
                  {new Date(r.statusUpdatedAt).toLocaleDateString("pt-PT")}
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelected(r)}
                    className="hover:text-primary"
                  >
                    👁️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selected && (
        <DesignRequestModal
          request={selected}
          onClose={() => setSelected(null)}
          onUpdated={(updated) => {
            // ✅ update modal data
            setSelected(updated);

            // ✅ update table row instantly
            setRows((prev) =>
              prev.map((r) => (r.id === updated.id ? updated : r))
            );
          }}
        />
      )}
    </>
  );
}
