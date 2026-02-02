import { HowItWorks } from "@/sections/how-it-works";
import { Header } from "@/sections/header";
import { Hero } from "@/sections/hero";
import { ConceptSlider } from "@/sections/slider/slider";
import { TrustBand } from "@/sections/trust-band";
import { ProductSection } from "@/sections/product/product-section";

export default function Home() {
  return (
    <main className="bg-bg">
      <Header />
      <Hero />
      <HowItWorks/>
      <ConceptSlider/>
      <TrustBand/>
      <ProductSection/>
    </main>
  );
}
