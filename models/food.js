var mongoose = require('mongoose');

var FoodSchema = new mongoose.Schema({
  name: { type: String, required: true },
  amount: {
    needed:  { type: Number, required: true },
    claimed: { type: Number, required: true }
  },
  description: { type: String },

  // How do we accomplish this??
  bringers: [{
    user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number }
  }]
});

module.exports = mongoose.model('Food', FoodSchema);
