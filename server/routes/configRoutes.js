const express = require('express')
const router = express.Router()
const configController = require('../controllers/configController')

router.get('/', configController.get)
router.put('/', configController.updateConfig)

module.exports = router