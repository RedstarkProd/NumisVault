import Link from "next/link";
import type { ReactNode } from "react";
import {
  BarChart3,
  FolderKanban,
  LogOut,
  PlusCircle,
  Settings,
  Shield,
  UserRound,
} from "lucide-react";
import { logoutAction } from "@/app/(auth)/actions";
import type { AuthUser } from "@/lib/auth";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: BarChart3 },
  { href: "/collection", label: "Collection", icon: FolderKanban },
  { href: "/coins/new", label: "Ajouter", icon: PlusCircle },
  { href: "/account", label: "Compte", icon: UserRound },
  { href: "/settings", label: "Paramètres", icon: Settings },
];

export function DashboardShell({
  user,
  children,
}: {
  user: AuthUser;
  children: ReactNode;
}) {
  const initials = (user.name || user.email).slice(0, 2).toUpperCase();

  return (
    <div className="min-h-dvh bg-[#020711] text-white">
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(245,183,64,0.12),transparent_28%),radial-gradient(circle_at_80%_0%,rgba(31,75,122,0.22),transparent_34%),linear-gradient(180deg,#020711_0%,#07111d_100%)]" />
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-white/10 bg-slate-950/70 px-5 py-6 backdrop-blur-xl lg:block">
        <Logo href="/dashboard" />
        <nav className="mt-10 grid gap-2">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-amber-100"
            >
              <item.icon className="size-4 text-amber-300" aria-hidden="true" />
              {item.label}
            </Link>
          ))}
          {user.role === "ADMIN" ? (
            <Link
              href="/admin"
              className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/[0.06] hover:text-amber-100"
            >
              <Shield className="size-4 text-amber-300" aria-hidden="true" />
              Admin
            </Link>
          ) : null}
        </nav>
      </aside>

      <div className="lg:pl-72">
        <header className="sticky top-0 z-20 border-b border-white/10 bg-[#020711]/82 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-4 px-5 py-4 lg:px-8">
            <div className="lg:hidden">
              <Logo href="/dashboard" />
            </div>
            <div className="hidden lg:block">
              <p className="text-sm text-slate-400">Espace sécurisé</p>
              <p className="text-lg font-semibold text-white">
                Bonjour {user.name || user.email}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="hidden rounded-lg border border-white/10 px-3 py-2 text-sm text-slate-300 sm:block">
                Plan {user.plan}
              </div>
              <div className="grid size-10 place-items-center rounded-full border border-amber-300/40 bg-amber-300/10 text-sm font-semibold text-amber-100">
                {initials}
              </div>
              <form action={logoutAction}>
                <button
                  type="submit"
                  className="grid size-10 place-items-center rounded-lg border border-white/10 bg-white/[0.04] text-slate-300 transition hover:text-white"
                  aria-label="Déconnexion"
                  title="Déconnexion"
                >
                  <LogOut className="size-4" aria-hidden="true" />
                </button>
              </form>
            </div>
          </div>
          <nav className="flex gap-2 overflow-x-auto border-t border-white/10 px-5 py-2 lg:hidden">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="inline-flex min-w-max items-center gap-2 rounded-lg px-3 py-2 text-sm text-slate-300"
              >
                <item.icon className="size-4 text-amber-300" aria-hidden="true" />
                {item.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto w-full max-w-7xl px-5 py-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}
