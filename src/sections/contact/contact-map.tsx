"use client";

import {
  GoogleMap,
  MarkerF,
  InfoWindowF,
  useLoadScript,
} from "@react-google-maps/api";
import Image from "next/image";
import { useState } from "react";

const center = {
  lat: 40.6426206487129,
  lng: -8.651662703951894,
};

export function ContactMap() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const [open, setOpen] = useState(false);

  if (!isLoaded) return null;

  return (
    <div className="h-[70vh] w-full rounded-t-2xl overflow-hidden">
      <GoogleMap
        zoom={16}
        center={center}
        mapContainerClassName="w-full h-full"
        options={{
          disableDefaultUI: true,
          zoomControl: true,
          styles: [
            { featureType: "poi", stylers: [{ visibility: "off" }] },
          ],
        }}
      >
        {/* ===== DEFAULT GOOGLE MAPS PIN ===== */}
        <MarkerF
          position={center}
          onClick={() => setOpen(true)}
        />

        {/* ===== INFO WINDOW ===== */}
        {open && (
          <InfoWindowF
            position={center}
            onCloseClick={() => setOpen(false)}
          >
            <div className="flex flex-col items-center gap-2 px-2 py-1 max-w-[220px]">
              <Image
                src="/brand/Revtogo.png"
                alt="Revtogo"
                width={120}
                height={32}
              />

              <p className="text-[13px] text-center text-ink">
                R. Conselheiro Luís de Magalhães 31B
                <br />
                3800-137 Aveiro
              </p>

              <div className="text-[13px] text-center">
                <a
                  href="mailto:ola@revtogo.pt"
                  className="block font-semibold text-primary hover:underline"
                >
                  ola@revtogo.pt
                </a>
                <a
                  href="tel:+351928347379"
                  className="block font-semibold text-primary hover:underline"
                >
                  +351 928 347 379
                </a>
              </div>
            </div>
          </InfoWindowF>
        )}
      </GoogleMap>
    </div>
  );
}
