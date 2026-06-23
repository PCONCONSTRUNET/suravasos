import { createClient } from '@supabase/supabase-js';

const PLACEHOLDER_URL = "https://placeholder-url.supabase.co";
const PLACEHOLDER_KEY = "placeholder-key";

const rawUrl = import.meta.env.VITE_SUPABASE_URL;
const rawKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Valida o formato da URL antes de passar pro createClient. Se VITE_SUPABASE_URL
// vier configurada porém mal formatada (sem https://, com espaço/aspas sobrando,
// etc.), createClient() lança uma exceção SÍNCRONA — e como este módulo é
// importado por toda rota, isso derruba o SSR inteiro (500 em qualquer página,
// inclusive /robots.txt). Por isso validamos e caímos pro placeholder em vez
// de deixar o app inteiro quebrar.
function isValidSupabaseUrl(value: unknown): value is string {
  if (typeof value !== "string" || value.trim() === "") return false;
  try {
    const url = new URL(value.trim());
    return url.protocol === "https:" || url.protocol === "http:";
  } catch {
    return false;
  }
}

const supabaseUrl = isValidSupabaseUrl(rawUrl) ? rawUrl.trim() : PLACEHOLDER_URL;
const supabaseAnonKey = typeof rawKey === "string" && rawKey.trim() !== "" ? rawKey.trim() : PLACEHOLDER_KEY;

if (supabaseUrl === PLACEHOLDER_URL || supabaseAnonKey === PLACEHOLDER_KEY) {
  console.warn(
    "Variáveis de ambiente do Supabase ausentes ou inválidas (VITE_SUPABASE_URL e/ou VITE_SUPABASE_ANON_KEY). " +
    `Valor recebido para VITE_SUPABASE_URL: ${JSON.stringify(rawUrl)}`
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Cliente isolado para os Parceiros (evita conflito de login na mesma máquina)
export const supabaseParceiro = createClient(
  supabaseUrl,
  supabaseAnonKey,
  {
    auth: {
      storageKey: 'sb-parceiro-auth-token',
    }
  }
);
