import express from "express";
import { addCourse, educatorDashboardData, getCoursesByEducator, getEnrolledStudentsData, updateRoletoEducator } from "../controllers/educatorController.js";
import upload from "../config/multer.js";
import protectEducator from "../middleware/authMiddleware.js";

const educatorRouter = express.Router();
educatorRouter.get("/update-role", updateRoletoEducator);
educatorRouter.post('/add-course',upload.single('image'),protectEducator,addCourse);
educatorRouter.get('/all-courses',protectEducator,getCoursesByEducator);
educatorRouter.get('/dashboard',protectEducator,educatorDashboardData);
educatorRouter.get('/enrolled-students', protectEducator,getEnrolledStudentsData)

export { educatorRouter };
