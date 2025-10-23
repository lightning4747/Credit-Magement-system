import { createBrowserClient } from "@supabase/ssr"

let supabaseClient: ReturnType<typeof createBrowserClient> | null = null

export function getSupabaseClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!url || !key) {
    console.warn(
      "[v0] Supabase environment variables not configured. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your .env.local file.",
    )
    return null as any
  }

  if (!supabaseClient) {
    supabaseClient = createBrowserClient(url, key)
  }
  return supabaseClient
}
