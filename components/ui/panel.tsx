import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

export function Panel({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/10 bg-white/[0.045] shadow-[0_20px_80px_rgba(0,0,0,0.22)]",
        className,
      )}
      {...props}
    />
  );
}

export function Notice({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-lg border border-amber-300/25 bg-amber-300/8 p-4 text-sm leading-6 text-amber-50",
        className,
      )}
      {...props}
    />
  );
}
