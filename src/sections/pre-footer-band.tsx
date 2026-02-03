import Image from "next/image";

const ITEMS = [
  {
    icon: "/icons/shipping.png",
    label: "Entrega incluída",
  },
  {
    icon: "/icons/guarantee.png",
    label: "Garantia de Satisfação",
  },
  {
    icon: "/icons/portugal.png",
    label: "Concebido em Portugal",
  },
];

export function PreFooterBand() {
  return (
    <section className="bg-bg pt-20 pb-7 md:pt-30 md:pb-6">
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex items-center justify-center gap-10 md:gap-40">
          {ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center"
            >
              {/* Icon */}
              <Image
                src={item.icon}
                alt=""
                width={64}
                height={64}
                className="md:w-[102px] md:h-[102px]"
              />

              {/* Label */}
              <p className="mt-1 max-w-[140px] text-[16px] md:text-[21px] font-semibold text-ink leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
