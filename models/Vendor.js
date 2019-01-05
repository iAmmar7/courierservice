const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  contact: {
      type: Number,
      required: true
  }
});

module.exports = Vendor = mongoose.model('vendor', VendorSchema);