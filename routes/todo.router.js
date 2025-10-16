const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todo.controllers');
const { verifikasiToken, verifikasiAdmin } = require('../middleware/auth');

router.get('/', verifikasiAdmin, todoController.getAllTodo)
router.get('/:id', verifikasiToken, todoController.getTodoById )
router.post('/', verifikasiToken, todoController.createTodo )
router.put('/:id', verifikasiToken, todoController.updateTodo )
router.delete('/', verifikasiAdmin, todoController.deleteAllTodo )
router.delete('/:id', verifikasiToken, todoController.deleteTodo )

module.exports = router;