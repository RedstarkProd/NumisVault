import type { Metadata } from "next";
import Link from "next/link";
import { registerAction } from "@/app/(auth)/actions";
import { AuthForm } from "@/components/forms/auth-form";
import { Panel } from "@/components/ui/panel";

export const metadata: Metadata = {
  title: "Inscription",
};

export default function RegisterPage() {
  return (
    <div className="mx-auto grid w-full max-w-md gap-6">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-white">
          Créer un compte
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Une base privée pour organiser vos monnaies et préparer vos futures expertises.
        </p>
      </div>
      <Panel className="p-6">
        <AuthForm mode="register" action={registerAction} />
        <p className="mt-5 text-center text-sm text-slate-400">
          Déjà inscrit ?{" "}
          <Link href="/login" className="font-medium text-amber-200 hover:text-amber-100">
            Se connecter
          </Link>
        </p>
      </Panel>
    </div>
  );
}
