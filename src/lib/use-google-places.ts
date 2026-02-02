"use client";

import { useEffect, useState } from "react";

export function useGooglePlaces() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Already loaded
    if (window.google?.maps?.places) {
      setReady(true);
      return;
    }

    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
    script.async = true;
    script.defer = true;

    script.onload = () => {
      setReady(true);
    };

    script.onerror = () => {
      console.error("Failed to load Google Maps script");
    };

    document.head.appendChild(script);
  }, []);

  return ready;
}
