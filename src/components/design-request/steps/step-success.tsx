"use client";

import { useDesignRequestStore } from "@/stores/design-request.store";

export function StepSuccess() {
  const { close, reset } = useDesignRequestStore();

  return (
    <div className="flex flex-col gap-6 text-center py-6">
      <div className="text-[40px]">✅</div>

      <h4 className="text-[20px] font-semibold text-ink">
        Pedido enviado com sucesso!
      </h4>

      <p className="text-[15px] text-muted leading-relaxed">
        Vamos preparar o design da sua placa e entrar em contacto
        consigo <strong>nas próximas 24h</strong>.
      </p>

      <p className="text-[14px] text-muted">
        Enviámos também um email de confirmação para o seu endereço.
        <br />
        <span className="text-muted/70">
          (Verifique a pasta de spam, por precaução.)
        </span>
      </p>

      <button
        onClick={() => {
          reset();
          close();
        }}
        className="
          mt-4
          px-6
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
        Fechar
      </button>
    </div>
  );
}
