import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Edit3, FileText, Search } from "lucide-react";
import { DeleteCoinButton } from "@/components/coins/delete-coin-button";
import { ButtonLink } from "@/components/ui/button";
import { Notice, Panel } from "@/components/ui/panel";
import { requireUser } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { formatCurrency, formatDate, statusLabel } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Fiche pièce",
};

export default async function CoinDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const user = await requireUser();
  const { id } = await params;
  const coin = await getPrisma().coin.findFirst({
    where: { id, userId: user.id },
    include: {
      analyses: { orderBy: { createdAt: "desc" }, take: 5 },
      sources: { orderBy: { createdAt: "desc" }, take: 5 },
      estimationRequests: { orderBy: { createdAt: "desc" }, take: 5 },
    },
  });

  if (!coin) {
    notFound();
  }

  return (
    <div className="grid gap-8">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-amber-200">Fiche détaillée</p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">
            {coin.title}
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            {[coin.country, coin.year, coin.metal, statusLabel(coin.status)]
              .filter(Boolean)
              .join(" · ") || "Informations à compléter"}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href={`/coins/${coin.id}/edit`} variant="secondary">
            <Edit3 className="size-4" aria-hidden="true" />
            Modifier
          </ButtonLink>
          <DeleteCoinButton coinId={coin.id} />
        </div>
      </section>

      <Notice>
        Les estimations fournies par NumisVault sont indicatives, non
        contractuelles et ne constituent pas une expertise officielle. Pour une
        vente importante, une assurance ou une succession, consultez un expert
        numismate qualifié.
      </Notice>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1fr]">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <CoinImage src={coin.obverseImageUrl} label="Photo recto" />
          <CoinImage src={coin.reverseImageUrl} label="Photo verso" />
        </div>

        <div className="grid gap-6">
          <Panel className="p-5">
            <h2 className="text-xl font-semibold text-white">
              Informations principales
            </h2>
            <dl className="mt-5 grid gap-4 sm:grid-cols-2">
              <Info label="Pays" value={coin.country} />
              <Info label="Année" value={coin.year} />
              <Info label="Valeur faciale" value={coin.denomination} />
              <Info label="Période" value={coin.period} />
              <Info label="Métal" value={coin.metal} />
              <Info label="État" value={coin.condition} />
              <Info label="Poids" value={coin.weight ? `${coin.weight} g` : null} />
              <Info label="Diamètre" value={coin.diameter ? `${coin.diameter} mm` : null} />
              <Info label="Atelier" value={coin.mint} />
              <Info label="Tirage" value={coin.mintage} />
              <Info label="Statut" value={statusLabel(coin.status)} />
              <Info label="Créée le" value={formatDate(coin.createdAt)} />
            </dl>
          </Panel>

          <Panel className="p-5">
            <h2 className="text-xl font-semibold text-white">
              Estimation indicative
            </h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-3">
              <Value label="Basse" value={formatCurrency(coin.estimatedLow, coin.currency)} />
              <Value label="Moyenne" value={formatCurrency(coin.estimatedMid, coin.currency)} />
              <Value label="Haute" value={formatCurrency(coin.estimatedHigh, coin.currency)} />
            </div>
          </Panel>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-3">
        <Panel className="p-5 xl:col-span-2">
          <h2 className="text-xl font-semibold text-white">Notes personnelles</h2>
          <p className="mt-4 whitespace-pre-wrap text-sm leading-7 text-slate-300">
            {coin.notes || "Aucune note renseignée."}
          </p>
        </Panel>
        <Panel className="p-5">
          <h2 className="text-xl font-semibold text-white">Actions à venir</h2>
          <div className="mt-5 grid gap-3">
            <Link
              href={`/coins/${coin.id}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-semibold text-slate-300"
              aria-disabled="true"
            >
              <FileText className="size-4 text-amber-300" aria-hidden="true" />
              Générer un message d’estimation
            </Link>
            <Link
              href={`/coins/${coin.id}`}
              className="inline-flex min-h-11 items-center gap-2 rounded-lg border border-white/10 px-3 text-sm font-semibold text-slate-300"
              aria-disabled="true"
            >
              <Search className="size-4 text-amber-300" aria-hidden="true" />
              Rechercher des professionnels
            </Link>
          </div>
          <p className="mt-4 text-xs leading-5 text-slate-500">
            Ces intégrations ne sont pas incluses dans cette première étape.
          </p>
        </Panel>
      </section>
    </div>
  );
}

function CoinImage({ src, label }: { src: string | null; label: string }) {
  return (
    <Panel className="overflow-hidden">
      <div className="relative aspect-[4/3] bg-slate-950">
        {src ? (
          <Image src={src} alt={label} fill className="object-cover" sizes="(min-width: 1280px) 45vw, 100vw" />
        ) : (
          <div className="grid h-full place-items-center text-sm text-slate-500">
            {label} non ajoutée
          </div>
        )}
      </div>
      <p className="p-4 text-sm font-medium text-slate-300">{label}</p>
    </Panel>
  );
}

function Info({ label, value }: { label: string; value: string | null }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-[0.12em] text-slate-500">{label}</dt>
      <dd className="mt-1 text-sm font-medium text-slate-100">{value || "Non renseigné"}</dd>
    </div>
  );
}

function Value({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/45 p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="mt-2 text-xl font-semibold text-white">{value}</p>
    </div>
  );
}
