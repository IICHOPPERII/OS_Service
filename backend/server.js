require('dotenv').config();
const express = require('express');
const { Pool } = require('pg');
const cors = require('cors')
const app = express();


// Configuração do PostgreSQL

const pool = new Pool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Teste de conexão com o banco

pool.connect()
  .then(client => {
    console.log('PostgreSQL conectado com sucesso');
    client.release();
  })
  .catch(err => {
    console.error('Erro ao conectar no PostgreSQL:', err.message);
    process.exit(1);
  });


app.use(express.json());
app.use(cors('*'))
// Rota de teste
app.get('/health', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json({ 
    status: 'ok',
    database_time: result.rows[0].now
  });
});

app.post('/inserir-usuarios', async (req,res)=>{
    console.log(req.body);
})

// Inicialização do servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
