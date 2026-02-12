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
  // Initial delay (6s)
  // ─────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerVisible(true);
    }, 6000);

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
  // Suppress banner when coming from Programa Fundador
  // (reacts to navigation, not mount)
  // ─────────────────────────────────────────────
  useEffect(() => {
    if (typeof window === "undefined") return;

    if (pathname === "/") {
      const shouldHide =
        sessionStorage.getItem("hide_launch_banner") === "1";

      if (shouldHide) {
        setDismissed(true); // instantly hide
        sessionStorage.removeItem("hide_launch_banner"); // consume once
      }
    }
  }, [pathname]);

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
            px-4 py-4
            flex flex-col gap-4
            md:flex-row md:items-center md:gap-4
            text-left
          "
        >
          {/* Text */}
          <div className="flex-1 space-y-1">
            <p className="text-[16px] leading-tight font-semibold md:text-[14px]">
              Programa Fundador Revtogo
            </p>

            <p className="text-[15px] leading-snug text-white/80 md:text-[14px]">
              Preço especial 59,90€ · Design gratuito antes de pagar ·
              Destaque no site por 12 meses
            </p>
          </div>

          {/* CTA */}
          <Link
            href="/programa-fundador"
            onClick={handleBannerClick}
            className="
              w-full md:w-auto
              inline-flex items-center justify-center
              px-5 py-2.5
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
              text-white/70
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
