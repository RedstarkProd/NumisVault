import type { Metadata } from "next";
import { DeleteAccountForm } from "@/components/forms/delete-account-form";
import { Notice, Panel } from "@/components/ui/panel";

export const metadata: Metadata = {
  title: "Supprimer le compte",
};

export default function DeleteAccountPage() {
  return (
    <div className="grid max-w-3xl gap-8">
      <div>
        <p className="text-sm font-medium text-red-200">Zone sensible</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">
          Supprimer votre compte
        </h1>
      </div>
      <Notice className="border-red-300/25 bg-red-500/10 text-red-50">
        Cette action supprime votre compte, vos pièces, vos sessions, vos
        préférences et les images locales associées quand elles existent. Elle
        ne doit être déclenchée qu’après confirmation explicite.
      </Notice>
      <Panel className="p-6">
        <DeleteAccountForm />
      </Panel>
    </div>
  );
}
