const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');

const register = (req, res, next) => {
  const { body } = req;
  if (body.hasOwnProperty('name') && body.hasOwnProperty('email') && body.hasOwnProperty('password')) {
    const value = body.password;
    if (value.length < 8) {
      throw new ApiError(1003, 'Password Must be at least 8 characters long');
    }
    if (!value.match(/\d/) || !value.match(/[a-zA-Z]/)) {
      throw new ApiError(1003, 'Password Must Contain one number and one letter');
    }

    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (body.email.match(regexEmail)) {
      next();
    } else {
      throw new ApiError(1005, 'Invalid Email');
    }
  } else {
    throw new ApiError(1007, 'Required Data Error');
  }
};

const login = (req, res, next) => {
  const { body } = req;
  if (body.hasOwnProperty('email') && body.hasOwnProperty('password')) {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (body.email.match(regexEmail)) {
      next();
    } else {
      throw new ApiError(1005, 'Invalid Email');
    }
  } else {
    throw new ApiError(1007, 'Required Data Error');
  }
};

const refreshToken = (req, res, next) => {
  const { body } = req;
  if (body.hasOwnProperty('refreshToken')) {
    next();
  } else {
    throw new ApiError(1007, 'Required Data Error');
  }
};

module.exports = {
  register,
  login,
  refreshToken,
};
