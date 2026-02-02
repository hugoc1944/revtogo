"use client";

import { useState } from "react";
import { SLIDES } from "./data";
import { SliderCard } from "./slider-card";

/* ===== DESKTOP CONSTANTS ===== */
const CARD_WIDTH = 504;
const GAP = 24;
const PARTIAL_RATIO = 0.8;

const PARTIAL_WIDTH = CARD_WIDTH * PARTIAL_RATIO;

// Fixed viewport (2 full + partial)
const VIEWPORT_WIDTH =
  CARD_WIDTH * 2 +
  PARTIAL_WIDTH +
  GAP -
  80;

/* ===== MOBILE CONSTANTS ===== */
const CARD_MOBILE_WIDTH = 300; // slightly bigger
const MOBILE_GAP = 16; // tighter gap
const MOBILE_PARTIAL_RATIO = 0.18;

const MOBILE_PARTIAL_WIDTH =
  CARD_MOBILE_WIDTH * MOBILE_PARTIAL_RATIO;

const MOBILE_VIEWPORT_WIDTH =
  CARD_MOBILE_WIDTH + MOBILE_PARTIAL_WIDTH;

export function ConceptSlider() {
  const [step, setStep] = useState(0);

  /* ===== DESKTOP SLIDER MATH ===== */
  const STEP_DISTANCE = CARD_WIDTH + GAP;

  const TOTAL_TRACK_WIDTH =
    SLIDES.length * CARD_WIDTH +
    (SLIDES.length - 1) * GAP;

  const MAX_TRANSLATE =
    TOTAL_TRACK_WIDTH - VIEWPORT_WIDTH;

  const translateX = Math.min(
    step * STEP_DISTANCE,
    MAX_TRANSLATE
  );

  const MAX_STEP = Math.ceil(MAX_TRANSLATE / STEP_DISTANCE);
  const progress = (translateX / MAX_TRANSLATE) * 100;

  /* ===== MOBILE SLIDER MATH ===== */
  const MOBILE_STEP_DISTANCE = CARD_MOBILE_WIDTH + MOBILE_GAP;

  const MOBILE_TOTAL_TRACK =
    SLIDES.length * CARD_MOBILE_WIDTH +
    (SLIDES.length - 1) * MOBILE_GAP;

  const MOBILE_MAX_TRANSLATE =
    MOBILE_TOTAL_TRACK - MOBILE_VIEWPORT_WIDTH;

  const mobileTranslateX = Math.min(
    step * MOBILE_STEP_DISTANCE,
    MOBILE_MAX_TRANSLATE
  );

  const mobileProgress =
    MOBILE_MAX_TRANSLATE > 0
      ? (mobileTranslateX / MOBILE_MAX_TRANSLATE) * 100
      : 0;

  return (
    <section className="bg-bg pt-20 md:pt-30">
      {/* ================= DESKTOP ================= */}
      <div className="hidden md:block">
        <div className="mx-auto max-w-[1400px] px-2">
          <h2 className="text-center text-h2-desktop font-semibold text-ink mb-12">
            Uma placa premium, pensada no seu negócio
          </h2>

          {/* Slider */}
          <div className="relative flex justify-center">
            <div
              className="overflow-hidden"
              style={{ width: VIEWPORT_WIDTH }}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  gap: GAP,
                  transform: `translateX(-${translateX}px)`
                }}
              >
                {SLIDES.map((slide, i) => (
                  <SliderCard
                    key={slide.id}
                    slide={slide}
                    active={i === step || i === step + 1}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-12 flex flex-col gap-6 px-4">
            {/* Progress */}
            <div className="w-full h-[2px] bg-surface relative overflow-hidden">
              <div
                className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Arrows */}
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setStep((s) => Math.max(s - 1, 0))}
                className="
                    w-14 h-14 rounded-full bg-surface
                    flex items-center justify-center
                    active:scale-95 transition-transform cursor-pointer
                "
                aria-label="Anterior"
                >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                </button>

                <button
                onClick={() =>
                    setStep((s) => Math.min(s + 1, SLIDES.length - 1))
                }
                className="
                    w-14 h-14 rounded-full bg-muted text-white
                    flex items-center justify-center
                    active:scale-95 transition-transform cursor-pointer
                "
                aria-label="Seguinte"
                >
                <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 6l6 6-6 6" />
                </svg>
                </button>

            </div>
          </div>
        </div>
      </div>

      {/* ================= MOBILE ================= */}
      <div className="md:hidden">
        <div className="px-3">
          {/* Mobile title */}
          <h2 className="text-center text-h2-mobile font-semibold text-ink mb-8 px-10">
            Uma placa premium, pensada no seu negócio
          </h2>

          {/* Slider */}
          <div className="relative">
            <div
              className="overflow-hidden"
              style={{ width: MOBILE_VIEWPORT_WIDTH }}
            >
              <div
                className="flex transition-transform duration-500 ease-out"
                style={{
                  gap: MOBILE_GAP,
                  transform: `translateX(-${mobileTranslateX}px)`
                }}
              >
                {SLIDES.map((slide) => (
                  <SliderCard
                    key={slide.id}
                    slide={slide}
                    mobile
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-6 h-[2px] bg-surface relative overflow-hidden">
            <div
              className="absolute left-0 top-0 h-full bg-primary transition-all duration-300"
              style={{ width: `${mobileProgress}%` }}
            />
          </div>

          {/* Arrows bottom-right */}
          <div className="mt-6 flex justify-end gap-4">
            <button
                onClick={() => setStep((s) => Math.max(s - 1, 0))}
                className="
                    w-11 h-11 rounded-full bg-surface
                    flex items-center justify-center
                    active:scale-95 transition-transform
                "
                aria-label="Anterior"
                >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M15 18l-6-6 6-6" />
                </svg>
                </button>

                <button
                onClick={() =>
                    setStep((s) => Math.min(s + 1, SLIDES.length - 1))
                }
                className="
                    w-11 h-11 rounded-full bg-muted text-white
                    flex items-center justify-center
                    active:scale-95 transition-transform
                "
                aria-label="Seguinte"
                >
                <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                >
                    <path d="M9 6l6 6-6 6" />
                </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
