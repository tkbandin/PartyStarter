var express = require('express');
var router = express.Router();
var Party = require('../models/party');

function makeError(res, message, status) {
  res.statusCode = status;
  var error = new Error(message);
  error.status = status;
  return error;
}

function authenticate(req, res, next) {
  if (!req.isAuthenticated()) {
    res.status(401).json( { message: 'Please signup or login.'} );
  }
  else {
    next();
  }
}

// INDEX
router.get('/', authenticate, function(req, res, next){
  // Get all parties and render the /parties view
  Party.find({})
  .then(function(allParties) {
    res.json(allParties);
  }, function(err) {
    return next(err);
  });
});

// CREATE
router.post('/', authenticate, function(req, res, next) {
  console.log(req.body);
  console.log('req.user:', req.user._id);
  var party = new Party({
    name: req.body.name,
    'time.start': req.body.time.start,
    'time.end': req.body.time.end,
    date: req.body.date,
    'location.address': req.body.location.address,
    'location.lat': req.body.location.lat,
    'location.lng': req.body.location.lng,
    description: req.body.description,
    // 'foodList.chosen': req.body.foodList.chosen ? true : false,
    // 'playlist.chosen': req.body.playlist.chosen ? true : false,
    // 'entertainment.chosen': req.body.entertainment.chosen ? true : false,
    'details.over18': req.body.details.over18 ? true : false,
    'details.over21': req.body.details.over21 ? true : false,
    'details.byoBeer': req.body.details.byoBeer ? true : false,
    'details.byoFood': req.body.details.byoFood ? true : false,
    'details.movie': req.body.details.movie ? true : false,
    // 'details.dancing': req.body.details.dancing ? true : false,
    'details.music': req.body.details.music ? true : false,
    'details.outdoors': req.body.details.outdoors ? true : false,
    // 'details.swimming': req.body.details.swimming ? true : false,
    'details.birthday': req.body.details.birthday ? true : false,
    // 'details.attire.formal': req.body.details.attire.formal ? true : false,
    // 'details.attire.casual': req.body.details.attire.casual ? true : false,
    organizer: req.user._id
  });
  console.log('Party to save:', party);
  party.save()
  .then(function(saved) {
    console.log('saved:', saved);
    res.json(party);
  }, function(err) {
    return next(err);
  });
});

// SHOW
router.get('/:id', authenticate, function(req, res, next) {
  Party.findById(req.params.id).populate('organizer')
  .then(function(party) {
    // console.log('populated party:', party);
    if (!party) return next(makeError(res, 'Document not found', 404));
    // if (!req.user._id.equals(party.organizer)) return next(makeError(res, 'That is not your Party!', 401));
    // This sets only the attributes of 'party' that we want sent to the client, preventing sensitive information being sent.
    party.organizer = {
      local: {
        email: party.organizer.local.email
      },
      firstName: party.organizer.firstName,
      username: party.organizer.username
    }
    // console.log('party:', party);
    res.json(party);
  }, function(err) {
    return next(err);
  });
});


// UPDATE ONLY PARTY GUEST LIST
router.put('/:id/guests', authenticate, function(req, res, next) {
  console.log("req.body.email:", req.body.email);
  User.find({'local.email': userEmail})
  .then(function(foundUser) {
    console.log("Found user:", foundUser);
    Party.findById(req.params.id);
  })
  // .then(function(party) {
  //   if (!party) return next(makeError(res, 'Document not found', 404));
  //   // party.guests = req.body.guests;
  //   return party.save();
  // })
  .then(function(party) {
    res.json(party);
  }, function(err) {
    return next(err);
  });
})


// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  console.log("req.body:", req.body);
  Party.findById(req.params.id)
  .then(function(party) {
    if (!party) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(party.organizer)) return next(makeError(res, 'Unauthorized', 401));
    party.name = req.body.name;
    party.time.start = req.body.time.start;
    party.time.end = req.body.time.end;
    party.date = req.body.date;
    party.location.address = req.body.location.address;
    party.location.lat = req.body.location.lat;
    party.location.lng = req.body.location.lng;
    party.description = req.body.description;
    // party.foodList.chosen = req.body.foodList.chosen ? true : false;
    // party.playlist.chosen = req.body.playlist.chosen ? true : false;
    // party.entertainment.chosen = req.body.entertainment.chosen ? true : false;
    party.details.over18 = req.body.details.over18 ? true : false;
    party.details.over21 = req.body.details.over21 ? true : false;
    party.details.byoBeer = req.body.details.byoBeer ? true : false;
    party.details.byoFood = req.body.details.byoFood ? true : false;
    party.details.movie = req.body.details.movie ? true : false;
    // party.details.dancing = req.body.details.dancing ? true : false;
    party.details.music = req.body.details.music ? true : false;
    party.details.outdoors = req.body.details.outdoors ? true : false;
    // party.details.swimming = req.body.details.swimming ? true : false;
    party.details.birthday = req.body.details.birthday ? true : false;
    // party.details.attire.formal = req.body.details.attire.formal ? true : false;
    // party.details.attire.casual = req.body.details.attire.casual ? true : false;
    party.organizer = req.user._id;
    return party.save();
  })
  .then(function(party) {
    res.json(party);
  }, function(err) {
    return next(err);
  });
});

// DESTROY
router.delete('/:id', authenticate, function(req, res, next) {
  Party.findById(req.params.id)
  .then(function(party) {
    if (!party) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(party.organizer)) return next(makeError(res, 'Unauthorized', 401));
    return Party.remove( { _id: party._id } );
  })
  .then(function() {
    res.status(204).end();
  }, function(err) {
    return next(err);
  });
});

module.exports = router;
