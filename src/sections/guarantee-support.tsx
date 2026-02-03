import Image from "next/image";

export function GuaranteeSupportSection() {
  return (
    <section className="bg-surface py-10 md:py-15">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-6 md:gap-2 md:grid-cols-2 md:items-center">
          {/* ===== LEFT COLUMN (ITEMS) ===== */}
          <div className="flex flex-col gap-8 order-2 md:order-1">
            {/* Item 1 */}
            <div className="flex flex-col gap-2">
              {/* Icon + title */}
              <div className="flex items-start gap-4">
                <Image
                  src="/icons/check.png"
                  alt=""
                  width={22}
                  height={22}
                  className="mt-[2px] flex-shrink-0"
                />

                <h4 className="text-[21px] font-semibold text-ink">
                  Garantia de satisfação 30 dias e Suporte
                </h4>
              </div>

              {/* Description */}
              <p className="ml-[38px] text-[16px] text-ink/80 leading-relaxed">
                Não ficou satisfeito? <strong>Reembolso total</strong>, sem
                complicações.
                <br />
                Inclui <strong>suporte e substituição</strong> sem custos em caso
                de falha.
              </p>
            </div>

            {/* Item 2 */}
            <div className="flex flex-col gap-0 md:gap-2">
              {/* Icon + title */}
              <div className="flex items-start gap-4">
                <Image
                  src="/icons/check.png"
                  alt=""
                  width={22}
                  height={22}
                  className="mt-[2px] flex-shrink-0"
                />

                <h4 className="text-[21px] font-semibold text-ink">
                  Conceção e produção em Portugal
                </h4>
              </div>

              {/* Description */}
              <p className="ml-[38px] text-[16px] text-ink/80 leading-relaxed">
                Concebida e produzida em <strong>Portugal</strong>, com controlo
                de qualidade.
              </p>
            </div>
          </div>

          {/* ===== RIGHT COLUMN (TITLE) ===== */}
          <div className="order-1 md:order-2">
            <h3 className="text-[28px] text-center md:text-left md:text-[36px] font-bold text-ink leading-tight ">
              Qualidade, suporte e confiança
              <br />
              <span className="text-primary">Uma decisão segura</span>
            </h3>
          </div>
        </div>
      </div>
    </section>
  );
}
