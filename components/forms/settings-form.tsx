"use client";

import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";
import { updateSettingsAction } from "@/app/(dashboard)/settings/actions";
import { Button } from "@/components/ui/button";
import { Field, Input, Select } from "@/components/ui/field";
import type { ActionState } from "@/types";

const initialState: ActionState = {};

type SettingsDefaults = {
  currency: string;
  language: string;
  displayLimit: number;
  emailNotifications: boolean;
  darkTheme: boolean;
};

export function SettingsForm({ defaults }: { defaults: SettingsDefaults }) {
  const [state, action, pending] = useActionState(updateSettingsAction, initialState);

  return (
    <form action={action} className="grid gap-5">
      {state.message ? (
        <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
          {state.message}
        </div>
      ) : null}
      <div className="grid gap-4 md:grid-cols-2">
        <Field label="Devise">
          <Select name="currency" defaultValue={defaults.currency} disabled={pending}>
            <option value="EUR">EUR</option>
            <option value="USD">USD</option>
            <option value="GBP">GBP</option>
            <option value="CHF">CHF</option>
          </Select>
        </Field>
        <Field label="Langue">
          <Select name="language" defaultValue={defaults.language} disabled={pending}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </Select>
        </Field>
        <Field label="Limite d’affichage">
          <Input
            name="displayLimit"
            type="number"
            min="12"
            max="96"
            defaultValue={defaults.displayLimit}
            disabled={pending}
          />
        </Field>
      </div>
      <label className="flex items-center gap-3 text-sm text-slate-200">
        <input
          name="emailNotifications"
          type="checkbox"
          defaultChecked={defaults.emailNotifications}
          disabled={pending}
          className="size-4 accent-amber-400"
        />
        Notifications email
      </label>
      <label className="flex items-center gap-3 text-sm text-slate-200">
        <input
          name="darkTheme"
          type="checkbox"
          defaultChecked={defaults.darkTheme}
          disabled={pending}
          className="size-4 accent-amber-400"
        />
        Thème sombre par défaut
      </label>
      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Enregistrer
      </Button>
    </form>
  );
}
