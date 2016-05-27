var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var categorySchema = mongoose.Schema({
    title: { type: String, required: true },					//blurb about the class
    description: { type: String, required: false }, 
    image: { type: String, required: false},					//id of teacher
    upvotes: { type: Number, default: 0 },
  	downvotes: { type: Number, default: 0 },
    likes: { type: Number, default: 0 },
});

module.exports = mongoose.model('Category', categorySchema);
