import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/mongodb.js";
import userRouter from "./routes/userRoute.js";
import expenseRouter from "./routes/expenseRoute.js";
dotenv.config();
const app = express();
const port = process.env.PORT;

//middlewares
app.use(cors());
app.use(express.json());

//API end-points
app.use("/api/user", userRouter);
app.use("/api", expenseRouter);

connectDB();
app.get("/", (req, res) => {
  res.send("Hey i'm the server!!");
});

app.listen(port, () => {
  console.log(`Server is running at the port`);
});
