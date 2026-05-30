"use client";

import { Trash2 } from "lucide-react";
import { deleteCoinAction } from "@/app/(dashboard)/coins/actions";

export function DeleteCoinButton({ coinId }: { coinId: string }) {
  return (
    <form
      action={deleteCoinAction.bind(null, coinId)}
      onSubmit={(event) => {
        if (!window.confirm("Supprimer définitivement cette pièce ?")) {
          event.preventDefault();
        }
      }}
    >
      <button
        type="submit"
        className="inline-flex min-h-10 items-center justify-center gap-2 rounded-lg border border-red-400/50 bg-red-500/10 px-3 text-sm font-semibold text-red-100 transition hover:bg-red-500/20"
      >
        <Trash2 className="size-4" aria-hidden="true" />
        Supprimer
      </button>
    </form>
  );
}
