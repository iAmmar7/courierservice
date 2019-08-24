const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePackageInput(data) {
  let errors = {};

  data.vendor = !isEmpty(data.vendor) ? data.vendor : '';
  data.rider = !isEmpty(data.rider) ? data.rider : '';
  data.customername = !isEmpty(data.customername) ? data.customername : '';
  data.customerphone = !isEmpty(data.customerphone) ? data.customerphone : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  data.status = !isEmpty(data.status) ? data.status : 'pending';

  if (Validator.isEmpty(data.vendor)) {
    errors.vendor = "Vendor name is required";
  }

  // if(data.rider) {
  //   if(Validator.isEmpty(data.rider)) {
  //     errors.rider = "Rider name is required";
  //   }
  // }

  if (Validator.isEmpty(data.customername)) {
    errors.customername = "Customer name is required";
  }

  if (!Validator.isLength(data.customerphone, { min: 11, max: 11 })) {
    errors.customerphone = "Contact must be consist of 11 numbers";
  }

  if (Validator.isEmpty(data.customerphone)) {
    errors.customerphone = "Customer phone number is required";
  }

  if (Validator.isEmpty(data.address)) {
    errors.address = "Customer address is required";
  }

  if (!Validator.isIn(data.status, ['pending', 'delivered', 'returned'])) {
    errors.status = "Status can only be pending, delivered or returned"
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};