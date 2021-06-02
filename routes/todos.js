const express = require('express');
const Todo = require('../models/todo');

const router = express.Router();

router.get('/', async (req,res) => {
    const todos = await Todo.find();
    const items = todos.map(i => {
        return {id:i._id, title:i.title};
    });
    res.status(200).send(items);
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const todo = new Todo(req.body);
    try {
        const item = await todo.save();
        res.status(200).send({saved:item});
    } catch (error) {
        console.error(error); 
        res.status(500).send({status:'Unable to save'});
    }
});

router.put('/:id', async (req, res) => {
    console.log(req.params.id)
    const todo = req.body;
    console.log(todo)
    const {nModified} = await Todo.updateOne({_id:req.params.id},
        { $set : {title:todo.title}});
    res.status(200).send({updated:nModified})
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    const {deletedCount} = await Todo.deleteOne({_id:req.params.id});
    res.status(200).send({deleted:deletedCount})
});

module.exports = router;