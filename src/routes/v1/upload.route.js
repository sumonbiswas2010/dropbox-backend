const express = require('express');
const revoUploadController = require('../../controllers/upload.controller');
const revoUploadValidation = require('../../validations/upload.validation');
// const tokenValidation = require('../../validations/token.validation');

const router = express.Router();

router.post('/file', revoUploadValidation.singleFileUploader, revoUploadController.singleFileUploader);
router.get('/file/:key', revoUploadController.getFileByKey);

// router.put('/admin/image', revoUploadController.updateImageByAdmin);


module.exports = router;
