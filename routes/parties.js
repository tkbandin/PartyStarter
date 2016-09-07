var express = require('express');
var router = express.Router();
var Todo = require('../models/todo');

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
