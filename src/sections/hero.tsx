"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { MotionWrapper } from "@/components/motion-wrapper";
import { fadeLeft } from "@/lib/motion";
import { Button } from "@/components/button";
import { Header } from "./header";

export function Hero() {
  const desktopVideoRef = useRef<HTMLVideoElement | null>(null);
  const mobileVideoRef = useRef<HTMLVideoElement | null>(null);

  const [desktopVideoEnded, setDesktopVideoEnded] = useState(false);
  const [mobileVideoEnded, setMobileVideoEnded] = useState(false);

  useEffect(() => {
    const desktopVideo = desktopVideoRef.current;
    const mobileVideo = mobileVideoRef.current;

    if (desktopVideo) {
      const onEnd = () => setDesktopVideoEnded(true);
      desktopVideo.addEventListener("ended", onEnd);
      return () => desktopVideo.removeEventListener("ended", onEnd);
    }

    if (mobileVideo) {
      const onEnd = () => setMobileVideoEnded(true);
      mobileVideo.addEventListener("ended", onEnd);
      return () => mobileVideo.removeEventListener("ended", onEnd);
    }
  }, []);

  return (
    <section className="relative min-h-screen overflow-hidden">
      {/* ===== BACKGROUND IMAGE (DESKTOP ONLY) ===== */}
      <div className="absolute inset-0 z-0 hidden md:block">
        <Image
          src="/header/desktop_start.jpg"
          alt=""
          fill
          priority
          className="object-cover object-[65%_15%]"
        />

        
          <video
            ref={desktopVideoRef}
            className="absolute inset-0 w-full h-full object-cover object-[65%_15%]"
            src="/header/desktop_video.mp4"
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
          {/* Visual area (~90vh) */}
          <div className="relative w-full h-[82vh] overflow-hidden -top-[3vh]">
            {/* Background image */}
            <Image
              src="/header/mobile_start.jpg"
              alt=""
              fill
              priority
              className="object-cover object-[60%_10%]"
            />

            {/* Static plate (always visible) */}
            <div className="absolute inset-0 flex items-start justify-center pt-16">
              <Image
                src="/header/mobile_v1.png"
                alt="Placa Revtogo"
                width={320}
                height={320}
                priority
              />
            </div>

            {/* Video overlay */}
            {!mobileVideoEnded && (
              <video
                ref={mobileVideoRef}
                className="absolute inset-0 w-full h-[82vh] object-cover object-[55%_10%]"
                src="/header/mobile_video.mp4"
                autoPlay
                muted
                playsInline
                preload="metadata"
              />
            )}
          </div>

          {/* Background extension for text */}
          <div className="w-full bg-[#C8EFF1] h-[20vh] -mt-[3vh]" />

          {/* TEXT OVERLAY */}
          <div className="absolute inset-x-0 top-[67vh] z-20 px-3">
            <MotionWrapper variants={fadeLeft}>
              <div className="text-center space-y-3">
                <h1 className="text-h1-mobile font-semibold text-ink">
                  Mais avaliações no Google.
                  <br />
                  Pensado na sua marca.
                </h1>

                <p className="text-body-mobile font-medium text-muted px-5">
                  Uma placa premium com NFC e QR code que torna a avaliação um gesto
                  natural.
                </p>

                <div className="pt-2 flex justify-center">
                  <Button>Ver a minha placa</Button>
                </div>
              </div>
            </MotionWrapper>
          </div>
        </div>

        {/* ===== DESKTOP HERO ===== */}
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
