const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateVendorInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.contact = !isEmpty(data.contact) ? data.contact : '';
  data.address = !isEmpty(data.address) ? data.address : '';
  
  if(Validator.isEmpty(data.name)) {
    errors.name = "Name is required"
  }

  if(!Validator.isLength(data.contact, { min: 11, max: 11 })) {
    errors.contact = "Phone number must be consist of 11 digits";
  }

  if(Validator.isEmpty(data.contact)) {
    errors.contact = "Phone number is required";
  }

  if(data.address) {
    if(Validator.isEmpty(data.address)) {
      errors.address = "Address field is required";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)    
  };
};