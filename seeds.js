var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Require models
var User = require('./models/user');
var Party = require('./models/party');
var Food = require('./models/food');

//Connect to DB
//mongoose.connect('mongodb://localhost/parties');

// our script will not exit until we have disconnected from the db.
function quit() {
  mongoose.disconnect();
  console.log('\nQuitting!');
}

// a simple error handler
function handleError(err) {
  console.log('ERROR:', err);
  quit();
  return err;
}
