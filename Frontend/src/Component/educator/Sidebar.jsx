import React from 'react'

const Sidebar = () => {
  return (
   <div className="flex flex-col gap-2 p-6 border-r h-screen w-56 bg-gray-50 shadow-md">
  <nav className="flex flex-col gap-2 text-gray-700 font-medium">
    <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition duration-200 ">
    Dashboard
  </div>
    <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition duration-200">
      Add Course
    </div>
    <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition duration-200">
      My Courses
    </div>
    <div className="px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-100 hover:text-blue-700 transition duration-200">
      Student Enrolled
    </div>
  </nav>
</div>
  )
}

export default Sidebar
