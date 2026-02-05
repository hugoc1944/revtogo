import { LegalPage } from "@/components/legal-page";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Termos e Condições | Revtogo",
  description:
    "Termos e condições de utilização do website Revtogo e aquisição dos seus produtos.",

  alternates: {
    canonical: "https://revtogo.pt/termos-e-condicoes",
  },

  robots: {
    index: false,
    follow: true,
  },
};

export default function TermsConditionsPage() {
  return (
    <LegalPage title="Termos e Condições" lastUpdated="05/02/2026">
      <p>
        Os presentes Termos e Condições regulam o acesso e a utilização do
        website Revtogo, bem como a aquisição dos produtos físicos nele
        disponibilizados.
      </p>

      <p>
        Ao navegar no website, solicitar um design ou adquirir um produto
        Revtogo, o utilizador declara que leu, compreendeu e aceita os presentes
        Termos e Condições.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        1. Identificação do prestador
      </h2>

      <p>A Revtogo é uma marca desenvolvida e operada por:</p>

      <p className="mt-4">
        <strong>HUGO ALBERTO SOARES CURTO</strong>
        <br />
        NIF: 266 909 213
        <br />
        Morada: R. Conselheiro Luís de Magalhães nº31B, 1º DTO,
        3800-137 Aveiro, Portugal
        <br />
        Email:{" "}
        <a
          href="mailto:ola@revtogo.pt"
          className="underline hover:text-primary"
        >
          ola@revtogo.pt
        </a>
        <br />
        Telefone:{" "}
        <a
          href="tel:+351928347379"
          className="underline hover:text-primary"
        >
          +351 928 347 379
        </a>
      </p>

      <p className="mt-4">
        A atividade é exercida legalmente em Portugal, com faturação efetuada
        através da plataforma Moloni ON, em conformidade com a Autoridade
        Tributária.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        2. Objeto
      </h2>

      <p>
        A Revtogo comercializa placas físicas personalizadas com tecnologia NFC
        e QR code, concebidas para facilitar o acesso à página de avaliação de
        negócios em plataformas de terceiros, nomeadamente o Google.
      </p>

      <p>
        A Revtogo não presta serviços de marketing, não garante resultados e não
        interfere com o conteúdo, publicação ou moderação de avaliações.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        3. Processo de encomenda
      </h2>

      <p>
        O processo de aquisição da placa Revtogo segue um modelo de aprovação
        prévia:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>O utilizador solicita um design para o seu negócio</li>
        <li>O design é apresentado para visualização e aprovação</li>
        <li>
          O pagamento apenas é solicitado após a aprovação do design pelo
          cliente
        </li>
        <li>Após o pagamento, a placa entra em produção</li>
      </ul>

      <p className="mt-4">
        A Revtogo reserva-se o direito de recusar pedidos que violem a lei, os
        presentes Termos ou direitos de terceiros.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        4. Preços e pagamento
      </h2>

      <p>
        Os preços apresentados no website são indicados em euros e incluem os
        impostos legalmente aplicáveis, salvo indicação em contrário.
      </p>

      <p>
        Os métodos de pagamento disponíveis incluem MB Way, Multibanco,
        pagamentos por cartão, transferência bancária, Apple Pay e Google Pay.
      </p>

      <p>O pagamento é devido apenas após a aprovação do design pelo cliente.</p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        5. Produção e entrega
      </h2>

      <p>
        Após a confirmação do pagamento, a placa entra em produção. Os prazos de
        produção e entrega são estimados e podem variar consoante fatores
        logísticos.
      </p>

      <p>
        A entrega é efetuada em território nacional, incluindo continente e
        ilhas, com envio gratuito.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        6. Direito de devolução e reembolso
      </h2>

      <p>
        O cliente dispõe de um prazo de 30 dias para solicitar a devolução do
        produto, nos termos definidos na nossa{" "}
        <Link
          href="/politica-de-reembolso"
          className="underline hover:text-primary"
        >
          Política de Reembolso
        </Link>
        .
      </p>

      <p>
        As condições completas aplicáveis a devoluções e reembolsos encontram-se
        descritas na respetiva política, que faz parte integrante dos presentes
        Termos.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        7. Limitação de responsabilidade
      </h2>

      <p>
        A Revtogo não controla, modera, garante ou influencia as avaliações
        publicadas em plataformas de terceiros, nem as respetivas políticas,
        critérios ou decisões.
      </p>

      <p>
        A Revtogo não garante qualquer resultado específico, nomeadamente número
        de avaliações, classificações ou impacto em visibilidade online.
      </p>

      <p>
        A responsabilidade da Revtogo limita-se ao fornecimento do produto
        físico em conformidade com a descrição apresentada.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        8. Propriedade intelectual
      </h2>

      <p>
        Os designs criados pela Revtogo são desenvolvidos com base nas
        informações fornecidas pelo cliente.
      </p>

      <p>
        O cliente declara deter os direitos necessários sobre logótipos,
        marcas, textos ou outros elementos fornecidos para personalização da
        placa, assumindo total responsabilidade pela sua utilização.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        9. Proteção de dados
      </h2>

      <p>
        O tratamento de dados pessoais é efetuado de acordo com a nossa{" "}
        <Link
          href="/politica-de-privacidade"
          className="underline hover:text-primary"
        >
          Política de Privacidade
        </Link>
        , em conformidade com o RGPD.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        10. Alterações aos termos
      </h2>

      <p>
        A Revtogo reserva-se o direito de atualizar os presentes Termos e
        Condições sempre que necessário. As alterações produzem efeitos após a
        sua publicação no website.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        11. Lei aplicável e resolução de litígios
      </h2>

      <p>Os presentes Termos e Condições são regidos pela lei portuguesa.</p>

      <p>
        Em caso de litígio de consumo, o consumidor pode recorrer a uma entidade
        de resolução alternativa de litígios, nos termos da legislação em vigor,
        nomeadamente o Centro de Arbitragem de Conflitos de Consumo.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        12. Contactos
      </h2>

      <p>
        Para qualquer questão relacionada com os presentes Termos e Condições,
        o utilizador pode contactar-nos através do email{" "}
        <a
          href="mailto:ola@revtogo.pt"
          className="underline hover:text-primary"
        >
          ola@revtogo.pt
        </a>
        .
      </p>
    </LegalPage>
  );
}
