"use client";

import Image from "next/image";
import { InputHTMLAttributes, useEffect, useRef } from "react";
import clsx from "clsx";
import { useGooglePlaces } from "@/lib/use-google-places";

type SelectedBusiness = {
  name: string;
  placeId?: string;
};

type BusinessInputProps = {
  label?: string;
  hint?: string;
  onSelect?: (business: SelectedBusiness) => void;
} & InputHTMLAttributes<HTMLInputElement>;

export function BusinessInput({
  label = "Procure pelo nome do seu negócio 👇",
  hint = "Não consegue encontrar o seu negócio? Sem problemas. Digite o nome e cidade.",
  onSelect,
  className,
  ...props
}: BusinessInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const googleReady = useGooglePlaces();

  useEffect(() => {
    if (!googleReady || !inputRef.current || !window.google) return;

    const autocomplete = new window.google.maps.places.Autocomplete(
      inputRef.current,
      {
        types: ["establishment"],
        fields: ["name", "place_id"],
      }
    );

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();

      if (!place?.name) return;

      onSelect?.({
        name: place.name,
        placeId: place.place_id,
      });
    });
  }, [googleReady, onSelect]);

  return (
    <div className="w-full rounded-xl bg-surface p-4 md:p-6">
      <p className="mb-3 font-medium text-ink text-body-mobile md:text-body-desktop">
        {label}
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
          className={clsx(
            "w-full rounded-[10px] border border-neutral-300 bg-bg",
            "pl-11 pr-3 py-2.5",
            "text-body-mobile md:text-body-desktop text-ink",
            "placeholder:text-muted",
            "focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent",
            className
          )}
          {...props}
        />
      </div>

      <p className="mt-2 text-[11px] leading-[20px] text-muted">
        *{hint}
      </p>
    </div>
  );
}
