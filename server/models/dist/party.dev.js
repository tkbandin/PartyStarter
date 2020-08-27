"use strict";

var mongoose = require("mongoose");

var Schema = mongoose.Schema;
var PartySchema = new Schema({
  title: String,
  user: Number,
  address: String,
  coords: [Number],
  venue: String,
  attendeeCap: Number,
  pictureUrl: String,
  description: String,
  hasFood: Boolean,
  date: Date,
  startTime: String,
  endTime: String,
  going: Number
});
module.exports = mongoose.model("Party", PartySchema);