"use client";

import { useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useDesignRequestStore } from "@/stores/design-request.store";
import { StepSlot } from "./step-slot";

export function DesignRequestOverlay() {
  const isOpen = useDesignRequestStore((s) => s.isOpen);
  const close = useDesignRequestStore((s) => s.close);

  // Lock scroll
  useEffect(() => {
    if (!isOpen) return;

    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = original;
    };
  }, [isOpen]);

  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end md:items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/35 backdrop-blur-[2px]"
            onClick={close}
          />

          {/* Card */}
          <motion.div
            className="
              relative
              w-full
              md:max-w-[520px]
              bg-bg
              rounded-t-[28px]
              md:rounded-[28px]
              shadow-[0_30px_80px_rgba(0,0,0,0.22)]
              overflow-hidden
            "
            initial={{ y: 90, scale: 0.97 }}
            animate={{ y: 0, scale: 1 }}
            exit={{ y: 90, scale: 0.97 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Top accent */}
            <div className="h-[3px] w-full bg-primary/80" />

            {/* Header */}
            <div className="px-6 pt-8 pb-5">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-[12px] font-medium text-muted uppercase tracking-wide">
                    Pedido de design
                  </p>
                  <h3 className="text-[20px] font-semibold text-ink leading-tight mt-1">
                    Vamos preparar a sua placa
                  </h3>
                </div>

                <button
                  onClick={close}
                  className="
                    text-[13px]
                    font-medium
                    text-muted
                    hover:text-ink
                    transition
                    cursor-pointer
                  "
                >
                  Fechar
                </button>
              </div>
            </div>

            {/* Divider */}
            <div className="h-px bg-black/5 mx-6" />

            {/* Content */}
            <div className="px-6 py-6">
              <StepSlot />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
