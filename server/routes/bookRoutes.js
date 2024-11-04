const express = require('express');
const router = express.Router();
const { addBook, updateBook, deleteBook, getAllBooks, getBookById } = require('../controllers/bookController');
const upload = require('../middlewares/uploadImage'); 

router.post('/book', upload.single('image'), addBook);
router.put('/book/:id', upload.single('image'), updateBook);
router.delete('/book/:id', deleteBook);
router.get('/book', getAllBooks);
router.get('/book/:id', getBookById);

module.exports = router;