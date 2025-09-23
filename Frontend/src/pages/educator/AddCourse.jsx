import React from 'react'

const AddCourse = () => {
  return (
    <div>
    <form action="">

            <div className='flex flex-col gap-2'>
                <label >Course Title</label>
                <input type="text" placeholder='Type here ' />
            </div>
            <div className='flex flex-col gap-2'>
                <label >Course Heading</label>
                <input type="text" placeholder='Type here  ' className='border p-2 rounded-md w-48' />
            </div>

            <div className='flex flex-col gap-2'>
                <label >Course Description</label>
                <input type="text" placeholder='Type here ' className='border p-2 rounded-md w-48 ' />
            </div>
            <div className='flex flex-col gap-2'>
                <label >Course Price</label>
                <input type="text" placeholder='Type here ' className='border p-2 rounded-md w-48' />
            </div>
            <div className='flex flex-col gap-2'>
                <label >Course Thumbnail</label>
                <input type="file" accept="image/*" className='border p-2 rounded-md w-48' />
            </div>

        </form>
    </div>
  )
}

export default AddCourse
