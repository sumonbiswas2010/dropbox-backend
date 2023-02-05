const express = require('express');
const validate = require('../../middlewares/validate');
const customerController = require('../../controllers/customer.controller');
const customerValidation = require('../../validations/customer.validation');
const router = express.Router();

router.post('/login', customerValidation.login, customerController.login);
router.post('/register', customerValidation.register, customerController.register);
router.post('/refresh_token', customerValidation.refreshToken, customerController.refreshTokens);
router.post('/logout', customerController.logout);

module.exports = router;
