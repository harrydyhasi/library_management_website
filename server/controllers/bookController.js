const Books = require('../models/books');
const Category = require('../models/category'); 
const generateBookId = require('../middlewares/bookMiddleware');

const addBook = async (req, res) => {
    const { category_id, name, quantity, position, author, publisher, description } = req.body;
    const image = req.file ? `/images/${req.file.filename}` : null; 

    if (!category_id || !name || !quantity || !position || !author || !publisher) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const category = await Category.findOne({ id: category_id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const newBook = new Books({
            category_id: category._id,
            name,
            quantity,
            position,
            author,
            publisher,
            description,
            image 
        });

        await newBook.save();
        return res.status(200).json({ message: 'Book created successfully', data: newBook });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};


const updateBook = async (req, res) => {
    const { category_id, name, quantity, position, author, publisher, description } = req.body;
    const bookId = req.params.id; 

    if (!category_id || !name || !quantity || !position || !author || !publisher) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const category = await Category.findOne({ id: category_id });
        if (!category) {
            return res.status(404).json({ message: 'Category not found' });
        }

        const book = await Books.findOne({ id: bookId }); 
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        book.category_id = category._id; 
        book.name = name;
        book.quantity = quantity;
        book.position = position;
        book.author = author;
        book.publisher = publisher;
        book.description = description;

        if (req.file) {
            book.image = `/images/${req.file.filename}`; 
        }

        if (book.category_id.toString() !== category._id.toString()) {
            await generateBookId.call(book); 
        }

        await book.save();
        return res.status(200).json({ message: 'Book updated successfully', data: book });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Books.findOne({ id: id});
        if (!book) {
            return res.status(404).json({ message: 'Book not found'});
        }
        
        await Books.deleteOne({ id: id});
        return res.status(200).json({ message: 'Book deleted successfully' });

    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getAllBooks = async (req, res) => {
    try {
        const books = await Books.find()
            .populate('category_id'); 

        return res.status(200).json({ message: 'Books retrieved successfully', data: books });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

const getBookById = async (req, res) => {
    const { id } = req.params;

    try {
        const book = await Books.findOne({ id })
            .populate('category_id', 'name'); 

        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }

        return res.status(200).json({ message: 'Book found', data: book });
    } catch (error) {
        return res.status(500).json({ message: 'Server error', error: error.message });
    }
};

module.exports = { 
    addBook,
    updateBook,
    deleteBook,
    getAllBooks,
    getBookById,
};
