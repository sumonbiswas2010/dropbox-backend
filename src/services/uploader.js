/* eslint-disable no-console */
/* eslint-disable security/detect-non-literal-fs-filename */
require('dotenv').config();
const fs = require('fs');
const S3 = require('aws-sdk/clients/s3');

const bucketName = process.env.REVO_AWS_BUCKET_NAME;
const region = process.env.REVO_AWS_BUCKET_REGION;
const accessKeyId = process.env.REVO_AWS_ACCESS_KEY;
const secretAccessKey = process.env.REVO_AWS_SECRET_KEY;
const ApiError = require('../utils/ApiError');

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

const uploadFile = (file) => {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
};
exports.uploadFile = uploadFile;

const uploadFiles = async (files) => {
  const fileStream0 = fs.createReadStream(files[0].path);
  const fileStream1 = fs.createReadStream(files[1].path);
  const params = [
    { Bucket: bucketName, Key: files[0].filename, Body: fileStream0 },
    { Bucket: bucketName, Key: files[1].filename, Body: fileStream1 },
  ];
  const responses = await Promise.all(params.map((param) => s3.upload(param).promise()));
  return responses;
};
exports.uploadFiles = uploadFiles;

const updateImage = (OLD_KEY, NEW_KEY) => {
  try {
    s3.copyObject({
      Bucket: bucketName,
      CopySource: `${bucketName}/${OLD_KEY}`,
      Key: NEW_KEY,
    })
      .promise()
      .then(() => {
        // Delete the old object
        s3.deleteObject({
          Bucket: bucketName,
          Key: OLD_KEY,
        }).promise();
      })
      // Error handling is left up to reader
      .catch((e) => console.error(e));
  } catch (error) {
    throw new ApiError(4004, 'File not found', error);
  }
};
exports.updateImage = updateImage;

const getFileStream = async (fileKey) => {
  try {
    const downloadParams = {
      Key: fileKey,
      Bucket: bucketName,
    };
    return await s3.getObject(downloadParams).promise();
  } catch (err) {
    throw new ApiError(4004, 'File not found', err);
  }
};
exports.getFileStream = getFileStream;
