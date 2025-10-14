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
        message: "Todo tidak ditemukan",
      })
    }
    res.json({
      message: "Todo ditemukan",
      data:todo,
    })
  },

  createTodo: (req, res) => {
    try {
    const { title, description, date } = req.body
    const newTodo = new todoModel ({
      title,
      description,
      date
    });
    newTodo.save();
    res.status(201).json({
            message: "todo berhasil ditambahkan",
            data: newTodo,
        });
    } catch (error) {
        res.status(500).json({
            message: "Terjadi kesalahan saat menambahkan todo",
            error: error.message,
        });
    }
  },

  updateTodo: (req, res) => {
    const id = req.params.id
    const todo = todoModel.find((item) => item.id_todo === Number(id))
    if (!todo){
      return res.status(404).json({
        message: "Todo tidak ditemukan",
      })
    }
    const input = req.body
    Object.assign(todo, input)
    res.json({
      message: "Todo berhasil diupdate",
      data: todo,
    })
  },

  deleteAllTodo: (req, res) => {
    todoModel = []
    res.json({
      message: "Semua todo berhasil dihapus",
    }) 
  },

  deleteTodo: (req, res) => {
    const id = req.params.id
    const idNumber = Number(id)
    const todo = todoModel.find((item) => item.id_todo === idNumber)

    if (!todo){
      return res.status(404).json({
        message: "Todo tidak ditemukan",
      })
    }

    todoModel = todoModel.filter((item) => item.id_todo !== idNumber)
    res.json({
      message: "Todo berhasil dihapus",
    })
  },
};
