const mongoose = require("mongoose");
const { Schema } = mongoose;

const todoSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, default: Date.now },
    users_id: { type: Schema.Types.ObjectId, ref: 'User', required: true }
});

const todoModel = mongoose.model("Todo", todoSchema);

module.exports = todoModel;