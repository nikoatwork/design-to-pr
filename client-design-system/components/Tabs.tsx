import { cn } from "@/utils/cn";
import type { ButtonHTMLAttributes } from "react";

type TabItem = {
  label: string;
  active?: boolean;
};

export function Tabs({ items }: { items: TabItem[] }) {
  return (
    <div className="inline-flex rounded-lg border border-background-200 bg-background-50 p-1">
      {items.map((item) => (
        <button
          key={item.label}
          className={cn(
            "h-8 rounded-md px-3 text-sm font-semibold text-text-100 transition",
            item.active && "bg-white text-text-50 shadow-sm"
          )}
          type="button"
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}

export function IconButton({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={cn(
        "grid size-10 place-items-center rounded-lg border border-background-200 bg-white text-text-100 shadow-sm transition hover:bg-background-50 hover:text-text-50",
        className
      )}
      type="button"
      {...props}
    >
      {children}
    </button>
  );
}
