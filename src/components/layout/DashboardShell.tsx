"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

/**
 * Coquille applicative du dashboard : Sidebar (fixe en desktop, drawer en
 * mobile) + Header sticky + zone de contenu. Gère l'état d'ouverture du drawer.
 */
export function DashboardShell({ children }: { children: React.ReactNode }) {
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar desktop */}
      <div className="sticky top-0 hidden h-screen shrink-0 lg:block">
        <Sidebar />
      </div>

      {/* Drawer mobile */}
      <div
        className={cn(
          "fixed inset-0 z-50 lg:hidden",
          mobileOpen ? "pointer-events-auto" : "pointer-events-none"
        )}
      >
        {/* Overlay */}
        <div
          onClick={() => setMobileOpen(false)}
          className={cn(
            "absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity",
            mobileOpen ? "opacity-100" : "opacity-0"
          )}
        />
        {/* Panneau */}
        <div
          className={cn(
            "absolute left-0 top-0 h-full transition-transform duration-300",
            mobileOpen ? "translate-x-0" : "-translate-x-full"
          )}
        >
          <Sidebar onNavigate={() => setMobileOpen(false)} />
        </div>
      </div>

      {/* Contenu principal */}
      <div className="flex min-w-0 flex-1 flex-col">
        <Header onMenuClick={() => setMobileOpen(true)} />
        <main className="flex-1 animate-fade-in p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
