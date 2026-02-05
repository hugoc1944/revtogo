import { LegalPage } from "@/components/legal-page";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Política de Cookies | Revtogo",
  description:
    "Informação sobre a utilização de cookies no website Revtogo e como o utilizador pode gerir as suas preferências.",

  alternates: {
    canonical: "https://revtogo.pt/politica-de-cookies",
  },

  robots: {
    index: false,
    follow: true,
  },
};

export default function CookiesPolicyPage() {
  return (
    <LegalPage title="Política de Cookies" lastUpdated="05/02/2026">
      <p>
        A presente Política de Cookies explica como a Revtogo utiliza cookies e
        tecnologias semelhantes no seu website, bem como as opções disponíveis
        para o utilizador gerir essas preferências.
      </p>

      <p>
        Os cookies são pequenos ficheiros de texto armazenados no dispositivo do
        utilizador quando visita um website. Estes permitem garantir o correto
        funcionamento da plataforma, analisar padrões de utilização e melhorar
        a experiência de navegação.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        1. Tipos de cookies utilizados
      </h2>

      <p>
        A Revtogo utiliza diferentes categorias de cookies, consoante a sua
        finalidade:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-3">
        <li>
          <strong>Cookies essenciais</strong> - necessários para o funcionamento
          do website e para permitir funcionalidades básicas, como navegação e
          submissão de formulários. Estes cookies não podem ser desativados.
        </li>
        <li>
          <strong>Cookies analíticos</strong> - utilizados para recolher
          informação estatística sobre a utilização do website, permitindo-nos
          compreender como os visitantes interagem com as páginas e melhorar o
          desempenho geral.
        </li>
        <li>
          <strong>Cookies de marketing</strong> - utilizados para medir a
          eficácia de campanhas publicitárias e apresentar conteúdos mais
          relevantes, com base na interação do utilizador com o website.
        </li>
      </ul>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        2. Ferramentas e serviços de terceiros
      </h2>

      <p>
        O website da Revtogo pode recorrer a serviços de terceiros que utilizam
        cookies, nomeadamente:
      </p>

      <ul className="list-disc pl-6 mt-4 space-y-2">
        <li>Google Tag Manager</li>
        <li>Google Analytics</li>
        <li>Google Ads</li>
        <li>Meta (Facebook / Instagram)</li>
        <li>Ferramentas de prevenção de spam e segurança</li>
      </ul>

      <p className="mt-4">
        Estes serviços podem recolher informações como o endereço IP, tipo de
        dispositivo, navegador utilizado e comportamento de navegação, de forma
        agregada e anonimizada, sempre de acordo com as respetivas políticas de
        privacidade.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        3. Consentimento
      </h2>

      <p>
        Sempre que aplicável, os cookies não essenciais apenas são ativados após
        o consentimento explícito do utilizador, através do mecanismo de gestão
        de cookies disponível no website.
      </p>

      <p>
        O utilizador pode, a qualquer momento, alterar ou retirar o seu
        consentimento, ajustando as preferências de cookies no navegador ou
        através das definições disponibilizadas no website.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        4. Gestão de cookies
      </h2>

      <p>
        A maioria dos navegadores permite ao utilizador gerir ou eliminar
        cookies, bem como configurar alertas sempre que um cookie é armazenado.
      </p>

      <p>
        Note-se que a desativação de cookies essenciais pode comprometer o
        correto funcionamento de algumas funcionalidades do website.
      </p>

      <h2 className="text-[21px] md:text-[25px] font-semibold text-ink mt-10">
        5. Alterações a esta política
      </h2>

      <p>
        A Revtogo pode atualizar esta Política de Cookies sempre que necessário,
        refletindo alterações legais ou técnicas. Quaisquer alterações serão
        publicadas nesta página, com indicação da data da última atualização.
      </p>
    </LegalPage>
  );
}
