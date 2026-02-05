"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import clsx from "clsx";

export function ContactForm() {
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData(e.currentTarget);

    const payload = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    const res = await fetch("/api/contact", {
      method: "POST",
      body: JSON.stringify(payload),
    });

    setLoading(false);
    if (res.ok) setSuccess(true);
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onSubmit={handleSubmit}
            className="flex flex-col gap-4"
          >
            {/* Form title */}
            <h3 className="text-[20px] font-semibold text-ink mb-1">
              Envie-nos uma mensagem
            </h3>

            <p className="text-[14px] text-ink/70 mb-3">
              Preencha o formulário e entraremos em contacto consigo.
            </p>

            <div className="grid grid-cols-2 gap-3">
              <input
                name="firstName"
                placeholder="Nome"
                required
                className="h-12 rounded-xl border border-ink/15 px-4 text-[15px] focus:outline-none focus:border-primary"
              />
              <input
                name="lastName"
                placeholder="Apelido"
                required
                className="h-12 rounded-xl border border-ink/15 px-4 text-[15px] focus:outline-none focus:border-primary"
              />
            </div>

            <input
              name="email"
              type="email"
              placeholder="Email"
              required
              className="h-12 rounded-xl border border-ink/15 px-4 text-[15px] focus:outline-none focus:border-primary"
            />

            <textarea
              name="message"
              placeholder="A sua mensagem"
              required
              rows={4}
              className="rounded-xl border border-ink/15 px-4 py-3 text-[15px] focus:outline-none focus:border-primary"
            />

            <button
              disabled={loading}
              className="
                mt-2
                h-12
                rounded-xl
                bg-primary
                text-white
                font-semibold
                cursor-pointer
                shadow-[0_12px_30px_rgba(0,0,0,0.15)]
                transition-all
                duration-300
                hover:-translate-y-[1px]
                hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]
                active:translate-y-[1px]
              "
            >
              {loading ? "A enviar..." : "Enviar mensagem"}
            </button>
          </motion.form>
        ) : (
          <motion.div
            key="success"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="py-12 text-center"
          >
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
