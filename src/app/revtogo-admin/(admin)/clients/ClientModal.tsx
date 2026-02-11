"use client";

import { useState } from "react";
import { PlateModal } from "../plates/PlateModal";

export function ClientModal({
  client,
  onClose,
}: {
  client: any;
  onClose: () => void;
}) {
  const [plate, setPlate] = useState<any | null>(null);

  return (
    <>
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl w-full max-w-3xl p-6 relative">
          <button onClick={onClose} className="absolute top-4 right-4">
            ✕
          </button>

          <h2 className="text-xl font-semibold mb-4">
            Cliente
          </h2>

          <div className="text-sm space-y-1 mb-6">
            <p><b>Email:</b> {client.email}</p>
            {client.name && <p><b>Nome:</b> {client.name}</p>}
            {client.phone && <p><b>Telefone:</b> {client.phone}</p>}
          </div>

          <h3 className="font-semibold mb-2">
            Placas
          </h3>

          <ul className="divide-y">
            {client.plates.map((p: any) => (
              <li
                key={p.id}
                className="py-2 cursor-pointer hover:text-primary"
                onClick={() => setPlate(p)}
              >
                <div className="flex justify-between text-sm">
                  <span>{p.shortId}</span>
                  <span>
                    {new Date(p.createdAt).toLocaleDateString("pt-PT")}
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {plate && (
        <PlateModal
          plate={plate}
          onClose={() => setPlate(null)}
        />
      )}
    </>
  );
}
