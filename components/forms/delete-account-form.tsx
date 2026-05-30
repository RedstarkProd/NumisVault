"use client";

import { useActionState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { deleteAccountAction } from "@/app/(dashboard)/account/actions";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";
import type { ActionState } from "@/types";

const initialState: ActionState = {};

export function DeleteAccountForm() {
  const [state, action, pending] = useActionState(deleteAccountAction, initialState);

  return (
    <form action={action} className="grid gap-4">
      {state.message ? (
        <div className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {state.message}
        </div>
      ) : null}
      <Field label='Saisissez "SUPPRIMER" pour confirmer' error={state.fieldErrors?.confirmation?.[0]}>
        <Input name="confirmation" disabled={pending} autoComplete="off" />
      </Field>
      <Button type="submit" variant="danger" disabled={pending} className="w-fit">
        {pending ? <Loader2 className="size-4 animate-spin" /> : <Trash2 className="size-4" />}
        Supprimer mon compte
      </Button>
    </form>
  );
}
