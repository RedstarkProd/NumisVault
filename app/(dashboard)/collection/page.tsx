import type { Metadata } from "next";
import type { Prisma } from "@prisma/client";
import { Search } from "lucide-react";
import { CoinCard } from "@/components/coins/coin-card";
import { ButtonLink } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import { Panel } from "@/components/ui/panel";
import { requireUser } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Collection",
};

export default async function CollectionPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const user = await requireUser();
  const params = await searchParams;
  const q = stringParam(params.q);
  const country = stringParam(params.country);
  const metal = stringParam(params.metal);
  const status = stringParam(params.status);
  const prisma = getPrisma();

  const where: Prisma.CoinWhereInput = {
    userId: user.id,
    ...(country ? { country: { equals: country, mode: "insensitive" } } : {}),
    ...(metal ? { metal: { equals: metal, mode: "insensitive" } } : {}),
    ...(status ? { status: status as Prisma.EnumCoinStatusFilter<"Coin"> } : {}),
    ...(q
      ? {
          OR: [
            { title: { contains: q, mode: "insensitive" } },
            { country: { contains: q, mode: "insensitive" } },
            { denomination: { contains: q, mode: "insensitive" } },
            { metal: { contains: q, mode: "insensitive" } },
          ],
        }
      : {}),
  };

  const [coins, countries, metals] = await Promise.all([
    prisma.coin.findMany({
      where,
      orderBy: { updatedAt: "desc" },
      take: 48,
    }),
    prisma.coin.findMany({
      where: { userId: user.id, country: { not: null } },
      select: { country: true },
      distinct: ["country"],
      orderBy: { country: "asc" },
    }),
    prisma.coin.findMany({
      where: { userId: user.id, metal: { not: null } },
      select: { metal: true },
      distinct: ["metal"],
      orderBy: { metal: "asc" },
    }),
  ]);

  return (
    <div className="grid gap-8">
      <section className="flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
        <div>
          <p className="text-sm font-medium text-amber-200">Collection</p>
          <h1 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">
            Vos pièces
          </h1>
          <p className="mt-3 text-sm text-slate-400">
            Filtrez, ouvrez, modifiez ou supprimez uniquement vos propres fiches.
          </p>
        </div>
        <ButtonLink href="/coins/new">Ajouter une pièce</ButtonLink>
      </section>

      <Panel className="p-5">
        <form className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <Field label="Recherche">
            <Input name="q" defaultValue={q} placeholder="Titre, pays, métal..." />
          </Field>
          <Field label="Pays">
            <Select name="country" defaultValue={country}>
              <option value="">Tous</option>
              {countries.map((item) =>
                item.country ? (
                  <option key={item.country} value={item.country}>
                    {item.country}
                  </option>
                ) : null,
              )}
            </Select>
          </Field>
          <Field label="Métal">
            <Select name="metal" defaultValue={metal}>
              <option value="">Tous</option>
              {metals.map((item) =>
                item.metal ? (
                  <option key={item.metal} value={item.metal}>
                    {item.metal}
                  </option>
                ) : null,
              )}
            </Select>
          </Field>
          <Field label="Statut">
            <Select name="status" defaultValue={status}>
              <option value="">Tous</option>
              <option value="COLLECTION">Collection</option>
              <option value="FOR_SALE">À vendre</option>
              <option value="FOR_TRADE">À échanger</option>
              <option value="TO_EXPERTISE">À expertiser</option>
              <option value="SOLD">Vendue</option>
            </Select>
          </Field>
          <button
            type="submit"
            className="mt-7 inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-amber-400 bg-amber-400 px-4 text-sm font-semibold text-slate-950"
          >
            <Search className="size-4" aria-hidden="true" />
            Filtrer
          </button>
        </form>
      </Panel>

      {coins.length === 0 ? (
        <Panel className="p-10 text-center">
          <h2 className="font-serif text-3xl font-bold text-white">
            Aucune pièce trouvée
          </h2>
          <p className="mx-auto mt-3 max-w-lg text-sm leading-6 text-slate-400">
            Ajustez les filtres ou créez une nouvelle fiche pour commencer à
            organiser votre collection.
          </p>
          <div className="mt-6">
            <ButtonLink href="/coins/new">Ajouter une pièce</ButtonLink>
          </div>
        </Panel>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {coins.map((coin) => (
            <CoinCard key={coin.id} coin={coin} />
          ))}
        </div>
      )}
    </div>
  );
}

function stringParam(value: string | string[] | undefined) {
  return Array.isArray(value) ? value[0] ?? "" : value ?? "";
}
