import mongoose from "mongoose";
const expenseSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  amount: { type: Number, required: true },
  category: { type: String, required: true },
  date: { type: Date, required: true },
  currency: { type: String, default: "USD" },
  description: { type: String },
});

const expenseModel =
  mongoose.models.expense || mongoose.model("expense", expenseSchema);
export default expenseModel;
