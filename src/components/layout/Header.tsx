"use client";

import { useEffect, useState } from "react";
import { Bell, Menu, Search } from "lucide-react";
import { getInitials } from "@/lib/utils";
import { ThemeToggle } from "./ThemeToggle";
import { createClient } from "@/lib/supabase/client";

interface HeaderProps {
  /** Ouvre le drawer de navigation sur mobile. */
  onMenuClick: () => void;
}

/**
 * Barre supérieure : bouton menu (mobile), recherche, notifications, thème et
 * profil administrateur. Effet glassmorphism + sticky.
 */
export function Header({ onMenuClick }: HeaderProps) {
  const [admin, setAdmin] = useState({
    name: "Admin",
    role: "Chargement...",
    email: "",
  });
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    async function fetchUserData() {
      const supabase = createClient();
      
      // 1. Fetch user auth
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      let name = user.email?.split("@")[0] || "Admin";
      let role = "Admin";

      // 2. Try fetching from profiles
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", user.id)
        .single();
      
      if (profile?.role) {
        role = profile.role;
      }

      // 3. Try fetching from user_progress for real name
      const { data: progress } = await supabase
        .from("user_progress")
        .select("first_name, last_name")
        .eq("uid", user.id)
        .single();
      
      if (progress?.first_name || progress?.last_name) {
        name = `${progress.first_name || ""} ${progress.last_name || ""}`.trim();
      }

      setAdmin({ name, role, email: user.email || "" });

      // 4. Fetch notifications count
      const { count } = await supabase
        .from("notifications")
        .select("*", { count: "exact", head: true })
        .eq("is_read", false);
      
      if (count !== null) {
        setUnreadCount(count);
      }
    }

    fetchUserData();
  }, []);

  return (
    <header className="glass sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border px-4 sm:px-6">
      {/* Menu mobile */}
      <button
        type="button"
        onClick={onMenuClick}
        aria-label="Ouvrir le menu"
        className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted lg:hidden"
      >
        <Menu className="h-5 w-5" />
      </button>

      {/* Recherche */}
      <div className="relative hidden flex-1 sm:block">
        <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <input
          type="search"
          placeholder="Rechercher une activité, un client, une réservation…"
          className="h-10 w-full max-w-md rounded-xl border border-border bg-surface pl-9 pr-3 text-sm outline-none transition-colors placeholder:text-muted-foreground focus:border-brand-400 focus:ring-2 focus:ring-brand-500/20"
        />
      </div>

      <div className="ml-auto flex items-center gap-2 sm:gap-3">
        <ThemeToggle />

        {/* Notifications */}
        <button
          type="button"
          aria-label="Notifications"
          className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <Bell className="h-4.5 w-4.5" />
          {unreadCount > 0 && (
            <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent ring-2 ring-surface" />
          )}
        </button>

        {/* Profil admin */}
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-surface py-1 pl-1 pr-3">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-500 text-xs font-bold text-white uppercase">
            {getInitials(admin.name)}
          </span>
          <div className="hidden text-left leading-tight sm:block">
            <p className="text-sm font-semibold truncate max-w-[120px]">{admin.name}</p>
            <p className="text-[11px] text-muted-foreground capitalize">{admin.role}</p>
          </div>
        </div>
      </div>
    </header>
  );
}
