import "server-only";

import { randomUUID } from "node:crypto";
import { mkdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { getImageExtension, validateImageFile } from "@/lib/security";

const uploadRoot = path.join(process.cwd(), "public", "uploads", "coins");

export async function saveCoinImage(
  file: File | null,
  userId: string,
  side: "obverse" | "reverse",
) {
  if (!file || file.size === 0) {
    return null;
  }

  const validation = validateImageFile(file);
  if (!validation.valid) {
    throw new Error(validation.error);
  }

  const extension = getImageExtension(file.type);
  if (!extension) {
    throw new Error("Format d’image non autorisé.");
  }

  const safeFileName = `${randomUUID()}-${side}.${extension}`;
  const userDirectory = path.join(uploadRoot, userId);
  const absolutePath = path.join(userDirectory, safeFileName);

  await mkdir(userDirectory, { recursive: true });
  await writeFile(absolutePath, Buffer.from(await file.arrayBuffer()));

  return `/uploads/coins/${userId}/${safeFileName}`;
}

export async function deleteStoredCoinImage(url: string | null | undefined) {
  if (!url || !url.startsWith("/uploads/coins/")) {
    return;
  }

  const relativePath = url.replace(/^\/uploads\/coins\//, "");
  const absolutePath = path.resolve(uploadRoot, relativePath);
  const resolvedRoot = path.resolve(uploadRoot);

  if (!absolutePath.startsWith(resolvedRoot)) {
    return;
  }

  try {
    await unlink(absolutePath);
  } catch {
    // Missing local files should not block account or coin deletion.
  }
}
