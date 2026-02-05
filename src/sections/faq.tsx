"use client";

import { Accordion } from "@/components/accordion";

export function FAQSection() {
  return (
    <section id="faq" className="bg-bg pt-10 md:pt-17">
      <div className="mx-auto max-w-4xl px-5">
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
                    A grande maioria dos telemóveis modernos é compatível com NFC.
                    <br /><br />
                    Estimamos que <strong>mais de 90% dos smartphones em circulação</strong> consigam ler NFC sem qualquer configuração adicional.
                    <br /><br />
                    Em todos os casos, a placa inclui também <strong>QR code</strong>, garantindo compatibilidade com <strong>100% dos telemóveis</strong>.
                  </>
                ),
              },
              {
                id: "technology",
                title: "Como funciona a tecnologia sem contacto?",
                content: (
                  <>
                    O cliente aproxima o telemóvel da placa ou lê o QR code.
                    <br /><br />
                    A página de avaliação do Google abre automaticamente, sem apps, sem pesquisas e sem passos intermédios.
                  </>
                ),
              },
              {
                id: "placement",
                title: "Posso colocar a placa em qualquer espaço do meu negócio?",
                content: (
                  <>
                    Sim. A placa foi pensada para funcionar em contextos reais.
                    <br /><br />
                    Pode ser colocada em balcões, mesas, receções ou em qualquer zona de fácil acesso ao cliente.
                  </>
                ),
              },
              {
                id: "design-changes",
                title: "Posso pedir alterações ao design?",
                content: (
                  <>
                    Sim. Recebe primeiro o design da sua placa para aprovação.
                    <br /><br />
                    Após a aprovação e confirmação da compra, pode pedir ajustes ao design, para garantir que o resultado final corresponde exatamente ao que pretende.
                  </>
                ),
              },
              {
                id: "malfunction",
                title: "E se a minha placa parar de funcionar?",
                content: (
                  <>
                    Oferecemos suporte dedicado e reparações gratuitas.
                    <br /><br />
                    Caso exista algum problema técnico com a placa, tratamos da reparação ou substituição sem custos adicionais.
                  </>
                ),
              },
              {
                id: "contact",
                title: "Ainda tem alguma dúvida?",
                content: (
                  <>
                    Se tiver alguma questão adicional, estamos disponíveis para ajudar.
                    <br /><br />
                    Pode entrar em contacto connosco antes ou depois da compra através da nossa {" "}                    <a href="/contactos" className="underline">página de contactos</a>.
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
