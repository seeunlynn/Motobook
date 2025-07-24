const supabaseUrl = 'https://blxfcrskmawtymbwtfju.supabase.co';
const supabaseKey = 'your-supabase-key';
const { createClient } = supabase;
window.supabaseClient = createClient(supabaseUrl, supabaseKey);