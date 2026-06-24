const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({path: '.env.local'});
const supabase = createClient(process.env.VITE_SUPABASE_URL, process.env.VITE_SUPABASE_ANON_KEY);
async function test() {
  const { data, error } = await supabase.from('clientes').insert([{nome: 'Test Cliente'}]).select();
  console.log('Clientes:', {data, error});
  
  const { data: dav, error: davErr } = await supabase.from('davs').insert([{
        cliente_nome: "Teste",
        cliente_cnpj: "",
        cliente_endereco: "",
        cliente_telefone: "",
        emissor_nome: "VIVAVERDE VASOS",
        emissor_cnpj: "63.874.628/0001-36",
        emissor_endereco: "Rua Bom Jesus, 267 - Charqueada/SP",
        emissor_telefone: "",
        vendedor: "Parceiro",
        condicao_pagamento: "Dinheiro",
        frete_tipo: "Retirada",
        prazo_entrega: "A Combinar",
        subtotal: 100,
        desconto_percentual: 0,
        desconto_valor: 0,
        frete_valor: 0,
        total: 100,
        observacoes: "",
        validade: new Date().toISOString()
  }]).select();
  console.log('Davs:', {dav, davErr});
}
test();
