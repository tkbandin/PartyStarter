var mongoose = require('mongoose');
var Food = require('./food');

var PartySchema = new mongoose.Schema({
  name: { type: String, required: True },
  time: {
    start: { type: String, required: True },
    end:   { type: String }
  }
  date:    { type: Date,   required: True },
  address: { type: String, required: True },
  description: { type: String, required: True },
  foodList: {
    // Boolean for choosing this option
    chosen: { type: Boolean, required: True },
    list: [Food.schema]
  },
  playlist: {
    // Boolean for choosing this option
    chosen: { type: Boolean, required: True }
  },
  entertainment: {
    // Boolean for choosing this option
    chosen:   { type: Boolean, required: True },
    category: { type: String }
  },
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  guests:   [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }]
},
  { timestamps: true }
);

function date2String(date) {
  var options = {
    weekday: 'long', year: 'numeric', month: 'short',
    day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
}

PartySchema.methods.getCreatedAt = function() {
  return date2String(this.createdAt);
};

PartySchema.methods.getUpdatedAt = function() {
  return date2String(this.updatedAt);
};


module.exports = mongoose.model('Party', PartySchema);
