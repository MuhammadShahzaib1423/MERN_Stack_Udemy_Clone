import React,{useContext} from 'react'
import { AppContext } from '../../context/AppContext'
import { Link } from 'react-router-dom';
import { assets } from '../Assets/assets';

const CourseCard = ({ course }) => {
  const { currency, calculateRating } = useContext(AppContext);

  return (
    <Link to = {'/course/' + course._id} className="border border-gray-500/30 pb-6 overflow-hidden rounded-lg" onClick={() => window.scrollTo(0, 0)}>
          <img src={course.courseThumbnail} className='w-full' alt={course.title} />
          <div className='p-3 text-left'>
            <h3 className='text-md font-semibold'>{course.courseTitle}</h3>
            <p className='text-gray-500'>Muhammad Shahzaib</p>
            <div className='flex items-center space-x-2'>
              <p>{calculateRating(course)}</p>
        <div className='flex '>
          {[...Array(5)].map((_, index) => (
            <img key={index} src={index < Math.floor(calculateRating(course))? assets.star :assets.star_blank } className='w-3.5 h-3.5'  />
          ))}
       
          </div>   
          <p className='text-gray-500'>22</p>
          
                   </div>
                   <p className='text-md font-semibold'>{currency} {(course.coursePrice - course.discount * course.coursePrice / 100).toFixed(2)}</p>
          </div>

    </Link>
  )
}

export default CourseCard
