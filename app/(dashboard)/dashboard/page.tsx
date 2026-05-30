import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, BarChart3, Coins, PlusCircle, Sparkles } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Notice, Panel } from "@/components/ui/panel";
import { requireUser } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { formatCurrency, formatDate, statusLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardPage() {
  const user = await requireUser();
  const prisma = getPrisma();

  const [coinCount, sums, latestCoins, analysisCount, dealerSearchCount] =
    await Promise.all([
      prisma.coin.count({ where: { userId: user.id } }),
      prisma.coin.aggregate({
        where: { userId: user.id },
        _sum: {
          estimatedLow: true,
          estimatedMid: true,
          estimatedHigh: true,
        },
      }),
      prisma.coin.findMany({
        where: { userId: user.id },
        orderBy: { createdAt: "desc" },
        take: 5,
      }),
      prisma.coinAnalysis.count({ where: { userId: user.id } }),
      prisma.dealerSearch.count({ where: { userId: user.id } }),
    ]);

  return (
    <div className="grid gap-8">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-amber-200">Tableau de bord</p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">
            Votre coffre numismatique
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-400">
            Suivez votre collection, vos estimations indicatives et les actions
            récentes depuis un espace privé.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <ButtonLink href="/coins/new">
            <PlusCircle className="size-4" aria-hidden="true" />
            Ajouter une pièce
          </ButtonLink>
          <ButtonLink href="/collection" variant="secondary">
            Voir la collection
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </section>

      <Notice>
        Les estimations fournies par NumisVault sont indicatives, non
        contractuelles et ne constituent pas une expertise officielle. Pour une
        vente importante, une assurance ou une succession, consultez un expert
        numismate qualifié.
      </Notice>

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <MetricCard icon={Coins} label="Pièces" value={coinCount.toString()} />
        <MetricCard
          icon={BarChart3}
          label="Valeur basse"
          value={formatCurrency(sums._sum.estimatedLow)}
        />
        <MetricCard
          icon={BarChart3}
          label="Valeur moyenne"
          value={formatCurrency(sums._sum.estimatedMid)}
        />
        <MetricCard
          icon={BarChart3}
          label="Valeur haute"
          value={formatCurrency(sums._sum.estimatedHigh)}
        />
        <MetricCard
          icon={Sparkles}
          label="Analyses / recherches"
          value={`${analysisCount} / ${dealerSearchCount}`}
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_0.42fr]">
        <Panel className="p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold text-white">
                Dernières pièces ajoutées
              </h2>
              <p className="mt-1 text-sm text-slate-400">
                Les fiches les plus récentes de votre collection.
              </p>
            </div>
            <Link href="/collection" className="text-sm font-medium text-amber-200 hover:text-amber-100">
              Voir tout
            </Link>
          </div>

          {latestCoins.length === 0 ? (
            <div className="mt-8 rounded-lg border border-dashed border-white/15 p-8 text-center">
              <Coins className="mx-auto size-10 text-amber-300" aria-hidden="true" />
              <h3 className="mt-4 font-semibold text-white">Aucune pièce pour le moment</h3>
              <p className="mt-2 text-sm text-slate-400">
                Créez votre première fiche pour commencer l’inventaire.
              </p>
              <div className="mt-5">
                <ButtonLink href="/coins/new">Ajouter une pièce</ButtonLink>
              </div>
            </div>
          ) : (
            <div className="mt-5 grid gap-3">
              {latestCoins.map((coin) => (
                <Link
                  key={coin.id}
                  href={`/coins/${coin.id}`}
                  className="flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-slate-950/45 p-4 transition hover:border-amber-300/40"
                >
                  <span>
                    <span className="block font-semibold text-white">{coin.title}</span>
                    <span className="text-sm text-slate-400">
                      {[coin.country, coin.year, statusLabel(coin.status)]
                        .filter(Boolean)
                        .join(" · ")}
                    </span>
                  </span>
                  <span className="text-right text-sm font-semibold text-amber-100">
                    {formatCurrency(coin.estimatedMid, coin.currency)}
                  </span>
                </Link>
              ))}
            </div>
          )}
        </Panel>

        <Panel className="p-5">
          <h2 className="text-xl font-semibold text-white">Activité récente</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            {latestCoins.slice(0, 4).map((coin) => (
              <div key={coin.id} className="rounded-lg border border-white/10 bg-white/[0.035] p-3">
                <p className="font-medium text-white">{coin.title}</p>
                <p className="mt-1 text-slate-400">Créée le {formatDate(coin.createdAt)}</p>
              </div>
            ))}
            {latestCoins.length === 0 ? (
              <p className="rounded-lg border border-white/10 bg-white/[0.035] p-4 text-slate-400">
                Les créations, modifications et futures analyses apparaîtront ici.
              </p>
            ) : null}
          </div>
        </Panel>
      </section>
    </div>
  );
}

function MetricCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Coins;
  label: string;
  value: string;
}) {
  return (
    <Panel className="p-5">
      <Icon className="size-5 text-amber-300" aria-hidden="true" />
      <p className="mt-4 text-2xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </Panel>
  );
}
