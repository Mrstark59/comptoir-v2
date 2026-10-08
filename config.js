// ===== SUPABASE CONFIGURATION =====
// Remplace par TES valeurs (Supabase > Settings > API)
const SUPABASE_URL = "https://TON-PROJET.supabase.co";
const SUPABASE_ANON_KEY = "TA-CLE-ANON-ICI";

const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
