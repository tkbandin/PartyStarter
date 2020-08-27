const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PartySchema = new Schema({
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
});

module.exports = mongoose.model("Party", PartySchema);
