import { LegalPage } from "@/components/legal-page";

export default function RefundPolicyPage() {
  return (
    <LegalPage title="Política de Reembolsos" lastUpdated="26/12/2025">
      <p>
        A presente Política de Reembolsos define as condições aplicáveis a pedidos
        de devolução e reembolso de produtos adquiridos à Revtogo.
      </p>

      <p>
        Devido à natureza personalizada dos produtos, apenas são aceites
        reembolsos em casos de defeito de fabrico ou erro comprovado.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        Condições
      </h2>

      <p>
        Os pedidos de reembolso devem ser efetuados no prazo máximo de 14 dias
        após a receção do produto.
      </p>

      <p>
        Após validação, o reembolso será processado através do método de
        pagamento original.
      </p>
    </LegalPage>
  );
}
