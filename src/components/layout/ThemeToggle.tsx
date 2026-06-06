"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/useMounted";

/** Bouton de bascule mode clair / sombre. */
export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();

  // Évite le mismatch d'hydratation (le thème n'est connu qu'au montage client).

  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="Basculer le thème"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
    >
      {mounted && isDark ? (
        <Sun className="h-4.5 w-4.5" />
      ) : (
        <Moon className="h-4.5 w-4.5" />
      )}
    </button>
  );
}
