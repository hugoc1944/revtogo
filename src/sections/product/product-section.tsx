"use client";

import { ProductGallery } from "./product-gallery";
import { ProductInfo } from "./product-info";

export function ProductSection() {
  return (
    <section className="bg-bg pt-6 md:pt-15">
      <div className="mx-auto max-w-7xl px-3 md:px-4">
        <div className="grid gap-4 md:gap-10 md:grid-cols-[52%_48%]">
          <ProductGallery />
          <ProductInfo />
        </div>
      </div>
    </section>
  );
}
