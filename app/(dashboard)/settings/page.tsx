import type { Metadata } from "next";
import { SettingsForm } from "@/components/forms/settings-form";
import { Panel } from "@/components/ui/panel";
import { requireUser } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";

export const metadata: Metadata = {
  title: "Paramètres",
};

export default async function SettingsPage() {
  const user = await requireUser();
  const settings =
    (await getPrisma().userSettings.findUnique({ where: { userId: user.id } })) ||
    {
      currency: "EUR",
      language: "fr",
      displayLimit: 24,
      emailNotifications: false,
      darkTheme: true,
    };

  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-medium text-amber-200">Paramètres</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">
          Préférences
        </h1>
      </div>
      <Panel className="p-6">
        <SettingsForm defaults={settings} />
      </Panel>
    </div>
  );
}
