import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

const variants = {
  primary:
    "border-amber-400 bg-amber-400 text-slate-950 shadow-[0_12px_34px_rgba(245,183,64,0.22)] hover:bg-amber-300",
  secondary:
    "border-white/12 bg-white/[0.04] text-white hover:border-amber-300/60 hover:bg-white/[0.07]",
  ghost:
    "border-transparent bg-transparent text-slate-300 hover:bg-white/[0.06] hover:text-white",
  danger:
    "border-red-400/60 bg-red-500/12 text-red-100 hover:bg-red-500/20",
} as const;

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants;
};

export function Button({
  className,
  variant = "primary",
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-55",
        variants[variant],
        className,
      )}
      {...props}
    />
  );
}

export function ButtonLink({
  href,
  children,
  className,
  variant = "primary",
}: {
  href: string;
  children: ReactNode;
  className?: string;
  variant?: keyof typeof variants;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border px-4 py-2 text-sm font-semibold transition",
        variants[variant],
        className,
      )}
    >
      {children}
    </Link>
  );
}
