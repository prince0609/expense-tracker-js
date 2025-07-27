const Expense = require("../models/Expense");

const showReports = async (req, res) => {
  const user = req.session.user;
  if (!user) {
    return res.redirect("/api/users/login");
  }

  // Get 1st and last day of current month
  // Example Node.js + MongoDB
  const startOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth(),
    1
  );
  const endOfMonth = new Date(
    new Date().getFullYear(),
    new Date().getMonth() + 1,
    0
  );

  const rawExpenses = await Expense.find({
    userId: user._id,
    date: { $gte: startOfMonth, $lte: endOfMonth },
  }).sort({ date: 1 });

  //extract the data of same category and sum it up
  const groupedExpenses = {};

rawExpenses.forEach(exp => {
  const category = exp.category;
  if (!groupedExpenses[category]) {
    groupedExpenses[category] = 0;
  }
  groupedExpenses[category] += exp.amount;
});

const groupedArray = Object.keys(groupedExpenses).map(category => ({
  category,
  amount: groupedExpenses[category]
}));


  //do the mapping such that same date expense amounts are summed up
  const expenseMap = rawExpenses.reduce((acc, expense) => {
    const dateKey = expense.date.toISOString().split("T")[0]; // Format: YYYY-MM-DD
    if (!acc[dateKey]) {
      acc[dateKey] = 0;
    }
    acc[dateKey] += expense.amount;
    return acc;
  }, {});

  const expenseData = Object.entries(expenseMap).map(([date, amount]) => ({
    date,
    amount,
  }));
  // Sort the data by date
  expenseData.sort((a, b) => new Date(a.date) - new Date(b.date));

  // I want date as only date and month
          expenseData.forEach((expense) => {
          const dateObj = new Date(expense.date);
          expense.date = `${dateObj.getDate()}/${dateObj.getMonth() + 1}`;
          });


  res.render("reports", { expenseData,  groupedArray});
};

module.exports = {
  showReports,
};
