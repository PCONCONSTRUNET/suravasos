
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://mpbmssohpjwijkyhtucm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYm1zc29ocGp3aWpreWh0dWNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTc0ODgyMSwiZXhwIjoyMDk3MzI0ODIxfQ.2-lLV8-UMtYgNrTqggvQlWASYKvkR44XzvjIEIfXvCk');

async function run() {
  const { data: oscarino } = await supabase.from('vendedores').select('id, nome').ilike('nome', '%Oscarino%').single();
  if (!oscarino) {
    console.log('Oscarino não encontrado');
    return;
  }
  console.log('Encontrado:', oscarino.nome);
  
  const { data: precos } = await supabase
    .from('parceiro_precos')
    .select('preco_personalizado, produtos ( nome )')
    .eq('vendedor_id', oscarino.id);
  
  if (!precos || precos.length === 0) {
    console.log('Nenhum preço personalizado encontrado.');
    return;
  }
  
  precos.forEach(p => {
    console.log('- ' + (p.produtos ? p.produtos.nome : 'Produto Desconhecido') + ': R$ ' + p.preco_personalizado);
  });
}
run();

