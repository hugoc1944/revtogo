"use client";

import { motion } from "framer-motion";
import { usePathname, useRouter } from "next/navigation";
import { Header } from "@/sections/header";
import { Footer } from "@/sections/footer";
import { FounderSlots } from "@/sections/founder-slots";

export default function ProgramaFundadorClient() {
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

  const goToHomeAndScroll = (targetId: string) => {
    sessionStorage.setItem("hide_launch_banner", "1");

    if (pathname === "/") {
      requestAnimationFrame(() => scrollToTarget(targetId));
      return;
    }

    router.push("/");

    setTimeout(() => {
      scrollToTarget(targetId);
    }, 450);
  };

  return (
    <>
      <Header variant="light" />

      <main className="bg-ink text-surface">

        {/* OUTCOME RE-ANCHOR */}
        <section className="pt-24 md:pt-28 pb-10">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h1 className="text-[30px] md:text-[42px] font-bold leading-tight mb-5">
                  Aumente as suas avaliações no Google.
                  <br />
                  Destaque-se da concorrência.
                </h1>

                <p className="text-[16px] md:text-[18px] text-surface/85 leading-relaxed mb-6">
                  A placa Revtogo transforma cada visita numa oportunidade de avaliação,
                  em menos de 5 segundos, diretamente na sua página do Google.
                  Mais avaliações significam melhor posicionamento,
                  mais confiança e mais clientes.
                </p>

                <button
                  onClick={() => router.push("/")}
                  className="inline-flex items-center justify-center rounded-xl bg-[#0FB5B9] px-6 py-3 text-[14px] font-semibold text-white hover:brightness-110 transition"
                >
                  Conhecer melhor o produto
                </button>
              </motion.div>
            </div>
          </div>
        </section>

        {/* PREÇO FUNDADOR */}
        <section className="pt-14 pb-10 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <h2 className="text-[20px] md:text-[24px] font-semibold mb-4">
                Preço Fundador
              </h2>

              <p className="text-surface/80 text-[16px] leading-relaxed mb-2">
                O valor público da placa Revtogo será de{" "}
                <strong className="text-surface">€49,90</strong>.
              </p>

              <p className="text-surface/90 text-[17px] leading-relaxed mb-3">
                Durante esta fase fundadora:{" "}
                <strong className="text-[#0FB5B9] text-[20px]">€37,90</strong>
              </p>

              <p className="text-surface/70 text-[14px] leading-relaxed mb-6">
                Pagamento único. Sem mensalidades. Sem taxas escondidas.
              </p>

              {/* GARANTIA */}
              <div className="">
                <p className="text-[15px] leading-relaxed">
                  <span className="text-[#0FB5B9] font-semibold">Garantia:</span>{" "}
                  Se não ficar satisfeito com a sua placa ou com os resultados nos primeiros
                  30 dias, pode solicitar a devolução total - sem perguntas, sem complicações.
                </p>
              </div>

            </div>
          </div>
        </section>

        {/* O QUE RECEBE */}
        <section className="pt-14 pb-10 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <h2 className="text-[20px] md:text-[24px] font-semibold mb-6">
                O que recebe ao aderir
              </h2>

              <ul className="space-y-3 text-surface/85 text-[16px] leading-relaxed">
                <li>✔️ Placa personalizada para o seu negócio</li>
                <li>✔️ Tecnologia NFC + QR code integrada</li>
                <li>✔️ Redirecionamento direto para a sua página de avaliações Google</li>
                <li>✔️ Acesso à aplicação exclusiva de acompanhamento</li>
                <li>✔️ Pagamento único - sem subscrições</li>
                <li>✔️ Design enviado antes de qualquer pagamento</li>
              </ul>
            </div>
          </div>
        </section>

        {/* DESIGN ANTES DE PAGAR */}
        <section className="pt-14 pb-10 border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <h2 className="text-[20px] md:text-[24px] font-semibold mb-4">
                Receba o design antes de pagar
              </h2>

              <p className="text-surface/80 text-[16px] leading-relaxed">
                Enviamos o design final da sua placa antes de qualquer pagamento.
                Apenas após a sua aprovação avançamos para produção.
              </p>
            </div>
          </div>
        </section>

        {/* DESTAQUE FUNDADOR */}{/* VISIBILITY */}
          <section className="pt-14 pb-5 border-t border-white/10">        <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[720px]">
            <h2 className="text-[22px] md:text-[26px] font-semibold mb-4">
                Destaque público durante 12 meses
            </h2>

            <p className="text-surface/80 text-[16px] leading-relaxed mb-4">
                Os negócios do <strong className="text-surface">Programa Fundador Revtogo</strong>  não ficam apenas listados - ficam posicionados numa{" "}
                <strong className="text-surface">zona nobre da landing page</strong>, 
                imediatamente <strong className="text-surface">abaixo da secção do produto</strong>, 
                onde se concentra a maior parte da atenção e interação.
            </p>

            <p className="text-surface/80 text-[16px] leading-relaxed mb-4">
                <strong className="text-surface">
                Veja abaixo a posição concreta que pode garantir.
                </strong>{" "}
                As posições são atribuídas por ordem de adesão e mantidas até{" "}
                <strong className="text-surface">março de 2027</strong>.
            </p>
            </div>
        </div>
        </section>

        {/* CTA PRINCIPAL */}
        <section className="pt-4 pb-2">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <button
                onClick={() => goToHomeAndScroll("revtogo-plus")}
                className="inline-flex items-center justify-center rounded-xl bg-[#0FB5B9] px-8 py-4 text-[15px] font-semibold text-white hover:brightness-110 transition whitespace-nowrap"
              >
                Garantir o meu lugar como fundador
              </button>
            </div>
          </div>
        </section>

        {/* SLOTS */}
        <FounderSlots />

        {/* CTA FINAL */}
        <section className="pt-10 pb-20">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-3xl">
              <button
                onClick={() => goToHomeAndScroll("revtogo-plus")}
                className="inline-flex items-center justify-center rounded-xl border border-white/20 px-6 py-4 text-[15px] hover:bg-white/5 transition whitespace-nowrap"
              >
                Pedir o design da minha placa
              </button>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </>
  );
}