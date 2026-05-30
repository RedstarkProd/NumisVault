"use client";

import { Button } from "@/components/ui/button";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#020711] px-5 text-center text-white">
      <div>
        <p className="text-sm font-medium text-red-200">Erreur</p>
        <h1 className="mt-3 font-serif text-5xl font-bold">
          Une erreur est survenue
        </h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">
          L’action n’a pas pu être finalisée. Aucun secret technique n’est
          exposé côté interface.
        </p>
        <div className="mt-7">
          <Button onClick={reset}>Réessayer</Button>
        </div>
      </div>
    </main>
  );
}
