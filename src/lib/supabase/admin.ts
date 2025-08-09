// Server-only Supabase admin client using the Service Role key.
// Do NOT import from any client component.

import { createClient as createServerSupabaseClient } from "@supabase/supabase-js";

export function createAdminClient() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL;
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !serviceRoleKey) {
    throw new Error("Missing SUPABASE_URL/SUPABASE_SERVICE_ROLE_KEY envs");
  }

  // Important: never expose serviceRoleKey to the browser
  return createServerSupabaseClient(url, serviceRoleKey, {
    auth: {
      // Admin usage should not persist sessions; use bearer only
      persistSession: false,
      autoRefreshToken: false,
    },
  });
}


