var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');

//Require models
var User = require('./models/user');
var Party = require('./models/party');
var Food = require('./models/food');

// Connect to database
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI);
}
else {
  mongoose.connect('mongodb://localhost/partystarter');
}
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
  }
);
mongoose.connection.once('open', function() {
  console.log("Mongoose has connected to MongoDB!");
});

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

console.log('removing old parties...');
Party.remove({})
.then(function() {
  console.log('removing old users...');
  return User.remove({});
})
.then(function() {
  console.log('removing old foods...');
  return Food.remove({});
})
.then(function() {
  console.log('creating new users');
  let joe = new User();
  joe.local = { email: 'joe@ga.co', password: joe.encrypt('test1234') };
  joe.username = 'joe';
  let sue = new User();
  sue.local = { email: 'sue@ga.co', password: sue.encrypt('test1234') };
  sue.username = 'sue';
  return [User.create(joe), User.create(sue)];
})
.spread(function(joe, sue) {
  console.log('creating some new parties...');
  var pool      = new Party({ name: 'Pool party', 'time.start': '12', 'time.end': '5', date: '11/2/16' , 'location.address': '123 my street', description: 'its a party!', 'foodList.chosen': false, 'playlist.chosen': false, 'entertainment.chosen': false, organizer: joe._id });
  var bonfire   = new Party({ name: 'Bonfire', 'time.start': '12', 'time.end': '5', date: '9/20/16' , 'location.address': '321 some avenue', description: 'another party!', 'foodList.chosen': true, 'playlist.chosen': false, 'entertainment.chosen': false, organizer: joe._id });
  var house     = new Party({ name: 'House party',  'time.start': '12', 'time.end': '5', date: '10/5/16' , 'location.address': '1212 Ponce de Leone Ave', description: 'house party!', 'foodList.chosen': false, 'playlist.chosen': false, 'entertainment.chosen': false, organizer: sue._id });
  return Party.create([pool, bonfire, house]);
})
.then(function(savedParties) {
  console.log('Just saved', savedParties.length, 'parties.');
  return Party.find({}).populate('organizer');
})
.then(function(allParties) {
  console.log('Printing all parties:');
  allParties.forEach(function(party) {
    console.log(party.toString());
  });
  return Party.findOne({'foodList.chosen': true}).populate('organizer');
})
.then(function(partyWithFood) {
  var pizza = new Food({ name: 'Pizza', 'amount.needed': 6, 'amount.claimed': 0 });
  var wings = new Food({ name: 'Chicken Wings', 'amount.needed': 50, 'amount.claimed': 20 });
  var chips = new Food({ name: 'Potato Chips', 'amount.needed': 4, 'amount.claimed': 1 });
  partyWithFood.foodList.list.push(pizza, wings, chips);
  return partyWithFood.save({});
})
.then(function(){
  return Party.findOne({'foodList.chosen': true}).populate('organizer');
})
.then(function(savedPartyWithFood) {
  console.log('SAVED party with food:', savedPartyWithFood.toString());
  var foods = [];
  savedPartyWithFood.foodList.list.forEach(function(food) {
    foods.push(food.name);
  })
  console.log(savedPartyWithFood.name + ' will have ' + foods);
  quit();
}, function(err) {
  return handleError(err);
});
