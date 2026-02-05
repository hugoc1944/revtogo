import { LegalPage } from "@/components/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Reembolso | Revtogo",
  description:
    "Condições, prazos e procedimentos aplicáveis a devoluções e reembolsos de produtos Revtogo.",

  alternates: {
    canonical: "https://revtogo.pt/politica-de-reembolso",
  },

  robots: {
    index: false,
    follow: true,
  },
};

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Política de Reembolso" lastUpdated="05/02/2026">
      <p>
        A presente Política de Reembolso aplica-se à compra de produtos físicos
        Revtogo efetuada através do nosso website e descreve as condições,
        prazos e procedimentos aplicáveis a devoluções e reembolsos.
      </p>

      <p>
        A Revtogo compromete-se a oferecer um processo de devolução simples,
        transparente e justo, em conformidade com a legislação portuguesa e
        europeia aplicável.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        1. Prazo de devolução
      </h2>

      <p>
        O cliente pode solicitar a devolução da placa Revtogo no prazo de{" "}
        <strong>30 dias</strong> a contar da data de receção do produto.
      </p>

      <p>
        Este prazo aplica-se independentemente do motivo da devolução, desde que
        sejam cumpridas as condições descritas abaixo.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        2. Condições para aceitação da devolução
      </h2>

      <p>
        Para que a devolução seja aceite e o reembolso processado, é necessário
        que:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>O pedido seja efetuado dentro do prazo de 30 dias</li>
        <li>
          A placa seja devolvida em bom estado, sem danos significativos que
          comprometam a sua integridade
        </li>
        <li>
          O produto seja devolvido na{" "}
          <strong>embalagem original da placa</strong> (caixa do produto)
        </li>
      </ul>

      <p className="mt-4">
        A embalagem de transporte utilizada pelo transportador não é relevante
        para efeitos de devolução, sendo apenas necessária a caixa original do
        produto.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        3. Danos no produto
      </h2>

      <p>
        Caso a placa apresente{" "}
        <strong>danos significativos</strong> resultantes de utilização
        inadequada, impacto, quebra ou desgaste anormal, a Revtogo reserva-se o
        direito de não aceitar a devolução ou de não proceder ao reembolso.
      </p>

      <p>
        Pequenos sinais de manuseamento normal não comprometem, por si só, o
        direito à devolução.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        4. Custos de devolução
      </h2>

      <p>
        A devolução da placa é realizada{" "}
        <strong>sem custos para o cliente</strong>.
      </p>

      <p>
        Após a validação do pedido de devolução, a Revtogo fornecerá as
        instruções necessárias para o envio do produto.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        5. Reembolso
      </h2>

      <p>
        Após a receção e verificação do estado do produto devolvido, a Revtogo
        procederá ao reembolso total do valor pago.
      </p>

      <p>
        O reembolso será efetuado através do mesmo método de pagamento utilizado
        na compra, num prazo razoável após a validação da devolução, podendo o
        tempo de processamento variar consoante a entidade bancária.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        6. Como solicitar uma devolução
      </h2>

      <p>
        Para solicitar uma devolução, o cliente deverá entrar em contacto com a
        Revtogo através do email <strong>ola@revtogo.pt</strong>, indicando:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>Nome e email associados à encomenda</li>
        <li>Motivo da devolução</li>
      </ul>

      <p className="mt-4">
        Após o contacto, a nossa equipa fornecerá todas as informações
        necessárias para dar seguimento ao processo.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        7. Alterações a esta política
      </h2>

      <p>
        A Revtogo reserva-se o direito de atualizar a presente Política de
        Reembolso sempre que necessário. Quaisquer alterações serão publicadas
        nesta página, com indicação da data da última atualização.
      </p>
    </LegalPage>
  );
}
