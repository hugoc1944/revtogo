import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { DesignRequestOverlay } from "@/components/design-request/design-request-overlay";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300" ,"400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Revtogo",
    template: "Revtogo | %s",
  },
  description:
    "Placas com aproximação e QR code para recolher avaliações no Google de forma simples e natural.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <body className={`${inter.variable} bg-bg text-ink antialiased`}>
        {children}
         <DesignRequestOverlay />
      </body>
    </html>
  );
}
