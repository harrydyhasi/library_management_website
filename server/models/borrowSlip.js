const mongoose = require('mongoose');

const borrowSlipSchema = new mongoose.Schema({
  user_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['registered', 'borrowed', 'returned'], 
    required: true,
  },
  borrowed_date: {
    type: Date,
    required: true,
    default: Date.now,
  },
  return_date: {
    type: Date,
  },
  manager_id: {
    type: String,
    required: true,
  },
  books: [{
    type: String, 
    required: true,
  }]
});

const BorrowSlip = mongoose.model('BorrowSlip', borrowSlipSchema);

module.exports = BorrowSlip;
