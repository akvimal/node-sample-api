const express = require('express');
const auth = require('../middleware/auth');
const Project = require('../models/project');

const router = express.Router();

router.get('/', async (req,res) => {
    const todos = await Project.find();
    const items = todos.map(i => {
        return {id:i._id, title:i.title};
    });
    res.status(200).send(items);
});

router.get('/:id', auth, async (req,res) => {
    const project = await Project.findOne({_id:req.params.id});
    await project.populate('author').execPopulate();
    
    res.status(200).send(project);
});

router.post('/', auth, async (req, res) => {
    
    const project = new Project({ ...req.body, author: req.user._id });
    try {
        const item = await project.save();
        res.status(200).send({saved:item});
    } catch (error) {
        console.error(error); 
        res.status(500).send({status:'Unable to save'});
    }
});

router.post('/:id/tasks', async (req, res) => {
    const task = req.body;
    try {
        const project = await Project.findOne({_id:req.params.id});
        project.tasks.push(task);
        const item = await project.save();
        res.status(200).send({saved:item});
    } catch (error) {
        console.error(error); 
        res.status(500).send({status:'Unable to save'});
    }
});

router.put('/:id', async (req, res) => {
    console.log(req.params.id)
    const project = req.body;
    console.log(project)
    const {nModified} = await Project.updateOne({_id:req.params.id},
        { $set : {title:project.title}});
    res.status(200).send({updated:nModified})
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    const {deletedCount} = await Project.deleteOne({_id:req.params.id});
    res.status(200).send({deleted:deletedCount})
});

module.exports = router;