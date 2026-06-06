"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Loader2, Lock, Mail } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

/**
 * Formulaire de connexion (client).
 * Style professionnel et épuré.
 */
export function LoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const form = new FormData(e.currentTarget);
    const email = String(form.get("email") ?? "");
    const password = String(form.get("password") ?? "");

    if (!email || !password) {
      setError("Veuillez renseigner votre email et votre mot de passe.");
      setLoading(false);
      return;
    }

    const supabase = createClient();
    const { error: authError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (authError) {
      setError("Email ou mot de passe incorrect.");
      setLoading(false);
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email */}
      <div className="space-y-2">
        <label htmlFor="email" className="text-sm font-medium text-foreground">
          Adresse e-mail
        </label>
        <div className="relative">
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            placeholder="admin@weego.dz"
            className="h-12 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder:text-muted-foreground"
          />
          <Mail className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        </div>
      </div>

      {/* Mot de passe */}
      <div className="space-y-2">
        <label htmlFor="password" className="text-sm font-medium text-foreground">
          Mot de passe
        </label>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            placeholder="••••••••"
            className="h-12 w-full rounded-lg border border-border bg-background px-4 py-2 text-sm text-foreground transition-colors focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500 placeholder:text-muted-foreground"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            aria-label={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Options sous le mot de passe */}
      <div className="flex items-center justify-between">
        <label className="flex items-center gap-2 cursor-pointer group">
          <div className="relative flex items-center justify-center h-4 w-4 rounded border border-border bg-background group-hover:border-brand-400 transition-colors">
            <input type="checkbox" className="peer sr-only" />
            <div className="hidden peer-checked:block h-2 w-2 rounded-sm bg-brand-500"></div>
          </div>
          <span className="text-sm text-muted-foreground group-hover:text-foreground transition-colors">Se souvenir de moi</span>
        </label>
        
        <a href="#" className="text-sm text-brand-600 dark:text-brand-400 hover:underline">
          Mot de passe oublié ?
        </a>
      </div>

      {error && (
        <div className="rounded-lg bg-rose-50 dark:bg-rose-500/10 border border-rose-200 dark:border-rose-500/20 p-3">
          <p className="text-sm font-medium text-rose-600 dark:text-rose-400">
            {error}
          </p>
        </div>
      )}

      {/* Bouton de connexion */}
      <button
        type="submit"
        disabled={loading}
        className="mt-2 flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-brand-600 text-sm font-medium text-white transition-all hover:bg-brand-700 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-70"
      >
        {loading && <Loader2 className="h-4 w-4 animate-spin" />}
        {loading ? "Connexion en cours..." : "Se connecter"}
      </button>
    </form>
  );
}
