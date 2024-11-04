const express = require('express');
const router = express.Router();
const { addCategory, updateCategory, deleteCategory, getAllCategories, getCategoryById } = require('../controllers/categoryController');

router.post('/category', addCategory);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);
router.get('/category', getAllCategories);
router.get('/category/:id', getCategoryById);

module.exports = router;