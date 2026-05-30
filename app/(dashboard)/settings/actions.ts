"use server";

import { z } from "zod";
import { requireUser } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import type { ActionState } from "@/types";

const settingsSchema = z.object({
  currency: z.enum(["EUR", "USD", "GBP", "CHF"]).default("EUR"),
  language: z.enum(["fr", "en"]).default("fr"),
  displayLimit: z.coerce.number().int().min(12).max(96).default(24),
  emailNotifications: z.boolean().default(false),
  darkTheme: z.boolean().default(true),
});

export async function updateSettingsAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsed = settingsSchema.safeParse({
    currency: formData.get("currency"),
    language: formData.get("language"),
    displayLimit: formData.get("displayLimit"),
    emailNotifications: formData.get("emailNotifications") === "on",
    darkTheme: formData.get("darkTheme") === "on",
  });

  if (!parsed.success) {
    return { message: "Paramètres invalides." };
  }

  await getPrisma().userSettings.upsert({
    where: { userId: user.id },
    update: parsed.data,
    create: { userId: user.id, ...parsed.data },
  });

  return { ok: true, message: "Paramètres enregistrés." };
}
