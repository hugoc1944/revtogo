"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";

export default function AboutPage() {
  return (
    <>
      <Header variant="light"/>

      <main className="bg-ink text-surface">
        {/* ===== HERO ===== */}
        <section className="pt-25 md:pt-36">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-[760px]"
            >
              <h1 className="text-[32px] md:text-[42px] font-bold leading-tight mb-6">
                Menos fricção.
                <br />
                <span className="text-primary">Mais avaliações reais.</span>
              </h1>

              <p className="text-[17px] md:text-[18px] text-surface/85 leading-relaxed">
                A Revtogo nasceu para resolver um problema simples mas crítico:
                transformar a intenção de avaliar num gesto imediato, natural e
                sem esforço.
              </p>
            </motion.div>
          </div>
        </section>

        {/* ===== THE PROBLEM ===== */}
        <section className="pt-14 md:pt-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[720px]">
              <h2 className="text-[21px] md:text-[25px] font-semibold mb-4">
                O problema da avaliação tradicional
              </h2>

              <p className="text-[16px] md:text-[17px] text-surface/80 leading-relaxed mb-4">
                Avaliar um negócio no Google raramente acontece no momento certo.
                O processo envolve vários passos, distrações e decisões que
                acabam por quebrar a intenção inicial.
              </p>

              <p className="text-[16px] md:text-[17px] text-surface/80 leading-relaxed">
                A fricção não é visível - mas é exatamente aí que a maioria das
                avaliações se perde.
              </p>
            </div>
          </div>
        </section>

        {/* ===== MISSION ===== */}
        <section className="pt-14 md:pt-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[720px]">
              <h2 className="text-[21px] md:text-[25px] font-semibold mb-4">
                A nossa missão
              </h2>

              <p className="text-[16px] md:text-[17px] text-surface/80 leading-relaxed">
                Criar o caminho mais curto possível entre a satisfação do
                cliente e a sua avaliação. Sem explicações longas, sem pedidos
                constrangedores, sem fricção.
              </p>
            </div>
          </div>
        </section>

        {/* ===== TECHNOLOGY ===== */}
        <section className="pt-14 md:pt-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[720px]">
              <h2 className="text-[21px] md:text-[25px] font-semibold mb-4">
                Tecnologia invisível, impacto real
              </h2>

              <p className="text-[16px] md:text-[17px] text-surface/80 leading-relaxed mb-4">
                A placa Revtogo integra tecnologia de aproximação (NFC) e QR
                Code. O cliente aproxima o telemóvel ou lê o código e uma janela para
                abrir a avaliação aparece instantaneamente.
              </p>

              <p className="text-[16px] md:text-[17px] text-surface/80 leading-relaxed">
                Em apenas{" "}
                <strong className="text-surface">
                  3 segundos
                </strong>
                , o cliente pode fazer a avaliação, mesmo à sua frente.
              </p>
            </div>
          </div>
        </section>

        {/* ===== PURPOSE & DESIGN ===== */}
        <section className="pt-14 md:pt-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[720px]">
              <h2 className="text-[21px] md:text-[25px] font-semibold mb-4">
                Propósito e identidade
              </h2>

              <p className="text-[16px] md:text-[17px] text-surface/80 leading-relaxed">
                Para além da funcionalidade, acreditamos que a forma como a
                solução se apresenta influencia diretamente a experiência do
                cliente. Cada placa é desenhada para refletir a identidade do
                seu negócio, reforçando confiança e qualidade.
              </p>
            </div>
          </div>
        </section>

        {/* ===== THE PLATE ===== */}
        <section className="pt-14 md:pt-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[720px]">
              <h2 className="text-[21px] md:text-[25px] font-semibold mb-4">
                A placa
              </h2>

              <p className="text-[16px] md:text-[17px] text-surface/80 leading-relaxed mb-4">
                A nossa placa não é apenas uma placa. É um objeto físico
                cuidadosamente produzido, desde o acrílico premium ao
                acabamento manual dos cantos.
              </p>

              <p className="text-[16px] md:text-[17px] text-surface/80 leading-relaxed">
                Cada unidade é finalizada à mão para garantir durabilidade,
                resistência e um toque verdadeiramente premium.
              </p>
            </div>
          </div>
        </section>

        {/* ===== BRAND ORIGIN ===== */}
        <section className="pt-14 md:pt-20 pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[720px]">
              <h2 className="text-[21px] md:text-[25px] font-semibold mb-4">
                Quem está por trás
              </h2>

              <p className="text-[16px] md:text-[17px] text-surface/80 leading-relaxed">
                A Revtogo é uma marca da{" "}
                <Link
                  href="https://webtogo.pt"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-surface hover:text-primary transition-colors"
                >
                  Webtogo.pt
                </Link>
                , especializada em soluções digitais e experiência do
                utilizador. Aplicamos tecnologia, design e comportamento humano
                para criar produtos eficazes e duradouros.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
