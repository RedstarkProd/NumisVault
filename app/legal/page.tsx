import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Mentions légales",
};

export default function Page() {
  return (
    <LegalPage title="Mentions légales">
      <p>
        Cette page est un placeholder propre pour la bêta privée. Les
        informations société, hébergement, contact et directeur de publication
        devront être complétées avant mise en production publique.
      </p>
    </LegalPage>
  );
}
