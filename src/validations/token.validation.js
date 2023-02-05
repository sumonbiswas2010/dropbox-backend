/* eslint-disable prefer-destructuring */
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');
const config = require('../config/config');

const token = (req, res, next) => {
  let fullToken = req.get('authorization');
  if (!fullToken) {
    throw new ApiError(1001, 'No Token Found with Request Header');
  } else if (fullToken.length > 6) {
    fullToken = fullToken.split(' ')[1];

    jwt.verify(fullToken, config.jwt.secret, (err, decoded) => {
      if (err) {
        throw new ApiError(1001, 'Invalid Token');
      } else {
        req.userData = decoded;
        next();
      }
    });
  } else {
    throw new ApiError(1002, 'Unauthorized');
  }
};

module.exports = {
  token,
};
