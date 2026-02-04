"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDesignRequestStore } from "@/stores/design-request.store";
import clsx from "clsx";

export function StepNotes() {
  const { data, update, next, back } = useDesignRequestStore();

  const [wantsNotes, setWantsNotes] = useState<boolean | null>(
    data.notes ? true : null
  );
  const [notes, setNotes] = useState(data.notes ?? "");

  useEffect(() => {
    if (data.notes) {
      setNotes(data.notes);
      setWantsNotes(true);
    }
  }, [data.notes]);

  const handleNo = () => {
    update({ notes: undefined });
    next();
  };

  const handleContinue = () => {
    update({
      notes: notes.trim() || undefined,
    });

    next();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h4 className="text-[18px] font-semibold text-ink">
          Quer deixar alguma nota para o designer?
        </h4>
        <p className="text-[14px] text-muted mt-1">
          Opcional, mas pode ajudar a alinhar o design com o que imagina.
        </p>
      </div>

      {/* Yes / No */}
      {wantsNotes === null && (
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={() => setWantsNotes(true)}
            className="
              w-full
              rounded-2xl
              border
              border-black/10
              bg-bg
              px-4
              py-4
              text-left
              transition
              hover:border-black/20
              cursor-pointer
            "
          >
            <span className="text-[15px] font-semibold text-ink">
              Sim
            </span>
            <p className="text-[13px] text-muted mt-1">
              Quero deixar algumas indicações.
            </p>
          </button>

          <button
            type="button"
            onClick={handleNo}
            className="
              w-full
              rounded-2xl
              border
              border-black/10
              bg-bg
              px-4
              py-4
              text-left
              transition
              hover:border-black/20
              cursor-pointer
            "
          >
            <span className="text-[15px] font-semibold text-ink">
              Não
            </span>
            <p className="text-[13px] text-muted mt-1">
              Deixo convosco!
            </p>
          </button>
        </div>
      )}

      {/* Notes textarea (animated) */}
      <AnimatePresence>
        {wantsNotes === true && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex flex-col gap-4"
          >
            <div className="flex flex-col gap-1">
              <textarea
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                placeholder={
                  "Exemplos:\n• Preferimos cores mais escuras\n• Estilo moderno e simples\n• Algo discreto, sem muitos elementos"
                }
                rows={5}
                maxLength={500}
                className="
                  w-full
                  rounded-[12px]
                  border border-neutral-300
                  bg-bg
                  px-3 py-3
                  text-[15px]
                  text-ink
                  placeholder:text-muted
                  focus:outline-none
                  focus:ring-2
                  focus:ring-primary
                  focus:border-transparent
                  resize-none
                "
              />

              <div className="flex justify-between mt-1">
                <span className="text-[12px] text-muted">
                  Máx. 500 caracteres
                </span>
                <span className="text-[12px] text-muted">
                  {notes.length}/500
                </span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2">
              <button
                onClick={back}
                className="
                  text-[14px]
                  font-medium
                  text-muted
                  hover:text-ink
                  transition
                  cursor-pointer
                "
              >
                Voltar
              </button>

              <button
                onClick={handleContinue}
                className="
                  px-5
                  py-3
                  rounded-xl
                  text-[14px]
                  font-semibold
                  bg-primary
                  text-white
                  transition
                  cursor-pointer
                "
              >
                Continuar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Back button when still choosing Yes / No */}
      {wantsNotes === null && (
        <div className="pt-2">
          <button
            onClick={back}
            className="
              text-[14px]
              font-medium
              text-muted
              hover:text-ink
              transition
              cursor-pointer
            "
          >
            Voltar
          </button>
        </div>
      )}
    </div>
  );
}
