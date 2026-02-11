"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useDesignRequestStore } from "@/stores/design-request.store";

export function StepSummary() {
  const { data, back, next } = useDesignRequestStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);
  const [startedAt] = useState(Date.now());

  useEffect(() => {
    window.dataLayer?.push({
      event: "design_request_summary_view",
    });
  }, []);

  const handleSubmit = async () => {
    if (!acceptedPrivacy) {
      setError("É necessário aceitar a Política de Privacidade.");
      return;
    }

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
          company: "",
          startedAt,

          // 🚀 SEND EVERYTHING FROM STORE
          ...data,
        }),
      });

      if (!res.ok) throw new Error();

      window.dataLayer?.push({
        event: "design_request_submit",
        delivery_method: data.deliveryMethod,
        design_style: data.designStyle,
      });

      next();
    } catch {
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
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
      />
      {/* Privacy consent */}
      <label className="flex items-start gap-3 text-[13px] text-muted">
        <input
          type="checkbox"
          checked={acceptedPrivacy}
          onChange={(e) => setAcceptedPrivacy(e.target.checked)}
          className="mt-[2px] accent-primary"
        />
        <span>
          Li e aceito a{" "}
          <Link
            href="/politica-de-privacidade"
            target="_blank"
            className="text-ink underline hover:text-primary"
          >
            Política de Privacidade
          </Link>
          .
        </span>
      </label>

      {error && <p className="text-[13px] text-red-500">{error}</p>}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={back}
          disabled={loading}
          className="text-[14px] font-medium text-muted hover:text-ink transition"
        >
          Voltar
        </button>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="
            px-6 py-3 rounded-xl text-[14px] font-semibold
            bg-primary text-white
            disabled:opacity-50 disabled:cursor-not-allowed
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
