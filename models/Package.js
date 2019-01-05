const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
  packageNo: {
    type: Number,
    index: true,
    unique: true
  },
  date: {
    type: Date,
    default: Date.now
  },
  deliverdate: {
    type: Date,
    default: Date.now
  },
  // customername: {
  //   type: String,
  //   required: true
  // },
  // customerphone: {
  //   type: Number,
  //   require: true
  // },
  // address: {
  //   type: String,
  //   required: true
  // },
  vendorname: {
    type: String,
    required: true
  },
  ridername: {
    type: String
  },
  cod: {
    type: Number
  },
  dc: {
    type: Number
  },
  status: {
    type: Boolean,
    default: false
  }
  
});

module.exports = Package = mongoose.model('package', PackageSchema);