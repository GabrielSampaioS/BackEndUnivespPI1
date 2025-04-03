// filepath: c:\Users\boers\Desktop\BacEndUnivesp\api\index.js
import express from "express";

//Esse bloqueio acontece porque, por padrão, navegadores não permitem que uma aplicação JavaScript faça requisições para um servidor de origem diferente sem que esse servidor autorize explicitamente.
//O CORS permite que um servidor especifique quais origens externas podem acessar seus recursos. Isso é feito por meio de cabeçalhos HTTP específicos.
import cors from "cors";

// Banco de dados MongoDB
import mongoose from "mongoose";

// Conexão com o MongoDB
mongoose.connect("mongodb://localhost:27017/mydatabase")
  .then(() => console.log("Conectado ao MongoDB"))
  .catch((error) => console.error("Erro ao conectar ao MongoDB:", error));
  
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});



// Crie uma instância do Express

const app = express();
app.use(express.json());
app.use(cors({
  origin: "http://localhost:3000", // Substitua pela porta do seu frontend local
  methods: ["GET", "POST", "DELETE"], // Métodos permitidos
}));

// Routes
import agendaRoutes from "../routes/AgendaRoutes.js";
app.use("/api", agendaRoutes);


app.get("/", (req, res) => {
  return res.json("hello world2");
});


export default app;