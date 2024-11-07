const express = require('express')
const router = express.Router()
const borrowSlipController = require('../controllers/borrowSlipController')

router.get('/', borrowSlipController.getAllBorrowSlips)
router.get('/:id', borrowSlipController.findById)
router.post('/', borrowSlipController.create)
router.put('/:id', borrowSlipController.update)
router.delete('/:id', borrowSlipController.delete)
router.get('/history/:userId', borrowSlipController.getBorrowSlipsByUserId)

module.exports = router