const { createClient } = require('@supabase/supabase-js');

const SUPABASE_URL = 'https://mpbmssohpjwijkyhtucm.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1wYm1zc29ocGp3aWpreWh0dWNtIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODE3NDg4MjEsImV4cCI6MjA5NzMyNDgyMX0.TP7OfhgKzLlAJSvdXirT-rcW6K-Qka2Cs7uo7P-FmgU';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const productsToCheck = [
  'TERRA VEGETAL 2KG (FD X 12)',
  'TERRA VEGETAL 5KG (FD X 6)',
  'TERRA VEGETAL 10 KG (UN)',
  'TERRA VEGETAL 20 KG (UN)',
  'FERTILIZANTE ORG. 2KG (FD X 12)',
  'FERTILIZANTE ORG. 5 KG (FD X 6)',
  'FERTILIZANTE ORG. 10KG (UN)',
  'FERTILIZANTE ORG. 20KG (UN)',
  'HUMUS 1KG (FD X 15)',
  'HUMUS 20KG (UN)',
  'ESTERCO GADO 1KG (FD X 15)',
  'PO PINUS 1KG (FD X 15)',
  'CASCA PINUS 1KG (FD X8)',
  'CASCA PINUS 50L (UN)',
  'SUBST P / ORQUIDEA 1 KG (FD X10)',
  'CHIPS COCO 300G (FD X 20)',
  'PO COCO 1 KG (FD X 15)',
  'ARGILA EXPANDIDA 500G (FD X 20)',
  'ARGILA MODELAR 1 KG (FD X 12)',
  'MUSGO ROSA 50G (FD X 20)',
  'PEDRA SEIXO 1 Kg N° 1 , 2 , 3',
  'PED. SEIXO 5 Kg N° 1 , 2 , 3',
  'PED.SEIXO 10 KG N° 1 , 2 , 3',
  'PEDRISCO BRAN. 1Kg N° 1 , 2 , 3'
];

async function checkProducts() {
  const { data, error } = await supabase.from('produtos').select('nome');
  
  if (error) {
    console.error('Error fetching products:', error);
    return;
  }

  const existingNames = data.map(p => p.nome.trim().toLowerCase());
  
  const results = {
    found: [],
    missing: []
  };

  for (const p of productsToCheck) {
    // Normalização básica para encontrar (tirar espaços extras, etc)
    const normalized = p.trim().toLowerCase();
    
    // Tenta encontrar um nome que contenha a string ou seja igual
    const found = existingNames.some(name => name === normalized || name.includes(normalized) || normalized.includes(name));
    
    if (found) {
      results.found.push(p);
    } else {
      results.missing.push(p);
    }
  }

  console.log(JSON.stringify(results, null, 2));
}

checkProducts();
