import mongoose from "mongoose";

const leituraSchema = new mongoose.Schema({
  customer_code: { type: String, required: true },
  mes: { type: Number, required: true },
  measure_type: { type: String, enum: ["WATER", "GAS"], required: true },
  measure_value: { type: Number, required: true },
  imageUri: { type: String, required: true },
  mimeType: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Leitura = mongoose.model("Leitura", leituraSchema);

export default Leitura;
