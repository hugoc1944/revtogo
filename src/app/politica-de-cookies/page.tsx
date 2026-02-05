import { LegalPage } from "@/components/legal-page";

export default function CookiesPolicyPage() {
  return (
    <LegalPage title="Política de Cookies" lastUpdated="26/12/2025">
      <p>
        A presente Política de Cookies explica como a Revtogo utiliza cookies e
        tecnologias semelhantes para garantir o correto funcionamento do
        website.
      </p>

      <p>
        Os cookies permitem reconhecer o utilizador, analisar padrões de uso e
        melhorar a experiência de navegação.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        Tipos de cookies
      </h2>

      <p>
        Utilizamos cookies essenciais, funcionais e analíticos. Estes cookies
        não recolhem informações pessoais sensíveis.
      </p>

      <p>
        O utilizador pode configurar o seu navegador para recusar cookies,
        podendo isso afetar algumas funcionalidades do website.
      </p>
    </LegalPage>
  );
}
