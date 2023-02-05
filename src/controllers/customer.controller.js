const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { customerService, tokenService } = require('../services');
const { success } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');

const register = catchAsync(async (req, res) => {
  const user = await customerService.createUser(req.body);
  user.password = undefined;
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send(success({ user, tokens }, 'User created successfully'));
});

const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await customerService.loginUserWithEmailAndPassword(email, password);
  user.password = undefined;
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.OK).send(success({ user, tokens }));
});

const logout = catchAsync(async (req, res) => {
  await customerService.logout(req.body.refreshToken);
  res.status(httpStatus.OK).send(success({}, 'Logout Successfully'));
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await customerService.refreshAuth(req.body.refreshToken);
  res.status(httpStatus.OK).send(success(tokens));
});


module.exports = {
  register,
  login,
  logout,
  refreshTokens,
};
