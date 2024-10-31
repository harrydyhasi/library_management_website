const mongoose = require('mongoose');

const generateBookId = async function(next) {
    const book = this;

    if (!book.isNew) {
        const existingBook = await mongoose.model('Books').findById(book._id);

        if (existingBook.category_id.toString() === book.category_id.toString()) {
            return next();
        }
    }

    const category = await mongoose.model('Category').findById(book.category_id);

    const maxBook = await mongoose.model('Books')
        .find({ category_id: book.category_id })
        .sort({ id: -1 })
        .limit(1);

    let newIdNumber = 1; 
    if (maxBook.length > 0) {
        const lastId = maxBook[0].id; 
        const parts = lastId.split('-');
        newIdNumber = parseInt(parts[1]) + 1; 
    }

    // [Mã danh mục sách] - [Số thứ tự]
    book.id = `${category.id}-${newIdNumber.toString().padStart(3, '0')}`;

    next();
};

module.exports = generateBookId;
