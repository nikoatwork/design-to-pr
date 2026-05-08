import { cn } from "@/utils/cn";
import type { HTMLAttributes } from "react";

type ProgressProps = HTMLAttributes<HTMLDivElement> & {
  value: number;
};

export function Progress({ className, value, ...props }: ProgressProps) {
  const safeValue = Math.min(100, Math.max(0, value));

  return (
    <div
      className={cn("h-2 overflow-hidden rounded-full bg-background-100", className)}
      {...props}
    >
      <div
        className="h-full rounded-full bg-primary-500 transition-all"
        style={{ width: `${safeValue}%` }}
      />
    </div>
  );
}
