"use client";

import { useState } from "react";

const STATUS_LABELS: Record<string, string> = {
  pending: "Pendente",
  design_sent: "Design Enviado",
  producing: "Em Produção",
  delivered: "Entregue",
  refused: "Recusado",
};

export function DesignRequestModal({
  request,
  onClose,
  onUpdated,
}: {
  request: any;
  onClose: () => void;
  onUpdated: (r: any) => void;
}) {
  const [status, setStatus] = useState(request.status);
  const [loading, setLoading] = useState(false);

  const updateStatus = async () => {
    setLoading(true);

    const res = await fetch(
      `/revtogo-admin/api/design-requests/${request.id}/status`,
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
      <div className="bg-white rounded-xl w-full max-w-3xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-sm"
        >
          ✕
        </button>

        <h2 className="text-xl font-semibold mb-4">
          Pedido de Design
        </h2>

        <div className="grid grid-cols-2 gap-6">
          {/* LEFT */}
          <div className="space-y-2 text-sm">
            <p><b>Negócio:</b> {request.businessName}</p>
            {request.googlePlaceId && (
            <p>
                <b>Google Place ID:</b>{" "}
                <span className="font-mono text-xs">
                {request.googlePlaceId}
                </span>
            </p>
            )}
            <p><b>Contacto:</b> {request.contactName}</p>
            <p><b>Email:</b> {request.contactEmail}</p>
            {request.contactPhone && (
              <p><b>Telefone:</b> {request.contactPhone}</p>
            )}
            <p><b>Estilo:</b> {request.designStyle}</p>
            <p><b>Entrega:</b> {request.deliveryMethod}</p>
            {request.notes && (
              <p><b>Notas:</b> {request.notes}</p>
            )}
            <div className="pt-4 mt-4 border-t text-xs text-muted space-y-1">
                <p>
                    <b>Criado em:</b>{" "}
                    {new Date(request.createdAt).toLocaleString("pt-PT")}
                </p>

                <p>
                    <b>Última atualização:</b>{" "}
                    {new Date(request.statusUpdatedAt).toLocaleString("pt-PT")}
                </p>
                </div>
          </div>

          {/* RIGHT */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm mb-1">
                Estado do pedido
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
