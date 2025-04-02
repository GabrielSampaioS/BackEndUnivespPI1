import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

let db;
(async () => {
  db = await open({
    filename: './database.db',
    driver: sqlite3.Database
  });

  await db.run(`CREATE TABLE IF NOT EXISTS agendamentos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    nome TEXT,
    data TEXT
  )`);
})();

app.get('/'), (req, res) => {
    return res.json("Ola")
}

app.get('/agendamentos', async (req, res) => {
  const agendamentos = await db.all('SELECT * FROM agendamentos');
  res.json(agendamentos);
});

app.post('/agendamentos', async (req, res) => {
  const { nome, data } = req.body;
  const result = await db.run('INSERT INTO agendamentos (nome, data) VALUES (?, ?)', [nome, data]);
  res.json({ id: result.lastID, nome, data });
});

app.delete('/agendamentos/:id', async (req, res) => {
  const { id } = req.params;
  await db.run('DELETE FROM agendamentos WHERE id = ?', id);
  res.json({ message: 'Agendamento excluído' });
});

app.listen(port, () => {
  console.log(`Servidor rodando na porta ${port}`);
});

export default app;
