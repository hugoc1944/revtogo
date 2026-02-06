"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [acceptedPrivacy, setAcceptedPrivacy] = useState(false);

  const [startedAt] = useState(Date.now());


  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!acceptedPrivacy) return;

    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
      company: formData.get("company"), // honeypot
      startedAt,                        // timing
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok){
      window.dataLayer?.push({
        event: "contact_submit",
      });
      setSuccess(true);
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={clsx(
        "rounded-2xl border border-ink/10 bg-surface p-6 md:p-8"
      )}
    >
      <AnimatePresence mode="wait">
        {!success ? (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            <h3 className="text-[20px] font-semibold text-ink">
              Envie-nos uma mensagem
            </h3>

            <p className="text-[14px] text-ink/70">
              Preencha o formulário e entraremos em contacto consigo.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <input name="firstName" placeholder="Nome" required className="h-12 rounded-xl border px-4" />
              <input name="lastName" placeholder="Apelido" required className="h-12 rounded-xl border px-4" />
            </div>

            <input name="email" type="email" placeholder="Email" required className="h-12 rounded-xl border px-4" />

            <textarea name="message" placeholder="A sua mensagem" required rows={4} className="rounded-xl border px-4 py-3" />

            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
            />

            {/* Privacy consent */}
            <label className="flex items-start gap-3 text-[13px] text-muted">
              <input
                type="checkbox"
                required
                checked={acceptedPrivacy}
                onChange={(e) => setAcceptedPrivacy(e.target.checked)}
                className="mt-[2px] accent-primary"
              />
              <span>
                Li e aceito a{" "}
                <Link
                  href="/politica-de-privacidade"
                  target="_blank"
                  className="text-ink underline hover:text-primary"
                >
                  Política de Privacidade
                </Link>
                .
              </span>
            </label>

            <button
              disabled={loading || !acceptedPrivacy}
              className="
                mt-2 h-12 rounded-xl bg-primary text-white font-semibold
                disabled:opacity-50 disabled:cursor-not-allowed
              "
            >
              {loading ? "A enviar..." : "Enviar mensagem"}
            </button>
          </motion.form>
        ) : (
          <motion.div className="py-12 text-center">
            <h3 className="text-[21px] font-semibold text-ink mb-2">
              Mensagem enviada ✅
            </h3>
            <p className="text-[15px] text-ink/80 max-w-[320px] mx-auto">
              Obrigado pelo contacto. Vamos responder brevemente.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
