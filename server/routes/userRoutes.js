const express = require('express');
const router = express.Router();
const controller = require('../controllers/userController')

// Login route
router.post('/login', controller.login);

// Register route
router.post('/users', controller.createUser);

//Get route
router.get('/users', controller.getAllUsers);

//Get by id route
router.get('/users/:id', controller.getUserById);

//Update route
router.put('/users/:id', controller.updateUser);

//Delete route
router.delete('/users/:id', controller.deleteUser);


module.exports = router;
