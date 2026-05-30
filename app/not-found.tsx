import { ButtonLink } from "@/components/ui/button";

export default function NotFound() {
  return (
    <main className="grid min-h-dvh place-items-center bg-[#020711] px-5 text-center text-white">
      <div>
        <p className="text-sm font-medium text-amber-200">404</p>
        <h1 className="mt-3 font-serif text-5xl font-bold">Page introuvable</h1>
        <p className="mx-auto mt-4 max-w-md text-sm leading-6 text-slate-400">
          La page demandée n’existe pas ou n’est pas accessible avec votre session.
        </p>
        <div className="mt-7">
          <ButtonLink href="/dashboard">Retour au dashboard</ButtonLink>
        </div>
      </div>
    </main>
  );
}
