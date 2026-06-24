import { t as createClient } from "../_libs/supabase__supabase-js.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/supabase-Bvu1xBCC.js
var supabaseUrl = "https://mpbmssohpjwijkyhtucm.supabase.co";
var supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYm1zc29ocGp3aWpreWh0dWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NDg4MjEsImV4cCI6MjA5NzMyNDgyMX0.TP7OfhgKzLlAJSvdXirT-rcW6K-Qka2Cs7uo7P-FmgU";
var supabase = createClient(supabaseUrl, supabaseAnonKey);
var supabaseParceiro = createClient(supabaseUrl, supabaseAnonKey, { auth: { storageKey: "sb-parceiro-auth-token" } });
//#endregion
export { supabaseParceiro as n, supabase as t };
