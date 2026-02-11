"use client";

import { useState } from "react";
import { PlateStatusBadge } from "./PlateStatusBadge";
import { PlateModal } from "./PlateModal";

export function PlatesTable({ plates }: { plates: any[] }) {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-ink/10">
          <thead className="bg-ink/5">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Negócio</th>
              <th className="p-3 text-left">Estilo</th>
              <th className="p-3 text-left">Place ID</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Criada em</th>
              <th className="p-3 text-left">Scans</th>
              <th className="p-3 text-left">Último scan</th>
            <th className="p-3 text-right"></th>
            </tr>
          </thead>

          <tbody>
            {plates.map((p) => (
              <tr
                key={p.id}
                className="border-t border-ink/10 hover:bg-ink/5"
              >
                <td className="p-3 font-mono text-xs">
                  {p.shortId}
                </td>

                <td className="p-3">
                  {p.designRequest.businessName}
                </td>

                <td className="p-3 capitalize">
                  {p.designRequest.designStyle}
                </td>

                <td className="p-3 font-mono text-xs">
                  {p.designRequest.googlePlaceId ?? "—"}
                </td>

                <td className="p-3">
                  <PlateStatusBadge status={p.status} />
                </td>

                <td className="p-3">
                  {new Date(p.createdAt).toLocaleDateString("pt-PT")}
                </td>
                <td className="p-3">
                {p.scans.length}
                </td>
                <td className="p-3">
                {p.scans.length > 0
                    ? new Date(p.scans[0].createdAt).toLocaleString("pt-PT")
                    : "—"}
                </td>
                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelected(p)}
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
        <PlateModal
            key={selected.id} 
            plate={selected}
            onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
