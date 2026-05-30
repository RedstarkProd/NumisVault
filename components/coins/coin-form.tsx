"use client";

import { useActionState } from "react";
import Image from "next/image";
import { Loader2, Save } from "lucide-react";
import type { ActionState } from "@/types";
import { Button } from "@/components/ui/button";
import { Field, Input, Select, Textarea } from "@/components/ui/field";
import { Notice } from "@/components/ui/panel";

type CoinDefaults = {
  title?: string;
  country?: string | null;
  year?: string | null;
  denomination?: string | null;
  period?: string | null;
  metal?: string | null;
  weight?: number | null;
  diameter?: number | null;
  condition?: string | null;
  mint?: string | null;
  mintage?: string | null;
  purchasePrice?: number | null;
  estimatedLow?: number | null;
  estimatedMid?: number | null;
  estimatedHigh?: number | null;
  currency?: string | null;
  status?: string;
  notes?: string | null;
  obverseImageUrl?: string | null;
  reverseImageUrl?: string | null;
};

const initialState: ActionState = {};

export function CoinForm({
  action,
  defaults = {},
  submitLabel,
}: {
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
  defaults?: CoinDefaults;
  submitLabel: string;
}) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid gap-6">
      {state.message ? (
        <div className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {state.message}
        </div>
      ) : null}

      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Titre" error={state.fieldErrors?.title?.[0]}>
          <Input
            name="title"
            defaultValue={defaults.title ?? ""}
            placeholder="20 Francs Napoléon III"
            disabled={pending}
            required
          />
        </Field>
        <Field label="Pays" error={state.fieldErrors?.country?.[0]}>
          <Input
            name="country"
            defaultValue={defaults.country ?? ""}
            placeholder="France"
            disabled={pending}
          />
        </Field>
        <Field label="Année" error={state.fieldErrors?.year?.[0]}>
          <Input
            name="year"
            defaultValue={defaults.year ?? ""}
            placeholder="1867"
            disabled={pending}
          />
        </Field>
        <Field label="Valeur faciale" error={state.fieldErrors?.denomination?.[0]}>
          <Input
            name="denomination"
            defaultValue={defaults.denomination ?? ""}
            placeholder="20 Francs"
            disabled={pending}
          />
        </Field>
        <Field label="Période" error={state.fieldErrors?.period?.[0]}>
          <Input
            name="period"
            defaultValue={defaults.period ?? ""}
            placeholder="Second Empire"
            disabled={pending}
          />
        </Field>
        <Field label="Métal" error={state.fieldErrors?.metal?.[0]}>
          <Input
            name="metal"
            defaultValue={defaults.metal ?? ""}
            placeholder="Or, Argent, Bronze..."
            disabled={pending}
          />
        </Field>
        <Field label="Poids (g)" error={state.fieldErrors?.weight?.[0]}>
          <Input
            name="weight"
            type="number"
            step="0.01"
            min="0"
            defaultValue={defaults.weight ?? ""}
            disabled={pending}
          />
        </Field>
        <Field label="Diamètre (mm)" error={state.fieldErrors?.diameter?.[0]}>
          <Input
            name="diameter"
            type="number"
            step="0.01"
            min="0"
            defaultValue={defaults.diameter ?? ""}
            disabled={pending}
          />
        </Field>
        <Field label="État" error={state.fieldErrors?.condition?.[0]}>
          <Input
            name="condition"
            defaultValue={defaults.condition ?? ""}
            placeholder="TB, TTB, SUP, SPL..."
            disabled={pending}
          />
        </Field>
        <Field label="Atelier" error={state.fieldErrors?.mint?.[0]}>
          <Input
            name="mint"
            defaultValue={defaults.mint ?? ""}
            placeholder="A, BB, Paris..."
            disabled={pending}
          />
        </Field>
        <Field label="Tirage" error={state.fieldErrors?.mintage?.[0]}>
          <Input
            name="mintage"
            defaultValue={defaults.mintage ?? ""}
            placeholder="Si connu"
            disabled={pending}
          />
        </Field>
        <Field label="Statut" error={state.fieldErrors?.status?.[0]}>
          <Select name="status" defaultValue={defaults.status ?? "COLLECTION"} disabled={pending}>
            <option value="COLLECTION">Collection</option>
            <option value="FOR_SALE">À vendre</option>
            <option value="FOR_TRADE">À échanger</option>
            <option value="TO_EXPERTISE">À expertiser</option>
            <option value="SOLD">Vendue</option>
          </Select>
        </Field>
      </div>

      <div className="grid gap-4 lg:grid-cols-4">
        <Field label="Prix d’achat" error={state.fieldErrors?.purchasePrice?.[0]}>
          <Input
            name="purchasePrice"
            type="number"
            step="0.01"
            min="0"
            defaultValue={defaults.purchasePrice ?? ""}
            disabled={pending}
          />
        </Field>
        <Field label="Estimation basse" error={state.fieldErrors?.estimatedLow?.[0]}>
          <Input
            name="estimatedLow"
            type="number"
            step="0.01"
            min="0"
            defaultValue={defaults.estimatedLow ?? ""}
            disabled={pending}
          />
        </Field>
        <Field label="Estimation moyenne" error={state.fieldErrors?.estimatedMid?.[0]}>
          <Input
            name="estimatedMid"
            type="number"
            step="0.01"
            min="0"
            defaultValue={defaults.estimatedMid ?? ""}
            disabled={pending}
          />
        </Field>
        <Field label="Estimation haute" error={state.fieldErrors?.estimatedHigh?.[0]}>
          <Input
            name="estimatedHigh"
            type="number"
            step="0.01"
            min="0"
            defaultValue={defaults.estimatedHigh ?? ""}
            disabled={pending}
          />
        </Field>
      </div>
      <input type="hidden" name="currency" value={defaults.currency ?? "EUR"} />

      <Notice>
        Les estimations fournies par NumisVault sont indicatives, non
        contractuelles et ne constituent pas une expertise officielle. Pour une
        vente importante, une assurance ou une succession, consultez un expert
        numismate qualifié.
      </Notice>

      <div className="grid gap-4 lg:grid-cols-2">
        <Field label="Photo recto">
          <Input
            name="obverseImage"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={pending}
          />
        </Field>
        <Field label="Photo verso">
          <Input
            name="reverseImage"
            type="file"
            accept="image/jpeg,image/png,image/webp"
            disabled={pending}
          />
        </Field>
      </div>

      {defaults.obverseImageUrl || defaults.reverseImageUrl ? (
        <div className="grid gap-4 md:grid-cols-2">
          {defaults.obverseImageUrl ? (
            <ImagePreview src={defaults.obverseImageUrl} label="Recto actuel" />
          ) : null}
          {defaults.reverseImageUrl ? (
            <ImagePreview src={defaults.reverseImageUrl} label="Verso actuel" />
          ) : null}
        </div>
      ) : null}

      <Field label="Notes personnelles" error={state.fieldErrors?.notes?.[0]}>
        <Textarea
          name="notes"
          defaultValue={defaults.notes ?? ""}
          placeholder="Contexte d’achat, provenance, détails visibles..."
          disabled={pending}
        />
      </Field>

      <Button type="submit" disabled={pending} className="w-full sm:w-fit">
        {pending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <Save className="size-4" aria-hidden="true" />
        )}
        {submitLabel}
      </Button>
    </form>
  );
}

function ImagePreview({ src, label }: { src: string; label: string }) {
  return (
    <div className="rounded-lg border border-white/10 bg-slate-950/50 p-3">
      <p className="mb-3 text-sm font-medium text-slate-300">{label}</p>
      <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-slate-900">
        <Image src={src} alt={label} fill className="object-cover" sizes="(min-width: 768px) 50vw, 100vw" />
      </div>
    </div>
  );
}
