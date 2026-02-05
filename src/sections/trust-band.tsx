"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import clsx from "clsx";

/* ===== DATA ===== */
const ITEMS = [
  {
    icon: "/icons/google.png",
    text: (
      <>
        <span className="font-semibold">Mais visibilidade</span> no Google!
      </>
    ),
  },
  {
    icon: "/icons/fast.png",
    text: (
      <>
        <span className="font-semibold">Redireciona diretamente</span> para a
        página da avaliação.
      </>
    ),
  },
  {
    icon: "/icons/enjoy.png",
    text: (
      <>
        <span className="font-semibold">Os clientes adoram!</span> É simples e
        fácil.
      </>
    ),
  },
  {
    icon: "/icons/confident.png",
    text: (
      <>
        <span className="font-semibold">
          Deixe os seus clientes
        </span>{" "}
        falarem por si!
      </>
    ),
  },
];

/* ===== CONSTANTS ===== */
const ITEM_WIDTH = 160;
const GAP = 16;
const STEP = ITEM_WIDTH + GAP;

const AUTOPLAY_DELAY = 2000;
const TRANSITION_MS = 500;

export function TrustBand() {
  const [step, setStep] = useState(0);
  const [noTransition, setNoTransition] = useState(false);
  const [paused, setPaused] = useState(false); // ⭐ NEW

  const TOTAL = ITEMS.length;
  const TRACK = [...ITEMS, ...ITEMS];

  /* ===== AUTOPLAY (PAUSABLE) ===== */
  useEffect(() => {
    if (paused) return;

    const id = setInterval(() => {
      setStep((s) => s + 1);
    }, AUTOPLAY_DELAY);

    return () => clearInterval(id);
  }, [paused]);

  /* ===== SEAMLESS RESET ===== */
  useEffect(() => {
    if (step === TOTAL) {
      const t = setTimeout(() => {
        setNoTransition(true);
        setStep(0);

        requestAnimationFrame(() => {
          setNoTransition(false);
        });
      }, TRANSITION_MS);

      return () => clearTimeout(t);
    }
  }, [step, TOTAL]);

  return (
    <section className="bg-bg pt-10 md:pt-12">
      <div className="mx-auto max-w-7xl px-4">
        {/* ===== DESKTOP ===== */}
        <div className="hidden md:grid grid-cols-4 gap-10">
          {ITEMS.map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <Image src={item.icon} alt="" width={82} height={82} priority />
              <p className="mt-4 text-[16px] leading-[28px] text-ink px-6">
                {item.text}
              </p>
            </div>
          ))}
        </div>

        {/* ===== MOBILE SLIDER ===== */}
        <div
          className="md:hidden overflow-hidden"
          /* ⭐ PAUSE / RESUME HANDLERS */
          onTouchStart={() => setPaused(true)}
          onTouchEnd={() => setPaused(false)}
          onPointerDown={() => setPaused(true)}
          onPointerUp={() => setPaused(false)}
          onPointerLeave={() => setPaused(false)}
        >
          <div
            className={clsx(
              "flex",
              noTransition
                ? "transition-none"
                : "transition-transform duration-500 ease-out"
            )}
            style={{
              width: TRACK.length * STEP,
              transform: `translateX(-${step * STEP}px)`,
              gap: GAP,
            }}
          >
            {TRACK.map((item, i) => (
              <div
                key={i}
                style={{ width: ITEM_WIDTH }}
                className="flex-shrink-0 flex flex-col items-center text-center"
              >
                <Image src={item.icon} alt="" width={68} height={68} />
                <p className="mt-3 text-[12px] leading-[18px] text-ink">
                  {item.text}
                </p>
              </div>
            ))}
          </div>

          {/* DOTS */}
          <div className="mt-6 flex justify-center gap-2">
            {ITEMS.map((_, i) => (
              <span
                key={i}
                className={clsx(
                  "w-1.5 h-1.5 rounded-full transition-colors",
                  i === step % TOTAL ? "bg-primary" : "bg-ink/20"
                )}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
