const express = require('express');
const router = express.Router();
const usersController = require('../controllers/users.controllers');

router.get('/login/:id', usersController.login)
router.post('/register', usersController.register) 

module.exports = router;