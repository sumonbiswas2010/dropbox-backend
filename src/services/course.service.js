
const httpStatus = require('http-status');
const bcrypt = require('bcryptjs');
const { compareSync } = require('bcryptjs');
const Sequelize = require('sequelize');

const fetch = require('node-fetch');

const { Op } = Sequelize;

const ApiError = require('../utils/ApiError');

// const {
//   Class,
//   Course
// } = require('../models/Tables');

const addClass = async (data) => {
  try {
    return await Class.create(data)
  }
  catch(err) {
    throw new ApiError(0, err.message)
  }
}
const addCourse = async (data) => {
  try {
    return await Course.create(data)
  }
  catch(err) {
    throw new ApiError(0, err.message)
  }
}
const getCourses = async (data) => {
  try {
    return await Class.findAll({
      include: [Course]
    })
  }
  catch(err) {
    throw new ApiError(0, err.message)
  }
}

module.exports = {
  addClass,
  addCourse,
  getCourses
};
