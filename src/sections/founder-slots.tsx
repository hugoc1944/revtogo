"use client";

import { useState, useRef, useEffect } from "react";
import { motion, Variants } from "framer-motion";
import clsx from "clsx";

const TOTAL = 50;
const TAKEN = 1;
const LOAD_STEP = 8;

/* Slot the user can get */
const TARGET_INDEX = TAKEN;

/* Animation variants */
const cardVariants: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.45,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
};

export function FounderSlots() {
  const [visible, setVisible] = useState(LOAD_STEP);
  const [highlight, setHighlight] = useState<number | null>(null);
  const [cols, setCols] = useState(4);

  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Detect columns */
  useEffect(() => {
    const updateCols = () => {
      setCols(window.innerWidth < 768 ? 2 : 4);
    };
    updateCols();
    window.addEventListener("resize", updateCols);
    return () => window.removeEventListener("resize", updateCols);
  }, []);

  /* Scroll + glow logic */
  const handleSeeMySpot = async () => {
    const rowEnd = Math.ceil((TARGET_INDEX + 1) / cols) * cols;

    if (visible < rowEnd) {
      setVisible(rowEnd);
      await new Promise((r) => setTimeout(r, 350));
    }

    const el = cardRefs.current[TARGET_INDEX];
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "center" });
    }

    setTimeout(() => {
      setHighlight(TARGET_INDEX);
      setTimeout(() => setHighlight(null), 3200);
    }, 500);
  };

  return (
    <section className="pt-24">
      <div className="mx-auto max-w-7xl px-4">
        {/* Header row */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-surface/75 text-[16px]">
            Já ocupados{" "}
            <strong className="text-surface font-semibold">
              {TAKEN}
            </strong>{" "}
            / {TOTAL}
          </p>

          <button
            onClick={handleSeeMySpot}
            disabled={TAKEN >= TOTAL}
            className={clsx(
              "flex items-center gap-2 text-[14px] font-medium",
              TAKEN >= TOTAL
                ? "text-ink/40 cursor-not-allowed"
                : "text-primary hover:underline"
            )}
          >
            Ver o meu lugar
            <span className="text-[18px] leading-none">↓</span>
          </button>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: visible }).map((_, i) => {
            const status =
              i < TAKEN
                ? "taken"
                : i === TAKEN
                ? "yours"
                : "available";

            return (
              <motion.div
                key={i}
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                className={clsx(
                  "relative rounded-2xl bg-surface text-ink p-5 border transition-all",
                  status === "taken" &&
                    "border-primary/40 shadow-[0_0_48px_rgba(255,180,0,0.28)]",
                  status === "yours" &&
                    "border-primary border-dashed shadow-[0_0_55px_rgba(255,180,0,0.38)]",
                  status === "available" &&
                    "border-ink/10 hover:border-ink/20",
                  highlight === i && "animate-pulse-glow"
                )}
              >
                {/* Badge */}
                <div
                  className={clsx(
                    "absolute -top-4 right-4 px-4 py-1.5 rounded-full text-[13px] font-semibold z-10",
                    status === "taken" &&
                      "bg-primary text-white",
                    status === "yours" &&
                      "bg-primary/15 text-primary border border-primary/50",
                    status === "available" &&
                      "bg-emerald-100 text-emerald-700 border border-emerald-300"
                  )}
                >
                  {status === "taken"
                    ? "Já ocupado"
                    : status === "yours"
                    ? "Pode ser o seu"
                    : "Disponível"}
                </div>

                {/* Photo */}
                <div className="relative h-[130px] rounded-xl bg-neutral-200 flex items-center justify-center mb-4">
                  <span className="text-[13px] uppercase tracking-wide text-ink/50">
                    Fotografia
                  </span>
                </div>

                {/* Stars */}
                <div className="flex gap-1 mb-2">
                  {Array.from({ length: 5 }).map((_, s) => (
                    <span key={s} className="text-primary text-[15px]">
                      ★
                    </span>
                  ))}
                </div>

                {/* Business name */}
                <p className="text-[15px] font-semibold mb-1">
                  Nome do Negócio
                </p>

                {/* Testimonial */}
                <p className="text-[14px] text-ink/70 leading-relaxed">
                  Pequeno testemunho sobre a experiência com a placa
                  Revtogo.
                </p>

                {/* Slot number */}
                <div
                  className={clsx(
                    "absolute -bottom-3 -left-3 h-8 w-8 rounded-full flex items-center justify-center text-[12px] font-semibold border",
                    status === "available" &&
                      "bg-emerald-500 text-white border-emerald-500",
                    status === "yours" &&
                      "bg-primary text-white border-primary",
                    status === "taken" &&
                      "bg-ink/20 text-white border-ink/40"
                  )}
                >
                  #{i + 1}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Ver mais */}
        {visible < TOTAL && (
          <div className="mt-12 text-center">
            <button
              onClick={() =>
                setVisible((v) => Math.min(v + LOAD_STEP, TOTAL))
              }
              className="text-[15px] font-medium text-primary hover:underline"
            >
              Ver mais
            </button>
          </div>
        )}
      </div>

      {/* Glow animation */}
      <style jsx>{`
        @keyframes pulse-glow {
          0% {
            box-shadow: 0 0 0 rgba(16, 185, 129, 0);
          }
          50% {
            box-shadow: 0 0 55px rgba(16, 185, 129, 0.75);
          }
          100% {
            box-shadow: 0 0 0 rgba(16, 185, 129, 0);
          }
        }

        .animate-pulse-glow {
          animation: pulse-glow 0.8s ease-in-out 5;
        }
      `}</style>
    </section>
  );
}
