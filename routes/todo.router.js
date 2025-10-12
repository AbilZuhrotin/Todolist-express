const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controllers');

router.get('/', todoController.getAllTodo)
router.get('/:id', todoController.getTodoById )
router.post('/', todoController.createTodo )
router.put('/:id', todoController.updateTodo )
router.delete('/', todoController.deleteAllTodo )
router.delete('/:id', todoController.deleteTodo )

module.exports = router;