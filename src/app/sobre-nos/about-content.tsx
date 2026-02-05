"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";

export function AboutContent() {
  return (
    <>
      <Header variant="light" />

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

        {/* everything else stays EXACTLY the same */}

      </main>

      <Footer />
    </>
  );
}
