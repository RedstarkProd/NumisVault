import type { Metadata } from "next";
import Link from "next/link";
import { loginAction } from "@/app/(auth)/actions";
import { AuthForm } from "@/components/forms/auth-form";
import { Panel } from "@/components/ui/panel";

export const metadata: Metadata = {
  title: "Connexion",
};

export default function LoginPage() {
  return (
    <div className="mx-auto grid w-full max-w-md gap-6">
      <div className="text-center">
        <h1 className="font-serif text-4xl font-bold text-white">
          Connexion
        </h1>
        <p className="mt-3 text-sm leading-6 text-slate-400">
          Accédez à votre collection sécurisée et reprenez votre inventaire.
        </p>
      </div>
      <Panel className="p-6">
        <AuthForm mode="login" action={loginAction} />
        <div className="mt-5 flex items-center justify-between gap-4 text-sm">
          <Link href="/forgot-password" className="text-slate-400 hover:text-amber-200">
            Mot de passe oublié ?
          </Link>
          <Link href="/register" className="font-medium text-amber-200 hover:text-amber-100">
            Créer un compte
          </Link>
        </div>
      </Panel>
    </div>
  );
}
