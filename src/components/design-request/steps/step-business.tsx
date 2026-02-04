"use client";

import { BusinessInput } from "@/components/business-input";
import { useDesignRequestStore } from "@/stores/design-request.store";

export function StepBusiness() {
  const { data, update, next } = useDesignRequestStore();

  const handleSelect = (business: {
    name: string;
    placeId: string;
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

    next();
  };

  return (
    <div className="flex flex-col gap-6">
      <h4 className="text-[18px] font-semibold text-ink">
        Confirme o seu negócio
      </h4>

      <BusinessInput
        defaultValue={data.businessLabel}
        onBusinessSelect={handleSelect}
      />
    </div>
  );
}
