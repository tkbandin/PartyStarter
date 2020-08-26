var mongoose = require('mongoose');

var FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: {
    needed:  { type: Number, required: true },
    claimed: { type: Number, required: true }
  },
  description: { type: String },
});

module.exports = mongoose.model('Food', FoodSchema);
