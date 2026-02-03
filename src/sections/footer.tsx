"use client";

import Image from "next/image";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-ink text-white">
      <div className="mx-auto max-w-7xl px-6 md:px-4 pt-14 pb-8">
        {/* ===== TOP GRID ===== */}
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          {/* ===== BRAND / INFO ===== */}
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
              <br />
              O nosso produto facilita o acesso à página de avaliações do
              negócio, promovendo a partilha de feedback por parte dos clientes.
            </p>
          </div>

          {/* ===== NAVIGATION ===== */}
          <div>
            <h4 className="text-[18px] font-semibold mb-4">
              Navegação
            </h4>

            <ul className="flex flex-col gap-3 text-white/80">
              <li>
                <Link href="#produto" className="hover:text-white">
                  Placa Revtogo
                </Link>
              </li>
              <li>
                <Link href="#como-funciona" className="hover:text-white">
                  Como funciona
                </Link>
              </li>
              <li>
                <Link href="#faq" className="hover:text-white">
                  Questões frequentes
                </Link>
              </li>
              <li>
                <Link href="#produto" className="hover:text-white">
                  Pedir design da minha placa
                </Link>
              </li>
              <li>
                <Link href="#contactos" className="hover:text-white">
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
                <Link href="/termos" className="hover:text-white">
                  Termos e Condições
                </Link>
              </li>
              <li>
                <Link href="/privacidade" className="hover:text-white">
                  Política de Privacidade
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="hover:text-white">
                  Política de Cookies
                </Link>
              </li>
              <li>
                <Link href="/reembolsos" className="hover:text-white">
                  Política de Reembolsos
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* ===== BOTTOM BAR ===== */}
        <div className="mt-12 pt-6 border-t border-white/20 flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Copyright */}
          <p className="text-white/70 text-sm">
            © 2026, Revtogo
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <Link
              href="https://www.instagram.com/revtogopt"
              target="_blank"
              aria-label="Instagram"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/icons/ig.png"
                alt=""
                width={22}
                height={22}
              />
            </Link>

            <Link
              href="https://www.facebook.com/revtogopt"
              target="_blank"
              aria-label="Facebook"
              className="hover:opacity-80 transition-opacity"
            >
              <Image
                src="/icons/fb.png"
                alt=""
                width={22}
                height={22}
              />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
