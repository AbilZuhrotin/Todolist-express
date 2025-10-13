// const { get } = require('moongose/routes');
let todoModel = require("../models/todo");

module.exports = {
  getAllTodo: (req, res) => {
    res.json({
      message: "get all todo",
      data: todoModel,
    });
  },
  getTodoById: (req, res) => {},
  createTodo: (req, res) => {},
  updateTodo: (req, res) => {},
  deleteAllTodo: (req, res) => {},
  deleteTodo: (req, res) => {},
};
