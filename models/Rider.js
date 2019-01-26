const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const RiderSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
      type: Number,
      required: true
  },
  chargesperdelivery: {
    type: Number,
    required: true
  },
  hiredate: {
    type: Date,
    default: Date.now
  }
});

module.exports = Rider = mongoose.model('rider', RiderSchema);