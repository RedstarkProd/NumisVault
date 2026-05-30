"use client";

import { useActionState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import type { ActionState } from "@/types";
import { Button } from "@/components/ui/button";
import { Field, Input } from "@/components/ui/field";

const initialState: ActionState = {};

type AuthFormProps = {
  mode: "login" | "register";
  action: (state: ActionState, formData: FormData) => Promise<ActionState>;
};

export function AuthForm({ mode, action }: AuthFormProps) {
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="grid gap-4">
      {state.message ? (
        <div className="rounded-lg border border-red-300/30 bg-red-500/10 px-4 py-3 text-sm text-red-100">
          {state.message}
        </div>
      ) : null}

      {mode === "register" ? (
        <Field label="Nom" error={state.fieldErrors?.name?.[0]}>
          <Input
            name="name"
            autoComplete="name"
            placeholder="Marie Dupont"
            disabled={pending}
          />
        </Field>
      ) : null}

      <Field label="Email" error={state.fieldErrors?.email?.[0]}>
        <Input
          name="email"
          type="email"
          autoComplete="email"
          placeholder="vous@exemple.fr"
          disabled={pending}
          required
        />
      </Field>

      <Field label="Mot de passe" error={state.fieldErrors?.password?.[0]}>
        <Input
          name="password"
          type="password"
          autoComplete={mode === "login" ? "current-password" : "new-password"}
          placeholder="8 caractères minimum"
          disabled={pending}
          required
        />
      </Field>

      <Button type="submit" disabled={pending} className="mt-2 w-full">
        {pending ? (
          <Loader2 className="size-4 animate-spin" aria-hidden="true" />
        ) : (
          <ArrowRight className="size-4" aria-hidden="true" />
        )}
        {mode === "login" ? "Se connecter" : "Créer mon compte"}
      </Button>
    </form>
  );
}
