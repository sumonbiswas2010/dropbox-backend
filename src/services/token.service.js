/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
const moment = require('moment');
const httpStatus = require('http-status');
const config = require('../config/config');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const { AuthToken } = require('../models');

const generateToken = (userId, expires, type, secret = config.jwt.secret) => {
  const payload = {
    sub: userId,
    iat: moment().unix(),
    exp: expires.unix(),
    type,
  };
  return jwt.sign(payload, secret);
};

const saveToken = async (access_token, refresh_token, user_id, expire) => {
  try {
    const res = await AuthToken.update(
      { user_id },
      { access_token, refresh_token, user_id, expire, updatedAt: new Date() },
      { upsert: true }
    ).exec();
    return res;
  } catch (err) {
    throw new ApiError(1030, 'Error saving token');
  }
};

const verifyToken = async (token) => {
  const payload = jwt.verify(token, config.jwt.secret);
  const tokenDoc = await AuthToken.findOne({ refresh_token: token, user_id: payload.sub });

  if (!tokenDoc) {
    throw new ApiError(1001, 'Token does not exist');
  }
  if (tokenDoc.expire < new Date()) throw new ApiError(1002, 'Token expired. Please Login');
  return tokenDoc;
};

const generateAuthTokens = async (user) => {
  const accessTokenExpires = moment().add(config.jwt.accessExpirationMinutes, 'minutes');
  const accessToken = generateToken(user.id, accessTokenExpires, tokenTypes.ACCESS);

  const refreshTokenExpires = moment().add(config.jwt.refreshExpirationDays, 'days');
  const refreshToken = generateToken(user.id, refreshTokenExpires, tokenTypes.REFRESH);
  await saveToken(accessToken, refreshToken, user.id, refreshTokenExpires);

  return {
    access: {
      token: accessToken,
      expires: accessTokenExpires.toDate(),
    },
    refresh: {
      token: refreshToken,
      expires: refreshTokenExpires.toDate(),
    },
  };
};

module.exports = {
  generateToken,
  saveToken,
  verifyToken,
  generateAuthTokens,
};
