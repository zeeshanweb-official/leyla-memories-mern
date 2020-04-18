// Source:
// https://appdividend.com/2018/07/18/react-redux-node-mongodb-jwt-authentication/#React_Redux_Node_MongoDB_JWT_Authentication

const validator = require('validator');
const isEmpty = require('./isEmpty');

const validateSignup = (data) => {
  const errors = {};

  /* eslint-disable no-param-reassign */
  data.username = !isEmpty(data.username) ? data.username : '';
  data.email = !isEmpty(data.email) ? data.email : '';
  data.password = !isEmpty(data.password) ? data.password : '';
  data.firstname = !isEmpty(data.firstname)
    ? data.firstname
    : '';
  /* eslint-enable no-param-reassign */

  if (!validator.isLength(data.username, { min: 4, max: 30 })) {
    errors.name = 'Name must be between 2 and 30 chars';
  }

  if (validator.isEmpty(data.username)) {
    errors.name = 'Name field is required';
  }

  if (!validator.isEmail(data.email)) {
    errors.email = 'Email is invalid';
  }

  if (validator.isEmpty(data.email)) {
    errors.email = 'Email is required';
  }

  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = 'Password must have between 6 and 30 chars';
  }

  if (validator.isEmpty(data.password)) {
    errors.password = 'Password is required';
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

module.exports = validateSignup;
