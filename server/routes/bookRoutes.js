const express = require('express');
const router = express.Router();
const { addBook, updateBook, deleteBook, getAllBooks, getBookById } = require('../controllers/bookController');

router.post('/book', addBook);
router.put('/book/:id', updateBook);
router.delete('/book/:id', deleteBook);
router.get('/book', getAllBooks)
router.get('/book/:id', getBookById)

module.exports = router;