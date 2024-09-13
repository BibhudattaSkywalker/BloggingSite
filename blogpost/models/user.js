const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcryptjs')
const userSchema = new Schema({
    name:{
        type:String
    },
    email:{
        type:String
    },
    phoneNumber:{
        type:String
    },
    password:{
        type:String
    },
    image:{
        type:String
    }
});

const userModel = mongoose.model('User',userSchema);
module.exports = userModel;