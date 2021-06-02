const mongoose = require('../db/mongoose');

const projectSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  tasks: [
    {
      title:  { 
        type: String, 
        required: true 
      }
    }]
});

const Project = mongoose.model('Project', projectSchema);

module.exports = Project;