import { createClient, type SupabaseClient } from "@supabase/supabase-js";

// Public anon key only. Do NOT put your service role key here.
// Replace with your project's values from Supabase: Project Settings → API
const SUPABASE_URL = "https://lvmdsvxfzeevdtolhoin.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx2bWRzdnhmemVldmR0b2xob2luIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTYzMzc3MDUsImV4cCI6MjA3MTkxMzcwNX0.ay1BvRiSBPk2NaUu4ZzzF2vbN6OM1rTZ_5FlUy1fc4o";

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
