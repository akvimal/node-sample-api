const mongoose = require('../db/mongoose');

const questionSchema = new mongoose.Schema({
    title: { 
      type: String, 
      required: true 
    },
    type: { 
      type: String, 
      required: true 
    },
    status: String,
    author: String,
    complexity: String,
    topics: [String],
    choices: [
      {
        key:  { 
          type: String, 
          required: true 
        },
        desc:  { 
          type: String, 
          required: true 
        },
        answer: {
          type: String
        }
      }]
  });
  
const Question = mongoose.model('Question', questionSchema);

module.exports = Question;