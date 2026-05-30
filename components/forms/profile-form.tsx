"use client";

import { useActionState } from "react";
import { Loader2, Save } from "lucide-react";
import { updateProfileAction } from "@/app/(dashboard)/account/actions";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import type { ActionState } from "@/types";

const initialState: ActionState = {};

export function ProfileForm({ name }: { name?: string | null }) {
  const [state, action, pending] = useActionState(updateProfileAction, initialState);

  return (
    <form action={action} className="grid gap-4">
      {state.message ? (
        <div className="rounded-lg border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-slate-200">
          {state.message}
        </div>
      ) : null}
      <Field label="Nom" error={state.fieldErrors?.name?.[0]}>
        <Input name="name" defaultValue={name ?? ""} disabled={pending} />
      </Field>
      <Button type="submit" disabled={pending} className="w-fit">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Save className="size-4" />}
        Enregistrer
      </Button>
    </form>
  );
}
