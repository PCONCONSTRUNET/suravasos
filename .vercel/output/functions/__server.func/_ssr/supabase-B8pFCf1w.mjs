import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-B8pFCf1w.js
console.warn("Faltam as variáveis de ambiente do Supabase (VITE_SUPABASE_URL e VITE_SUPABASE_ANON_KEY).");
var supabase = createClient("https://placeholder-url.supabase.co", "placeholder-key");
var supabaseParceiro = createClient("https://placeholder-url.supabase.co", "placeholder-key", { auth: { storageKey: "sb-parceiro-auth-token" } });
//#endregion
export { supabaseParceiro as n, supabase as t };
