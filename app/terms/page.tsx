import type { Metadata } from "next";
import { LegalPage } from "@/components/layout/legal-page";

export const metadata: Metadata = {
  title: "Conditions d’utilisation",
};

export default function Page() {
  return (
    <LegalPage title="Conditions d’utilisation">
      <p>
        Les estimations affichées par NumisVault sont indicatives, non
        contractuelles et ne constituent pas une expertise officielle. Les
        conditions complètes devront être validées juridiquement avant
        ouverture publique.
      </p>
    </LegalPage>
  );
}
