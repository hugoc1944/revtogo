"use client";

import { useState } from "react";
import { ClientModal } from "./ClientModal";

export function ClientsTable({ clients }: { clients: any[] }) {
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <>
      <table className="w-full text-sm border border-ink/10">
        <thead className="bg-ink/5">
          <tr>
            <th className="p-3 text-left">Email</th>
            <th className="p-3 text-left">Nome</th>
            <th className="p-3 text-left">Placas</th>
            <th className="p-3 text-left">Criado</th>
            <th className="p-3 text-right"></th>
          </tr>
        </thead>

        <tbody>
          {clients.map((c) => (
            <tr key={c.id} className="border-t hover:bg-ink/5">
              <td className="p-3">{c.email}</td>
              <td className="p-3">{c.name ?? "—"}</td>
              <td className="p-3">{c.plates.length}</td>
              <td className="p-3">
                {new Date(c.createdAt).toLocaleDateString("pt-PT")}
              </td>
              <td className="p-3 text-right">
                <button onClick={() => setSelected(c)}>👁️</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {selected && (
        <ClientModal
          client={selected}
          onClose={() => setSelected(null)}
        />
      )}
    </>
  );
}
