const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    desc:{
        type:String
    },
    createdAt: { type: Date, default: Date.now },
    likeCount:{
        type:Number,
        default:0
    },
    image:{
        type:String
    },
    comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Comment' }],
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
});
const blogModel = mongoose.model('Blog',blogSchema);
module.exports = blogModel;