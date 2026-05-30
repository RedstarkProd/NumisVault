import type { ReactNode } from "react";
import Link from "next/link";
import { Logo } from "@/components/ui/logo";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="min-h-dvh bg-[#020711] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(245,183,64,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(31,75,122,0.22),transparent_32%),linear-gradient(180deg,#020711_0%,#07111d_100%)]" />
      <div className="mx-auto flex min-h-dvh w-full max-w-6xl flex-col px-5 py-6">
        <header className="flex items-center justify-between">
          <Logo />
          <Link href="/" className="text-sm font-medium text-slate-300 hover:text-amber-200">
            Retour au site
          </Link>
        </header>
        <div className="grid flex-1 items-center py-12">{children}</div>
      </div>
    </main>
  );
}
