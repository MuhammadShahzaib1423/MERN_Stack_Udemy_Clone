const Course = require('../models/course');

const createCourse = async (req, res) => {
    try {
        const { title, heading, description, price, thumbnail, createdBy } = req.body;
        if(!title || !heading || !description || !price || !thumbnail ) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const newCourse = await new Course({
            title,
            heading,
            description,
            price,
            thumbnail,
        });
        await newCourse.save();
        return res.status(201).json({ message: "Course created successfully", course: newCourse });
    }
    catch (error) {
        console.error("Error creating course:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
const getAllCourses = async(req,res)=>{
    try{
        const courses = await Course.find({});
        res.status(200).json({courses});
        if(courses.length === 0){
            return res.status(404).json({message:"No courses found"});
        }
    }
    catch(error){
        console.error("Error fetching courses:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

const getCourseById = async (req, res) => {

    try{
        const {id} = req.params;
        const course = await Course.findById(id);
        if(!course){
            return res.status(404).json({message:"Course not found"});
        }
        res.status(200).json({course});
    }
    catch(error){
        console.error("Error fetching course by ID:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = { createCourse, getAllCourses, getCourseById };
    