const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { courseService} = require('../services');
const { success } = require('../utils/ApiResponse');
const ApiError = require('../utils/ApiError');
const { makeLimitOffset } = require('../utils/pagination');


const addClass = catchAsync(async (req, res) => {
  const data = await courseService.addClass(req.body);
  res.status(httpStatus.CREATED).send(success(data, `Class Added`));
});
const addCourse = catchAsync(async (req, res) => {
  const data = await courseService.addCourse(req.body);
  res.status(httpStatus.CREATED).send(success(data, `Class Added`));
});
const getCourses = catchAsync(async (req, res) => {
  const data = await courseService.getCourses();
  if (data.length === 0) res.status(httpStatus.OK).send(success(data, 'No Courses Found'));
  else res.status(httpStatus.OK).send(success(data, 'Courses Found'));
});

module.exports = {
  addClass,
  getCourses,
  addCourse
};
