import "server-only";

import { Plan } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";

export const PLAN_LIMITS = {
  FREE: {
    coins: 25,
    aiAnalysesMonthly: 3,
    dealerSearchesMonthly: 3,
    pdfExportsMonthly: 1,
  },
  PREMIUM: {
    coins: 500,
    aiAnalysesMonthly: 30,
    dealerSearchesMonthly: 30,
    pdfExportsMonthly: 30,
  },
  PRO: {
    coins: 2000,
    aiAnalysesMonthly: 150,
    dealerSearchesMonthly: 100,
    pdfExportsMonthly: 250,
  },
  BETA: {
    coins: 2000,
    aiAnalysesMonthly: 150,
    dealerSearchesMonthly: 100,
    pdfExportsMonthly: 250,
  },
} satisfies Record<Plan, Record<string, number>>;

export async function ensureCoinQuota(userId: string, plan: Plan) {
  const prisma = getPrisma();
  const count = await prisma.coin.count({ where: { userId } });
  const limit = PLAN_LIMITS[plan].coins;

  if (count >= limit) {
    return {
      allowed: false,
      message: `Votre plan ${plan} autorise ${limit} pièces. Passez à un plan supérieur pour en ajouter davantage.`,
    };
  }

  return { allowed: true, remaining: limit - count - 1 };
}
