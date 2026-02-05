"use client";

import { useEffect, useRef, useState } from "react";
import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";

export function ProductSection() {
  const infoRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const [spacer, setSpacer] = useState(0);

  useEffect(() => {
    if (!infoRef.current || !galleryRef.current) return;

    const update = () => {
      const infoH = infoRef.current!.offsetHeight;
      const galleryH = galleryRef.current!.offsetHeight;
      setSpacer(Math.max(0, infoH - galleryH));
    };

    update();

    const ro = new ResizeObserver(update);
    ro.observe(infoRef.current);
    ro.observe(galleryRef.current);

    return () => ro.disconnect();
  }, []);

  return (
    <section
      id="revtogo-plus"
      className="bg-bg pt-6 md:pt-15 pb-6 md:pb-15"
    >
      <div className="mx-auto max-w-7xl px-3 md:px-4">

        {/* ================= MOBILE ================= */}
        <div className="md:hidden flex flex-col gap-6">
          <ProductGallery />
          <ProductInfo />
        </div>

        {/* ================= DESKTOP ================= */}
        <div className="hidden md:grid md:grid-cols-[52%_48%] gap-5 items-start">

          {/* LEFT — STICKY */}
          <div>
            <div
              ref={galleryRef}
              className="sticky top-[calc(50vh-49vh)]"
            >
              <ProductGallery />
            </div>

            {/* Spacer makes section tall enough */}
            <div style={{ height: spacer }} />
          </div>

          {/* RIGHT — INFO */}
          <div ref={infoRef}>
            <ProductInfo />
          </div>

        </div>

      </div>
    </section>
  );
}
