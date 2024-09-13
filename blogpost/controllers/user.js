const User = require('../models/user');
const blogModel = require('../models/blog');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')

exports.signup = async (req,res) =>{
    try {
        const {name, email, phoneNumber, password } = req.body;
        console.log(name,email,password)
    let user = await User.findOne({email});
    if(user){
        return res.status(400).json({
            message:"user already exist"
        })
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
console.log('req.file.path',req.file.path)
   user = new User({
    name,
    email,
    phoneNumber,
    password:hashedPassword,
    image:req.file.path
   });
   await user.save();
   const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });

   res.status(201).json({
    token,
    user
   })
    } catch (error) {
        console.log(error)
    }
    
}


exports.login = async(req,res)=>{
    try {
        const { email, password } = req.body;
        console.log(password)
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({
            message:"User Not Found"
        })
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch){
        return res.status(400).json({
            message:"invalid credentials"
        })
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    
    res.status(200).json({ token,user });
    } catch (error) {
        console.log(error)
    }
    
}