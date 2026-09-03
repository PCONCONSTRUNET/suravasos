
const { createClient } = require('@supabase/supabase-js');
const supabase = createClient('https://mpbmssohpjwijkyhtucm.supabase.co', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYm1zc29ocGp3aWpreWh0dWNtIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc4MTc0ODgyMSwiZXhwIjoyMDk3MzI0ODIxfQ.2-lLV8-UMtYgNrTqggvQlWASYKvkR44XzvjIEIfXvCk');

async function run() {
  const { data: oscarino } = await supabase.from('vendedores').select('id, nome').ilike('nome', '%Oscarino%').single();
  const { data: william } = await supabase.from('vendedores').select('id, nome').ilike('nome', '%WILLIAM PAIVA LEAL%').single();
  
  if (!oscarino || !william) {
    console.log('Parceiros não encontrados');
    return;
  }
  console.log('Copiando de:', oscarino.nome, 'para', william.nome);
  
  // Get Oscarino's prices
  const { data: precos } = await supabase
    .from('parceiro_precos')
    .select('produto_id, preco_personalizado')
    .eq('vendedor_id', oscarino.id);
  
  if (!precos || precos.length === 0) {
    console.log('Nenhum preço encontrado para copiar.');
    return;
  }
  
  // Delete William's existing custom prices
  await supabase.from('parceiro_precos').delete().eq('vendedor_id', william.id);
  
  // Insert for William
  const inserts = precos.map(p => ({
    vendedor_id: william.id,
    produto_id: p.produto_id,
    preco_personalizado: p.preco_personalizado
  }));
  
  const { error } = await supabase.from('parceiro_precos').insert(inserts);
  if (error) {
    console.log('Erro ao inserir:', error.message);
  } else {
    console.log(inserts.length + ' preços copiados com sucesso!');
  }
}
run();

