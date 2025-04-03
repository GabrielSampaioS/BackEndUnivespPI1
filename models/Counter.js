import mongoose from "mongoose";

const CounterSchema = new mongoose.Schema({
  _id: { type: String, required: true }, // Nome da coleção para o contador
  seq: { type: Number, default: 0 },    // Valor atual do contador
});

const Counter = mongoose.model("Counter", CounterSchema);

export default Counter;