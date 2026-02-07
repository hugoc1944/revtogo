import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import Script from "next/script";
import { DesignRequestOverlay } from "@/components/design-request/design-request-overlay";
import { CookieConsent } from "@/components/cookie-consent";
import { LaunchBanner } from "@/components/LaunchBanner";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
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
      <head>
        {/* ===== Default Consent Mode ===== */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}

              (function() {
                var storedConsent = localStorage.getItem('cookie_consent');

                var consentGranted = storedConsent === 'granted';

                gtag('consent', 'default', {
                  analytics_storage: consentGranted ? 'granted' : 'denied',
                  ad_storage: consentGranted ? 'granted' : 'denied',
                  wait_for_update: 500
                });
              })();
            `,
          }}
        />
        {/* Google Tag Manager */}
        <Script
          id="gtm-script"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-ND74VLKD');
            `,
          }}
        />
        {/* End Google Tag Manager */}
      </head>

      <body className={`${inter.variable} bg-bg text-ink antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-ND74VLKD"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

        <LaunchBanner />


        {children}
        <DesignRequestOverlay />
        <CookieConsent />
      </body>
    </html>
  );
}
