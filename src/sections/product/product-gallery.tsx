"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import clsx from "clsx";

const IMAGES = Array.from({ length: 7 }, (_, i) => `/gallery/${i + 1}.png`);

export function ProductGallery() {
  const [active, setActive] = useState(0);
  const [start, setStart] = useState(0);
  const [isDesktop, setIsDesktop] = useState(false);

  /* ===== BREAKPOINT DETECTION ===== */
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const update = () => setIsDesktop(mq.matches);

    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  /* ===== SIZES ===== */
  const THUMB_WIDTH = isDesktop ? 122 : 64;
  const GAP = isDesktop ? 12 : 6;
  const VISIBLE = 4;

  const canPrev = start > 0;
  const canNext = start + VISIBLE < IMAGES.length;

  return (
    <div
      className="
        md:sticky md:top-2
        flex flex-col
        gap-2
        md:h-[100vh]
      "
    >
      {/* ===== MAIN IMAGE ===== */}
      <div className="flex justify-center px-1 md:px-0">
        <div
          className="
            relative
            w-full
            md:max-w-[500px]
            h-[54vh]
            md:h-[74vh]
          "
        >
          <Image
            src={IMAGES[active]}
            alt=""
            fill
            className="object-cover rounded-[12px] md:rounded-[14px]"
            priority
          />
        </div>
      </div>

      {/* ===== THUMBNAILS ===== */}
      <div className="flex justify-center">
        <div className="flex items-center gap-2">
          {/* Left arrow */}
          <button
            onClick={() => canPrev && setStart((s) => s - 1)}
            className={clsx(
              "text-ink text-lg transition-opacity cursor-pointer",
              !canPrev && "opacity-30 cursor-default"
            )}
          >
            ‹
          </button>

          {/* ===== VIEWPORT ===== */}
          <div
            className="overflow-hidden"
            style={{
              width: VISIBLE * THUMB_WIDTH + (VISIBLE - 1) * GAP
            }}
          >
            <div
              className="flex transition-transform duration-300 ease-out"
              style={{
                gap: GAP,
                transform: `translateX(-${
                  start * (THUMB_WIDTH + GAP)
                }px)`
              }}
            >
              {IMAGES.map((src, index) => (
                <button
                  key={src}
                  onClick={() => setActive(index)}
                  className={clsx(
                    "relative aspect-[4/5] flex-shrink-0 rounded-[12px] overflow-hidden border transition cursor-pointer",
                    active === index
                      ? "border-ink"
                      : "border-transparent"
                  )}
                  style={{ width: THUMB_WIDTH }}
                >
                  <Image src={src} alt="" fill className="object-cover" />
                </button>
              ))}
            </div>
          </div>

          {/* Right arrow */}
          <button
            onClick={() => canNext && setStart((s) => s + 1)}
            className={clsx(
              "text-ink text-lg transition-opacity cursor-pointer",
              !canNext && "opacity-30 cursor-default"
            )}
          >
            ›
          </button>
        </div>
      </div>
    </div>
  );
}
