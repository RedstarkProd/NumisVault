import type { Metadata } from "next";
import { Check } from "lucide-react";
import { PublicNav } from "@/components/layout/public-nav";
import { ButtonLink } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";

export const metadata: Metadata = {
  title: "Tarifs",
};

const plans = [
  ["Gratuit", "0 €", "25 pièces", "3 analyses IA/mois bientôt", "3 recherches boutiques/mois bientôt"],
  ["Premium", "Bientôt disponible", "500 pièces", "30 analyses IA/mois", "30 recherches boutiques/mois"],
  ["Pro", "Bientôt disponible", "2 000 pièces", "Quotas élargis", "Préparation marketplace future"],
];

export default function PricingPage() {
  return (
    <div className="min-h-dvh bg-[#020711] text-white">
      <PublicNav />
      <main className="mx-auto max-w-7xl px-5 py-16 lg:px-8">
        <div className="max-w-2xl">
          <h1 className="font-serif text-5xl font-bold">Tarifs</h1>
          <p className="mt-4 text-slate-400">
            Stripe n’est pas branché dans cette première étape. Les plans sont
            prêts côté données et pourront être activés ensuite.
          </p>
        </div>
        <div className="mt-10 grid gap-4 lg:grid-cols-3">
          {plans.map(([name, price, ...features]) => (
            <Panel key={name} className="p-6">
              <h2 className="font-serif text-2xl font-bold">{name}</h2>
              <p className="mt-4 text-3xl font-bold text-amber-200">{price}</p>
              <ul className="mt-6 grid gap-3 text-sm text-slate-300">
                {features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2">
                    <Check className="size-4 text-amber-300" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </Panel>
          ))}
        </div>
        <div className="mt-10">
          <ButtonLink href="/register">Commencer gratuitement</ButtonLink>
        </div>
      </main>
    </div>
  );
}
