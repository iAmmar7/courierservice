const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validatePackageInput(data) {
  let errors = {};

  data.vendorname = !isEmpty(data.vendorname) ? data.vendorname : '';
  data.ridername = !isEmpty(data.ridername) ? data.ridername : '';
  data.customername = !isEmpty(data.customername) ? data.customername : '';  
  data.customerphone = !isEmpty(data.customerphone) ? data.customerphone : '';  
  data.address = !isEmpty(data.address) ? data.address : '';  

  if(Validator.isEmpty(data.vendorname)) {
    errors.vendorname = "Vendor name is required";
  }

  // if(data.ridername) {
  //   if(Validator.isEmpty(data.ridername)) {
  //     errors.ridername = "Rider name is required";
  //   }
  // }

  if(Validator.isEmpty(data.customername)) {
    errors.customername = "Customer name is required";
  }

  if(!Validator.isLength(data.customerphone, { min: 11, max: 11 })) {
    errors.customerphone = "Contact must be consist of 11 numbers";
  }

  if(Validator.isEmpty(data.customerphone)) {
    errors.customerphone = "Customer phone number is required";
  }
  
  if(Validator.isEmpty(data.address)) {
    errors.address = "Customer address is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};