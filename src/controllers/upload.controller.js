/* eslint-disable no-shadow */
/* eslint-disable camelcase */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const fs = require('fs');
const path = require('path');
const uploadService = require('../services/upload.service');
const { success } = require('../utils/ApiResponse');

const singleFileUploader = catchAsync(async (req, res) => {
  const upload = await uploadService.singleFileUploader(req.file, req.userData.sub);
  res.status(httpStatus.CREATED).send(success(upload, 'File Uploaded Successfully'));
});
const getAllFileInfo = catchAsync(async (req, res) => {
  const files = await uploadService.getAllFileInfo(req.userData.sub);
  res.status(httpStatus.CREATED).send(success(files, 'Files Found Successfully'));
});
const deleteFilesByKey = catchAsync(async (req, res) => {
  const files = await uploadService.deleteFilesByKey(req.body, req.userData.sub);
  res.status(httpStatus.OK).send(success(files, 'Files Deleted Successfully'));
});
const updateFileByKey = catchAsync(async (req, res) => {
  const files = await uploadService.updateFileByKey(req.params.key, req.body, req.userData.sub);
  res.status(httpStatus.OK).send(success(files, 'File Updated Successfully'));
});
const getFileByKey = catchAsync(async (req, res) => {
  const file = await uploadService.getFileByKey(req.params.key);
  const readStream = fs.createReadStream(file.location);
  readStream.pipe(res);
});

module.exports = {
  singleFileUploader,
  getFileByKey,
  getAllFileInfo,
  deleteFilesByKey,
  updateFileByKey,
};
