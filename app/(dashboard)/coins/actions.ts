"use server";

import { revalidatePath } from "next/cache";
import { notFound, redirect } from "next/navigation";
import { logAudit } from "@/lib/audit";
import { requireUser } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { ensureCoinQuota } from "@/lib/quotas";
import { deleteStoredCoinImage, saveCoinImage } from "@/lib/storage";
import { coinSchema } from "@/lib/validations";
import type { ActionState } from "@/types";

function getImage(formData: FormData, name: string) {
  const value = formData.get(name);
  return value instanceof File ? value : null;
}

function parseCoinForm(formData: FormData) {
  return coinSchema.safeParse({
    title: formData.get("title"),
    country: formData.get("country"),
    year: formData.get("year"),
    denomination: formData.get("denomination"),
    period: formData.get("period"),
    metal: formData.get("metal"),
    weight: formData.get("weight"),
    diameter: formData.get("diameter"),
    condition: formData.get("condition"),
    mint: formData.get("mint"),
    mintage: formData.get("mintage"),
    purchasePrice: formData.get("purchasePrice"),
    estimatedLow: formData.get("estimatedLow"),
    estimatedMid: formData.get("estimatedMid"),
    estimatedHigh: formData.get("estimatedHigh"),
    currency: formData.get("currency") || "EUR",
    status: formData.get("status") || "COLLECTION",
    notes: formData.get("notes"),
  });
}

export async function createCoinAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const quota = await ensureCoinQuota(user.id, user.plan);

  if (!quota.allowed) {
    return { message: quota.message };
  }

  const parsed = parseCoinForm(formData);
  if (!parsed.success) {
    return {
      message: "Vérifiez les champs de la fiche.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  let createdCoinId: string;

  try {
    const [obverseImageUrl, reverseImageUrl] = await Promise.all([
      saveCoinImage(getImage(formData, "obverseImage"), user.id, "obverse"),
      saveCoinImage(getImage(formData, "reverseImage"), user.id, "reverse"),
    ]);

    const prisma = getPrisma();
    const coin = await prisma.coin.create({
      data: {
        ...parsed.data,
        userId: user.id,
        obverseImageUrl,
        reverseImageUrl,
      },
    });

    await logAudit({
      userId: user.id,
      action: "COIN_CREATED",
      entityType: "Coin",
      entityId: coin.id,
    });

    revalidatePath("/dashboard");
    revalidatePath("/collection");
    createdCoinId = coin.id;
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Impossible de créer la pièce pour le moment.",
    };
  }

  redirect(`/coins/${createdCoinId}`);
}

export async function updateCoinAction(
  coinId: string,
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const user = await requireUser();
  const parsed = parseCoinForm(formData);

  if (!parsed.success) {
    return {
      message: "Vérifiez les champs de la fiche.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const prisma = getPrisma();
  const existing = await prisma.coin.findFirst({
    where: { id: coinId, userId: user.id },
  });

  if (!existing) {
    notFound();
  }

  let updatedCoinId: string;

  try {
    const obverseFile = getImage(formData, "obverseImage");
    const reverseFile = getImage(formData, "reverseImage");
    const [newObverseImageUrl, newReverseImageUrl] = await Promise.all([
      saveCoinImage(obverseFile, user.id, "obverse"),
      saveCoinImage(reverseFile, user.id, "reverse"),
    ]);

    const coin = await prisma.coin.update({
      where: { id: existing.id },
      data: {
        ...parsed.data,
        obverseImageUrl: newObverseImageUrl ?? existing.obverseImageUrl,
        reverseImageUrl: newReverseImageUrl ?? existing.reverseImageUrl,
      },
    });

    if (newObverseImageUrl) {
      await deleteStoredCoinImage(existing.obverseImageUrl);
    }

    if (newReverseImageUrl) {
      await deleteStoredCoinImage(existing.reverseImageUrl);
    }

    await logAudit({
      userId: user.id,
      action: "COIN_UPDATED",
      entityType: "Coin",
      entityId: coin.id,
    });

    revalidatePath("/dashboard");
    revalidatePath("/collection");
    revalidatePath(`/coins/${coin.id}`);
    updatedCoinId = coin.id;
  } catch (error) {
    return {
      message:
        error instanceof Error
          ? error.message
          : "Impossible de modifier la pièce pour le moment.",
    };
  }

  redirect(`/coins/${updatedCoinId}`);
}

export async function deleteCoinAction(coinId: string) {
  const user = await requireUser();
  const prisma = getPrisma();
  const coin = await prisma.coin.findFirst({
    where: { id: coinId, userId: user.id },
  });

  if (!coin) {
    notFound();
  }

  await prisma.coin.delete({ where: { id: coin.id } });
  await Promise.all([
    deleteStoredCoinImage(coin.obverseImageUrl),
    deleteStoredCoinImage(coin.reverseImageUrl),
  ]);

  await logAudit({
    userId: user.id,
    action: "COIN_DELETED",
    entityType: "Coin",
    entityId: coin.id,
  });

  revalidatePath("/dashboard");
  revalidatePath("/collection");
  redirect("/collection");
}
