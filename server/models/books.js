const mongoose = require('mongoose');
const generateBookId = require('../middlewares/bookMiddleware'); 

const bookSchema = new mongoose.Schema({
    category_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
    id: { type: String, unique: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    position: { type: String, required: true },
    author: { type: String, required: true },
    publisher: { type: String, required: true },
    description: { type: String }
});

bookSchema.pre('save', generateBookId);

const Books = mongoose.model('Books', bookSchema);
module.exports = Books;
