"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { LogOut, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { navItems } from "@/config/nav";
import { Logo } from "@/components/ui/Logo";

interface SidebarProps {
  /** Appelé lors d'un clic sur un lien (sert à fermer le drawer mobile). */
  onNavigate?: () => void;
}

/**
 * Barre de navigation latérale.
 * Met en évidence la route active (préfixe), badges optionnels, et carte
 * promotionnelle en bas. Réutilisée pour le desktop (fixe) et le mobile (drawer).
 */
export function Sidebar({ onNavigate }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();

  const isActive = (href: string) =>
    href === "/dashboard"
      ? pathname === href
      : pathname.startsWith(href);

  function handleLogout() {
    // TODO: brancher la déconnexion réelle (Supabase signOut, etc.)
    onNavigate?.();
    router.push("/login");
  }

  return (
    <aside className="flex h-full w-64 flex-col border-r border-border bg-surface">
      {/* En-tête / logo */}
      <div className="flex h-16 items-center px-5">
        <Link href="/dashboard" onClick={onNavigate}>
          <Logo />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="scrollbar-thin flex-1 space-y-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Pilotage
        </p>
        {navItems.map((item) => {
          const active = isActive(item.href);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={cn(
                "group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all",
                active
                  ? "bg-brand-500 text-white shadow-glow"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <Icon
                className={cn(
                  "h-[18px] w-[18px] transition-transform group-hover:scale-110",
                  active ? "text-white" : "text-muted-foreground"
                )}
              />
              <span className="flex-1">{item.label}</span>
              {item.badge ? (
                <span
                  className={cn(
                    "flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold",
                    active
                      ? "bg-white/20 text-white"
                      : "bg-accent/20 text-accent"
                  )}
                >
                  {item.badge}
                </span>
              ) : null}
            </Link>
          );
        })}
      </nav>

      {/* Carte promo / upsell */}
      <div className="p-3">
        <div className="relative overflow-hidden rounded-2xl bg-brand-500 p-4 text-white shadow-glow">
          {/* Decorative graphic in the card */}
          <div className="absolute -right-4 -bottom-4 opacity-50">
            <Image src="/half circle graphic.png" alt="" width={80} height={80} className="object-contain" style={{ height: 'auto' }} />
          </div>
          <div className="absolute -top-2 -right-2 opacity-30">
            <Image src="/Orange graphic.png" alt="" width={40} height={40} className="object-contain animate-spin-slow" style={{ height: 'auto' }} />
          </div>

          <div className="relative z-10">
            <Sparkles className="h-5 w-5 text-accent" />
            <p className="mt-2 text-sm font-display font-bold">Weego Pro</p>
            <p className="mt-0.5 text-xs text-white/90 font-medium">
              Analyses avancées & exports illimités.
            </p>
            <button className="mt-3 w-full rounded-lg bg-white/20 py-1.5 text-xs font-semibold backdrop-blur transition-colors hover:bg-white/30 text-white">
              Découvrir
            </button>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="mt-2 flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-500 transition-colors hover:bg-rose-500/10 hover:text-rose-600 dark:text-rose-400 dark:hover:text-rose-300"
        >
          <LogOut className="h-[18px] w-[18px]" />
          Déconnexion
        </button>
      </div>
    </aside>
  );
}
