import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public anon key only. Do NOT put your service role key here.
// Replace with your project's values from Supabase: Project Settings → API
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

const configured =
  typeof SUPABASE_URL === "string" &&
  SUPABASE_URL.startsWith("http") &&
  !SUPABASE_URL.includes("YOUR_") &&
  typeof SUPABASE_ANON_KEY === "string" &&
  SUPABASE_ANON_KEY.length > 0 &&
  !SUPABASE_ANON_KEY.includes("YOUR_");

// Export a nullable client to avoid crashing the app if not configured
export const supabase: SupabaseClient | null = configured
  ? createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
  : null;

export const isSupabaseConfigured = configured;
