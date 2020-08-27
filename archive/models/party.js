var mongoose = require("mongoose");
var Food = require("./food");

var PartySchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    time: {
      start: { type: String, required: true },
      end: { type: String },
    },
    date: { type: Date, required: true },
    location: {
      address: { type: String, required: true },
      lat: { type: String, required: false },
      lng: { type: String, required: false },
    },
    going: { type: Number, default: 0 },
    description: { type: String, required: true },
    // foodList: {
    //   // Boolean for choosing this option
    //   chosen: { type: Boolean, required: true },
    //   list: [Food.schema]
    // },
    // playlist: {
    //   // Boolean for choosing this option
    //   chosen: { type: Boolean, required: true }
    // },
    // entertainment: {
    //   // Boolean for choosing this option
    //   chosen:   { type: Boolean, required: true },
    //   category: { type: String }
    // },
    details: {
      over18: { type: Boolean },
      over21: { type: Boolean },
      byoBeer: { type: Boolean },
      byoFood: { type: Boolean },
      movie: { type: Boolean },
      // dancing: { type: Boolean },
      music: { type: Boolean },
      outdoors: { type: Boolean },
      // swimming: { type: Boolean },
      birthday: { type: Boolean },
      // attire: {
      //   formal: { type: Boolean },
      //   casual: { type: Boolean }
      // }
    },
    organizer: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    guests: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

function date2String(date) {
  var options = {
    weekday: "long",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  };
  return date.toLocaleDateString("en-US", options);
}

PartySchema.methods.getCreatedAt = function () {
  return date2String(this.createdAt);
};

PartySchema.methods.getUpdatedAt = function () {
  return date2String(this.updatedAt);
};

PartySchema.methods.toString = function () {
  return `${this.name} is being planned by ${this.organizer.username}. It's happening on ${this.date} at ${this.time.start} at ${this.location.address}.`;
};

module.exports = mongoose.model("Party", PartySchema);
