const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { compareSync } = require('bcryptjs');
const ApiError = require('../utils/ApiError');
const { User, AuthToken } = require('../models');
const tokenService = require('./token.service');
const getUserByEmail = async (email) => {
  return await User.findOne({ email }, { password: 0 });
};

const checkEmailValidity = async (email) => {
  try {
    const regexEmail = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    if (!email.match(regexEmail)) throw new ApiError(0, 'Invalid Email');
    const res = await getUserByEmail(email);
    if (res) throw new ApiError(0, 'Email Already Taken');
    return true;
  } catch (error) {
    throw new ApiError(0, error.message);
  }
};

const createUser = async (userBody) => {
  try {
    await checkEmailValidity(userBody.email);
    const salt = bcrypt.genSaltSync(10);
    userBody.password = bcrypt.hashSync(userBody.password, salt);
    const newUser = new User({
      name: userBody.name,
      email: userBody.email,
      password: userBody.password,
    });
    return await newUser.save();
  } catch (error) {
    throw new ApiError(1025, error.message);
  }
};
const loginUserWithEmailAndPassword = async (email, password) => {
  try {
    const user = await User.findOne({ email });
    if (!user) throw new ApiError(httpStatus.FORBIDDEN, 'Wrong Credentials');
    const pass = compareSync(password, user.password);
    if (pass) {
      return user;
    }
    throw new ApiError(1015, 'Wrong Credentials');
  } catch (err) {
    throw new ApiError(1015, err.message);
  }
};

const logout = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken);
    if (!refreshTokenDoc) {
      throw new ApiError(1050, 'Please authenticate. Token Error');
    }
    return await AuthToken.deleteMany({ refresh_token: refreshToken });
  } catch (err) {
    console.log(err);
    throw new ApiError(1051, 'Logout Error');
  }
};
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken);
    const user = await User.findOne({
      _id: refreshTokenDoc.user_id,
    });
    console.log(user);
    if (!user) {
      throw new ApiError(1050, 'Please authenticate. Token Error');
    }
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(1050, error.message);
  }
};



module.exports = {
  createUser,
  getUserByEmail,
  loginUserWithEmailAndPassword,
  refreshAuth,
  logout,
};
