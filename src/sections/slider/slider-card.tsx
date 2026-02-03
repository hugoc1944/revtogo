"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

type Props = {
  slide: any;
  active?: boolean;
  mobile?: boolean;
};

export function SliderCard({ slide, active, mobile }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={clsx(
        "relative flex-none rounded-[14px] overflow-hidden transition-transform",
        mobile
          ? "w-[300px] h-[380px]"
          : "w-[504px] h-[620px]",
        active && !mobile && "scale-100",
        !active && !mobile && "scale-[0.97]"
      )}
    >
      {/* Background */}
      <div
        className="absolute inset-0 will-change-transform transition-transform duration-300 ease-out"
        style={{
            transform: "translateY(var(--parallax-y))",
        }}
        >
        <Image
            src={slide.image}
            alt=""
            fill
            className="object-cover scale-[1.05]"
            priority={active}
        />
        </div>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-[#0F0F0F] opacity-[0.15]" />

      {/* ===== PILL ===== */}
      <div
        className={clsx(
          "absolute left-4 flex items-center rounded-full backdrop-blur-md",
          mobile
            ? "top-3 gap-2 px-5 py-3 bg-white/15"
            : "top-4 gap-2 px-6 py-4 bg-white/10"
        )}
      >
        <Image
          src={slide.icon}
          alt=""
          width="18"
          height="18"
        />
        <span
          className={clsx(
            
            mobile ? "text-[12px] text-white" : "text-[13px] text-white font-medium"
          )}
        >
          {slide.pill}
        </span>
      </div>

      {/* ===== PLUS BUTTON + PANEL ===== */}
      <div
        className="absolute right-4 z-20"
        style={{ top: mobile ? "0.75rem" : "1rem" }}
        onMouseEnter={!mobile ? () => setOpen(true) : undefined}
        onMouseLeave={!mobile ? () => setOpen(false) : undefined}
      >
        {/* Plus button */}
        <button
          onClick={mobile ? () => setOpen((v) => !v) : undefined}
          className={clsx(
            "rounded-full bg-white flex items-center justify-center transition-transform md:cursor-pointer",
            mobile
              ? "w-11 h-11 text-[25px] text-ink/80 active:scale-90"
              : "w-12 h-12 text-[26px] text-ink/80"
          )}
        >
          +
        </button>

        {/* Hover / Tap panel */}
        <div
          className={clsx(
            "absolute right-0 rounded-[14px] bg-surface transition-all duration-300",
            mobile
              ? "top-11 w-[220px] p-4"
              : "top-14 w-[260px] p-6",
            open
              ? "translate-y-1 opacity-100"
              : "-translate-y-4 opacity-0 pointer-events-none"
          )}
        >
          <h4
            className={clsx(
              "font-semibold mb-1",
              mobile ? "text-[17px]" : "text-[18px]"
            )}
          >
            {slide.hoverTitle}
          </h4>
          <p
            className={clsx(
              "text-muted",
              mobile ? "text-[12px]" : "text-[14px]"
            )}
          >
            {slide.hoverText}
          </p>
        </div>
      </div>

      {/* ===== BOTTOM TITLE ===== */}
      <div
        className={clsx(
          "absolute text-white",
          mobile ? "bottom-5 left-5 right-4" : "bottom-6 left-6 right-6"
        )}
      >
        <p
          className={clsx(
            "leading-tight",
            mobile
              ? "text-[22px] font-light leading-[20px]"
              : "text-[28px] font-light"
          )}
        >
          {slide.title.split("\n").map((l: string, i: number) => (
            <span
              key={i}
              className={clsx(i === 1 && "italic font-medium")}
            >
              {l}
              <br />
            </span>
          ))}
        </p>
      </div>
    </div>
  );
}
