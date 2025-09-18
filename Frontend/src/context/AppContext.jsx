import { createContext, useEffect,useState } from "react";
import { dummyCourses } from "../Component/Assets/assets";
import { useNavigate } from "react-router-dom";
import humanizeDuration from "humanize-duration";
import {Line} from 'rc-progress';
import React from "react";
export const AppContext = createContext();

export const AppContextProvider = (props) => {

    const currency = import.meta.env.VITE_CURRENCY;
    const navigate = useNavigate();
    const [allCourses,SetAllCourses] = useState([]);
    const [isEducator, setIsEducator] = useState(true);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const fetchAllCourses = async () =>{
        SetAllCourses(dummyCourses);
    }

    const calculateRating = (course) => {
        if (!course.courseRatings || course.courseRatings.length === 0) {
            return 0;
        }
        let totalRating = 0;
        course.courseRatings.forEach(rating =>{
          totalRating += rating.rating;
        })
        return totalRating / course.courseRatings.length


    }
    //function to calculate total time of chapters
    const calculateChapterTime = (chapter) => {  
          
            let time = 0;
            chapter.chapterContent.map((lecture)=> time +=lecture.lectureDuration);
            return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'], round: true });
        }

        //function to calculate Course duration

        const calculateCourseDuration = (course) => {
          let time = 0;
          course.courseContent.map((chapter) =>
            chapter.chapterContent.map((lecture) => (time += lecture.lectureDuration))
          );
          return humanizeDuration(time * 60 * 1000, { units: ['h', 'm'], round: true });

        }

        //function to calculate no of lectures in course

        const calculateNoofLectures = (course) => {
          let totalLectures = 0;

          course.courseContent.forEach((chapter) => {
            if(Array.isArray(chapter.chapterContent)) {
              totalLectures += chapter.chapterContent.length;
            }
          });
          return totalLectures;

        }



        //Fetch user enrolled courses
        const fetchUserEnrolledCourses = async () => {
        
        setEnrolledCourses(dummyCourses);
        }

    useEffect(()=>{
        fetchAllCourses();
        fetchUserEnrolledCourses();
    },[])

    const value = {
        currency,
        allCourses,
        navigate,
        calculateRating,
        calculateChapterTime,
        calculateCourseDuration,
        calculateNoofLectures,
        enrolledCourses,
        fetchUserEnrolledCourses,

    }
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
