/**
 * Client Supabase côté navigateur (Client Components).
 * Utilisé dans les composants "use client" pour les mutations et les queries
 * en temps réel. Singleton réutilisable via createBrowserClient().
 */

import { createBrowserClient } from "@supabase/ssr";
import type { Database } from "@/types/database.types";

export function createClient() {
  return createBrowserClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
