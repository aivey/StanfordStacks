var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var SALT_WORK_FACTOR = 10;
var ObjectId = mongoose.Schema.ObjectId;

var userSchema = mongoose.Schema({
    username: { type: String, required: true, unique: true },
  	email: { type: String, required: true, unique: true },
    password: { type: String, required: false }, //CHANGE BACK TO TRUE
    year: { type: String, required: false },
  	liked: { type: [ObjectId], default: []},				//id of the class they are currently signed up to take
});

userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.password);
};

module.exports = mongoose.model('User', userSchema);
