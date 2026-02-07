"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export function CookieConsent() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem("cookie_consent");
    if (!stored) setVisible(true);

    const handler = () => {
      setVisible(true);
    };

    window.addEventListener("open-cookie-consent", handler);
    return () =>
      window.removeEventListener("open-cookie-consent", handler);
  }, []);

  const clearAnalyticsCookies = () => {
    const cookies = document.cookie.split(";");

    cookies.forEach((cookie) => {
      const name = cookie.split("=")[0].trim();

      if (
        name.startsWith("_ga") ||
        name.startsWith("_gid") ||
        name.startsWith("_gcl")
      ) {
        document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/`;
      }
    });
  };

  const updateConsent = (granted: boolean) => {
    window.gtag?.("consent", "update", {
      analytics_storage: granted ? "granted" : "denied",
      ad_storage: granted ? "granted" : "denied",
      ads_data_redaction: !granted,
    });

    localStorage.setItem(
      "cookie_consent",
      granted ? "granted" : "denied"
    );

    if (!granted) {
      clearAnalyticsCookies();
    }

    setVisible(false);

    setTimeout(() => {
      window.location.reload();
    }, 300);
  };

  if (!visible) return null;

  return (
    <div
      className="
        fixed inset-x-4 bottom-4 z-50
        md:inset-x-auto md:right-6 md:bottom-6
        max-w-[460px]
        rounded-2xl
        bg-surface
        border border-ink/10
        shadow-[0_24px_70px_rgba(0,0,0,0.18)]
        p-6
      "
    >
      {/* Title */}
      <h4 className="text-[16px] font-semibold text-ink mb-2">
        Preferências de cookies
      </h4>

      <p className="text-[14.5px] text-ink/80 leading-relaxed">
        Utilizamos cookies para analisar o tráfego, melhorar a experiência
        e medir resultados de marketing.{" "}
        <Link
          href="/politica-de-privacidade"
          className="underline text-ink hover:text-primary"
        >
          Política de Privacidade
        </Link>
      </p>

      <div className="mt-5 flex gap-3">
        <button
          onClick={() => updateConsent(false)}
          className="
            flex-1 rounded-xl
            border border-ink/20
            py-3 text-[14px] font-medium
            text-ink
            hover:bg-ink/5 transition
          "
        >
          Recusar
        </button>

        <button
          onClick={() => updateConsent(true)}
          className="
            flex-1 rounded-xl
            bg-primary py-3
            text-[14px] font-semibold
            text-white
            hover:brightness-110 transition
          "
        >
          Aceitar
        </button>
      </div>
    </div>
  );
}
