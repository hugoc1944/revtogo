// lib/use-section-parallax.ts
"use client";

import { useEffect, RefObject } from "react";

export function useSectionParallax(
  ref: RefObject<HTMLElement | null>
) {
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let ticking = false;

    const onScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        const rect = el.getBoundingClientRect();
        const vh = window.innerHeight;

        const progress =
          (rect.top + rect.height / 2 - vh / 2) / vh;

        const offset = Math.max(
          -15,
          Math.min(15, progress * -30)
        );

        el.style.setProperty("--parallax-y", `${offset}px`);
        ticking = false;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, [ref]);
}
