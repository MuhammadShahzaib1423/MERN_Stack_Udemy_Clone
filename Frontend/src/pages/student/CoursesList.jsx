import React, { useContext, useState,useEffect } from 'react'
import { AppContext } from '../../context/AppContext'
import Searchbar from '../../Component/student/Searchbar';
import { useParams } from 'react-router-dom';
import CourseCard from '../../Component/student/CourseCard';
import { assets } from '../../Component/Assets/assets';
import Footer from '../../Component/student/Footer';
import AnimatedContent from '../../Component/student/companies_scroll';

const CoursesList = () => {

 const {navigate,allCourses} = useContext(AppContext);
 const {input} = useParams();
 const [filteredCourses, setFilteredCourses] = useState([]);
 useEffect(() => {
if(allCourses && allCourses.length > 0) {
 const tempCourses = allCourses.slice();

 input ? setFilteredCourses(tempCourses.filter(item => item.courseTitle.toLowerCase().includes(input.toLowerCase()))) : setFilteredCourses(tempCourses);

}
 },[allCourses,input]);
 return (
  <>
  <div className='relative md:px-36 px-8 pt-20 text-left'>
  <div className='flex md:flex-row flex-col gap-6 items-start justify-between w-full'>
    <div >
      <h1 className='text-3xl font-semibold text-gray-800'> Course List</h1>
      <p  className='text-gray-500'> <span className='text-gray-500 cursor-pointer' onClick={()=>navigate('/')}>Home</span> /  <span>Course List</span></p>
    </div>
    <Searchbar data={input} />
  </div>
  {
    input  && <div className='inline-flex items-center gap-4 px-4 py-2 border mt-8 -mb-8  text-gray-600'>
      <p>{input}</p> 
      <img src={assets.cross_icon} alt="cross icon" className='cursor-pointer'  onClick={()=>navigate('/course-list')}/>
      </div>
  }
  
      
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 my-16 px-2 md:p-0">
  {filteredCourses.map((course, index) => (
    <AnimatedContent
      key={index}
      distance={0}          
      direction="vertical"  
      duration={0.6}
      ease="easeOut"
      initialOpacity={0}
      animateOpacity
      scale={1.2}           
      threshold={0.2}
      delay={0.1 * index}   
    >
      <CourseCard course={course} />
    </AnimatedContent>
  ))}
</div>


  </div>

  <Footer />
  </>
  )
}

export default CoursesList
