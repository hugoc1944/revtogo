"use client";

import { useDesignRequestStore } from "@/stores/design-request.store";

export function ManualDesignButton() {
  const reset = useDesignRequestStore((s) => s.reset);
  const openManual = useDesignRequestStore((s) => s.openManual);

  function handleClick() {
    reset();
    openManual();
  }

  return (
    <button
      onClick={handleClick}
      className="
        px-4 py-2
        rounded-xl
        bg-black text-white
        text-sm font-semibold
        hover:opacity-90
        transition
      "
    >
      + Pedido Manual
    </button>
  );
}