"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

export function LaunchBanner() {
  const pathname = usePathname();

  // ─────────────────────────────────────────────
  // State
  // ─────────────────────────────────────────────
  const [timerVisible, setTimerVisible] = useState(false);
  const [scrollVisible, setScrollVisible] = useState(true);
  const [dismissed, setDismissed] = useState(false);

  // ─────────────────────────────────────────────
  // Initial 8s delay
  // ─────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerVisible(true);
    }, 8000);

    return () => clearTimeout(timer);
  }, []);

  // ─────────────────────────────────────────────
  // Scroll-based visibility
  // ─────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => {
      setScrollVisible(window.scrollY >= 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ─────────────────────────────────────────────
  // Final visibility logic
  // ─────────────────────────────────────────────
  const isExcludedRoute = pathname === "/programa-fundador";
  const shouldShow =
    !isExcludedRoute &&
    timerVisible &&
    scrollVisible &&
    !dismissed;

  if (!shouldShow) {
    return null;
  }

  const handleBannerClick = () => {
    window.dataLayer?.push({
      event: "launch_banner_click",
    });
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -24, opacity: 0 }}
        transition={{
          duration: 0.45,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="
          fixed top-0 inset-x-0 z-40
          bg-ink text-white
          border-b border-white/10
          shadow-[0_8px_24px_rgba(0,0,0,0.25)]
        "
      >
        <div
          className="
            relative
            mx-auto max-w-7xl
            px-4 py-3
            flex flex-col gap-3
            md:flex-row md:items-center md:gap-4
            text-center md:text-left
          "
        >
          {/* Text */}
          <p className="flex-1 text-[14.5px] leading-snug md:text-[14px]">
            <span className="font-semibold block md:inline">
              Programa Fundador Revtogo
            </span>
            <span className="text-white/80 block md:inline md:ml-1">
              Preço especial 56,95€ · Design gratuito antes de pagar ·
              Destaque no site por 12 meses
            </span>
          </p>

          {/* CTA */}
          <Link
            href="/programa-fundador"
            onClick={handleBannerClick}
            className="
                self-center md:self-auto
                inline-flex items-center justify-center
                px-4 py-2
                rounded-full
                text-[14px] font-semibold
                bg-white/10
                text-primary
                hover:bg-white/15
                transition
                whitespace-nowrap
            "
            >
            Saber mais →
            </Link>

          {/* Close */}
          <button
            onClick={() => setDismissed(true)}
            aria-label="Fechar"
            className="
              absolute right-2 top-2
              md:static md:ml-2
              flex items-center justify-center
              w-8 h-8
              rounded-full
              text-white/80
              hover:text-white
              hover:bg-white/10
              transition
            "
          >
            ✕
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
