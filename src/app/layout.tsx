import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300" ,"400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Revtogo – Mais avaliações no Google, sem fricção",
  description:
    "Placa premium com NFC e QR code pensada para tornar a avaliação no Google um gesto natural no seu espaço.",
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
      </body>
    </html>
  );
}
