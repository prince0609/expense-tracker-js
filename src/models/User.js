const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  settings: {
          categoryList: {
            type: [String],
            default: [
              'Food',
              'Transport',
              'Shopping',
              'Entertainment',
              'General Expense'
            ]
          }, 
          defaultCategory: {
            type: String,
            default: 'General Expense'
          },
          defaultNote: {
            type: String,
            default: 'Others'
          },
          monthlyBudgetLimit: {
            type: Number,
            default: 0        //No limit
          }
  },
});

const User = mongoose.model("User", userSchema);

module.exports = User;
