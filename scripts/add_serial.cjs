const { Client } = require('pg');

const client = new Client({
  connectionString: 'postgresql://postgres:lUCASDUDA28123@db.mpbmssohpjwijkyhtucm.supabase.co:5432/postgres'
});

async function run() {
  try {
    await client.connect();
    console.log("Connected");
    
    await client.query('ALTER TABLE vendas ADD COLUMN numero_pedido BIGSERIAL;');
    console.log("Column added");
    
    // Check if it was added
    const res = await client.query('SELECT numero_pedido FROM vendas LIMIT 1;');
    console.log(res.rows);
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.end();
  }
}

run();
