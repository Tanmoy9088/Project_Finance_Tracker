const mongoose = require('mongoose');

const TransactionSchema = new mongoose.Schema({
  text: String,
  amount: Number,
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Transaction', TransactionSchema);
