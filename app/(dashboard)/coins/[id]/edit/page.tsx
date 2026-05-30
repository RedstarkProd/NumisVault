import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { updateCoinAction } from "@/app/(dashboard)/coins/actions";
import { CoinForm } from "@/components/coins/coin-form";
import { Panel } from "@/components/ui/panel";
import { requireUser } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Modifier une pièce",
};

export default async function EditCoinPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const coin = await getPrisma().coin.findFirst({
    where: { id, userId: user.id },
  });

  if (!coin) {
    notFound();
  }

  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-medium text-amber-200">Modification</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">
          Modifier {coin.title}
        </h1>
        <p className="mt-3 text-sm text-slate-400">
          Les vérifications d’ownership sont effectuées côté serveur.
        </p>
      </div>
      <Panel className="p-5 md:p-6">
        <CoinForm
          action={updateCoinAction.bind(null, coin.id)}
          defaults={coin}
          submitLabel="Enregistrer les modifications"
        />
      </Panel>
    </div>
  );
}
