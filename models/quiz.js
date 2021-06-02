const mongoose = require('../db/mongoose');

const quizSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  status: String,
  duration: Number,
  attendees: [String],
  rules: [
    {
      topic: String,
      qType: String,
      complexity: String,
      percentage: Number,
      score: Number
    }
  ]
});
  
const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;