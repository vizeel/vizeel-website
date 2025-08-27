import { createClient } from "@supabase/supabase-js";

// Public anon key only. Do NOT put your service role key here.
// Replace with your project's values from Supabase: Project Settings → API
const SUPABASE_URL = "YOUR_SUPABASE_URL";
const SUPABASE_ANON_KEY = "YOUR_SUPABASE_ANON_KEY";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
