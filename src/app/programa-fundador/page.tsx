import type { Metadata } from "next";
import ProgramaFundadorClient from "./programa-fundador";

export const metadata: Metadata = {
  title: "Programa Fundador Revtogo | Preço especial e destaque no lançamento",
  description:
    "Conheça o Programa Fundador Revtogo: preço especial, design antes de pagar e destaque público durante 12 meses na landing page oficial.",

  alternates: {
    canonical: "https://revtogo.pt/programa-fundador",
  },

  openGraph: {
    title: "Programa Fundador Revtogo",
    description:
      "Uma fase limitada para os primeiros negócios: preço fundador, design antes de pagar e visibilidade durante 12 meses.",
    url: "https://revtogo.pt/programa-fundador",
    siteName: "Revtogo",
    locale: "pt_PT",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Programa Fundador Revtogo",
    description:
      "Preço fundador, design incluído antes de pagar e destaque público no lançamento da Revtogo.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ProgramaFundadorPage() {
  return <ProgramaFundadorClient />;
}
