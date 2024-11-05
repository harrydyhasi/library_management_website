const express = require('express');
const router = express.Router();
const { addBook, updateBook, deleteBook, getAllBooks, getBookById } = require('../controllers/bookController');
const upload = require('../middlewares/uploadImage'); 

router.post('/book', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), addBook);
router.put('/book/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), updateBook);
router.delete('/book/:id', deleteBook);
router.get('/book', getAllBooks);
router.get('/book/:id', getBookById);

module.exports = router;
