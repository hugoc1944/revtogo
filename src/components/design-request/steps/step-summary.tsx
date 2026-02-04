"use client";

import { useState } from "react";
import { useDesignRequestStore } from "@/stores/design-request.store";

export function StepSummary() {
  const { data, back, next } = useDesignRequestStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    console.log("SUMMARY DATA", data);

    if (
      !data.businessName ||
      !data.contactFirstName ||
      !data.contactLastName ||
      !data.contactEmail ||
      !data.designStyle ||
      !data.deliveryMethod
    ) {
      setError("Pedido incompleto. Verifique todos os passos.");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/design-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          // Business
          businessName: data.businessName,
          googlePlaceId: data.googlePlaceId,
          businessCity: data.businessCity,

          // Contact
          contactFirstName: data.contactFirstName,
          contactLastName: data.contactLastName,
          contactEmail: data.contactEmail,
          contactPhone: data.contactPhone,

          // Design / Delivery
          designStyle: data.designStyle,
          deliveryMethod: data.deliveryMethod,

          // Notes
          notes: data.notes,
        }),
      });

      if (!res.ok) {
        throw new Error("Erro ao enviar pedido.");
      }

      // ✅ GO TO SUCCESS STEP
      next();
    } catch (err) {
      setError("Não foi possível enviar o pedido. Tente novamente.");
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h4 className="text-[18px] font-semibold text-ink">
          Confirmar pedido de design
        </h4>
        <p className="text-[14px] text-muted mt-1">
          Verifique os dados antes de enviar.
        </p>
      </div>

      {/* Summary */}
      <div className="flex flex-col gap-4 rounded-2xl bg-surface p-4">
        <SummaryRow label="Negócio" value={data.businessLabel} />

        <SummaryRow
          label="Contacto"
          value={`${data.contactFirstName} ${data.contactLastName} - ${data.contactEmail}`}
        />

        {data.contactPhone && (
          <SummaryRow label="Telemóvel" value={data.contactPhone} />
        )}

        <SummaryRow
          label="Design"
          value={
            data.designStyle === "solid"
              ? "Fundo sólido"
              : "Arte personalizada"
          }
        />

        <SummaryRow
          label="Entrega"
          value={data.deliveryMethod === "email" ? "Email" : "WhatsApp"}
        />

        {data.notes && <SummaryRow label="Notas" value={data.notes} />}
      </div>

      {error && (
        <p className="text-[13px] text-red-500">{error}</p>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={back}
          disabled={loading}
          className="
            text-[14px]
            font-medium
            text-muted
            hover:text-ink
            transition
            disabled:opacity-40
            cursor-pointer
          "
        >
          Voltar
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            px-6
            py-3
            rounded-xl
            text-[14px]
            font-semibold
            bg-primary
            text-white
            transition
            disabled:opacity-50
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          {loading ? "A enviar…" : "Enviar pedido"}
        </button>
      </div>
    </div>
  );
}

function SummaryRow({
  label,
  value,
}: {
  label: string;
  value?: string;
}) {
  if (!value) return null;

  return (
    <div className="flex flex-col gap-0.5">
      <span className="text-[12px] text-muted">{label}</span>
      <span className="text-[14px] font-medium text-ink">{value}</span>
    </div>
  );
}
