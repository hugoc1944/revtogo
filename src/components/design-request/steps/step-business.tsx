"use client";

import { useState } from "react";
import { BusinessInput } from "@/components/business-input";
import { useDesignRequestStore } from "@/stores/design-request.store";

export function StepBusiness() {
  const { data, update, next, back } = useDesignRequestStore();
  const [manualValue, setManualValue] = useState(
    data.businessLabel ?? ""
  );

  const canContinue = manualValue.trim().length > 1;

  const handleGoogleSelect = (business: {
    name: string;
    placeId?: string;
    formattedAddress?: string;
  }) => {
    const label = business.formattedAddress
      ? `${business.name}, ${business.formattedAddress}`
      : business.name;

    update({
      businessName: business.name,
      businessLabel: label,
      googlePlaceId: business.placeId,
    });

    // ✅ Google selection → auto-advance
    next();
  };

  const handleManualConfirm = () => {
    if (!canContinue) return;

    update({
      businessName: manualValue.trim(),
      businessLabel: manualValue.trim(),
      googlePlaceId: undefined,
    });

    next();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <h4 className="text-[18px] font-semibold text-ink">
        Confirme o seu negócio
      </h4>

      {/* Business input */}
      <BusinessInput
        defaultValue={manualValue}
        onBusinessSelect={handleGoogleSelect}
        onManualConfirm={(value) => setManualValue(value)}
      />

      {/* Helper note */}
      <p className="text-[12px] text-muted -mt-2">
        Não encontra o seu negócio? Escreva o nome e a cidade e continue.
      </p>

      {/* Actions — spaced so Google dropdown doesn’t cover */}
      <div className="flex items-center justify-between pt-6">
        <button
          onClick={back}
          className="
            text-[14px]
            font-medium
            text-muted
            hover:text-ink
            transition
          "
        >          
        </button>

        <button
          onClick={handleManualConfirm}
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
