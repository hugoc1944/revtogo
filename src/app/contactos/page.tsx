import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";
import { ContactSection } from "@/sections/contact/contact";

export default function ContactPage() {
  return (
    <main className="bg-bg">
      <Header />
      <ContactSection />
      <Footer />
    </main>
  );
}
