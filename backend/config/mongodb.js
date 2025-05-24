import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables from .env file
const connectDB = async () => {
  const url = process.env.MONGO_URL;
  try {
    await mongoose.connect(url);
    console.log("Db Connected");
  } catch (error) {
    console.error("Mongo Connection Failed:", error);
    process.exit(1);
  }
};

export default connectDB;
