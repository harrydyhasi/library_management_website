const express = require('express');
const router = express.Router();
const { addCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById, importCategories } = require('../controllers/categoryController');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });


router.post('/category', addCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);
router.get('/category', getAllCategories);
router.get('/category/:id', getCategoryById);
router.post('/category/import', upload.single('file'), importCategories);

module.exports = router;
