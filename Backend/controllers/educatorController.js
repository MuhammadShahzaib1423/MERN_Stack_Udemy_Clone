// controllers/educatorController.js
import { clerkClient } from "@clerk/express";

import { v2 as cloudinary } from 'cloudinary';
import Course from "../models/course.js";

export const updateRoletoEducator = async (req, res) => {
  try {
    const userId = req.auth.userId;

    await clerkClient.users.updateUserMetadata(userId, {
      publicMetadata: { role: "educator" },
    });

    res.json({ success: true, message: "You can publish a course now" });
  } catch (error) {
    console.error("Error updating role to educator:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to update role" });
  }
};


/// Add new Course 
export const addCourse = async (req, res) => {
  try {
    const { courseData } = req.body;
    const imageFile = req.file;
    const educatorId = req.auth.userId;

    if (!imageFile) {
      return res.status(400).json({ success: false, message: "Image file is required" });
    }

    // Parse JSON string into object
    const parsedCourseData = JSON.parse(courseData);
    parsedCourseData.educator = educatorId;

    // Upload image to Cloudinary first
    const imageUpload = await cloudinary.uploader.upload(imageFile.path);

    // Add courseThumbnail to data before saving
    parsedCourseData.courseThumbnail = imageUpload.secure_url;

    // Now create course
    const newCourse = await Course.create(parsedCourseData);

    res.status(201).json({ success: true, course: newCourse });
  } catch (error) {
    console.error("Error adding course:", error);
    res.status(500).json({ success: false, message: "Failed to add course" });
  }
};

// Get courses by educator

export const getCoursesByEducator = async (req, res) => {
  try {
    const educatorId = req.auth.userId;
    const courses = await Course.find({ educator: educatorId });
    res.status(200).json({ success: true, courses });
    } catch (error) {
        console.error("Error fetching educator courses:", error);
        res.status(500).json({ success: false, message: "Failed to fetch courses" });
    }
};

// Get Educator Dashboard Data

export const educatorDashboardData = async() =>{
    try{
        const educator = req.auth.userId;
        const courses = await Course.find({ educator });
        const totalCourses = courses.length;

        const courseIds= courses.map(course => course._id);
        //Calculate total earning from purchased courses
        const purchases = await Purchase.find({
            courseId: {$in: courseIds},
            status: "completed"
        });
        const totalEarnings = purchases.reduce((sum,purchases)=> sum + purchases.amount,0);

        // Calcualate unique students enrolled in their course titles

        const enrolledStudentsData = [];
        for (const course of courses){
            const students = await User.find({
                _id: {$in: course.enrolledStudents}

            }, 'name imageUrl');
            students.forEach(student=> {
                enrolledStudentsData.push({
                    courseTitle: course.courseTitle,student
                 
                });
            });
        }
        res.status(200).json({ success: true, data: { totalCourses, totalEarnings, enrolledStudentsData } });
        

    }
    catch(error){
        console.error("Error fetching educator dashboard data:", error);
        res.status(500).json({ success: false, message: "Failed to fetch dashboard data" });
    }
}

export const getEnrolledStudentsData = async (req,res)=>{

    try{
        const educator = req.auth.userId;
        const courses = await Course.find({ educator });
        const courseIds = courses.map(course => course._id);
        const purchases = await Purchase.find({
            courseId: { $in: courseIds},
            status: "completed"
        }).populate('userId', 'name imageUrl').populate('courseId', 'courseTitle');

        const enrolledStudents = purchases.map(purchase => ({
    
            student: purchase.userId,
            courseTitle: purchase.courseId.courseTitle,
            purchaseDate: purchase.createdAt,
        }
       
    ))
    res.status(200).json({ success: true, enrolledStudents }    
    );
    }
    catch(error){
        console.error("Error fetching enrolled students data:", error);
        res.status(500).json({ success: false, message: "Failed to fetch enrolled students data" });

    }

}
