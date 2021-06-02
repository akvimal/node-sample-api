const express = require('express');
const Question = require('../mongoose');

const router = express.Router();

router.get('/', async (req,res) => {
    const questions = await Question.find();
    const items = questions.map(i => {
        return {id:i._id, title:i.title};
    });
    res.status(200).send(items);
});

router.post('/', async (req, res) => {
    console.log(req.body);
    const question = new Question(req.body);
    try {
        const item = await question.save();
        res.status(200).send({saved:item});
    } catch (error) {
        console.error(error); 
        res.status(500).send({status:'Unable to save'});
    }
});

router.put('/:id', async (req, res) => {
    console.log(req.params.id)
    const question = req.body;
    console.log(question)
    const {nModified} = await Question.updateOne({_id:req.params.id},
        { $set : {title:question.title}});
    res.status(200).send({updated:nModified})
});

router.delete('/:id', async (req, res) => {
    console.log(req.params.id)
    const {deletedCount} = await Question.deleteOne({_id:req.params.id});
    res.status(200).send({deleted:deletedCount})
});

module.exports = router;