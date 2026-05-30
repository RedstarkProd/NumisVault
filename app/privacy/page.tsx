import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Politique de confidentialité",
};

export default function Page() {
  return (
    <LegalPage title="Politique de confidentialité">
      <p>
        NumisVault stocke les données nécessaires à la gestion de compte et de
        collection. Les traitements, durées de conservation, droits RGPD et
        coordonnées du responsable de traitement devront être finalisés avant
        lancement public.
      </p>
    </LegalPage>
  );
}
