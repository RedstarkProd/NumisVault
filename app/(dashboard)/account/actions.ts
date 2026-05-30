"use server";

import { redirect } from "next/navigation";
import { logAudit } from "@/lib/audit";
import { destroySession, requireUser } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { deleteStoredCoinImage } from "@/lib/storage";
import { deleteAccountSchema, profileSchema } from "@/lib/validations";
import type { ActionState } from "@/types";

export async function updateProfileAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsed = profileSchema.safeParse({
    name: formData.get("name"),
  });

  if (!parsed.success) {
    return {
      message: "Vérifiez les champs.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  await getPrisma().user.update({
    where: { id: user.id },
    data: { name: parsed.data.name },
  });

  await logAudit({
    userId: user.id,
    action: "USER_PROFILE_UPDATED",
    entityType: "User",
    entityId: user.id,
  });

  return { ok: true, message: "Profil mis à jour." };
}

export async function deleteAccountAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsed = deleteAccountSchema.safeParse({
    confirmation: formData.get("confirmation"),
  });

  if (!parsed.success) {
    return {
      message: "Confirmation invalide.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const prisma = getPrisma();
  const coins = await prisma.coin.findMany({
    where: { userId: user.id },
    select: { obverseImageUrl: true, reverseImageUrl: true },
  });

  await logAudit({
    userId: user.id,
    action: "ACCOUNT_DELETED",
    entityType: "User",
    entityId: user.id,
  });

  await prisma.user.delete({ where: { id: user.id } });

  await Promise.all(
    coins.flatMap((coin) => [
      deleteStoredCoinImage(coin.obverseImageUrl),
      deleteStoredCoinImage(coin.reverseImageUrl),
    ]),
  );

  await destroySession();
  redirect("/");
}
