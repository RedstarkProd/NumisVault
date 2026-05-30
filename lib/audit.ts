import "server-only";

import type { Prisma } from "@prisma/client";
import { getPrisma } from "@/lib/prisma";
import { getRequestInfo } from "@/lib/security";

type AuditInput = {
  userId?: string | null;
  action: string;
  entityType?: string | null;
  entityId?: string | null;
  metadata?: Prisma.InputJsonValue;
};

export async function logAudit(input: AuditInput) {
  try {
    const prisma = getPrisma();
    const requestInfo = await getRequestInfo();

    await prisma.auditLog.create({
      data: {
        userId: input.userId ?? null,
        action: input.action,
        entityType: input.entityType ?? null,
        entityId: input.entityId ?? null,
        metadata: input.metadata,
        ipAddress: requestInfo.ipAddress,
        userAgent: requestInfo.userAgent,
      },
    });
  } catch {
    // Audit logging must never expose internals or block the user workflow.
  }
}
