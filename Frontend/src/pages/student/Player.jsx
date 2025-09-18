import React, {  useContext, useEffect, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useParams } from 'react-router-dom';
import humanizeDuration from 'humanize-duration';
import  Youtube  from 'react-youtube';
import { assets } from '../../Component/Assets/assets';
import Footer from '../../Component/student/Footer';
import Rating from '../../Component/student/Rating';

const Player = () => {

  const {enrolledCourses,calculateChapterTime} = useContext(AppContext);
  const {courseId}= useParams();
  const [courseData,setCourseData] = useState(null);
  const [opensection,setOpenSection] = useState({});
  const [playerData,setPlayerData] = useState(null);
  const getCourseData = () => {
    enrolledCourses.map((course)=>{
      if(course._id === courseId) {
        setCourseData(course);
      }
    })
  }
  const toggleSection = (index) => {
    setOpenSection((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  }

  useEffect(()=>{
    getCourseData();
  },[enrolledCourses]);
  return (
    <>
    <div className='p-4 sm:p-10 flex flex-col-reverse grid md:grid-cols-2 gap-10 md:px-36'>
      { /* left Column */ }
      <div className='text-gray-800'>
        <h2 className='text=xl font-semibold'> Course Structure</h2>
         <div className="pt-5">
                      {courseData &&courseData.courseContent.map((chapter, index) => (
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
                                    src={false ? assets.blue_tick_icon : assets.play_icon}
                                    alt="play icon"
                                    className="w-4 h-4 mt-1"
                                  />
                                  <div className="flex items-center justify-between w-full text-gray-800 text-xs md:text-sm">
                                    <p>{lecture.lectureTitle}</p>
                                    <div className="flex gap-2">
                                      {lecture.lectureUrl && (
                                        <p
                                          onClick={() =>
                                            setPlayerData({
                                             ...lecture, chapter: index + 1,lecture: idx + 1
                                            })
                                          }
                                          className="text-blue-500 cursor-pointer text-xm"
                                        >
                                          Watch
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

                    <div className='flex items-center gap-2 mt-10 py-3'>
                      <h1 className='text-xl font-bold'> Rate this Course:</h1>
                      <Rating initialRating={0} />
                    </div>
      </div>

      { /* Right Column */ }
      <div className='md:mt-10'> 
        {playerData ?  (
          <div > 
          <Youtube videoId={playerData.lectureUrl.split('/').pop()} opts={{ playerVars: { autoplay: 1 } }} iframeClassName='w-full aspect-video' />
        
        <div className='flex justify-between items-center mt-1'>
          <p> {playerData.chapter}.{playerData.lecture} {playerData.lectureTitle}</p>
          <button className='text-blue-600'> {false ? 'Completed' : 'Mark Complete'}</button>
        </div>
        
        </div>
         





      ) :    <img src={courseData ? courseData.courseThumbnail : ' '} alt="" />}
      
        </div> 
    </div>
    <Footer />
    </>
  )
}

export default Player
