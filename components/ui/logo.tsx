import Link from "next/link";
import { Coins } from "lucide-react";

export function Logo({ href = "/" }: { href?: string }) {
  return (
    <Link href={href} className="inline-flex items-center gap-3">
      <span className="grid size-11 place-items-center rounded-full border border-amber-300/70 bg-amber-300/10 text-amber-300 shadow-[0_0_40px_rgba(245,183,64,0.16)]">
        <Coins className="size-6" aria-hidden="true" />
      </span>
      <span>
        <span className="block font-serif text-xl font-bold text-amber-200">
          NumisVault
        </span>
        <span className="block text-xs text-slate-400">Collection Manager</span>
      </span>
    </Link>
  );
}
