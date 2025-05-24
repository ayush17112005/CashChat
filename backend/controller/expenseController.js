import expenseModel from "../models/expenseModel.js";

const createExpense = async (req, res) => {
  try {
    const { amount, category, date, currency, description } = req.body;
    const userId = req.body.userId;
    if (!amount || !category || !date) {
      return res
        .status(400)
        .json({ success: false, message: "Missing Details" });
    }

    //Save all this to the database
    const expense = new expenseModel({
      user: userId,
      amount: amount,
      category: category,
      date: date,
      currency: currency,
      description: description || "",
    });
    await expense.save();
    res.status(201).json({ success: true, expense });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
const getExpenses = async (req, res) => {
  try {
    const userId = req.body.userId;
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const expenses = await expenseModel
      .find({ user: userId })
      .sort({ date: -1 }); // latest first
    res.json({ success: true, expenses });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params; // get the expense id from the URL
    const { amount, category, date, currency, description } = req.body;
    const userId = req.body.userId; // set by auth middleware

    // Find the expense and make sure it belongs to the user
    const expense = await expenseModel.findOne({ _id: id, user: userId });
    if (!expense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found or unauthorized" });
    }

    // Update the expense fields
    expense.amount = amount || expense.amount;
    expense.category = category || expense.category;
    expense.date = date || expense.date;
    expense.currency = currency || expense.currency;
    expense.description = description || expense.description;

    await expense.save();

    res.status(200).json({ success: true, expense });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const expenseId = req.params.id;
    const userId = req.body.userId;

    const deleted = await expenseModel.findOneAndDelete({
      _id: expenseId,
      user: userId,
    });
    if (!deleted) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found or unauthorized" });
    }

    res.json({ success: true, message: "Expense deleted successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false, message: err.message });
  }
};
export { createExpense, getExpenses, updateExpense, deleteExpense };
