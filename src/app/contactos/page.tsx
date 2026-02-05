import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";
import { ContactSection } from "@/sections/contact/contact";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contactos Revtogo | Fale connosco",
  description:
    "Entre em contacto com a Revtogo. Respondemos a questões sobre a placa de avaliações Google por aproximação, pedidos personalizados ou parcerias.",

  alternates: {
    canonical: "https://revtogo.pt/contactos",
  },

  openGraph: {
    title: "Contactos Revtogo",
    description:
      "Tem alguma questão ou pedido especial? Fale connosco — respondemos rapidamente.",
    url: "https://revtogo.pt/contactos",
    siteName: "Revtogo",
    locale: "pt_PT",
    type: "website",
  },

  twitter: {
    card: "summary",
    title: "Contactos Revtogo",
    description:
      "Contacto direto com a Revtogo para informações, pedidos ou apoio.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function ContactPage() {
  return (
    <main className="bg-bg">
      <Header />
      <ContactSection />
      <Footer />
    </main>
  );
}
