import express from "express";
import {
  criarRegistro,
  listarRegistros,
  buscarRegistroPorId,
  excluirTodosRegistros,
  excluirRegistroPorId,
} from "../controllers/AgendaController.js";

const router = express.Router();

router.post("/", criarRegistro); // Criar um novo registro
router.get("/", listarRegistros); // Listar todos os registros
router.get("/:id", buscarRegistroPorId); // Buscar um registro pelo ID
router.delete("/agenda", excluirTodosRegistros); // Excluir todos os registros
router.delete("/agenda/:id", excluirRegistroPorId); // Excluir um registro pelo ID

export default router;