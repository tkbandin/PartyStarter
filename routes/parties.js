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
    date: req.body.date,
    address: req.body.address,
    description: req.body.description,
    'foodList.chosen': req.body.foodList.chosen ? true : false,
    'playlist.chosen': req.body.playlist.chosen ? true : false,
    'entertainment.chosen': req.body.entertainment.chosen ? true : false,
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
  Party.findById(req.params.id)
  .then(function(party) {
    if (!party) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(party.organizer)) return next(makeError(res, 'That is not your Party!', 401));
    res.json(party);
  }, function(err) {
    return next(err);
  });
});

// UPDATE
router.put('/:id', authenticate, function(req, res, next) {
  Party.findById(req.params.id)
  .then(function(party) {
    if (!party) return next(makeError(res, 'Document not found', 404));
    if (!req.user._id.equals(party.organizer)) return next(makeError(res, 'Unauthorized', 401));
    party.name = req.body.name,
    party.time.start = req.body.time.start,
    party.date = req.body.date,
    party.address = req.body.address,
    party.description = req.body.description,
    party.foodList.chosen = req.body.foodList.chosen ? true : false,
    party.playlist.chosen = req.body.playlist.chosen ? true : false,
    party.entertainment.chosen = req.body.entertainment.chosen ? true : false,
    party.organizer = req.user._id
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
