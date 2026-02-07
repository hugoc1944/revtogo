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
    // 👇 mark that banner should not appear
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
        {/* HERO */}
        <section className="pt-28 md:pt-36">
          <div className="mx-auto max-w-7xl px-4">
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="max-w-[780px]"
            >
              <h1 className="text-[34px] md:text-[44px] font-bold leading-tight mb-6">
                Programa Fundador Revtogo
              </h1>

              <p className="text-[17px] md:text-[18px] text-surface/85 leading-relaxed">
                Uma fase limitada para os primeiros negócios que querem
                beneficiar de condições especiais — e ficar em destaque
                na história inicial da Revtogo.
              </p>
            </motion.div>
          </div>
        </section>

        {/* PRICE */}
        <section className="pt-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[720px]">
              <h2 className="text-[22px] md:text-[26px] font-semibold mb-4">
                Preço Fundador
              </h2>

              <p className="text-surface/80 text-[16px] leading-relaxed mb-3">
                O preço público previsto da placa Revtogo será entre{" "}
                <strong className="text-surface">€68,95 e €72,95</strong>.
              </p>

              <p className="text-surface/80 text-[16px] leading-relaxed">
                Durante o Programa Fundador, o valor é fixado em{" "}
                <strong className="text-primary">€56,95</strong>.
                Um desconto real de aproximadamente{" "}
                <strong className="text-surface">30%</strong>.
              </p>
            </div>
          </div>
        </section>

        {/* DESIGN BEFORE PAY */}
        <section className="pt-16">
          <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[720px]">
              <h2 className="text-[22px] md:text-[26px] font-semibold mb-4">
                Receba o design antes de pagar
              </h2>

              <p className="text-surface/80 text-[16px] leading-relaxed">
                Durante esta fase, enviamos o design da sua placa
                <strong className="text-surface"> antes de qualquer pagamento</strong>.
              </p>

              <p className="text-surface/80 text-[16px] leading-relaxed mt-3">
                Após o lançamento oficial, o design continuará incluído,
                mas o pagamento passará a ser feito antes da produção.
              </p>
            </div>
          </div>
        </section>

        {/* VISIBILITY */}
        <section className="pt-16">
        <div className="mx-auto max-w-7xl px-4">
            <div className="max-w-[720px]">
            <h2 className="text-[22px] md:text-[26px] font-semibold mb-4">
                Destaque público durante 12 meses
            </h2>

            <p className="text-surface/80 text-[16px] leading-relaxed mb-4">
                Os negócios do <strong className="text-surface">Programa Fundador Revtogo</strong>  não ficam apenas listados — ficam posicionados numa{" "}
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

            <p className="text-surface/80 text-[16px] leading-relaxed mb-3">
                Cada negócio fundador aparece com:
            </p>

            <ul className="list-disc list-inside text-surface/80 space-y-2 mb-4">
                <li>Fotografia real da instalação</li>
                <li>Nome do negócio</li>
                <li>Testemunho verificado da experiência</li>
            </ul>

            <p className="text-surface/80 text-[16px] leading-relaxed mb-4">
                Esta secção faz parte do fluxo natural da página — surge depois da proposta 
                de valor e antes da decisão — garantindo{" "}
                <strong className="text-surface">exposição recorrente e altamente qualificada</strong>.
            </p>

            <p className="text-surface/80 text-[16px] leading-relaxed">
                Em 2026, estimamos que a landing page da Revtogo seja vista por{" "}
                <strong className="text-surface">mais de 60.000 pessoas em Portugal</strong>, 
                através de crescimento orgânico, presença no Google e investimento contínuo 
                em anúncios de pesquisa.
            </p>

            <p className="text-surface/80 text-[16px] leading-relaxed mt-3">
                Com base na performance esperada e otimizações ao longo do ano,{" "}
                <strong className="text-surface">
                este valor poderá aproximar-se ou mesmo ultrapassar as 100.000 visualizações
                </strong>.
            </p>
            </div>
        </div>
        </section>


        {/* CTA */}
        <section className="pt-16">
          <div className="mx-auto max-w-7xl px-4">
            <button
              onClick={() => goToHomeAndScroll("revtogo-plus")}
              className="
                rounded-xl bg-primary px-6 py-4
                text-[15px] font-semibold text-white
                hover:brightness-110 transition
              "
            >
              Quero aproveitar o Programa Fundador
            </button>
          </div>
        </section>

        {/* SLOTS */}
        <FounderSlots />

        <section className="pt-16 pb-24">
          <div className="mx-auto max-w-7xl px-4">
            <button
              onClick={() => goToHomeAndScroll("revtogo-plus")}
              className="
                rounded-xl border border-surface/20
                px-6 py-4 text-[15px]
                hover:bg-surface/5 transition
              "
            >
              Pedir o design da minha placa
            </button>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
