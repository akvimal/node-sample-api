const express = require('express');
const cors = require('cors');
const todos = require('./routes/todos');
const projects = require('./routes/projects');
const users = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/todos', todos);
app.use('/projects', projects);
app.use('/users', users);

app.get('/', (req,res)=>{
    res.send({greeting:'Hello API'});
})

module.exports = app;