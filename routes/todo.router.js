const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controllers');
const { verifikasiToken } = require('../middleware/auth');

router.get('/', todoController.getAllTodo)
router.get('/:id', verifikasiToken, todoController.getTodoById )
router.post('/', verifikasiToken, todoController.createTodo )
router.put('/:id', verifikasiToken, todoController.updateTodo )
router.delete('/', todoController.deleteAllTodo )
router.delete('/:id', verifikasiToken, todoController.deleteTodo )

module.exports = router;