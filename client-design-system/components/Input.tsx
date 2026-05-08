import { cn } from "@/utils/cn";
import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
};

export function Input({ className, label, id, ...props }: InputProps) {
  const inputId = id || props.name;

  return (
    <label className="grid gap-2 text-sm font-medium text-text-100" htmlFor={inputId}>
      {label && <span>{label}</span>}
      <input
        id={inputId}
        className={cn(
          "h-10 rounded-lg border border-background-200 bg-white px-3 text-sm text-text-50 shadow-sm outline-none transition placeholder:text-slate-400 focus:border-primary-500 focus:ring-4 focus:ring-primary-50",
          className
        )}
        {...props}
      />
    </label>
  );
}
