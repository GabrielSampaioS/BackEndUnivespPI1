import mongoose from "mongoose";
import Counter from "./Counter.js";


const AgendaSchema = new mongoose.Schema({
  id: { type: Number, unique: true }, // ID autoincrementado
  DataHoraSaida: { type: String, required: true },
  DataHoraChegada: { type: String, required: true },
  EnderecoSaida: { type: String, required: true },
  EnderecoChegada: { type: String, required: true },
  NomeMotorista: { type: String, required: true },
  PlacaVeiculo: { type: String, required: true },
  NomePassageiros: { type: String, required: true },
  excluido: { type: Boolean, default: false },
});

// Middleware para autoincrementar o ID 
// Gambiarra para autoincrementar o ID ? Talvez
AgendaSchema.pre("save", async function (next) {
  if (this.isNew) {
    const counter = await Counter.findByIdAndUpdate(
      { _id: "agendaId" },
      { $inc: { seq: 1 } },
      { new: true, upsert: true }
    );
    this.id = counter.seq;
  }
  next();
});

const Agenda = mongoose.model("Agenda", AgendaSchema);

export default Agenda;