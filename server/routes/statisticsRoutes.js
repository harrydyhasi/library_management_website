const express = require('express');
const router = express.Router();
const statisticsController = require('../controllers/statisticsController');

router.get('/total-books', statisticsController.getTotalBooks);
router.get('/books-per-category', statisticsController.getBooksPerCategory);
router.get('/most-borrowed-books', statisticsController.getMostBorrowedBooks);
router.get('/total-borrows-in-quarter', statisticsController.getTotalBorrowsInQuarter);
router.get('/total-returns', statisticsController.getTotalReturns);
router.get('/total-users', statisticsController.getTotalUsers);
router.get('/user-count-by-role', statisticsController.getUserCountByRole);

module.exports = router;
