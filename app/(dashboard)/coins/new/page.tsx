import type { Metadata } from "next";
import { createCoinAction } from "@/app/(dashboard)/coins/actions";
import { CoinForm } from "@/components/coins/coin-form";
import { Panel } from "@/components/ui/panel";

export const metadata: Metadata = {
  title: "Ajouter une pièce",
};

export default function NewCoinPage() {
  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-medium text-amber-200">Nouvelle fiche</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">
          Ajouter une pièce
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Renseignez les informations connues. Vous pourrez compléter la fiche
          plus tard.
        </p>
      </div>
      <Panel className="p-5 md:p-6">
        <CoinForm action={createCoinAction} submitLabel="Sauvegarder la pièce" />
      </Panel>
    </div>
  );
}
