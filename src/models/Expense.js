const mongoose = require('mongoose');
const expenseSchema = new mongoose.Schema({
          userId : {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: 'User',
                    required: true
          },
          amount: {
                    type: Number,
                    required:true
          },
          note: {
                    type: String,
          },
          category: {
                    type: String,
          },
          date : {
                    type: Date,
          }

})

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;