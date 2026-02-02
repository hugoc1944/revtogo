import Image from "next/image";
import { Accordion } from "@/components/accordion";
import { BusinessInput } from "@/components/business-input";

export function ProductInfo() {
  return (
    <div className="flex flex-col gap-5 md:gap-6">
      {/* ===== TITLE ===== */}
      <div>
        <h2 className="text-[31px] font-semibold text-ink mb-1">
          Placa Revtogo+
        </h2>
        <p className="text-[16px] font-semibold text-ink/80 -mt-1">
          Placa de avaliações Google com aproximação + QR code.
        </p>
      </div>

      {/* ===== FEATURES ===== */}
      <ul className="flex flex-col gap-4">
        {[
          "<strong>Valor único</strong> — Sem mensalidades!",
          "Pensada para a identidade <strong>do seu negócio</strong>",
          "Obtenha avaliações em <strong>4 segundos</strong>",
        ].map((text) => (
          <li key={text} className="flex gap-2 md:gap-3 text-[15px] md:text-[16px] text-ink">
            <Image
              src="/icons/dot-product.png"
              alt=""
              width={24}
              height={18}
            />
            <span dangerouslySetInnerHTML={{ __html: text }} />
          </li>
        ))}
      </ul>

    {/* ===== PRICE / RISK-FREE HIGHLIGHT ===== */}
    <div className="flex flex-col gap-3 mt-3 md:mt-0 max-w-fit">
    {/* Price (de-emphasized but readable) */}
    <div className="relative inline-flex items-end gap-2">
        <span className="relative text-[34px] font-semibold text-ink leading-none">
        €56,95

        {/* Strike line – ONLY over price */}
        <span
            aria-hidden
            className="
            absolute
            left-[-4px]
            right-[-4px]
            top-1/2
            h-[3px]
            bg-primary/80
            -translate-y-1/2
            rounded-full
            "
        />
        </span>

        {/* IVA note */}
        <span className="text-[12px] text-muted/60 mb-[3px]">
        c/ IVA
        </span>
    </div>

    {/* Explanation / emphasis */}
    <div className="pl-2 border-l-2 border-primary/40">
        <p className="text-[15px] font-semibold text-ink leading-snug pr-2">
        Receba o design da sua placa por mensagem em 24h.
        </p>
        <p className="text-[15px] font-semibold text-primary">
        Sem compromisso.
        </p>
    </div>
    </div>


      {/* ===== GOOGLE INPUT ===== */}
      <BusinessInput placeholder="Escreva o nome do seu negócio aqui..." />

      {/* ===== CTA ===== */}
      <div>
        <button
          className="
            w-full
            bg-primary
            text-white
            py-4
            rounded-xl
            font-semibold
            cursor-pointer
            shadow-[0_12px_30px_rgba(0,0,0,0.15)]
            transition-all
            duration-300
            hover:-translate-y-[1px]
            hover:shadow-[0_16px_40px_rgba(0,0,0,0.18)]
            active:translate-y-[1px]
            active:shadow-[0_8px_20px_rgba(0,0,0,0.2)]
          "
        >
          Pedir o design da minha placa
        </button>

        <p className="mt-2 text-center text-[13px] text-muted">
          Só paga depois de ver e aprovar.
        </p>
      </div>

      {/* ===== ACCORDION ===== */}
      <Accordion
        items={[
          {
            id: "how-it-works",
            title: "Como funciona",
            content: (
              <>
                O cliente aproxima o telemóvel da placa e é
                redirecionado diretamente para a página de
                avaliação do Google.
              </>
            ),
          },
          {
            id: "guarantee",
            title: "Garantia de satisfação (30 dias)",
            content: (
              <>
                Se não ficar satisfeito, pode devolver a placa
                no prazo de 30 dias.
              </>
            ),
          },
          {
            id: "shipping",
            title: "Entrega Nacional",
            content: (
              <>
                Entregamos em todo o território nacional com
                envio rápido e seguro.
              </>
            ),
          },
          {
            id: "details",
            title: "Detalhes do produto",
            content: (
              <>
                Placa em acrílico premium com NFC e QR Code,
                pronta a usar.
              </>
            ),
          },
        ]}
      />
    </div>
  );
}
