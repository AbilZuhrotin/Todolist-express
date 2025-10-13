// const { get } = require('moongose/routes');
let todoModel = require("../models/todo");

module.exports = {
  getAllTodo: (req, res) => {
    res.json({
      message: "get all todo",
      data: todoModel,
    });
  },

  getTodoById: (req, res) => {
    const id = req.params.id
    const todo = todoModel.find((item) => item.id_todo === Number(id))
    if (!todo){
      return res.status(404).json({
        massage: "Todo tidak ditemukan",
      })
    }
    res.json({
      massage: "Todo ditemukan",
      data:todo,
    })
  },
  
  createTodo: (req, res) => {},
  updateTodo: (req, res) => {},
  deleteAllTodo: (req, res) => {},
  deleteTodo: (req, res) => {},
};
