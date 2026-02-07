"use client";

import { useEffect, useState } from "react";
import { useDesignRequestStore } from "@/stores/design-request.store";
import clsx from "clsx";
import Image from "next/image";

type DesignOption = {
  id: "solid" | "art";
  title: string;
  description: string;
};

const OPTIONS: DesignOption[] = [
  {
    id: "solid",
    title: "Fundo sólido",
    description: "Design limpo, elegante e discreto.",
  },
  {
    id: "art",
    title: "Arte personalizada",
    description: "Inclui ilustração ou elementos gráficos únicos.",
  },
];

export function StepDesign() {
  const { data, update, next, back } = useDesignRequestStore();
  const [selected, setSelected] = useState<
    "solid" | "art" | undefined
  >(data.designStyle);

  useEffect(() => {
    if (data.designStyle) {
      setSelected(data.designStyle);
    }
  }, [data.designStyle]);

    const handleSelect = (value: "solid" | "art") => {
    setSelected(value);
    update({ designStyle: value });
    next();
    };

    const handleContinue = () => {
    if (!selected) return;
    next();
    };

  return (
    <div className="flex flex-col gap-6">
      {/* Title */}
      <div>
        <h4 className="text-[18px] font-semibold text-ink">
          Que tipo de design prefere?
        </h4>
        <p className="text-[14px] text-muted mt-1">
          Isto ajuda-nos a alinhar o estilo com o seu negócio.
        </p>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3">
        {OPTIONS.map((option) => {
          const isActive = selected === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => handleSelect(option.id)}
              className={clsx(
                "w-full text-left rounded-2xl border transition-all",
                "px-4 py-4 flex items-center gap-4 cursor-pointer",
                isActive
                  ? "border-primary bg-primary/5"
                  : "border-black/10 bg-bg hover:border-black/20"
              )}
            >
            {/* Preview image */}
            <div
              className={clsx(
                "h-14 w-14 rounded-xl flex-shrink-0 overflow-hidden",
                "bg-neutral-100"
              )}
            >
              <Image
                src={
                  option.id === "solid"
                    ? "/plain_preview.png"
                    : "/design_preview.png"
                }
                alt={option.title}
                width={56}
                height={56}
                className="h-full w-full object-cover"
                priority
              />
            </div>

              {/* Text */}
              <div className="flex flex-col">
                <span className="text-[15px] font-semibold text-ink">
                  {option.title}
                </span>
                <span className="text-[13px] text-muted">
                  {option.description}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-2">
        <button
          onClick={back}
          className="
            text-[14px]
            font-medium
            text-muted
            hover:text-ink
            transition
            cursor-pointer
          "
        >
          Voltar
        </button>
      </div>
    </div>
  );
}
