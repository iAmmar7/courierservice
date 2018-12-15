// This file is just an advace version for validator
// Validator library has isEmpty function but it works only with STRING
// So we have made our own function which can validate all the data types
const isEmpty = value =>
  value === undefined ||
  value === null ||
  (typeof value === 'object' && Object.keys(value).length === 0) ||
  (typeof value === 'string' && value.trim().length === 0);


module.exports = isEmpty;   // same as 'export default isEmpty;'