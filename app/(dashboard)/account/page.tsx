import type { Metadata } from "next";
import Link from "next/link";
import { ProfileForm } from "@/components/forms/profile-form";
import { ButtonLink } from "@/components/ui/button";
import { Panel } from "@/components/ui/panel";
import { requireUser } from "@/lib/auth";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Compte",
};

export default async function AccountPage() {
  const user = await requireUser();

  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-medium text-amber-200">Compte</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">
          Votre profil
        </h1>
      </div>
      <div className="grid gap-6 xl:grid-cols-[1fr_0.55fr]">
        <Panel className="p-6">
          <h2 className="text-xl font-semibold text-white">Informations</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            <p>Email : <span className="text-white">{user.email}</span></p>
            <p>Plan actuel : <span className="text-white">{user.plan}</span></p>
            <p>Date de création : <span className="text-white">{formatDate(user.createdAt)}</span></p>
          </div>
          <div className="mt-6">
            <ProfileForm name={user.name} />
          </div>
        </Panel>
        <Panel className="p-6">
          <h2 className="text-xl font-semibold text-white">Sécurité</h2>
          <p className="mt-3 text-sm leading-6 text-slate-400">
            Le changement de mot de passe sera ajouté avec le flux de
            réinitialisation email. La suppression de compte est déjà protégée
            par confirmation.
          </p>
          <div className="mt-5 grid gap-3">
            <ButtonLink href="/account/delete" variant="danger">
              Supprimer le compte
            </ButtonLink>
            <Link href="/privacy" className="text-sm text-slate-400 hover:text-amber-200">
              Politique de confidentialité
            </Link>
          </div>
        </Panel>
      </div>
    </div>
  );
}
