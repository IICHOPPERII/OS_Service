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
app.use(cors());
// Rota de teste
app.get('/health', async (req, res) => {
  const result = await pool.query('SELECT NOW()');
  res.json({ 
    status: 'ok',
    database_time: result.rows[0].now
  });
});

app.post('/inserir-usuarios', async (req, res) => {
    console.log('Usuário recebido:', req.body);
    // Você precisa responder ao cliente!
    const { name, email, password, role } = req.body;
    if (!name || !email || !password || !role) {
        return res.status(400).json({ error: 'Dados insuficientes' });
    }
    try {
        const queryText = 'INSERT INTO users (name, email, password, role) VALUES ($1, $2, $3, $4) RETURNING *';
        const values = [name, email, password, role];

        const result = await pool.query(queryText, values);

        res.status(201).json({ message: 'Usuário recebido com sucesso!', data: req.body });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao salvar no banco' });
    }
});

app.get('/listar_usuarios', async (req, res) => { // Removido o ) extra
  try {
    const queryText = 'SELECT * FROM users';
    const result = await pool.query(queryText);

    // Usamos status 200 para buscas e result.rows para pegar os dados
    res.status(200).json({ 
      message: 'Usuários listados com Sucesso!', 
      data: result.rows 
    });
  } catch (error) {
    console.error('Erro ao listar:', error);
    res.status(500).json({ error: 'Erro ao listar usuários' });
  }
});

app.put('/atualizar-usuario/:id', async (req, res) => {
    const { id } = req.params;
    const { name, email, password, role } = req.body;

    try {
        const queryText = `
            UPDATE users 
            SET name = $1, email = $2, password = $3, role = $4 
            WHERE id = $5 
            RETURNING *`;
        const values = [name, email, password, role, id];

        const result = await pool.query(queryText, values);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ 
            message: 'Usuário atualizado com sucesso!', 
            data: result.rows[0] 
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao atualizar no banco' });
    }
});

app.delete('/deletar-usuario/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const queryText = 'DELETE FROM users WHERE id = $1';
        const result = await pool.query(queryText, [id]);

        if (result.rowCount === 0) {
            return res.status(404).json({ error: 'Usuário não encontrado' });
        }

        res.status(200).json({ message: 'Usuário deletado com sucesso!' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Erro ao deletar no banco' });
    }
});

// Inicialização do servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
