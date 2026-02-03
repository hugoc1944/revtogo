"use client";

import { MotionWrapper } from "@/components/motion-wrapper";
import { fadeLeft } from "@/lib/motion";
import { Button } from "@/components/button";
import { Header } from "./header";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ===== DESKTOP VIDEO BACKGROUND ===== */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <video
          className="absolute inset-0 w-full h-full object-cover object-[65%_15%]"
          src="/header/desktop_video.mp4"
          poster="/header/desktop_start.jpg"
          autoPlay
          muted
          playsInline
          preload="metadata"
        />
      </div>

      <Header />

      {/* ===== CONTENT LAYER ===== */}
      <div className="relative z-10">
        {/* ===== MOBILE HERO ===== */}
        <div className="md:hidden relative">
          {/* Visual area — EXACT SAME SIZE & POSITION */}
          <div className="relative w-full h-[82vh] overflow-hidden -top-[3vh]">
            {/* 🔁 REPLACED: image + overlay video → single video with poster */}
            <video
              className="absolute inset-0 w-full h-full object-cover object-[55%_10%]"
              src="/header/mobile_video.mp4"
              poster="/header/mobile_start.jpg"
              autoPlay
              muted
              playsInline
              preload="metadata"
            />
          </div>

          {/* Background extension for text — unchanged */}
          <div className="w-full bg-[#C8EFF1] h-[20vh] -mt-[3vh]" />

          {/* TEXT OVERLAY — unchanged */}
          <div className="absolute inset-x-0 top-[67vh] z-20 px-3">
            <MotionWrapper variants={fadeLeft}>
              <div className="text-center space-y-3">
                <h1 className="text-h1-mobile font-semibold text-ink">
                  Mais avaliações no Google.
                  <br />
                  Pensado na sua marca.
                </h1>

                <p className="text-body-mobile font-medium text-muted px-5">
                  Uma placa premium com NFC e QR code que torna a avaliação um
                  gesto natural.
                </p>

                <div className="pt-2 flex justify-center">
                  <Button>Ver a minha placa</Button>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>

        {/* ===== DESKTOP HERO CONTENT — UNCHANGED ===== */}
        <div className="hidden md:block mx-auto max-w-7xl h-screen px-4">
          <div className="grid md:grid-cols-[1.2fr_0.8fr] h-full items-center pt-[120px]">
            <MotionWrapper variants={fadeLeft}>
              <div className="space-y-6 max-w-2xl">
                <h1 className="text-h1-desktop font-medium text-ink">
                  Mais avaliações no Google.
                  <br />
                  Uma placa pensada na sua marca.
                </h1>

                <p className="text-[20px] font-medium text-muted pr-25">
                  Uma placa premium com NFC e QR code, pensada para tornar a
                  avaliação um gesto natural.
                </p>

                <Button>Ver a minha placa</Button>
              </div>
            </MotionWrapper>

            <div />
          </div>
        </div>
      </div>
    </section>
  );
}
