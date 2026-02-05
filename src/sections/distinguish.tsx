"use client";

import Image from "next/image";
import clsx from "clsx";

const ROWS = [
  {
    revtogo: "Desenhada para a identidade do negócio",
    generic: "Design padrão",
  },
  {
    revtogo: "Pronta a usar, sem configuração",
    generic: "Configuração manual necessária",
  },
  {
    revtogo: "Acabamento premium e atenção ao detalhe",
    generic: "Acabamento standard",
  },
  {
    revtogo: "Vê o design antes de comprar",
    generic: "Pagamento antes de ver o resultado",
  },
  {
    revtogo: "Suporte dedicado e reparações incluídas",
    generic: "Sem suporte",
  },
  {
    revtogo:
      "Aplicação web exclusiva para acompanhar scans e avaliações (incluída, sem mensalidades)",
    generic: "Sem aplicação dedicada",
  },
];

export function DistinguishSection() {
  return (
    <section className="bg-surface py-10 md:py-17">
      <div className="mx-auto max-w-6xl px-4">
        {/* ===== TITLE ===== */}
        <h2 className="text-center text-[26px] md:text-[32px] font-semibold text-ink mb-5 md:mb-8">
          O que nos{" "}
          <span className="text-primary">distingue?</span>
        </h2>

        {/* ===== TABLE ===== */}
        <div className="overflow-hidden rounded-2xl border border-ink/10">
          {/* ===== HEADER ===== */}
          <div className="grid grid-cols-2 bg-[#0B1220] text-white">
            {/* Revtogo */}
            <div className="flex flex-col items-center py-4 gap-1">
              <span className="text-[16px] md:text-[20px] font-semibold">
                Placa Revtogo
              </span>
              <Image
                src="/icons/revtogo_plate.png"
                className="rounded-[14px]"
                alt=""
                width={72}
                height={72}
              />
            </div>

            {/* Generic */}
            <div className="flex flex-col items-center py-4 gap-1">
              <span className="text-[16px] md:text-[20px] font-semibold">
                Soluções genéricas
              </span>
              <Image
                src="/icons/generic_plate.png"
                className="rounded-[14px]"
                alt=""
                width={72}
                height={72}
              />
            </div>
          </div>

          {/* ===== BODY ===== */}
            <div className="grid grid-cols-2">
            {ROWS.map((row, i) => (
                <div key={i} className="contents">
                {/* Revtogo cell */}
                <div
                    className={clsx(
                    "bg-primary/6 px-4 md:px-6 py-6",
                    "flex flex-col items-center justify-center text-center",
                    i !== ROWS.length - 1 &&
                        "border-b border-primary/10"
                    )}
                >
                    <Image
                    src="/icons/check.png"
                    alt=""
                    width={18}
                    height={18}
                    className="mb-2"
                    />
                    <p className="text-[14px] md:text-[16px] font-medium text-ink leading-snug">
                    {row.revtogo}
                    </p>
                </div>

                {/* Generic cell */}
                <div
                    className={clsx(
                    "px-4 md:px-6 py-6",
                    "flex items-center justify-center text-center",
                    i !== ROWS.length - 1 &&
                        "border-b border-ink/10"
                    )}
                >
                    <p className="text-[14px] md:text-[16px] text-ink/80 leading-snug">
                    — {row.generic}
                    </p>
                </div>
                </div>
            ))}
            </div>

        </div>
      </div>
    </section>
  );
}
