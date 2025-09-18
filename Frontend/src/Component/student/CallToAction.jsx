import React from 'react'
import { assets } from '../Assets/assets'

const CallToAction = () => {
  return (
    <div className='pt-16'>
       <h1 className='text-2xl font-semibold text-center  '>Learn anything, anytime, anywhere</h1>
<p className='text-md text-gray-700 text-center mx-auto max-w-2xl'>
  Join our community of learners and unlock your potential with our diverse range of courses. 
  Gain practical skills, connect with expert educators at your own pace and convenience.
</p>



    <div className="flex space-x-4 justify-center mt-8">
  <button className="bg-blue-600 hover:bg-blue-800 hover:text-white cursor-pointer text-white border rounded-md p-4 text-md">
    Get Started
  </button>

  <button className="border border-gray-300 rounded-md p-4 text-md flex items-center space-x-2">
    <span>Learn More</span>
    <img src={assets.arrow_icon} alt="arrow_icon" className="w-4 h-4" />
  </button>
</div>



    </div>
  )
}

export default CallToAction

