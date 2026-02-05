import { HowItWorks } from "@/sections/how-it-works";
import { Header } from "@/sections/header";
import { Hero } from "@/sections/hero";
import { ConceptSlider } from "@/sections/slider/slider";
import { TrustBand } from "@/sections/trust-band";
import { ProductSection } from "@/sections/product/product-section";
import { DistinguishSection } from "@/sections/distinguish";
import { FAQSection } from "@/sections/faq";
import { MultiplePlatesSection } from "@/sections/mutiple-plates";
import { GuaranteeSupportSection } from "@/sections/guarantee-support";
import { PreFooterBand } from "@/sections/pre-footer-band";
import { Footer } from "@/sections/footer";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Revtogo | Placa para Avaliações Google com Aproximação",
  description:
    "Placa premium para obter mais avaliações no Google através de aproximação e QR code. Sem mensalidades. Design personalizado. Pedido simples e sem compromisso.",

  alternates: {
    canonical: "https://revtogo.pt",
  },

  openGraph: {
    title: "Placa para Avaliações Google com Aproximação | Revtogo",
    description:
      "Facilite as avaliações no Google com uma placa de aproximação e QR code, pensada para o seu negócio. Pedido simples, sem compromisso.",
    url: "https://revtogo.pt",
    siteName: "Revtogo",
    locale: "pt_PT",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Placa para Avaliações Google com Aproximação | Revtogo",
    description:
      "Uma forma simples e natural de obter mais avaliações no Google com aproximação e QR code.",
  },

  robots: {
    index: true,
    follow: true,
  },
};


export default function Home() {
  return (
    <main className="bg-bg">
      <Header />
      <Hero />
      <HowItWorks/>
      <ConceptSlider/>
      <TrustBand/>
      <ProductSection/>
      <DistinguishSection/>
      <FAQSection/>
      <MultiplePlatesSection/>
      <GuaranteeSupportSection/>
      <PreFooterBand/>
      <Footer/>
    </main>
  );
}
