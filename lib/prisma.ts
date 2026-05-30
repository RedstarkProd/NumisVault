import "server-only";

import { PrismaClient } from "@prisma/client";

const globalForPrisma = globalThis as unknown as {
  numisVaultPrisma?: PrismaClient;
};

export function getPrisma() {
  if (!globalForPrisma.numisVaultPrisma) {
    globalForPrisma.numisVaultPrisma = new PrismaClient({
      log:
        process.env.NODE_ENV === "development"
          ? ["warn", "error"]
          : ["error"],
    });
  }

  return globalForPrisma.numisVaultPrisma;
}
