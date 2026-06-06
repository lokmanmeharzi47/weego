/**
 * Client Supabase côté serveur (Server Components, Route Handlers, Actions).
 * Utilise les cookies Next.js pour la gestion de session SSR.
 *
 * ⚠️ À appeler UNIQUEMENT dans un contexte serveur (async Server Component,
 * Route Handler, Server Action). Pour les Client Components → client.ts.
 */

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import type { Database } from "@/types/database.types";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Appelé depuis un Server Component en lecture seule — ignoré.
            // Le middleware ou la Route Handler gérera le rafraîchissement.
          }
        },
      },
    }
  );
}
