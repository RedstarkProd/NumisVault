import { z } from "zod";

const optionalString = (max = 180) =>
  z.preprocess(
    (value) => {
      if (typeof value !== "string") {
        return undefined;
      }
      const trimmed = value.trim();
      return trimmed.length > 0 ? trimmed : undefined;
    },
    z.string().max(max).optional(),
  );

const optionalNumber = z.preprocess(
  (value) => {
    if (typeof value !== "string") {
      return undefined;
    }
    const normalized = value.trim().replace(",", ".");
    if (!normalized) {
      return undefined;
    }
    return Number(normalized);
  },
  z.number().finite().nonnegative().optional(),
);

export const registerSchema = z.object({
  name: optionalString(120),
  email: z.string().trim().email("Adresse email invalide.").max(180),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères.")
    .max(120),
});

export const loginSchema = z.object({
  email: z.string().trim().email("Adresse email invalide."),
  password: z.string().min(1, "Le mot de passe est requis."),
});

export const coinStatusSchema = z.enum([
  "COLLECTION",
  "FOR_SALE",
  "FOR_TRADE",
  "TO_EXPERTISE",
  "SOLD",
]);

export const coinSchema = z.object({
  title: z
    .string()
    .trim()
    .min(2, "Le titre est requis.")
    .max(180, "Le titre est trop long."),
  country: optionalString(),
  year: optionalString(60),
  denomination: optionalString(),
  period: optionalString(),
  metal: optionalString(),
  weight: optionalNumber,
  diameter: optionalNumber,
  condition: optionalString(),
  mint: optionalString(),
  mintage: optionalString(),
  purchasePrice: optionalNumber,
  estimatedLow: optionalNumber,
  estimatedMid: optionalNumber,
  estimatedHigh: optionalNumber,
  currency: z.string().trim().min(3).max(3).default("EUR"),
  status: coinStatusSchema.default("COLLECTION"),
  notes: optionalString(3000),
});

export const profileSchema = z.object({
  name: optionalString(120),
});

export const deleteAccountSchema = z.object({
  confirmation: z.literal("SUPPRIMER", {
    error: "Saisissez SUPPRIMER pour confirmer.",
  }),
});

export type CoinInput = z.infer<typeof coinSchema>;
