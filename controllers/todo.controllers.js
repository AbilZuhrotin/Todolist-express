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
    })
  },

  deleteAllTodo: async (req, res) => {
    try {
      await todoModel.deleteMany({})
      res.json({
        message: "Semua todo berhasil dihapus",
      })
    } catch (error) {
      res.status(500).json({
        message: "Terjadi kesalahan saat menghapus semua todo",
        error: error.message,
      })
    }
  },

  deleteTodo: async (req, res) => {
    const id = req.params.id
    const todo = await todoModel.findById(id)
    if (!todo){
      return res.status(404).json({
        message: "Todo tidak ditemukan",
      })
    }
    await todoModel.findByIdAndDelete(id)
    res.json({
      message: "Todo berhasil dihapus",
    })    
  },
};
