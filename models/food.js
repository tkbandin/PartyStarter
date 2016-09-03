var mongoose = require('mongoose');

var Food = new mongoose.Schema({
  name: { type: String, required: True },
  amount: {
    needed:  { type: Number, required: True },
    claimed: { type: Number, required: True }
  },
  description: { type: String },

  // How do we accomplish this??
  bringers: [{
    user:   { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    amount: { type: Number }
  }]
});

module.exports = mongoose('Food', FoodSchema);
