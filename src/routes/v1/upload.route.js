const express = require('express');
const uploadController = require('../../controllers/upload.controller');
const uploadValidation = require('../../validations/upload.validation');
const tokenValidation = require('../../validations/token.validation');

const router = express.Router();

router.post(
  '/file',
  tokenValidation.token,
  uploadValidation.singleFileUploader,
  uploadController.singleFileUploader
);
router.get('/file/:key', uploadController.getFileByKey);
router.get('/files',tokenValidation.token, uploadController.getAllFileInfo);
router.delete('/files/',tokenValidation.token, uploadController.deleteFilesByKey);
router.patch('/file/:key', tokenValidation.token,uploadController.updateFileByKey);


module.exports = router;
