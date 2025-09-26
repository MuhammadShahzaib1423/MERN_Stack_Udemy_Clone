import express from 'express';
import { getUserData, purchaseCourse, userEnrolledCourses } from '../controllers/User.js';
const userRoutes = express.Router();

userRoutes.get('/data', getUserData);
userRoutes.get('/enrolled-courses', userEnrolledCourses);
userRoutes.post('/purchase', purchaseCourse);
export default userRoutes;