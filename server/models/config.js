// configModel.js
const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  maxBorrowDays: {
    type: Number,
    required: true,
    default: 14,  
    min: 1,       
  },
  maxBorrowBooks: {
    type: Number,
    required: true,
    default: 5,   
    min: 1,     
  },
  dailyFine: {
    type: Number,
    required: true,
    default: 0.00, 
    min: 0,        
  },
}, {
  timestamps: true // add createAt and updateAt
});

// Create a model from the schema
const Config = mongoose.model('Config', configSchema);

module.exports = Config;
