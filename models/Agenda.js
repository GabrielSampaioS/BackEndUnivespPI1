import mongoose from "mongoose";

const AgendaSchema = new mongoose.Schema({
  //Id é criado automaticamente pelo MongoDB 
  //Exemplo: 64c8b4d2e4b0f8a3f8d5e8c9
    
  DataHoraSaida: { type: String, required: true },
  DataHoraChegada: { type: String, required: true },
  EnderecoSaida: { type: String, required: true },
  EnderecoChegada: { type: String, required: true },
  NomeMotorista: { type: String, required: true },
  PlacaVeiculo: { type: String, required: true },
  NomePassageiros: { type: String, required: true },
  excluido: { type: Boolean, default: false },
});


const Agenda = mongoose.model("Agenda", AgendaSchema);

export default Agenda;