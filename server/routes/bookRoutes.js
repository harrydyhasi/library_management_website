const express = require('express');
const router = express.Router();
const { addBook, updateBook, deleteBook, getAllBooks, getBookById, updateQuantityBook, importBooks } = require('../controllers/bookController');
const upload = require('../middlewares/uploadImage');
const multer = require('multer');
const uploadCsv = multer({ dest: 'uploads/' });

router.post('/book', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), addBook);
router.put('/book/:id', upload.fields([{ name: 'image', maxCount: 1 }, { name: 'pdf', maxCount: 1 }]), updateBook);
router.delete('/book/:id', deleteBook);
router.get('/book', getAllBooks);
router.get('/book/:id', getBookById);
router.put('/book/quantity/:id', updateQuantityBook);
router.post('/book/import', uploadCsv.single('file'), importBooks);

module.exports = router;
