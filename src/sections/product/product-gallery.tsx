"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

const IMAGES = [
  "/gallery/1_v2.png",
  "/gallery/2.png",
  "/gallery/3.png",
  "/gallery/4.png",
  "/gallery/5.png",
  "/gallery/6.png",
  "/gallery/7.png",
];

export function ProductGallery() {
  const [active, setActive] = useState(0);
  const [start, setStart] = useState(0);

  const DESKTOP_THUMB = 122;
  const DESKTOP_GAP = 12;
  const DESKTOP_VISIBLE = 4;

  const MOBILE_THUMB = 78;
  const MOBILE_GAP = 8;
  const MOBILE_VISIBLE = 4;

  const canPrev = start > 0;
  const canNextDesktop = start + DESKTOP_VISIBLE < IMAGES.length;
  const canNextMobile = start + MOBILE_VISIBLE < IMAGES.length;

  return (
    <>
      {/* ================= MOBILE ================= */}
      <div className="md:hidden flex flex-col gap-3">
        <div className="relative w-full h-[52vh] rounded-xl overflow-hidden">
          <Image src={IMAGES[active]} alt="" fill className="object-cover" />
        </div>

        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <button
              onClick={() => canPrev && setStart((s) => s - 1)}
              className={clsx("text-[32px]", !canPrev && "opacity-30")}
            >
              ‹
            </button>

            <div
              className="overflow-hidden"
              style={{
                width:
                  MOBILE_VISIBLE * MOBILE_THUMB +
                  (MOBILE_VISIBLE - 1) * MOBILE_GAP,
              }}
            >
              <div
                className="flex transition-transform duration-300"
                style={{
                  gap: MOBILE_GAP,
                  transform: `translateX(-${
                    start * (MOBILE_THUMB + MOBILE_GAP)
                  }px)`,
                }}
              >
                {IMAGES.map((src, i) => (
                  <button
                    key={src}
                    onClick={() => setActive(i)}
                    className={clsx(
                      "relative aspect-[4/5] flex-shrink-0 rounded-lg overflow-hidden border",
                      active === i ? "border-ink" : "border-transparent"
                    )}
                    style={{ width: MOBILE_THUMB }}
                  >
                    <Image src={src} alt="" fill className="object-cover" />
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={() => canNextMobile && setStart((s) => s + 1)}
              className={clsx("text-[32px]", !canNextMobile && "opacity-30")}
            >
              ›
            </button>
          </div>
        </div>
      </div>

      {/* ================= DESKTOP ================= */}
      <div className="hidden md:flex justify-center">
        {/* Total sticky height */}
        <div className="w-full max-w-[500px] h-[98vh] py-5 flex flex-col justify-between">
          
          {/* MAIN IMAGE — FLEX GROWS */}
          <div className="relative w-full flex-1 rounded-2xl overflow-hidden">
            <Image
              src={IMAGES[active]}
              alt=""
              fill
              className="object-cover"
            />
          </div>

          {/* THUMBNAILS — FIXED AREA */}
          <div className="pt-4 flex justify-center">
            <div className="flex items-center gap-3">
              <button
                onClick={() => canPrev && setStart((s) => s - 1)}
                className={clsx("text-[32px]", !canPrev && "opacity-30")}
              >
                ‹
              </button>

              <div
                className="overflow-hidden"
                style={{
                  width:
                    DESKTOP_VISIBLE * DESKTOP_THUMB +
                    (DESKTOP_VISIBLE - 1) * DESKTOP_GAP,
                }}
              >
                <div
                  className="flex transition-transform duration-300"
                  style={{
                    gap: DESKTOP_GAP,
                    transform: `translateX(-${
                      start * (DESKTOP_THUMB + DESKTOP_GAP)
                    }px)`,
                  }}
                >
                  {IMAGES.map((src, i) => (
                    <button
                      key={src}
                      onClick={() => setActive(i)}
                      className={clsx(
                        "relative aspect-[4/5] flex-shrink-0 rounded-xl overflow-hidden border",
                        active === i ? "border-ink" : "border-transparent"
                      )}
                      style={{ width: DESKTOP_THUMB }}
                    >
                      <Image src={src} alt="" fill className="object-cover" />
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={() => canNextDesktop && setStart((s) => s + 1)}
                className={clsx("text-[32px]", !canNextDesktop && "opacity-30")}
              >
                ›
              </button>
            </div>
          </div>
        </div>
      </div>

    </>
  );
}
