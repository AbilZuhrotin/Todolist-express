// const { get } = require('moongose/routes');
let todoModel = require("../models/todo");

module.exports = {
  getAllTodo: async (req, res) => {
    try {
      const todos = await todoModel.find();
      res.json({
        message: "Menampilkan semua todo",
        data: todos,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil todo",
        error: error.message,
      });
    }
  },

  getTodoById: async (req, res) => {
    try {
      const id = req.params.id;
      const todo = await todoModel.findById(id);
      if (!todo) {
        return res.status(404).json({
          message: "Todo tidak ditemukan",
        });
      }
      res.json({
        message: "Menampilkan todo",
        data: todo,
      });
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan saat mengambil todo",
        error: error.message,
      });
    }
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

  updateTodo: async (req, res) => {
    const id = req.params.id
    const todo = await todoModel.findById(id)
    if (!todo){
      return res.status(404).json({
        message: "Todo tidak ditemukan",
      })
    }
    const input = req.body
    await todoModel.findByIdAndUpdate(id, input, { new: true })
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
