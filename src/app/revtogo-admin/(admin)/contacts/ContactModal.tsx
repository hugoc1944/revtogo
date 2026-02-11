"use client";

import { useState } from "react";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendente",
  in_progress: "Em progresso",
  solved: "Resolvido",
};

export function ContactModal({
  contact,
  onClose,
  onUpdated,
}: {
  contact: any;
  onClose: () => void;
  onUpdated: (c: any) => void;
}) {
  const [status, setStatus] = useState(contact.status);
  const [loading, setLoading] = useState(false);

  const updateStatus = async () => {
    setLoading(true);

    const res = await fetch(
      `/revtogo-admin/api/contacts/${contact.id}/status`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
        credentials: "include",
      }
    );

    if (res.ok) {
      const updated = await res.json();
      onUpdated(updated);
    }

    setLoading(false);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl w-full max-w-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Contacto
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-2 text-sm">
            <p>
              <b>Nome:</b> {contact.firstName} {contact.lastName}
            </p>
            <p><b>Email:</b> {contact.email}</p>
            <p><b>Mensagem:</b></p>
            <p className="whitespace-pre-wrap text-muted">
              {contact.message}
            </p>

            <div className="pt-4 mt-4 border-t text-xs text-muted">
              <p>
                <b>Criado em:</b>{" "}
                {new Date(contact.createdAt).toLocaleString("pt-PT")}
              </p>
              <p>
                <b>Origem:</b> {contact.source}
              </p>
            </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">
                Estado do contacto
              </label>

              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full border rounded-lg px-3 py-2"
              >
                {Object.entries(STATUS_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>

            <button
              onClick={updateStatus}
              disabled={loading}
              className="bg-primary text-white rounded-lg px-4 py-2"
            >
              {loading ? "A guardar..." : "Atualizar estado"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
