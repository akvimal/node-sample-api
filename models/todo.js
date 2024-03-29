const mongoose = require('../db/mongoose');

const todoSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  }
});

const Todo = mongoose.model('Todo', todoSchema);

module.exports = Todo;