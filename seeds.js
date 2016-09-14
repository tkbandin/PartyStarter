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
  joe.firstName = 'Joe';
  joe.lastName = 'Schmoe';
  joe.username = 'joehacker1989';
  let sue = new User();
  sue.local = { email: 'sue@ga.co', password: sue.encrypt('test1234') };
  sue.firstName = 'Sue';
  sue.lastName = 'Susan';
  sue.username = 'sueshiroll';
  return [User.create(joe), User.create(sue)];
})
.spread(function(joe, sue) {
  console.log('creating some new parties...');
  var pool      = new Party({
    name: 'Pool party',
    time: {
      start: '12',
      end: '5'
    },
    date: '11/2/16' ,
    location: {
      address: "123 My Way St, Pahrump, NV 89060, USA",
      lat: 36.2210167,
      lng: -116.0741354
    },
    description: 'its a party!',
    details: {
      over18: true,
      over21: false,
      byoBeer: true,
      byoFood: false,
      movie: false,
      music: true,
      outdoors: true,
      birthday: false
    },
    organizer: joe._id });
  var bonfire   = new Party({
    name: 'Bonfire',
    time: {
      start: '12',
      end: '5'
    },
    date: '9/20/16' ,
    location: {
      address: '321 Certain Ln, Glasgow, KY 42141, USA',
      lat: 36.9244357,
      lng: -86.0049938
    },
    description: 'another party!',
    details: {
      over18: false,
      over21: true,
      byoBeer: true,
      byoFood: false,
      movie: false,
      music: false,
      outdoors: true,
      birthday: false
    },
    organizer: joe._id });
  var house     = new Party({
    name: "Sue's Birthday Party",
    time: {
      start: '12',
      end: '5'
    },
    date: '10/25/16' ,
    location: {
      address: "1212 Ponce De Leon Ave NE, Atlanta, GA 30306, USA",
      lat: 33.7740639,
      lng: -84.3477157
    },
    description: "I'm turning 90! Come party with me!",
    details: {
      over18: false,
      over21: true,
      byoBeer: false,
      byoFood: true,
      movie: true,
      music: true,
      outdoors: true,
      birthday: true
    },
    organizer: sue._id });
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
  quit();
}, function(err) {
  return handleError(err);
});


// THIS CODE FOR WHEN FOOD LIST IS IMPLEMENTED
//   return Party.findOne({'foodList.chosen': true}).populate('organizer');
// })
// .then(function(partyWithFood) {
//   var pizza = new Food({ name: 'Pizza', 'amount.needed': 6, 'amount.claimed': 0 });
//   var wings = new Food({ name: 'Chicken Wings', 'amount.needed': 50, 'amount.claimed': 20 });
//   var chips = new Food({ name: 'Potato Chips', 'amount.needed': 4, 'amount.claimed': 1 });
//   partyWithFood.foodList.list.push(pizza, wings, chips);
//   return partyWithFood.save({});
// })
// .then(function(){
//   return Party.findOne({'foodList.chosen': true}).populate('organizer');
// })
// .then(function(savedPartyWithFood) {
//   console.log('SAVED party with food:', savedPartyWithFood.toString());
//   var foods = [];
//   savedPartyWithFood.foodList.list.forEach(function(food) {
//     foods.push(food.name);
//   })
//   console.log(savedPartyWithFood.name + ' will have ' + foods);
//   quit();
// }, function(err) {
//   return handleError(err);
// });
