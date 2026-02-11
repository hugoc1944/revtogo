"use client";

import { useState } from "react";
import { ContactModal } from "./ContactModal";
import { StatusBadge } from "../design-requests/StatusBadge";

export function ContactsTable({ contacts }: { contacts: any[] }) {
  const [rows, setRows] = useState(contacts);
  const [selected, setSelected] = useState<any | null>(null);

  return (
    <>
      <div className="overflow-x-auto">
        <table className="w-full text-sm border border-ink/10">
          <thead className="bg-ink/5">
            <tr>
              <th className="p-3 text-left">Nome</th>
              <th className="p-3 text-left">Email</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Criado</th>
              <th className="p-3 text-right"></th>
            </tr>
          </thead>

          <tbody>
            {rows.map((c) => (
              <tr
                key={c.id}
                className="border-t border-ink/10 hover:bg-ink/5"
              >
                <td className="p-3">
                  {c.firstName} {c.lastName}
                </td>

                <td className="p-3">{c.email}</td>

                <td className="p-3">
                  <StatusBadge status={c.status} />
                </td>

                <td className="p-3">
                  {new Date(c.createdAt).toLocaleDateString("pt-PT")}
                </td>

                <td className="p-3 text-right">
                  <button
                    onClick={() => setSelected(c)}
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
        <ContactModal
          contact={selected}
          onClose={() => setSelected(null)}
          onUpdated={(updated) => {
            setSelected(updated);
            setRows((prev) =>
              prev.map((c) => (c.id === updated.id ? updated : c))
            );
          }}
        />
      )}
    </>
  );
}
