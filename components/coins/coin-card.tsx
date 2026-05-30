import Image from "next/image";
import Link from "next/link";
import { Coins, Edit3 } from "lucide-react";
import type { Coin } from "@prisma/client";
import { formatCurrency, statusLabel } from "@/lib/utils";

export function CoinCard({ coin }: { coin: Coin }) {
  return (
    <article className="overflow-hidden rounded-lg border border-white/10 bg-white/[0.045]">
      <Link href={`/coins/${coin.id}`} className="block">
        <div className="relative aspect-[4/3] bg-slate-950">
          {coin.obverseImageUrl ? (
            <Image
              src={coin.obverseImageUrl}
              alt={`Photo recto de ${coin.title}`}
              fill
              className="object-cover transition hover:scale-[1.02]"
              sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
            />
          ) : (
            <div className="grid h-full place-items-center text-amber-300">
              <Coins className="size-12" aria-hidden="true" />
            </div>
          )}
        </div>
      </Link>
      <div className="grid gap-4 p-4">
        <div>
          <Link href={`/coins/${coin.id}`} className="font-semibold text-white hover:text-amber-200">
            {coin.title}
          </Link>
          <p className="mt-1 text-sm text-slate-400">
            {[coin.country, coin.year, coin.metal].filter(Boolean).join(" · ") ||
              "Informations à compléter"}
          </p>
        </div>
        <div className="flex items-center justify-between gap-3 text-sm">
          <span className="rounded-lg border border-amber-300/20 bg-amber-300/8 px-2 py-1 text-amber-100">
            {statusLabel(coin.status)}
          </span>
          <span className="font-semibold text-white">
            {formatCurrency(coin.estimatedMid, coin.currency)}
          </span>
        </div>
        <Link
          href={`/coins/${coin.id}/edit`}
          className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-white/10 text-sm font-semibold text-slate-200 transition hover:border-amber-300/50 hover:text-amber-100"
        >
          <Edit3 className="size-4" aria-hidden="true" />
          Modifier
        </Link>
      </div>
    </article>
  );
}
