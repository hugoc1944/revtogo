import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type ButtonVariant = "primary" | "primary-flat";
type ButtonRadius = "default" | "compact";
type ButtonSize = "md" | "lg";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  radius?: ButtonRadius;
  size?: ButtonSize;
};

export function Button({
  variant = "primary",
  radius = "default",
  size = "md",
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={clsx(
        // Base
        "inline-flex items-center justify-center font-semibold transition-all duration-200",
        "cursor-pointer select-none",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",

        // Radius
        radius === "default" && "rounded-[14px]",
        radius === "compact" && "rounded-[5px]",

        // Size
        size === "md" && "px-6 py-3 text-body-mobile md:text-body-desktop",
        size === "lg" && "px-6 py-3 text-body-mobile md:text-body-desktop",

        // Variants
        variant === "primary" &&
          "bg-primary text-white shadow-[0px_6px_16px_-4px_rgba(15,118,110,0.25)] hover:bg-[#0d8f91] active:translate-y-[1px]",

        variant === "primary-flat" &&
          "bg-primary text-white hover:bg-[#0d8f91] active:translate-y-[1px]",

        className
      )}
    >
      {children}
    </button>
  );
}
