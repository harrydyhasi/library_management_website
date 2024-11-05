const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    id: { type: String, required: true }, 
    name: { type: String, required: true } 
});

categorySchema.index({ id: 1 }, { unique: true });
const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
