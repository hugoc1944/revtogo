"use client";

import { useEffect, useState } from "react";
import { useDesignRequestStore } from "@/stores/design-request.store";

function isValidEmail(email: string) {
  return /\S+@\S+\.\S+/.test(email);
}

export function StepContact() {
  const { data, update, next, back } = useDesignRequestStore();

  const [firstName, setFirstName] = useState(
    data.contactFirstName ?? ""
  );
  const [lastName, setLastName] = useState(
    data.contactLastName ?? ""
  );
  const [email, setEmail] = useState(
    data.contactEmail ?? ""
  );
  const [phone, setPhone] = useState(
    data.contactPhone ?? ""
  );

  // Prefill
  useEffect(() => {
    if (data.contactFirstName) setFirstName(data.contactFirstName);
    if (data.contactLastName) setLastName(data.contactLastName);
    if (data.contactEmail) setEmail(data.contactEmail);
    if (data.contactPhone) setPhone(data.contactPhone);
  }, [
    data.contactFirstName,
    data.contactLastName,
    data.contactEmail,
    data.contactPhone,
  ]);

  const canContinue =
    firstName.trim().length > 0 &&
    lastName.trim().length > 0 &&
    isValidEmail(email.trim());

  const handleContinue = () => {
    if (!canContinue) return;

    update({
      contactFirstName: firstName.trim(),
      contactLastName: lastName.trim(),
      contactEmail: email.trim(),
      contactPhone: phone.trim() || undefined,
    });

    next();
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h4 className="text-[18px] font-semibold text-ink">
          Como podemos entrar em contacto?
        </h4>
      </div>

      {/* First + Last name */}
      <div className="grid grid-cols-2 gap-3">
        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-ink">
            Primeiro nome
          </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="O seu primeiro nome"
            className="
              w-full
              rounded-[10px]
              border border-neutral-300
              bg-bg
              px-3 py-2.5
              text-[15px]
              text-ink
              placeholder:text-muted
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:border-transparent
            "
          />
        </div>

        <div className="flex flex-col gap-1">
          <label className="text-[13px] font-medium text-ink">
            Apelido
          </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="O seu apelido"
            className="
              w-full
              rounded-[10px]
              border border-neutral-300
              bg-bg
              px-3 py-2.5
              text-[15px]
              text-ink
              placeholder:text-muted
              focus:outline-none
              focus:ring-2
              focus:ring-primary
              focus:border-transparent
            "
          />
        </div>
      </div>

      {/* Email */}
      <div className="flex flex-col gap-1">
        <label className="text-[13px] font-medium text-ink">
          Email
        </label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="O seu email"
          className="
            w-full
            rounded-[10px]
            border border-neutral-300
            bg-bg
            px-3 py-2.5
            text-[15px]
            text-ink
            placeholder:text-muted
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            focus:border-transparent
          "
        />

        {email.length > 0 && !isValidEmail(email) && (
          <p className="text-[12px] text-red-500 mt-1">
            Introduza um email válido
          </p>
        )}
      </div>

      {/* Phone */}
      <div className="flex flex-col gap-1">
        <label className="text-[13px] font-medium text-ink">
          Telemóvel <span className="text-muted">(opcional)</span>
        </label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="O seu número"
          className="
            w-full
            rounded-[10px]
            border border-neutral-300
            bg-bg
            px-3 py-2.5
            text-[15px]
            text-ink
            placeholder:text-muted
            focus:outline-none
            focus:ring-2
            focus:ring-primary
            focus:border-transparent
          "
        />
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
          disabled={!canContinue}
          className="
            px-5
            py-3
            rounded-xl
            text-[14px]
            font-semibold
            bg-primary
            text-white
            transition
            disabled:opacity-40
            disabled:cursor-not-allowed
            cursor-pointer
          "
        >
          Continuar
        </button>
      </div>
    </div>
  );
}
