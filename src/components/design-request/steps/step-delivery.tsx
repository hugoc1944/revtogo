"use client";

import { useEffect, useState } from "react";
import { useDesignRequestStore } from "@/stores/design-request.store";
import clsx from "clsx";

type DeliveryMethod = "email" | "whatsapp";

export function StepDelivery() {
  const { data, update, next, back } = useDesignRequestStore();

  const [method, setMethod] = useState<DeliveryMethod | undefined>(
    data.deliveryMethod
  );
  const [phone, setPhone] = useState(data.contactPhone ?? "");

  useEffect(() => {
    if (data.deliveryMethod) setMethod(data.deliveryMethod);
    if (data.contactPhone) setPhone(data.contactPhone);
  }, [data.deliveryMethod, data.contactPhone]);

  const needsPhone = method === "whatsapp";
  const canContinue =
    method === "email" || (method === "whatsapp" && phone.trim().length > 0);

  const handleSelect = (value: DeliveryMethod) => {
    setMethod(value);
    update({ deliveryMethod: value });
  
    // EMAIL → always continue immediately
    if (value === "email") {
      update({ contactPhone: undefined });
      next();
      return;
    }
  
    // WHATSAPP → auto-continue ONLY if phone already exists
    if (value === "whatsapp" && phone.trim().length > 0) {
      update({ contactPhone: phone.trim() });
      next();
    }
  };

  const handleContinue = () => {
    if (!canContinue || !method) return;
  
    update({
      contactPhone:
        method === "whatsapp" ? phone.trim() : undefined,
    });
  
    next();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h4 className="text-[18px] font-semibold text-ink">
          Como prefere receber o design?
        </h4>
        <p className="text-[14px] text-muted mt-1">
          Enviaremos o design em até 24h.
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {/* Email */}
        <button
          type="button"
          onClick={() => handleSelect("email")}
          className={clsx(
            "w-full text-left rounded-2xl border transition-all cursor-pointer",
            "px-4 py-4 flex items-center gap-4",
            method === "email"
              ? "border-primary bg-primary/5"
              : "border-black/10 bg-bg hover:border-black/20"
          )}
        >
          <div className="h-12 w-12 rounded-xl bg-neutral-200 flex items-center justify-center text-[18px]">
            ✉️
          </div>

          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-ink">
              Email
            </span>
            <span className="text-[13px] text-muted">
              Receba o design diretamente no seu email.
            </span>
          </div>
        </button>

        {/* WhatsApp */}
        <button
        type="button"
        onClick={() => handleSelect("whatsapp")}
        className={clsx(
            "w-full text-left rounded-2xl border transition-all cursor-pointer",
            "px-4 py-4 flex items-center gap-4",
            method === "whatsapp"
            ? "border-primary bg-primary/5"
            : "border-black/10 bg-bg hover:border-black/20"
        )}
        >
          <div className="h-12 w-12 rounded-xl bg-neutral-200 flex items-center justify-center text-[18px]">
            💬
          </div>

          <div className="flex flex-col">
            <span className="text-[15px] font-semibold text-ink">
              WhatsApp
            </span>
            <span className="text-[13px] text-muted">
              Receba o design por WhatsApp.
            </span>
          </div>
        </button>
      </div>

      {/* Phone input (conditional) */}
      {needsPhone && (
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-ink">
            Número de telemóvel
          </label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Insira o seu número"
            className="
              w-full
              rounded-[10px]
              border border-neutral-300
              bg-bg
              px-3 py-2.5
              text-[15px]
              text-ink
              placeholder:text-muted
              focus:outline-none
              focus:ring-2 focus:ring-primary
              focus:border-transparent
            "
          />
          <p className="text-[12px] text-muted mt-1">
            Necessário para enviar o design por WhatsApp.
          </p>
        </div>
      )}

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={back}
          className="
            text-[14px]
            font-medium
            text-muted
            hover:text-ink
            transition
            cursor-pointer
          "
        >
          Voltar
        </button>

        <button
          onClick={handleContinue}
          disabled={!canContinue}
          className="
            px-5
            py-3
            rounded-xl
            text-[14px]
            font-semibold
            bg-primary
            text-white
            transition
            disabled:opacity-40
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
