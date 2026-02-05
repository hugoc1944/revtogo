"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";
import { usePathname, useRouter } from "next/navigation";

type HeaderVariant = "dark" | "light";

const PRIMARY_NAV = [
  { label: "A Placa", target: "revtogo-plus" },
  { label: "Como Funciona", target: "como-funciona" },
  { label: "Sobre Nós", href: "/sobre-nos" },
  { label: "Contactos", href: "/contactos" },
];

type HeaderProps = {
  variant?: HeaderVariant;
};

export function Header({ variant = "dark" }: HeaderProps) {
  const [open, setOpen] = useState(false);
  const isLight = variant === "light";

  const pathname = usePathname();
  const router = useRouter();

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

    // Already on homepage → just scroll
    if (pathname === "/") {
      requestAnimationFrame(() => scrollToTarget(targetId));
      return;
    }

    // Navigate home first, then scroll
    router.push("/");

    // Wait for page + layout to mount
    setTimeout(() => {
      scrollToTarget(targetId);
    }, 450);
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
        </div>
      </div>
    </>
  );
}
