"use client";

import Image from "next/image";
import { useState } from "react";
import clsx from "clsx";

const PRIMARY_NAV = [
  { label: "A Placa", href: "#placa" },
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Como Funciona", href: "#como-funciona" },
  { label: "Contactos", href: "#como-funciona" },
];

const SECONDARY_NAV = [
  { label: "Acesso Antecipado", href: "#acesso-antecipado" },
  { label: "O nosso propósito", href: "#proposito" },
];

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Header bar */}
      <header
        className={clsx(
          "absolute top-0 left-0 right-0 z-40 transition-opacity",
          open && "absolute top-0 left-0 right-0 z-40"
        )}
      >        
      <div className="mx-auto max-w-7xl px-4 py-6 flex items-center">
        {/* Logo (left) */}
        <div className="flex items-center">
          <Image
            src="/brand/Revtogo.png"
            alt="Revtogo"
            width={150}
            height={32}
            priority
          />
        </div>

        {/* Desktop nav — visually centered */}
        <nav className="hidden md:flex flex-1 justify-center gap-15 text-[18px]  text-ink">
          {PRIMARY_NAV.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="hover:text-primary transition-colors"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Mobile burger (right) */}
        <button
          aria-label="Toggle menu"
          onClick={() => setOpen((v) => !v)}
          className={clsx(
            "md:hidden ml-auto h-10 w-10 rounded-full border border-neutral-300 flex items-center justify-center transition-colors",
            open && "bg-black/30"
          )}
        >
          {/* Burger / Close */}
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <line x1="3" y1="6" x2="21" y2="6" />
            <line x1="3" y1="12" x2="21" y2="12" />
            <line x1="3" y1="18" x2="21" y2="18" />
          </svg>

        </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {/* Mobile full-screen dropdown */}
      <div
        className={clsx(
          "md:hidden fixed inset-0 z-50 transition-all duration-500 ease-out",
          open
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-4 pointer-events-none"
        )}>
        <div className="min-h-dvh bg-surface px-6 pt-6 pb-8 flex flex-col">
          {/* Top bar */}
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
              className="h-10 w-10 rounded-full border border-neutral-300 flex items-center justify-center"
            >
              {/* Close icon */}
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Primary navigation */}
          <nav className="space-y-7">
            {PRIMARY_NAV.map((item) => (
              <a
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block text-[22px] font-medium text-ink"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Push secondary links to bottom */}
          <div className="mt-auto pt-10">
            <div className="h-px bg-neutral-300/60 mb-6" />

            <nav className="space-y-4">
              {SECONDARY_NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-[14px] font-medium text-muted"
                >
                  {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </div>

    </>
  );
}
