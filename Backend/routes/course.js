const express = require('express');
const { createCourse,getAllCourses,getCourseById } = require('../controllers/Course');
const router = express.Router();


router.post('/create-course', createCourse);
router.get('/get-courses', getAllCourses);
router.get('/get-course/:id', getCourseById);

module.exports = router;
