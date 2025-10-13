// const { get } = require('moongose/routes');
let todoModel = require("../models/todo");

module.exports = {
  getAllTodo: (req, res) => {
    res.json({
      message: "Menampilkan semua todo",
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

  createTodo: (req, res) => {
    const input = req.body
    const newTodo = {
      id_todo: todoModel.length + 1,
      ...input,
    }
    todoModel.push(newTodo)
    res.status(201).json({
      massage: "Todo berhasil ditambahkan",
      data: newTodo,
    })
  },

  updateTodo: (req, res) => {
    const id = req.params.id
    const todo = todoModel.find((item) => item.id_todo === Number(id))
    if (!todo){
      return res.status(404).json({
        massage: "Todo tidak ditemukan",
      })
    }
    const input = req.body
    Object.assign(todo, input)
    res.json({
      massage: "Todo berhasil diupdate",
      data: todo,
    })
  },

  deleteAllTodo: (req, res) => {
    todoModel = []
    res.json({
      massage: "Semua todo berhasil dihapus",
    }) 
  },

  deleteTodo: (req, res) => {},
};
