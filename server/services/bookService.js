const Books = require('../models/books');  

const bookService = {
    updateQuantity: async (bookId, newQuantity) => {

    },

    getById: async (id) => {
        const book = await Books.findOne({ id })
        console.log(book)
    }
};
module.exports = bookService;
