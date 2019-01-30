const Validator = require('validator');
const isEmpty = require('./is_empty');

module.exports = function validateRiderInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : '';
  data.contact = !isEmpty(data.contact) ? data.contact : '';
  data.chargesperdelivery = !isEmpty(data.chargesperdelivery) ? data.chargesperdelivery : '';

  if(Validator.isEmpty(data.name)) {
    errors.name = "Name is required"
  }

  if(!Validator.isLength(data.contact, { min: 11, max: 11 })) {
    errors.contact = "Contact must be consist of 11 numbers";
  }

  if(Validator.isEmpty(data.contact)) {
    errors.contact = "Phone number is required";
  }

  if(Validator.isEmpty(data.chargesperdelivery)) {
    errors.chargesperdelivery = "Charges per delivery is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)    
  };
};