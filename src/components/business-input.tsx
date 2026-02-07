"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { useGooglePlaces } from "@/lib/use-google-places";

type SelectedBusiness = {
  name: string;
  placeId?: string;
  formattedAddress?: string;
};

type BusinessInputProps = {
  defaultValue?: string;
  onBusinessSelect: (business: SelectedBusiness) => void;
  onManualConfirm?: (value: string) => void;
};

export function BusinessInput({
  defaultValue,
  onBusinessSelect,
  onManualConfirm,
}: BusinessInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const googleReady = useGooglePlaces();
  const [hasSelectedFromGoogle, setHasSelectedFromGoogle] = useState(false);

  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);

  // Prefill once
  useEffect(() => {
    if (inputRef.current && defaultValue) {
      inputRef.current.value = defaultValue;
      setHasSelectedFromGoogle(true);
    }
  }, [defaultValue]);

  useEffect(() => {
  if (
    !googleReady ||
    !inputRef.current ||
    !window.google ||
    autocompleteRef.current
  ) {
    return;
  }

  const autocomplete = new window.google.maps.places.Autocomplete(
    inputRef.current,
    {
      types: ["establishment"],
      fields: ["name", "place_id", "formatted_address"],
    }
  );

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();
    if (!place?.name) return;

    const label = place.formatted_address
      ? `${place.name}, ${place.formatted_address}`
      : place.name;

    inputRef.current!.value = label;
    setHasSelectedFromGoogle(true);

    onBusinessSelect({
      name: place.name,
      placeId: place.place_id,
      formattedAddress: place.formatted_address,
    });
  });

  autocompleteRef.current = autocomplete;
}, [googleReady, onBusinessSelect]);

  return (
    <div className="w-full rounded-xl bg-surface p-4">
      <p className="mb-3 font-medium text-ink">
        Procure o nome do seu negócio 👇
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
          placeholder="Escreva aqui e selecione da lista…"
          onChange={(e) => {
            setHasSelectedFromGoogle(false);
            onManualConfirm?.(e.target.value);
          }}
          className={clsx(
            "w-full rounded-[10px] border border-neutral-300 bg-bg",
            "pl-11 pr-3 py-2.5",
            "text-ink placeholder:text-muted",
            "focus:outline-none focus:ring-2 focus:ring-primary"
          )}
        />
      </div>

      {!hasSelectedFromGoogle && (
        <p className="mt-2 text-[12px] text-muted">
          Não encontra o seu negócio? Sem problema, escreva o nome e a cidade.
        </p>
      )}
    </div>
  );
}
