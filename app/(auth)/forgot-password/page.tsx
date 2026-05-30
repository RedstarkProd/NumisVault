import type { Metadata } from "next";
import { Panel } from "@/components/ui/panel";

export const metadata: Metadata = {
  title: "Mot de passe oublié",
};

export default function ForgotPasswordPage() {
  return (
    <div className="mx-auto grid w-full max-w-md gap-6 text-center">
      <h1 className="font-serif text-4xl font-bold text-white">
        Mot de passe oublié
      </h1>
      <Panel className="p-6">
        <p className="text-sm leading-6 text-slate-300">
          La réinitialisation par email sera branchée avec le fournisseur
          d’authentification de production. Pour cette première base, contactez
          l’administrateur afin de réinitialiser votre accès.
        </p>
      </Panel>
    </div>
  );
}
