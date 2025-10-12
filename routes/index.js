const express = require('express');
const router = express.Router();

const usersRouter = require('./users.router');
const todoRouter = require('./todo.router');

router.use('/users', usersRouter);
router.use('/todos', todoRouter);

module.exports = router;