const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ','');
        console.log('TOKEN received',token);
        const decoded = jwt.verify(token, 'samplesalt');
        const user = await User.findOne({_id:decoded._id,'tokens.token':token});
        if(!user){
            throw new Error();
        }
        req.user = user;
        req.token = token;
        next();
    } catch (error) {
        res.status(401).send({error:'Unable to authentcate'})
    }
   
}

module.exports = auth;