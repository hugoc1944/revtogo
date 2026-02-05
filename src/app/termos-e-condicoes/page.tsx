import { LegalPage } from "@/components/legal-page";

export default function TermsAndConditionsPage() {
  return (
    <LegalPage title="Termos e Condições" lastUpdated="26/12/2025">
      <p>
        Estes Termos e Condições regulam o acesso e a utilização do website e dos
        serviços disponibilizados pela Revtogo.
      </p>

      <p>
        Ao utilizar os nossos serviços, o utilizador declara que leu, compreendeu
        e aceita os presentes termos.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        Utilização do serviço
      </h2>

      <p>
        O utilizador compromete-se a utilizar o website de forma responsável,
        ética e em conformidade com a legislação aplicável.
      </p>

      <p>
        A Revtogo reserva-se o direito de alterar, suspender ou descontinuar
        qualquer funcionalidade sem aviso prévio.
      </p>
    </LegalPage>
  );
}
