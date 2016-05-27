var mongoose = require('mongoose');
var ObjectId = mongoose.Schema.ObjectId;

var siteSchema = mongoose.Schema({
	  type: { type: String, required: true },
});

module.exports = mongoose.model('Site', siteSchema);
