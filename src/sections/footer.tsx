"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useDesignRequestStore } from "@/stores/design-request.store";

export function Footer() {
  const pathname = usePathname();
  const router = useRouter();
  const openDesignRequest = useDesignRequestStore((s) => s.open);

  const scrollTo = (id: string, offset = 0) => {
    const el = document.getElementById(id);
    if (!el) return;

    const y =
      el.getBoundingClientRect().top +
      window.scrollY -
      offset;

    window.scrollTo({
      top: y,
      behavior: "smooth",
    });
  };

  const handleScrollNav = (id: string) => {
    if (pathname === "/") {
      requestAnimationFrame(() => scrollTo(id, 0));
      return;
    }

    router.push("/");

    setTimeout(() => {
      scrollTo(id, 0);
    }, 500);
  };

  const handleDesignRequest = () => {
    if (pathname === "/") {
      scrollTo("revtogo-plus", 0);
      setTimeout(() => {
        openDesignRequest();
      }, 1100);
      return;
    }

    router.push("/");

    setTimeout(() => {
      scrollTo("revtogo-plus", 0);
      setTimeout(() => {
        openDesignRequest();
      }, 900);
    }, 500);
  };

  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-4 pt-14 pb-8">
        {/* ===== TOP GRID ===== */}
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* ===== BRAND ===== */}
          <div className="flex flex-col gap-4 max-w-[420px]">
            <Image
              src="/brand/Revtogo_White.png"
              alt="Revtogo"
              width={180}
              height={60}
              priority
            />

            <a
              href="mailto:ola@revtogo.pt"
              className="font-semibold hover:underline"
            >
              ola@revtogo.pt
            </a>

            <p className="text-white/80 leading-relaxed">
              R. Conselheiro Luís de Magalhães 31B
              <br />
              3800-137 Aveiro, Portugal
            </p>

            <p className="text-white/70 italic leading-relaxed">
              Revtogo é uma solução independente e não possui qualquer afiliação
              com o Google.
            </p>
          </div>

          {/* ===== NAVIGATION ===== */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4">
              Navegação
            </h4>

            <ul className="flex flex-col gap-3 text-white/80">
              <li>
                <Link href="/sobre-nos" className="hover:text-white">
                  Sobre Nós
                </Link>
              </li>

              <li>
                <button
                  onClick={() => handleScrollNav("revtogo-plus")}
                  className="hover:text-white text-left"
                >
                  Placa Revtogo
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleScrollNav("como-funciona")}
                  className="hover:text-white text-left"
                >
                  Como funciona
                </button>
              </li>

              <li>
                <button
                  onClick={() => handleScrollNav("faq")}
                  className="hover:text-white text-left"
                >
                  Questões frequentes
                </button>
              </li>

              <li>
                <button
                  onClick={handleDesignRequest}
                  className="hover:text-white text-left font-medium"
                >
                  Pedir design da minha placa
                </button>
              </li>

              <li>
                <Link href="/contactos" className="hover:text-white">
                  Contactos
                </Link>
              </li>
            </ul>
          </div>

          {/* ===== LEGAL ===== */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4">
              Legal
            </h4>

            <ul className="flex flex-col gap-3 text-white/80">
              <li>
                <Link href="/termos-e-condicoes" className="hover:text-white">
                  Termos e Condições
                </Link>
              </li>
              <li>
                <Link href="/politica-de-privacidade" className="hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/politica-de-cookies" className="hover:text-white">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/politica-de-reembolso" className="hover:text-white">
                  Política de Reembolso
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
          <p className="text-white/70 text-sm">
            © 2026, Revtogo
          </p>

          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/revtogopt"
              target="_blank"
              aria-label="Instagram"
              className="hover:opacity-80"
            >
              <Image src="/icons/icon1.png" alt="" width={22} height={22} />
            </Link>

            <Link
              href="https://www.facebook.com/revtogopt"
              target="_blank"
              aria-label="Facebook"
              className="hover:opacity-80"
            >
              <Image src="/icons/icon2.png" alt="" width={22} height={22} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
