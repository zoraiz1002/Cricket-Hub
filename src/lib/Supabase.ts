import { createClient } from '@supabase/supabase-js';

// Safely pull environmental credentials from Vite's import context
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Fail early with a clear warning if environment variables are missing
if (!supabaseUrl || !supabaseAnonKey) {
  console.warn(
    'Supabase environment variables are missing! Check your .env file at the project root.'
  );
}

export const supabase = createClient(supabaseUrl || '', supabaseAnonKey || '');