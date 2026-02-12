import Image from "next/image";
import { Accordion } from "@/components/accordion";
import { BusinessInput } from "@/components/business-input";
import { useDesignRequestStore } from "@/stores/design-request.store";

export function ProductInfo() {
  const openDesignRequest = useDesignRequestStore((s) => s.open);
  const { data, update } = useDesignRequestStore();
  
  return (
    <div className="flex flex-col gap-5 md:gap-6 px-1">
      {/* ===== TITLE ===== */}
      <div>
        <h2 className="text-[31px] font-semibold text-ink mb-1">
          Placa Revtogo+
        </h2>
        <p className="text-[16px] font-semibold text-ink/80 -mt-1">
          Placa de avaliações no Google com Aproximação + QR code.
        </p>
      </div>

      {/* ===== FEATURES ===== */}
    <ul className="flex flex-col gap-4">
    {[
        "<strong>Valor único</strong> — Sem mensalidades!",
        "Pensada para a identidade <strong>do seu negócio</strong>",
        "Obtenha avaliações em <strong>5 segundos</strong>",
    ].map((text) => (
        <li key={text} className="flex flex-col gap-1">
        {/* icon + first line */}
        <div className="flex items-start gap-2 md:gap-3">
            <Image
            src="/icons/dot-product.png"
            alt=""
            width={24}
            height={18}
            className="flex-shrink-0 mt-[3px]"
            />

            <span
            className="text-[15px] md:text-[16px] text-ink"
            dangerouslySetInnerHTML={{ __html: text }}
            />
        </div>
        </li>
    ))}
    </ul>

    {/* ===== PRICE / RISK-FREE HIGHLIGHT ===== */}
    <div className="flex flex-col gap-3 mt-3 md:mt-0 max-w-fit">
    {/* Price (de-emphasized but readable) */}
    <div className="relative inline-flex items-end gap-2">
        <span className="relative text-[34px] font-semibold text-ink leading-none">
        €59,90

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
      <BusinessInput
        defaultValue={data.businessLabel}
        onBusinessSelect={(business) => {
          const label = business.formattedAddress
            ? `${business.name}, ${business.formattedAddress}`
            : business.name;

          update({
            businessName: business.name,
            businessLabel: label,
            googlePlaceId: business.placeId,
          });
        }}
      />



      {/* ===== CTA ===== */}
      <div>
        <button
          onClick={() => {
            window.dataLayer?.push({
              event: "design_request_start",
              source: "product_cta",
            });

            openDesignRequest();
          }}
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
                Recebe a placa, coloca-a no seu estabelecimento e começa a utilizá-la de imediato.
                <br /><br />
                O cliente aproxima o telemóvel da placa e é redirecionado diretamente para a página de avaliação do Google, onde pode deixar a sua opinião de forma simples e imediata.
              </>
            ),
          },
          {
            id: "guarantee",
            title: "Garantia de satisfação (30 dias)",
            content: (
              <>
                Se não ficar satisfeito com a placa, pode devolvê-la no prazo de 30 dias.
                <br /><br />
                O processo é simples e sem custos, com reembolso total.
              </>
            ),
          },
          {
            id: "shipping",
            title: "Entrega Nacional",
            content: (
              <>
                Após a produção da sua placa, o envio é feito através dos CTT Expresso.
                <br /><br />
                Entregamos em todo o território nacional, incluindo continente e ilhas, com envio <strong>gratuito</strong>, rápido e seguro.
              </>
            ),
          },
          {
            id: "details",
            title: "Detalhes do produto",
            content: (
              <>
                • Placa em acrílico PMMA transparente
                <br />
                • Dimensões: 14 × 14 cm
                <br />
                • Espessura: 6 mm
                <br />
                • NFC integrado e QR code
                <br />
                • Preparada e produzida em Portugal
                <br /><br />
                <em>Nota: superfícies metálicas podem interferir com a funcionalidade do NFC.</em>
              </>
            ),
          },
        ]}
      />

    </div>
  );
}
