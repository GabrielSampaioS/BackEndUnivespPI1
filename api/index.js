// filepath: c:\Users\boers\Desktop\BacEndUnivesp\api\index.js

// Importações de bibliotecas
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import agendaRoutes from "../routes/AgendaRoutes.js";
import dotenv from "dotenv";

// Carregar variáveis de ambiente
dotenv.config();

// ================================
// Conexão com o MongoDB Atlas
// ================================
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  //console.error("Erro: A variável de ambiente MONGO_URI não está definida."); // Funcionando
  process.exit(1); // Finaliza o processo se a variável não estiver definida
}

console.log("Tentando conectar ao MongoDB com a URI:", MONGO_URI);

mongoose.connect(MONGO_URI, {
})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => {
    console.error("Erro ao conectar ao MongoDB:", error.message);
    process.exit(1); // Finaliza o processo em caso de erro crítico
  });

// ================================
// Configuração do Express
// ================================
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors({
  origin: "*", // Permitir requisições de qualquer origem
  methods: ["GET", "POST", "DELETE"], // Métodos permitidos
}));

// ================================
// Rotas da API
// ================================
app.use("/",agendaRoutes); // Prefixo para as rotas de agenda

// ================================
// Rota de erro 404
// ================================
app.use((req, res, next) => {
  res.status(404).json({ error: "Rota não encontrada" });
});

// ================================
// Inicialização do servidor localmente
// ================================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});

// ================================
// Exportação do app
// ================================
export default app;