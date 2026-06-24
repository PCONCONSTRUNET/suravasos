const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({path: '.env'});
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function test() {
  const { data: conf, error: confErr } = await supabase.from('configuracoes').select('*');
  console.log('Configuracoes:', conf, confErr);
  
  const { data: usu, error: usuErr } = await supabase.from('usuarios').select('*');
  console.log('Usuarios:', usu, usuErr);
}
test();
