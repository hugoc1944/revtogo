"use client";

import { useState } from "react";
import clsx from "clsx";

type AccordionItem = {
  id: string;
  title: string;
  content: React.ReactNode;
};

type AccordionProps = {
  items: AccordionItem[];
  className?: string;
};

export function Accordion({ items, className }: AccordionProps) {
  const [openId, setOpenId] = useState<string | null>(null);

  function handleToggle(id: string) {
    setOpenId((current) => (current === id ? null : id));
  }

  return (
    <div className={clsx("w-full divide-y divide-neutral-200", className)}>
      {items.map((item) => {
        const isOpen = openId === item.id;

        return (
          <div key={item.id} className="py-4">
            {/* Header */}
            <button
              type="button"
              onClick={() => handleToggle(item.id)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between text-left cursor-pointer"
            >
              <span className="font-medium text-ink text-[15px] leading-[20px] md:text-[16px] md:leading-[28px]">
                {item.title}
              </span>

              {/* Chevron */}
              <span
                className={clsx(
                  "ml-4 flex h-5 w-5 items-center justify-center transition-transform duration-200 ease-out",
                  isOpen && "rotate-180"
                )}
                aria-hidden="true"
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-muted"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            {/* Content */}
            <div
              className={clsx(
                "grid transition-all duration-300 ease-out",
                isOpen
                  ? "grid-rows-[1fr] opacity-100 mt-3"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <div className="overflow-hidden">
                <div className="text-muted text-[15px] leading-[20px] md:text-[16px] md:leading-[28px]">
                  {item.content}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
