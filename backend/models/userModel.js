import mongoose, { Schema } from "mongoose";

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, unique: true, required: true },
  password: { type: String, required: true },
  image: { type: String, default: "" },
});

const userModel = mongoose.models.user || mongoose.model("user", userSchema);
export default userModel;
