/* eslint-disable no-shadow */
/* eslint-disable camelcase */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const path = require('path');
const revoUploadService = require('../services/upload.service');
const { success } = require('../utils/ApiResponse');

const singleFileUploader = catchAsync(async (req, res) => {
  const upload = await revoUploadService.singleFileUploader(req.file);
  res.status(httpStatus.CREATED).send(success(upload, 'File Uploaded Successfully'));
});

const getFileByKey = catchAsync(async (req, res) => {
  const file = await revoUploadService.getFileByKey(req.params.key);
  const readStream = fs.createReadStream(file.location);
  console.log(readStream);
  readStream.pipe(res);
  // res.writeHead(200, { 'Content-Type': 'application/pdf' });
  // res.write(readStream, 'binary');
  // res.end(null, 'binary');
  // file.pipe(res)
  // res.status(httpStatus.CREATED).send(success(file, 'Image Downloaded Successfully'));
});

module.exports = {
  singleFileUploader,
  getFileByKey,
};
