"use client";

export function MultiplePlatesSection() {
  return (
    <section className="bg-bg pt-10 md:pt-25 pb-20 md:pb-24">
      <div className="mx-auto max-w-3xl px-4 text-center">
        {/* ===== TITLE ===== */}
        <h2 className="text-[26px] md:text-[32px] font-semibold text-ink mb-3">
          Precisa de várias placas?
        </h2>

        {/* ===== DESCRIPTION ===== */}
        <p className="text-[15px] max-w-[90%] mx-auto md:text-[18px] text-ink/80 leading-relaxed mb-4 md:mb-6">
          Se gere vários espaços ou uma rede de negócios, podemos adaptar às
          suas necessidades. Tratamos de{" "}
          <strong className="font-semibold text-ink">
            quantidades, personalização e consistência
          </strong>{" "}
          entre localizações.
        </p>

        {/* ===== CTA ===== */}
        <button
          className="
            inline-flex
            items-center
            justify-center
            px-8
            py-3.5
            bg-primary
            text-white
            font-semibold
            rounded-xl
            cursor-pointer
            shadow-[0_10px_30px_rgba(0,0,0,0.15)]
            transition-all
            duration-300
            hover:-translate-y-[1px]
            hover:shadow-[0_14px_40px_rgba(0,0,0,0.18)]
            active:translate-y-[1px]
            active:shadow-[0_6px_18px_rgba(0,0,0,0.2)]
          "
        >
          Pedir informações
        </button>
      </div>
    </section>
  );
}
