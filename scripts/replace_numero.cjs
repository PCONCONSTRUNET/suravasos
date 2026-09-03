const fs = require('fs');
const files = [
  'src/routes/parceiro.vendas.tsx',
  'src/routes/parceiro.pdv.tsx',
  'src/routes/orcamento.$id.tsx',
  'src/routes/app.vendedores.tsx',
  'src/routes/app.vendas.tsx',
  'src/routes/app.vendas-parceiros.tsx',
  'src/routes/app.venda-nova.tsx',
  'src/routes/app.relatorios.tsx',
  'src/routes/app.pdv.tsx',
  'src/routes/app.logistica.tsx',
  'src/routes/app.fiscal.tsx',
  'src/routes/app.dav.tsx',
  'src/routes/parceiro.dashboard.tsx'
];

for (const file of files) {
  if (!fs.existsSync(file)) continue;
  let content = fs.readFileSync(file, 'utf8');
  
  // Replace typical patterns
  content = content.replace(/\{selectedVenda\?\.id\?\.substring\([^\)]+\)\}/g, '{selectedVenda?.numero_venda}');
  content = content.replace(/\{selectedVenda\?\.id\?\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{selectedVenda?.numero_venda}');
  content = content.replace(/\{selectedVenda\?\.numero \? String\(selectedVenda\.numero\)\.padStart\(3, "0"\) : selectedVenda\?\.numero_venda \|\| selectedVenda\?\.id\?\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{selectedVenda?.numero_venda}');
  
  content = content.replace(/\{v\.numero_venda \|\| v\.id\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{v.numero_venda}');
  content = content.replace(/\{vendaData\.numero_venda \|\| vendaId\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{vendaData.numero_venda}');
  content = content.replace(/\{orc\.numero \? String\(orc\.numero\)\.padStart\(3, "0"\) : orc\.numero_venda \|\| orc\.id\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{orc.numero_venda}');
  
  content = content.replace(/\{venda\.numero \? String\(venda\.numero\)\.padStart\(3, "0"\) : venda\.numero_venda \|\| venda\.id\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{venda.numero_venda}');
  content = content.replace(/\{vendaData\.numero \? String\(vendaData\.numero\)\.padStart\(3, "0"\) : vendaData\.numero_venda \|\| vendaId\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{vendaData.numero_venda}');
  
  content = content.replace(/\{venda\.numero_venda \|\| venda\.id\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{venda.numero_venda}');
  
  content = content.replace(/\{selectedSaleForDetails\?\.id\?\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{selectedSaleForDetails?.numero_venda}');
  
  content = content.replace(/\{davGeradoNumero \|\| davGeradoId\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{davGeradoNumero}');
  
  content = content.replace(/\{selectedDav\?\.numero \? String\(selectedDav\.numero\)\.padStart\(3, "0"\) : selectedDav\?\.numero_venda \|\| selectedDav\?\.id\?\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{selectedDav?.numero_venda}');
  
  content = content.replace(/vendaSelecionada\?\.id\?\.substring\([^\)]+\)\.toUpperCase\(\)/g, 'vendaSelecionada?.numero_venda');
  
  content = content.replace(/\{v\.numero \? String\(v\.numero\)\.padStart\(3, "0"\) : v\.numero_venda \|\| v\.id\.substring\([^\)]+\)\.toUpperCase\(\)\}/g, '{v.numero_venda}');

  fs.writeFileSync(file, content);
}
console.log('Replacements done');
