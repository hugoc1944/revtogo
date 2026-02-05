import { LegalPage } from "@/components/legal-page";

export default function PrivacyPolicyPage() {
  return (
    <LegalPage title="Política de Privacidade" lastUpdated="26/12/2025">
      <p>
        Esta Política de Privacidade descreve como a Revtogo recolhe, utiliza e
        protege os dados pessoais dos utilizadores que visitam o website ou
        utilizam os nossos serviços.
      </p>

      <p>
        Para efeitos desta política, “utilizador” refere-se a qualquer pessoa
        que aceda, navegue ou interaja com a plataforma Revtogo.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        Dados recolhidos
      </h2>

      <p>
        Podemos recolher informações pessoais como nome, endereço de email,
        contactos, dados de faturação e informações relacionadas com a utilização
        do serviço.
      </p>

      <p>
        Estes dados são utilizados exclusivamente para efeitos operacionais,
        comunicação, suporte ao cliente e melhoria contínua da experiência.
      </p>
    </LegalPage>
  );
}
