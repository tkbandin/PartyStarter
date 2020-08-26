var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var UserSchema = new mongoose.Schema({
  local: {
    email:    { type: String, required: true },
    password: { type: String, required: true }
  },
  firstName: String,
  lastName:  String,
  username:  String  // Not required for purpose of debugging
});

UserSchema.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8));
}

UserSchema.methods.isValidPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
}

module.exports = mongoose.model('User', UserSchema);
