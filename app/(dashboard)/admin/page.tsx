import type { Metadata } from "next";
import { Panel } from "@/components/ui/panel";
import { requireAdmin } from "@/lib/auth";
import { getPrisma } from "@/lib/prisma";
import { formatDate } from "@/lib/utils";

export const metadata: Metadata = {
  title: "Admin",
};

export default async function AdminPage() {
  await requireAdmin();
  const prisma = getPrisma();
  const [users, coins, analyses, dealerSearches, logs, recentUsers] =
    await Promise.all([
      prisma.user.count(),
      prisma.coin.count(),
      prisma.coinAnalysis.count(),
      prisma.dealerSearch.count(),
      prisma.auditLog.findMany({ orderBy: { createdAt: "desc" }, take: 8 }),
      prisma.user.findMany({ orderBy: { createdAt: "desc" }, take: 6 }),
    ]);

  return (
    <div className="grid gap-8">
      <div>
        <p className="text-sm font-medium text-amber-200">Administration</p>
        <h1 className="mt-2 font-serif text-4xl font-bold text-white md:text-5xl">
          Vue admin minimale
        </h1>
      </div>
      <div className="grid gap-4 md:grid-cols-4">
        <Stat label="Utilisateurs" value={users} />
        <Stat label="Pièces" value={coins} />
        <Stat label="Analyses" value={analyses} />
        <Stat label="Recherches boutiques" value={dealerSearches} />
      </div>
      <div className="grid gap-6 xl:grid-cols-2">
        <Panel className="p-5">
          <h2 className="text-xl font-semibold">Derniers logs</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            {logs.map((log) => (
              <div key={log.id} className="rounded-lg border border-white/10 p-3">
                <p className="font-medium text-white">{log.action}</p>
                <p className="text-slate-500">{formatDate(log.createdAt)}</p>
              </div>
            ))}
          </div>
        </Panel>
        <Panel className="p-5">
          <h2 className="text-xl font-semibold">Utilisateurs récents</h2>
          <div className="mt-5 grid gap-3 text-sm text-slate-300">
            {recentUsers.map((recentUser) => (
              <div key={recentUser.id} className="rounded-lg border border-white/10 p-3">
                <p className="font-medium text-white">{recentUser.email}</p>
                <p className="text-slate-500">{formatDate(recentUser.createdAt)}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Panel className="p-5">
      <p className="text-3xl font-semibold text-white">{value}</p>
      <p className="mt-1 text-sm text-slate-400">{label}</p>
    </Panel>
  );
}
