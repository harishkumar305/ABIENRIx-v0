
import { createClient } from '@supabase/supabase-js';

// Configuration provided by user
const SUPABASE_URL = 'https://zqertcsyemfxiqtkarno.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_POph5U-wWJGhYQiixndqWg_A4qXNIwg';

// Initialize the Supabase client
// Note: If the provided key is invalid, the app will gracefully fallback to simulation mode in WaitlistForm
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Always consider this configured since we have hardcoded keys
export const isConfigured = true;
