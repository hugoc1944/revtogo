import type { Metadata } from "next";
import { AboutContent } from "./about-content";

export const metadata: Metadata = {
  title: "Sobre a Revtogo | Menos fricção, mais avaliações reais",
  description:
    "Conheça a Revtogo: a marca por trás da placa de avaliações Google por aproximação. Design, tecnologia invisível e foco na experiência do cliente.",

  alternates: {
    canonical: "https://revtogo.pt/sobre-nos",
  },

  openGraph: {
    title: "Sobre a Revtogo | Menos fricção, mais avaliações reais",
    description:
      "A Revtogo nasceu para tornar as avaliações no Google um gesto natural, imediato e sem fricção.",
    url: "https://revtogo.pt/sobre-nos",
    siteName: "Revtogo",
    locale: "pt_PT",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Sobre a Revtogo",
    description:
      "Design, tecnologia de aproximação e foco na experiência para gerar avaliações reais.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
