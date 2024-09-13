const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const commentSchema = new Schema({
    comment: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: 'Blog', required: true },
  like:{
    type:Number,
    default:0
},

likess: [{
  author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}],
text:{type:String},
replies:[{
author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
text:String,
createdAt: { type: Date, default: Date.now }
}],
  createdAt: { type: Date, default: Date.now },
  reports:[{
    reported:Boolean,
    reason:String,
    reportedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    reportedAt: { type: Date, default: Date.now }
  }]
});


const commentModel = mongoose.model('Comment',commentSchema);
module.exports = commentModel;