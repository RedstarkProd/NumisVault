import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Logo } from "@/components/ui/logo";

const navItems = [
  { href: "/#features", label: "Fonctionnalités" },
  { href: "/#how-it-works", label: "Comment ça marche" },
  { href: "/pricing", label: "Tarifs" },
  { href: "/#faq", label: "FAQ" },
];

export function PublicNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/10 bg-[#020711]/88 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6 px-5 py-4 lg:px-8">
        <Logo />
        <nav className="hidden items-center gap-7 text-sm font-medium text-slate-300 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hover:text-amber-200">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ButtonLink href="/login" variant="secondary" className="hidden sm:inline-flex">
            Connexion
          </ButtonLink>
          <ButtonLink href="/register">
            <span className="hidden sm:inline">Commencer gratuitement</span>
            <span className="sm:hidden">Créer</span>
            <ArrowRight className="size-4" aria-hidden="true" />
          </ButtonLink>
        </div>
      </div>
    </header>
  );
}
