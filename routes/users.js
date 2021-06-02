const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();
router.use(express.json());

router.get('/me', auth, async (req,res) => {
    const user = await User.findById(req.user._id)
    await user.populate('projects').execPopulate();
    console.log(user.projects)
    res.status(200).send(user);
});

router.get('/', async (req,res) => {
    const users = await User.find();

    res.status(200).send(users);
});

router.post('/login', async (req,res) => {
   
    try {
        const user = await User.findByCredentials(req.body.email,req.body.password);
        const token = await user.generateAuthToken();
        res.send({user,token});
    } catch (error) {
        console.log(error);
        res.status(400).send();
    }

});

router.post('/logout', auth, async (req,res) => {
    try {
        req.user.tokens = req.user.tokens.filter( token => token.token !== req.token);
        await req.user.save();
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

router.post('/logoutall', auth, async (req,res) => {
    try {
        req.user.tokens = []
        await req.user.save();
        res.send();
    } catch (error) {
        console.log(error);
        res.status(500).send();
    }
});

router.post('/', async (req, res) => {
   
    const user = new User(req.body);
    try {
        const item = await user.save();
        res.status(200).send({saved:item});
    } catch (error) {
        console.error(error); 
        res.status(500).send({status:'Unable to save'});
    }
});

router.put('/', auth, async (req, res) => {
    
    const user = req.body;
   
    const {nModified} = await User.updateOne({_id:req.user._id},
        { $set : {title:user.title}});
    res.status(200).send({updated:nModified})
});

router.delete('/me', auth, async (req, res) => {
    try {
        await req.user.remove()
        res.status(200).send()
    } catch (error) {
        res.status(401).send()
    }
});

module.exports = router;