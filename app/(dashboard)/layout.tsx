import type { ReactNode } from "react";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { requireUser } from "@/lib/auth";

export const dynamic = "force-dynamic";

export default async function ProtectedLayout({
  children,
}: {
  children: ReactNode;
}) {
  const user = await requireUser();

  return <DashboardShell user={user}>{children}</DashboardShell>;
}
