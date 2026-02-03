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
