import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase();
}

export function nullIfEmpty(value: FormDataEntryValue | null) {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

export function formatCurrency(
  amount: number | null | undefined,
  currency = "EUR",
) {
  if (amount == null || Number.isNaN(amount)) {
    return "Non renseigné";
  }

  return new Intl.NumberFormat("fr-FR", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatDate(date: Date | string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(date));
}

export function statusLabel(status: string) {
  const labels: Record<string, string> = {
    COLLECTION: "Collection",
    FOR_SALE: "À vendre",
    FOR_TRADE: "À échanger",
    TO_EXPERTISE: "À expertiser",
    SOLD: "Vendue",
  };

  return labels[status] ?? status;
}
