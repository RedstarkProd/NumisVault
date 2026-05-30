import type { ReactNode } from "react";
import { PublicNav } from "@/components/layout/public-nav";
import { Panel } from "@/components/ui/panel";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-[#020711] text-white">
      <PublicNav />
      <main className="mx-auto max-w-3xl px-5 py-16 lg:px-8">
        <h1 className="font-serif text-5xl font-bold">{title}</h1>
        <Panel className="mt-8 p-6 text-sm leading-7 text-slate-300">
          {children}
        </Panel>
      </main>
    </div>
  );
}
