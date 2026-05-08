import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes } from "react";

type SwitchProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  checked?: boolean;
  label?: string;
};

export function Switch({
  checked = false,
  className,
  label,
  ...props
}: SwitchProps) {
  return (
    <button
      aria-checked={checked}
      className={cn("inline-flex items-center gap-3 text-sm font-semibold text-text-100", className)}
      role="switch"
      type="button"
      {...props}
    >
      <span
        className={cn(
          "flex h-6 w-11 items-center rounded-full p-1 transition",
          checked ? "bg-primary-500" : "bg-background-200"
        )}
      >
        <span
          className={cn(
            "size-4 rounded-full bg-white shadow-sm transition",
            checked && "translate-x-5"
          )}
        />
      </span>
      {label}
    </button>
  );
}
