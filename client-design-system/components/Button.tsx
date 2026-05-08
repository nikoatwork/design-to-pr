import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";

const buttonStyles = cva(
  "inline-flex items-center justify-center gap-2 rounded-lg text-sm font-semibold transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary:
          "bg-text-50 text-white shadow-sm hover:bg-slate-800 focus-visible:outline-text-50",
        secondary:
          "border border-background-200 bg-white text-text-50 shadow-sm hover:bg-background-50 focus-visible:outline-primary-500",
        ghost:
          "text-text-100 hover:bg-background-100 hover:text-text-50 focus-visible:outline-primary-500",
        accent:
          "bg-emerald-500 text-white shadow-sm hover:bg-emerald-600 focus-visible:outline-emerald-500"
      },
      size: {
        sm: "h-9 px-3",
        md: "h-10 px-4",
        lg: "h-11 px-5"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonStyles> & {
    leadingIcon?: ReactNode;
    trailingIcon?: ReactNode;
  };

export function Button({
  className,
  variant,
  size,
  leadingIcon,
  trailingIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button className={cn(buttonStyles({ variant, size }), className)} {...props}>
      {leadingIcon}
      {children}
      {trailingIcon}
    </button>
  );
}
