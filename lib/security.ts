import "server-only";

import { headers } from "next/headers";

export const SESSION_COOKIE_NAME = "numisvault_session";
export const MAX_IMAGE_SIZE_BYTES = 5 * 1024 * 1024;

const imageMimeToExtension = new Map([
  ["image/jpeg", "jpg"],
  ["image/png", "png"],
  ["image/webp", "webp"],
]);

type Bucket = {
  count: number;
  resetAt: number;
};

const rateLimitBuckets = new Map<string, Bucket>();

export async function getRequestInfo() {
  const headerList = await headers();
  const forwardedFor = headerList.get("x-forwarded-for");
  const ipAddress =
    forwardedFor?.split(",")[0]?.trim() ||
    headerList.get("x-real-ip") ||
    "unknown";

  return {
    ipAddress,
    userAgent: headerList.get("user-agent") || "unknown",
  };
}

export function checkRateLimit(
  key: string,
  limit: number,
  windowMs: number,
) {
  const now = Date.now();
  const bucket = rateLimitBuckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    rateLimitBuckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (bucket.count >= limit) {
    return {
      allowed: false,
      remaining: 0,
      retryAfter: Math.ceil((bucket.resetAt - now) / 1000),
    };
  }

  bucket.count += 1;
  return { allowed: true, remaining: limit - bucket.count };
}

export function getImageExtension(mimeType: string) {
  return imageMimeToExtension.get(mimeType);
}

export function validateImageFile(file: File) {
  if (!file || file.size === 0) {
    return { valid: false, error: "Aucun fichier fourni." };
  }

  if (file.size > MAX_IMAGE_SIZE_BYTES) {
    return {
      valid: false,
      error: "L’image dépasse la limite autorisée de 5 Mo.",
    };
  }

  if (!getImageExtension(file.type)) {
    return {
      valid: false,
      error: "Format d’image non autorisé. Utilisez JPG, PNG ou WebP.",
    };
  }

  return { valid: true };
}
