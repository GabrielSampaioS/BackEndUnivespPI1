import Agenda from "../models/Agenda.js";

// Criar um novo registro
export const criarRegistro = async (req, res) => {
  try {
    const novoRegistro = new Agenda(req.body);
    await novoRegistro.save();
    return res.status(201).json(novoRegistro);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar registro", details: error.message });
  }
};

// Trazer todos os registros
export const listarRegistros = async (req, res) => {
  try {
    const registros = await Agenda.find();
    return res.status(200).json(registros);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar registros", details: error.message });
  }
};

// Trazer um registro pelo ID
export const buscarRegistroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await Agenda.findById(id);
    if (!registro) {
      return res.status(404).json({ error: "Registro não encontrado" });
    }
    return res.status(200).json(registro);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao buscar registro", details: error.message });
  }
};

// Excluir todos os registros
export const excluirTodosRegistros = async (req, res) => {
  try {
    await Agenda.deleteMany();
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao excluir registros", details: error.message });
  }
};

// Excluir um registro pelo ID
export const excluirRegistroPorId = async (req, res) => {
  try {
    const { id } = req.params;
    const registro = await Agenda.findByIdAndDelete(id);
    if (!registro) {
      return res.status(404).json({ error: "Registro não encontrado" });
    }
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ error: "Erro ao excluir registro", details: error.message });
  }
};