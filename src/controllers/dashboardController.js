const User = require("../models/User");
const Expense = require("../models/Expense");

const showDashboard = async (req, res) => {
  // Assuming user info is stored in session
  const user = req.session.user;
  if (!user) {
    return res.redirect("/api/users/login");
  }

  let expenses = await Expense.find({ userId: user._id }).sort({ date: -1 });
  if (expenses) {
    expenses = expenses.slice(0, 8); // Limit to 8 most recent expenses
  }
  const today = new Date();
  const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const startOfYear = new Date(today.getFullYear(), 0, 1);

  const todaysExpenses = await Expense.find({
    userId: user._id,
    date: {
      $gte: today.setHours(0, 0, 0, 0),
      $lt: today.setHours(23, 59, 59, 999),
    },
  });
  let totalToday = 0;
  if (todaysExpenses) {
    todaysExpenses.forEach((expense) => {
      totalToday += expense.amount;
    });
  }

  const monthlyExpenses = await Expense.find({
    userId: user._id,
    date: {
      $gte: startOfMonth,
      $lt: today.setHours(23, 59, 59, 999),
    },
  });
  let totalMonth = 0;
  if (monthlyExpenses) {
    monthlyExpenses.forEach((expense) => {
      totalMonth += expense.amount;
    });
  }

  const yearlyExpenses = await Expense.find({
    userId: user._id,
    date: {
      $gte: startOfYear,
      $lt: today.setHours(23, 59, 59, 999),
    },
  });
  let totalYear = 0;
  if (yearlyExpenses) {
    yearlyExpenses.forEach((expense) => {
      totalYear += expense.amount;
    });
  }

  res.render("dashboard", {
    user,
    expenses,
    totalToday,
    totalMonth,
    totalYear,
  }); // Renders views/dashboard.ejs with user and expenses
};

const addExpense = async (req, res) => {
  try {
    let { amount, category, note, date } = req.body;
    const user = req.session.user;
    if (!note) {
      note = user.settings.defaultNote;
    }
    if (!category) {
      category = user.settings.defaultCategory;
    }
    if (!date) {
      date = new Date();
    }

    await Expense.create({
      userId: user._id,
      amount,
      category,
      note,
      date,
    });

    res.redirect("/api/users/dashboard");
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  showDashboard,
  addExpense,
};
