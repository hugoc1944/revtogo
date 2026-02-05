"use client";

import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";

type LegalPageProps = {
  title: string;
  lastUpdated?: string;
  children: React.ReactNode;
};

export function LegalPage({
  title,
  lastUpdated,
  children,
}: LegalPageProps) {
  return (
    <>
      <Header />

      <main className="bg-surface text-ink">
        <section className="pt-25 md:pt-36 pb-20 md:pb-28">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[780px]">
              <h1 className="text-[32px] md:text-[42px] font-bold leading-tight mb-4">
                {title}
              </h1>

              {lastUpdated && (
                <p className="text-[14px] text-ink/60 mb-10">
                  Última atualização: {lastUpdated}
                </p>
              )}

              <div className="space-y-6 text-[16px] md:text-[17px] text-ink/80 leading-relaxed">
                {children}
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
