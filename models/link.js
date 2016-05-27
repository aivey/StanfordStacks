var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var linkSchema = mongoose.Schema({
	  url: { type: String, required: true },						//name of class
    title: { type: String, required: true },					//blurb about the class
    description: { type: String, required: true }, 					//id of teacher
    upvotes: { type: Number, default: 0 },
  	downvotes: { type: Number, default: 0 },
    category: { type: ObjectId, required: true },
    likes: { type: Number, default: 0 },
});

linkSchema.index({ name: 1, teacher: -1 });

module.exports = mongoose.model('Link', linkSchema);
