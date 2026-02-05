"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { ContactForm } from "./contact-form";
import { ContactMap } from "./contact-map";

export function ContactSection() {
  return (
    <>
      {/* ===== TOP SECTION ===== */}
      <section className="bg-bg pt-25 md:pt-30">
        <div className="mx-auto max-w-7xl px-4">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="grid md:gap-14 md:grid-cols-2 md:items-center"
          >
            {/* ===== LEFT COLUMN ===== */}
            <div className="max-w-[520px]">
              <h1 className="text-[32px] md:text-[40px] font-bold text-ink leading-tight mb-4">
                Fale connosco
              </h1>

              <p className="text-[16px] text-ink/80 leading-relaxed mb-3 md:mb-8">
                Tem alguma dúvida, pedido especial ou precisa de várias placas?
              </p>

              {/* ===== CONTACT DETAILS ===== */}
              <div className="flex flex-col gap-5">
                {/* Address */}
                <div>
                  <p className="text-[13px] uppercase tracking-wide text-muted mb-1">
                    Morada
                  </p>
                  <p className="text-[16px] text-ink leading-snug">
                    R. Conselheiro Luís de Magalhães 31B
                    <br />
                    3800-137 Aveiro
                  </p>
                </div>

                {/* Email */}
                <div>
                  <p className="text-[13px] uppercase tracking-wide text-muted mb-1">
                    Email
                  </p>
                  <a
                    href="mailto:ola@revtogo.pt"
                    className="text-[16px] font-semibold text-ink hover:text-primary transition-colors"
                  >
                    ola@revtogo.pt
                  </a>
                </div>

                {/* Phone */}
                <div>
                  <p className="text-[13px] uppercase tracking-wide text-muted mb-1">
                    Telefone
                  </p>
                  <a
                    href="tel:+351928347379"
                    className="text-[16px] font-semibold text-ink hover:text-primary transition-colors"
                  >
                    +351 928 347 379
                  </a>
                </div>

                {/* Social icons */}
                <div className="flex items-center gap-4 pt-2">
                  <a
                    href="https://www.instagram.com/revtogopt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src="/icons/ig.png"
                      alt="Instagram"
                      width={20}
                      height={20}
                    />
                  </a>

                  <a
                    href="https://www.facebook.com/revtogopt"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="opacity-70 hover:opacity-100 transition-opacity"
                  >
                    <Image
                      src="/icons/fb.png"
                      alt="Facebook"
                      width={20}
                      height={20}
                    />
                  </a>
                </div>
              </div>
            </div>

            {/* ===== RIGHT COLUMN ===== */}
            <ContactForm />
          </motion.div>
        </div>
      </section>

      {/* ===== MAP SECTION ===== */}
      <section className="mt-20 md:mt-30">
        <ContactMap />
      </section>
    </>
  );
}
