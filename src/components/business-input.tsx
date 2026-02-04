"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import clsx from "clsx";
import { useGooglePlaces } from "@/lib/use-google-places";

type SelectedBusiness = {
  name: string;
  placeId: string;
  formattedAddress?: string;
};

type BusinessInputProps = {
  defaultValue?: string;
  onBusinessSelect: (business: SelectedBusiness) => void;
};

export function BusinessInput({
  defaultValue,
  onBusinessSelect,
}: BusinessInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const googleReady = useGooglePlaces();

  // Prefill ONLY once (important)
  useEffect(() => {
    if (inputRef.current && defaultValue) {
      inputRef.current.value = defaultValue;
    }
  }, [defaultValue]);

  useEffect(() => {
    if (!googleReady || !inputRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["establishment"],
        fields: ["name", "place_id", "formatted_address"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place?.name || !place.place_id) return;

      const label = place.formatted_address
        ? `${place.name}, ${place.formatted_address}`
        : place.name;

      // Force the visible value
      inputRef.current!.value = label;

      onBusinessSelect({
        name: place.name,
        placeId: place.place_id,
        formattedAddress: place.formatted_address,
      });
    });

    return () => {
      window.google.maps.event.clearInstanceListeners(autocomplete);
    };
  }, [googleReady, onBusinessSelect]);

  return (
    <div className="w-full rounded-xl bg-surface p-4">
      <p className="mb-3 font-medium text-ink">
        Procure pelo nome do seu negócio 👇
      </p>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-3 flex items-center">
          <Image
            src="/icons/google-circle.png"
            alt="Google"
            width={20}
            height={20}
          />
        </div>

        <input
          ref={inputRef}
          type="text"
          placeholder="Comece a escrever e selecione da lista"
          className={clsx(
            "w-full rounded-[10px] border border-neutral-300 bg-bg",
            "pl-11 pr-3 py-2.5",
            "text-ink placeholder:text-muted",
            "focus:outline-none focus:ring-2 focus:ring-primary"
          )}
        />
      </div>

      <p className="mt-2 text-[11px] text-muted">
        *Selecione o negócio a partir dos resultados do Google
      </p>
    </div>
  );
}
