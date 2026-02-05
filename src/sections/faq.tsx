"use client";

import { Accordion } from "@/components/accordion";

export function FAQSection() {
  return (
    <section id="faq" className="bg-bg pt-10 md:pt-17">
      <div className="mx-auto max-w-4xl px-4">
        {/* ===== TITLE ===== */}
        <h2 className="text-center text-[28px] md:text-[34px] font-semibold text-ink mb-3 md:mb-5">
          Questões Frequentes
        </h2>

        {/* ===== FAQ ACCORDION ===== */}
        <div
          className="
            mx-auto
            max-w-3xl
            [&_button>span]:text-[16px]
            md:[&_button>span]:text-[18px]
            md:[&_button>span]:leading-[28px]
          "
        >
          <Accordion
            items={[
              {
                id: "compatibility",
                title: "A placa é compatível com todos os telemóveis?",
                content: (
                  <>
                    Sim. A placa funciona com todos os telemóveis modernos,
                    através de NFC ou QR Code.
                  </>
                ),
              },
              {
                id: "technology",
                title: "Como funciona a tecnologia sem contacto?",
                content: (
                  <>
                    O cliente aproxima o telemóvel da placa ou lê o QR Code e é
                    automaticamente redirecionado para a página de avaliação no
                    Google.
                  </>
                ),
              },
              {
                id: "placement",
                title:
                  "Posso colocar a placa em qualquer espaço do meu negócio?",
                content: (
                  <>
                    Sim. A placa pode ser colocada em balcões, mesas, receções
                    ou qualquer zona de fácil acesso ao cliente.
                  </>
                ),
              },
              {
                id: "design-changes",
                title: "Posso pedir alterações ao design?",
                content: (
                  <>
                    Claro. Recebe o design antes da produção e pode pedir
                    ajustes até ficar exatamente como deseja.
                  </>
                ),
              },
              {
                id: "malfunction",
                title: "E se a minha placa parar de funcionar?",
                content: (
                  <>
                    Oferecemos suporte e reparações gratuitas. Se houver algum
                    problema, tratamos da substituição.
                  </>
                ),
              },
              {
                id: "contact",
                title:
                  "Se tiver alguma dúvida adicional, pode falar connosco.",
                content: (
                  <>
                    Pode entrar em contacto connosco a qualquer momento.
                    Estamos disponíveis para ajudar antes e depois da compra.
                  </>
                ),
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
