const express = require('express');
const validate = require('../../middlewares/validate');
const courseController = require('../../controllers/course.controller');
const router = express.Router();



router.post('/class', courseController.addClass);
router.post('/course', courseController.addCourse);
router.get('/course', courseController.getCourses);

module.exports = router;
