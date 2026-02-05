"use client";

import Image from "next/image";
import { MotionWrapper } from "@/components/motion-wrapper";
import { fadeUp, fadeRight } from "@/lib/motion";

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-bg pt-10 md:pt-22">
      <div className="mx-auto max-w-7xl px-4">
        {/* Section title */}
        <h2 className="text-center text-h2-mobile md:text-h2-desktop font-semibold text-ink mb-8 md:mb-14">
          Avaliações sem fricção, no{" "}
          <span className="text-primary">momento certo!</span>
        </h2>

        {/* ===== DESKTOP LAYOUT ===== */}
        <div className="hidden md:flex justify-center">
          <div className="grid grid-cols-[minmax(0,520px)_minmax(0,1fr)] items-center">
            {/* Visual */}
            <MotionWrapper variants={fadeUp}>
                <div className="relative z-10 w-full h-[535px] rounded-2xl overflow-hidden bg-surface">
                <Image
                    src="/slider/C3_simplicity.png"
                    alt=""
                    fill
                    className="object-cover"
                    priority
                />
                </div>
            </MotionWrapper>

            {/* Text box */}
            <MotionWrapper variants={fadeRight}>
                <div className="relative z-20 bg-[#0F172A] text-white rounded-2xl p-10 max-w-[560px] ml-[-60px]">
                <h3 className="text-[31px] font-semibold leading-[36px] mb-4">
                    O cliente aproxima o telemóvel.
                    <br />
                    A avaliação abre.
                </h3>

                <p className="text-[16px] leading-[28px] text-white/90 mb-4">
                    Sem apps, sem pesquisas, sem instruções.
                    <br />
                    A placa leva diretamente à página de avaliação do Google.
                </p>

                <p className="text-[16px] leading-[28px] italic text-white/90">
                    Pensada para funcionar no dia a dia do seu espaço.
                </p>
                </div>
            </MotionWrapper>
            </div>
        </div>

        {/* ===== MOBILE LAYOUT ===== */}
        <div className="md:hidden relative">
          {/* Visual */}
          <div className="relative mx-auto w-full max-w-[320px] h-[340px] rounded-2xl overflow-hidden bg-surface">
            <Image
              src="/slider/C3_simplicity.png"
              alt=""
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Text card (overlapping) */}
        <div className="relative z-10 -mt-8 flex justify-center px-4">
            <div className="bg-[#0F172A] text-white rounded-2xl p-6 w-[92%]">
              <h3 className="text-[16px] font-semibold mb-3">
                O cliente aproxima o telemóvel.
                <br />
                A avaliação abre.
              </h3>

              <p className="text-[13px] leading-[20px] text-white/90 mb-3">
                Sem apps, sem pesquisas, sem instruções.
                <br />
                A placa leva diretamente à página de avaliação do Google.
              </p>

              <p className="text-[13px] italic text-white/70">
                Pensada para funcionar no dia a dia do seu espaço.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
