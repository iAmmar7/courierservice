const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PackageSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  // packageNo: {
  //   type: Number,
  //   index: true,
  //   unique: true
  // },
  arrivaldate: {
    type: Date,
    default: Date()
  },
  deliverdate: {
    type: Date,
    // default: Date()
  },
  customername: {
    type: String,
    required: true
  },
  customerphone: {
    type: Number,
    require: true
  },
  address: {
    type: String,
    required: true
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "vendors",
    required: true
  },
  vendor: {
    type: Schema.Types.ObjectId,
    ref: "riders"
  },
  cod: {
    type: Number
  },
  dc: {
    type: Number
  },
  status: {
    type: String,
    default: 'pending'
  }

});

module.exports = Package = mongoose.model('package', PackageSchema);