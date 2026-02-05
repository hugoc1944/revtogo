import { LegalPage } from "@/components/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Privacidade | Revtogo",
  description:
    "Saiba como a Revtogo recolhe, utiliza e protege os dados pessoais dos utilizadores, em conformidade com o RGPD.",

  alternates: {
    canonical: "https://revtogo.pt/politica-de-privacidade",
  },

  robots: {
    index: false,
    follow: true,
  },
};

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Política de Privacidade" lastUpdated="05/02/2026">
      <p>
        A presente Política de Privacidade descreve de que forma a Revtogo
        recolhe, utiliza, conserva e protege os dados pessoais dos utilizadores
        que visitam o nosso website ou interagem com os nossos serviços.
      </p>

      <p>
        A Revtogo compromete-se a tratar os dados pessoais de forma lícita,
        transparente e segura, em conformidade com o Regulamento Geral sobre a
        Proteção de Dados (RGPD) e a legislação portuguesa aplicável.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        1. Responsável pelo tratamento
      </h2>

      <p>
        O responsável pelo tratamento dos dados pessoais é a Revtogo, marca
        operada a partir de Portugal. Para qualquer questão relacionada com a
        proteção de dados, pode contactar-nos através do email{" "}
        <strong>ola@revtogo.pt</strong>.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        2. Dados pessoais recolhidos
      </h2>

      <p>
        A Revtogo pode recolher os seguintes dados pessoais, consoante a forma
        como o utilizador interage com o website:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>Nome e apelido</li>
        <li>Endereço de email</li>
        <li>Número de telefone</li>
        <li>Nome do negócio ou estabelecimento</li>
        <li>Informações enviadas através de formulários de contacto</li>
        <li>Dados necessários para envio de designs e comunicação pré-venda</li>
        <li>
          Dados necessários para suporte, garantia, devoluções ou substituições
          após a compra
        </li>
      </ul>

      <p className="mt-4">
        Não recolhemos dados pessoais sensíveis nem utilizamos os dados para fins
        alheios à atividade da Revtogo.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        3. Finalidades do tratamento
      </h2>

      <p>
        Os dados pessoais são tratados exclusivamente para as seguintes
        finalidades:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>Responder a pedidos enviados através do formulário de contacto</li>
        <li>
          Enviar e gerir pedidos de design da placa Revtogo, antes da decisão de
          compra
        </li>
        <li>Comunicar com o utilizador no âmbito do processo pré-contratual</li>
        <li>Processar encomendas, pagamentos e entregas</li>
        <li>
          Prestar suporte ao cliente, incluindo assistência, devoluções e
          substituições
        </li>
        <li>Cumprir obrigações legais e fiscais aplicáveis</li>
      </ul>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        4. Fundamento legal
      </h2>

      <p>
        O tratamento dos dados pessoais baseia-se nos seguintes fundamentos
        legais:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>
          Execução de diligências pré-contratuais solicitadas pelo utilizador
        </li>
        <li>Execução de contrato, quando exista uma compra efetiva</li>
        <li>
          Interesse legítimo da Revtogo em prestar apoio, esclarecer pedidos e
          melhorar os seus serviços
        </li>
        <li>Cumprimento de obrigações legais</li>
      </ul>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        5. Conservação dos dados
      </h2>

      <p>
        A Revtogo conserva os dados pessoais apenas durante o período estritamente
        necessário para cumprir as finalidades para as quais foram recolhidos:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>
          Pedidos de design que não resultem em compra são eliminados até 3 meses
          após o último contacto
        </li>
        <li>
          Pedidos de contacto são eliminados após a conclusão e encerramento da
          comunicação
        </li>
        <li>
          Dados de clientes são conservados enquanto necessários para suporte,
          garantia, devoluções e cumprimento de obrigações legais
        </li>
      </ul>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        6. Partilha de dados com terceiros
      </h2>

      <p>
        Os dados pessoais podem ser tratados por entidades terceiras apenas na
        medida do necessário para o funcionamento do website e dos serviços,
        nomeadamente:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>Prestadores de serviços de alojamento e infraestrutura</li>
        <li>Ferramentas de análise e marketing (Google Analytics, Google Ads)</li>
        <li>Ferramentas de gestão de consentimento e prevenção de spam</li>
      </ul>

      <p className="mt-4">
        Estas entidades tratam os dados de acordo com as instruções da Revtogo e
        em conformidade com o RGPD.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        7. Direitos do titular dos dados
      </h2>

      <p>
        Nos termos da legislação aplicável, o utilizador tem o direito de:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>Aceder aos seus dados pessoais</li>
        <li>Solicitar a retificação de dados inexatos ou incompletos</li>
        <li>Solicitar o apagamento dos dados, quando legalmente aplicável</li>
        <li>Opor-se ao tratamento dos dados ou solicitar a sua limitação</li>
        <li>Solicitar a portabilidade dos dados</li>
      </ul>

      <p className="mt-4">
        Para exercer qualquer destes direitos, o utilizador pode contactar-nos
        através do email <strong>ola@revtogo.pt</strong>.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        8. Segurança dos dados
      </h2>

      <p>
        A Revtogo adota medidas técnicas e organizativas adequadas para proteger
        os dados pessoais contra perda, uso indevido, acesso não autorizado ou
        divulgação indevida.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        9. Alterações a esta política
      </h2>

      <p>
        A Revtogo pode atualizar esta Política de Privacidade sempre que
        necessário. Quaisquer alterações serão publicadas nesta página, com
        indicação da data da última atualização.
      </p>
    </LegalPage>
  );
}
