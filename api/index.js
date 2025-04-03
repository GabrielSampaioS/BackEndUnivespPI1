// filepath: c:\Users\boers\Desktop\BacEndUnivesp\api\index.js

// Importações de bibliotecas
import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import agendaRoutes from "../routes/AgendaRoutes.js";
import dotenv from "dotenv";
dotenv.config();

// ================================
// Conexão com o MongoDB
// ================================
const mongoURI = process.env.MONGO_URI || "mongodb://localhost:27017/mydatabase";

mongoose.connect(mongoURI, {
})
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));

// ================================
// Configuração do Express
// ================================
const app = express();

// Middleware para interpretar JSON
app.use(express.json());

// Middleware para habilitar CORS
app.use(cors({
  origin: "*", // Substitua pela porta do seu frontend local
  methods: ["GET", "POST", "DELETE"], // Métodos permitidos
}));

// ================================
// Rotas da API
// ================================
app.use("/api", agendaRoutes);


// Rota de erro 404
app.use((req, res, next) => {
  res.status(404).json({ error: "Rota não encontrada" });
  next();
});

// ================================
// Inicialização do servidor localmente
if (process.env.NODE_ENV !== "production") {
  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Servidor rodando Localmente em http://localhost:${PORT}`);
  });
}

// ================================
// Exportação do app
// ================================
export default app;