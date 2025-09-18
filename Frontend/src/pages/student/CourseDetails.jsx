import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import Loading from "./../../Component/student/Loading";
import { assets } from "../../Component/Assets/assets";
import humanizeDuration from "humanize-duration";
import Footer from "../../Component/student/Footer";
import Youtube from "react-youtube";
const CourseDetails = () => {
  const { id } = useParams();

  const [courseData, setCourseData] = useState(null);
  const [opensection, setOpenSection] = useState({});
  const [isalreadyEnrolled, setIsAlreadyEnrolled] = useState(false);
  const [playerData, setPlayerData] = useState(null);

  const {
    allCourses,
    calculateRating,
    calculateChapterTime,
    calculateCourseDuration,
    calculateNoofLectures,
    currency,
  } = useContext(AppContext);

  const fetchCourseData = async () => {
    const findCourse = allCourses.find((course) => course._id === id);

    setCourseData(findCourse);
  };
  useEffect(() => {
    fetchCourseData();
  }, []);

  const toggleSection = (index) => {
    setOpenSection((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return courseData ? (
    <>
      <div className="relative flex md:flex-row flex-col-reverse gap-10 items-start justify-between md:px-36 px-8 md:pt-30 pt-20 text-left bg-gradient-to-b from-cyan-100 via-white to-white min-h-screen">
        {/* Left Column */}
        <div className="max-w-xl z-10 text-gray-500">
          <h1 className="md:text-3xl font-semibold text-gray-800 text-md ">
            {courseData.courseTitle}
          </h1>
          <p
            className="pt-4 md:text-md text-sm"
            dangerouslySetInnerHTML={{
              __html: courseData.courseDescription.slice(0, 250),
            }}
          ></p>

          <div className="flex items-center space-x-2 pt-3 pb-1 text-sm">
            <p>{calculateRating(courseData)}</p>
            <div className="flex ">
              {[...Array(5)].map((_, index) => (
                <img
                  key={index}
                  src={
                    index < Math.floor(calculateRating(courseData))
                      ? assets.star
                      : assets.star_blank
                  }
                  className="w-3.5 h-3.5"
                />
              ))}
            </div>
            <p className="text-blue-500">
              ({courseData.courseRatings.length}{" "}
              {courseData.courseRatings.length === 1 ? "rating" : "ratings"})
            </p>
            <p>
              {courseData.enrolledStudents.length}{" "}
              {courseData.enrolledStudents.length === 1
                ? "student"
                : "students"}
            </p>
          </div>

          <p className="text-sm ">
            Course by{" "}
            <span className="text-blue-600 underline">Muhammad Shahzaib</span>
          </p>
          <div>
            <h2 className="pt-8 font-bold text-gray-800 text-xl">
              {" "}
              Course Structure
            </h2>

            <div className="pt-5">
              {courseData.courseContent.map((chapter, index) => (
                <div
                  key={index}
                  className="border border-gray-300 bg-white mb-2 rounded"
                >
                  <div
                    className="flex items-center justify-between px-4 py-3 cursor-pointer select-none"
                    onClick={() => toggleSection(index)}
                  >
                    <div className="flex items-center gap-2">
                      <img
                        className={`transform transition-transform duration-300 ${
                          opensection[index] ? "rotate-180" : "rotate-0"
                        }`}
                        src={assets.down_arrow_icon}
                        alt="arrow icon"
                      />
                      <p className="text-sm md:text-md text-black font-semibold">
                        {chapter.chapterTitle}
                      </p>
                    </div>
                    <p className="text-sm">
                      {chapter.chapterContent.length} Lectures -{" "}
                      {calculateChapterTime(chapter)}
                    </p>
                  </div>
                  <div
                    className={`overflow-hidden transition-all duration-300  ${
                      opensection[index] ? "max-h-96" : "max-h-0"
                    }`}
                  >
                    <ul className="list-disc md:pl-10 p-4 pr-4 py-2 text-gray-600 border-t border-gray-300">
                      {chapter.chapterContent.map((lecture, idx) => (
                        <li key={idx} className="flex items-start gap-2 py-1">
                          <img
                            src={assets.play_icon}
                            alt="play icon"
                            className="w-4 h-4 mt-1"
                          />
                          <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-sm">
                            <p>{lecture.lectureTitle}</p>
                            <div className="flex gap-2">
                              {lecture.isPreviewFree && (
                                <p
                                  onClick={() =>
                                    setPlayerData({
                                      videoId: lecture.lectureUrl
                                        .split("/")
                                        .pop(),
                                    })
                                  }
                                  className="text-blue-500 cursor-pointer text-xm"
                                >
                                  Preview Available
                                </p>
                              )}
                              <p>
                                {humanizeDuration(
                                  lecture.lectureDuration * 60 * 1000,
                                  { units: ["h", "m"], round: true }
                                )}
                              </p>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="pt-8  font-semibold text-black text-xl">
              {" "}
              Course Description
            </h3>
            <p
              className="pt-3 rich-text "
              dangerouslySetInnerHTML={{ __html: courseData.courseDescription }}
            ></p>
          </div>
        </div>
        {/* Right Column */}
        <div className="max-w-[424px] z-10 shadow-lg rounded-t md:rounded-none overflow-hidden bg-white min-w-[300px] sm:min-w-[420px]">
          {playerData ? (
            <Youtube
              videoId={playerData.videoId}
              opts={{
                playerVars: {
                  autoplay: 1,
                },
              }}
              iframeClassName="w-full aspect-video"
            />
          ) : (
            <img
              src={courseData.courseThumbnail}
              alt={courseData.courseTitle}
            />
          )}

          <div className="p-5">
            <div className="flex items-center gap-2">
              <img
                src={assets.time_left_clock_icon}
                className="w-3.5"
                alt="time left clock icon"
              />

              <p className="text-red-500">
                {" "}
                <span className="font-semibold"> 5 days </span> left at this
                price!
              </p>
            </div>
            <div className="flex gap-3 items-center pt-2">
              <p className="text=gray-800 md:text-4xl text-2xl font-semibold ">
                {currency}
                {(
                  courseData.coursePrice -
                  (courseData.discount * courseData.coursePrice) / 100
                ).toFixed(2)}
              </p>
              <p className="md:text-lg text-gray-500 line-through">
                {currency}
                {courseData.coursePrice}
              </p>
              <p className="md:text-lg text-gray-500">
                {currency}
                {courseData.discount} % off
              </p>
            </div>
            <div className="flex items-center text-sm md:text-md gap-4 pt-2 md:pt-4 text-gray-500">
              <div className="flex items-center gap-1">
                <img src={assets.star} alt="star icon" />
                <p>{calculateRating(courseData)} </p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"> </div>

              <div className="flex items-center gap-1">
                <img src={assets.time_clock_icon} alt="time left clock icon" />
                <p>{calculateCourseDuration(courseData)} left</p>
              </div>

              <div className="h-4 w-px bg-gray-500/40"> </div>
              <div className="flex items-center gap-1">
                <img src={assets.lesson_icon} alt="video icon" />
                <p>{calculateNoofLectures(courseData)} lectures</p>
              </div>
            </div>
            <button className="bg-blue-500 text-white mt-4 py-3 px-4 hover:text-white hover:bg-blue-700  font-semibold rounded w-full md:mt-6">
              {isalreadyEnrolled ? "Already Enrolled" : "Enroll Now"}
            </button>

            <div className="pt-6">
              <p className="md:text-xl text-lg font-semibold text-gray-800 ">
                Whats is the course?
              </p>
              <ul className="ml-4 pt-2 text-sm md:text-md list-disc text-gray-500">
                <li>Lifetime Access with free updates.</li>
                <li>30 days money back guarantee.</li>
                <li>Certificate of completion.</li>
                <li>Access on mobile and TV.</li>
                <li>Assignments.</li>
                <li>Practice tests.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  ) : (
    <Loading />
  );
};

export default CourseDetails;
