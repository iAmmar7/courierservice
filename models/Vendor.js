const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const VendorSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  name: {
    type: String,
    required: true
  },
  contact: {
    type: Number,
    required: true
  },
  address: {
    type: String,
  }
});

module.exports = Vendor = mongoose.model('vendor', VendorSchema);