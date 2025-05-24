import express from "express";
import {
  createExpense,
  deleteExpense,
  getExpenses,
  updateExpense,
} from "../controller/expenseController.js";
import authUser from "../middleware/authUser.js";
const expenseRouter = express.Router();

expenseRouter.post("/expenses", authUser, createExpense);
expenseRouter.get("/expenses", authUser, getExpenses);
expenseRouter.put("/expenses/:id", authUser, updateExpense);
expenseRouter.delete("/expenses/:id", authUser, deleteExpense);

export default expenseRouter;
