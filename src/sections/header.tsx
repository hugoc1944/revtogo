"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";
import { useDesignRequestStore } from "@/stores/design-request.store";

type HeaderVariant = "dark" | "light";

const PRIMARY_NAV = [
  { label: "A Placa", target: "revtogo-plus" },
  { label: "Como Funciona", target: "como-funciona" },
  { label: "Sobre Nós", href: "/sobre-nos" },
  { label: "Contactos", href: "/contactos" },
];

const MOBILE_SECONDARY_NAV = [
  { label: "Questões frequentes", target: "faq" },
  { label: "Programa Fundador", href: "/programa-fundador" },
  { label: "Pedir design da minha placa", action: "design" },
];

type HeaderProps = {
  variant?: HeaderVariant;
};

export function Header({ variant = "dark" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const isLight = variant === "light";

  const pathname = usePathname();
  const router = useRouter();
  const openDesignRequest = useDesignRequestStore((s) => s.open);

  const scrollToTarget = (id: string) => {
    const el = document.getElementById(id);
    if (!el) return;

    el.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const handleScrollNav = (targetId: string) => {
    setOpen(false);

    if (pathname === "/") {
      requestAnimationFrame(() => scrollToTarget(targetId));
      return;
    }

    router.push("/");

    setTimeout(() => {
      scrollToTarget(targetId);
    }, 450);
  };

  const handleDesignRequest = () => {
    setOpen(false);
    window.dataLayer?.push({
      event: "design_request_start",
      source: "header",
    });

    if (pathname === "/") {
      scrollToTarget("revtogo-plus");
      setTimeout(() => {
        openDesignRequest();
      }, 900);
      return;
    }

    router.push("/");

    setTimeout(() => {
      scrollToTarget("revtogo-plus");
      setTimeout(() => {
        openDesignRequest();
      }, 700);
    }, 500);
  };

  return (
    <>
      {/* ===== HEADER BAR ===== */}
      <header className="absolute top-0 left-0 right-0 z-40">
        <div className="mx-auto max-w-7xl px-4 py-6 flex items-center">
          {/* Logo */}
          <button
            onClick={() => router.push("/")}
            aria-label="Home"
            className="cursor-pointer"
          >
            <Image
              src={
                isLight
                  ? "/brand/Revtogo_White.png"
                  : "/brand/Revtogo.png"
              }
              alt="Revtogo"
              width={150}
              height={32}
              priority
            />
          </button>

          {/* Desktop nav */}
          <nav
            className={clsx(
              "hidden md:flex flex-1 justify-center gap-15 text-[18px]",
              isLight ? "text-surface" : "text-ink"
            )}
          >
            {PRIMARY_NAV.map((item) =>
              item.target ? (
                <button
                  key={item.label}
                  onClick={() => handleScrollNav(item.target)}
                  className="hover:text-primary transition cursor-pointer"
                >
                  {item.label}
                </button>
              ) : (
                <button
                  key={item.label}
                  onClick={() => router.push(item.href!)}
                  className="hover:text-primary transition cursor-pointer"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          {/* Mobile burger */}
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className={clsx(
              "md:hidden ml-auto h-10 w-10 rounded-full flex items-center justify-center",
              isLight
                ? "border border-surface/40 text-surface"
                : "border border-neutral-300 text-ink"
            )}
          >
            ☰
          </button>
        </div>
      </header>

      {/* ===== MOBILE MENU ===== */}
      <div
        className={clsx(
          "md:hidden fixed inset-0 z-50 transition-all duration-300",
          open
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="min-h-dvh bg-surface px-6 pt-6 pb-8 flex flex-col">
          {/* Top */}
          <div className="flex items-center justify-between mb-10">
            <Image
              src="/brand/Revtogo.png"
              alt="Revtogo"
              width={150}
              height={26}
              priority
            />

            <button
              aria-label="Close menu"
              onClick={() => setOpen(false)}
            >
              ✕
            </button>
          </div>

          {/* Primary nav */}
          <nav className="space-y-7">
            {PRIMARY_NAV.map((item) =>
              item.target ? (
                <button
                  key={item.label}
                  onClick={() => handleScrollNav(item.target)}
                  className="block text-[22px] font-medium text-ink"
                >
                  {item.label}
                </button>
              ) : (
                <button
                  key={item.label}
                  onClick={() => {
                    setOpen(false);
                    router.push(item.href!);
                  }}
                  className="block text-[22px] font-medium text-ink"
                >
                  {item.label}
                </button>
              )
            )}
          </nav>

          {/* Secondary nav */}
          <div className="mt-auto pt-10 border-t border-ink/10">
            <nav className="space-y-4">
              {MOBILE_SECONDARY_NAV.map((item) =>
                item.action === "design" ? (
                  <button
                    key={item.label}
                    onClick={handleDesignRequest}
                    className="block text-[15px] text-ink/60 hover:text-primary transition"
                  >
                    {item.label}
                  </button>
                ) : item.href ? (
                  <button
                    key={item.label}
                    onClick={() => {
                      setOpen(false);
                      router.push(item.href);
                    }}
                    className="block text-[15px] text-ink/60 hover:text-primary transition"
                  >
                    {item.label}
                  </button>
                ) : (
                  <button
                    key={item.label}
                    onClick={() => handleScrollNav(item.target!)}
                    className="block text-[15px] text-ink/60 hover:text-primary transition"
                  >
                    {item.label}
                  </button>
                )
              )}
            </nav>

            {/* Social icons */}
            <div className="mt-8 flex items-center justify-center gap-6">
              <a
                href="https://www.instagram.com/revtogo"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/icons/icon1_dark.png"
                  alt="Instagram"
                  width={28}
                  height={28}
                />
              </a>

              <a
                href="https://www.facebook.com/profile.php?id=61587631856100"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/icons/icon2_dark.png"
                  alt="Facebook"
                  width={28}
                  height={28}
                />
              </a>

              <a
                href="https://wa.me/message/ECGYLHF444ALE1?text=Olá%20Revtogo%20👋"
                target="_blank"
                rel="noopener noreferrer"
                className="opacity-60 hover:opacity-100 transition-opacity"
              >
                <Image
                  src="/icons/icon3_dark.png"
                  alt="WhatsApp"
                  width={28}
                  height={28}
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
