const mongoose = require('../db/mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: String,
    firstName: String,
    lastName: String,
    tokens: [
      {
        token: {
          type: String,
          required:true
        }
      }
    ],
    permissions: [{name:String}]
  });
  
  userSchema.virtual('projects', {
    ref: 'Project',
    localField: '_id',
    foreignField: 'author'
  })

  userSchema.methods.toJSON = function () {
    const user = this;
    
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.tokens;
    return userObj;
  }

  userSchema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, 'samplesalt');
    user.tokens = user.tokens.concat({token});
    await user.save();
    return token;
  }
  
  userSchema.statics.findByCredentials = async (email,password) => {
  
    const user = await User.findOne({email});
    console.log('user: ',user);
  
    if(!user){
      throw new Error('Unable to login');
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
  
    if(!isMatch) {
      throw new Error('Unable to login')
    }
  
    return user;
  };
  
  userSchema.pre('save', async function (next)  {
    const user = this;
    console.log('just befor saving',user);
    if(user.isModified('password')){
      user.password = await bcrypt.hash(user.password,8);
    }
    next();
  });


const User = mongoose.model('User', userSchema);

module.exports = User;