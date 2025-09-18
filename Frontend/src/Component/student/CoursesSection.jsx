import React, { useState, useContext } from "react";


import CourseCard from "./CourseCard";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";


const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="pt-16">
      <h1 className="text-2xl font-semibold text-center">
       
        Learn from the best
      </h1>
      <p className="text-center text-gray-500 pt-2 text-lg md:max-w-2xl mx-auto">
       
        Explore our top-rated courses across various categories. From coding and
        design to business and wellness .our courses are crafted to deliver
        results.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 px-4 md:px-0 md:my-16 my-10 max-w-6xl mx-auto">
  {allCourses.slice(0, 4).map((course, index) => (
    <div
      key={index}
      className="hover:-translate-y-2 hover:shadow-lg transition-all duration-300"
    >
      <CourseCard course={course} />
    </div>
  ))}
  
</div>

      <Link to={'/course-list'} onClick={() => window.scrollTo(0, 0)} className="text-gray-500 border border-gray-500/30 px-10 py-3 rounded mx-auto flex items-center justify-center hover:bg-blue-600 hover:text-white transition-all duration-300">
        View All Courses
      </Link>
    </div>
  );
};

export default CoursesSection;
