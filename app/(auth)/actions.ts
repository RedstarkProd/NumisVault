"use server";

import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";
import { logAudit } from "@/lib/audit";
import { createSession, destroySession } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { checkRateLimit, getRequestInfo } from "@/lib/security";
import { loginSchema, registerSchema } from "@/lib/validations";
import { normalizeEmail } from "@/lib/utils";
import type { ActionState } from "@/types";

export async function registerAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const requestInfo = await getRequestInfo();
  const rateLimit = checkRateLimit(
    `register:${requestInfo.ipAddress}`,
    5,
    15 * 60 * 1000,
  );

  if (!rateLimit.allowed) {
    return {
      message: `Trop de tentatives. Réessayez dans ${rateLimit.retryAfter} secondes.`,
    };
  }

  const parsed = registerSchema.safeParse({
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      message: "Vérifiez les champs du formulaire.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const prisma = getPrisma();
  const email = normalizeEmail(parsed.data.email);
  const existing = await prisma.user.findUnique({ where: { email } });

  if (existing) {
    return { message: "Un compte existe déjà avec cette adresse email." };
  }

  const passwordHash = await bcrypt.hash(parsed.data.password, 12);
  const user = await prisma.user.create({
    data: {
      email,
      name: parsed.data.name,
      passwordHash,
      settings: { create: {} },
      subscription: { create: { plan: "FREE" } },
    },
  });

  await logAudit({
    userId: user.id,
    action: "USER_REGISTERED",
    entityType: "User",
    entityId: user.id,
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function loginAction(
  _previousState: ActionState,
  formData: FormData,
): Promise<ActionState> {
  const requestInfo = await getRequestInfo();
  const rateLimit = checkRateLimit(
    `login:${requestInfo.ipAddress}`,
    8,
    15 * 60 * 1000,
  );

  if (!rateLimit.allowed) {
    return {
      message: `Trop de tentatives. Réessayez dans ${rateLimit.retryAfter} secondes.`,
    };
  }

  const parsed = loginSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return {
      message: "Vérifiez les champs du formulaire.",
      fieldErrors: parsed.error.flatten().fieldErrors,
    };
  }

  const prisma = getPrisma();
  const user = await prisma.user.findUnique({
    where: { email: normalizeEmail(parsed.data.email) },
  });

  if (!user?.passwordHash) {
    return { message: "Email ou mot de passe incorrect." };
  }

  const passwordMatches = await bcrypt.compare(
    parsed.data.password,
    user.passwordHash,
  );

  if (!passwordMatches) {
    return { message: "Email ou mot de passe incorrect." };
  }

  await logAudit({
    userId: user.id,
    action: "USER_LOGIN",
    entityType: "User",
    entityId: user.id,
  });

  await createSession(user.id);
  redirect("/dashboard");
}

export async function logoutAction() {
  await destroySession();
  redirect("/login");
}
