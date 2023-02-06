/* eslint-disable no-plusplus */
/* eslint-disable no-shadow */
/* eslint-disable camelcase */
const multer = require('multer');
const ApiError = require('../utils/ApiError');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'tmp/');
  },
});

const upload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 10,
  },
});

const singleFileUploader = async (req, res, next) => {
  try {
    upload.single('file')(req, res, (err) => {
      if (err) {
        if (err.message.includes('File too large')) return next(new ApiError(4005, 'File Size Cannnot Exceed 10MB'));
        if (err.code.includes('LIMIT_UNEXPECTED_FILE')) return next(new ApiError(4001, 'File Key Should be file'));
        return next(new ApiError(err.errorCode, err.message));
      }
      if(!req.file) return next( new ApiError(4001, 'File Key Should be file'))
      console.log(req.file);
      next();
    });
  } catch (err) {
    throw new ApiError(4001, 'No Image Found', err);
  }
};


module.exports = {
  singleFileUploader
};
