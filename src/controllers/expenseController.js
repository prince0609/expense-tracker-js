const Expense = require('../models/Expense');

const showExpenses = async (req, res) => {
  const user = req.session.user;
  try {
          
    const expenses_all = await Expense.find({ userId: user._id }).sort({ date: -1 });
    const expenses = expenses_all.slice(0, 8); // Limit to 8 most recent expenses
    res.render('expenses', { expenses, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id, amount, category, note, date } = req.body;
    const user = req.session.user;

    const expense = await Expense.findById(id);
    if (!expense || expense.userId.toString() !== user._id.toString()) {
      return res.status(404).json({ message: "Expense not found" });
    }

    expense.amount = amount;
    expense.category = category || user.settings.defaultCategory;
    expense.note = note || user.settings.defaultNote;
    expense.date = date ? new Date(date) : new Date();

    await expense.save();
    res.status(200).json({ message: "Expense updated successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const user = req.session.user;

    const expense = await Expense.findById(id);
    if (!expense || expense.userId.toString() !== user._id.toString()) {
      return res.status(404).json({ message: "Expense not found" });
    }

    await expense.deleteOne();
    res.status(200).json({ message: "Expense deleted successfully" });
  } catch (error) {
          console.error("Error deleting expense:", error);
    res.status(500).json({ message: error.message });
  }
};

const filterExpense = async (req, res) => {
  const userId = req.session.user?._id;
  const { start, end } = req.query;

  if (!start || !end) {
    return res.status(400).json({ message: "Both start and end dates are required" });
  }

  try {
    const expenses = await Expense.find({
      userId: userId,
      date: {
        $gte: new Date(start),
        $lte: new Date(end)
      }
    }).sort({ date: 1 });

   
    res.json(expenses);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch expenses" });
  }
};

module.exports = {
  updateExpense,
  showExpenses,
          deleteExpense,
          filterExpense
}