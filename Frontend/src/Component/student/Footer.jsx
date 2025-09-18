import React from 'react'
import { assets } from '../Assets/assets'

const Footer = () => {
  return (
   <footer className='bg-gray-900 md:px-36 text-left w-full mt-10'>
    <div className='flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30 '>

      {/*Column 1 */}
          <div className='flex flex-col md:items-start items-center w-full '>
              <img src={assets.logo_dark} alt="" className='h-6 ' />
              <p className='mt-6 text-center md:text-left text-sm text-white/80'>
                Empower your future with our expert-led courses. Join us today and start learning!
              </p>
          </div>
                {/*Column 2 */}
        <div className='text-white/80 flex flex-col md:items-start items-center w-full '>
          <h2 className='font-semibold text-white mb-5'>Company</h2>
          <ul className='flex md:flex-col w-full justify-between text-sm text-white/8- md:space-y-2 '>
            <li>Home</li>
            <li>About Us</li>
            <li>Contact Us</li>
            <li>Privacy Policy</li>
          </ul>
        </div>
              {/*Column 3 */}
      <div className='hidden md:flex flex-col md:text-sm text-white/60'>
        <h3 className='font-semibold text-white mb-5 '> Subscribe to our newsletter</h3>
        <p className='text-sm text-white/80'>
          The latest news,articles and resources, send to your inbox weekly
        </p>
        <div className='flex space-x-2 mt-4'>
          <input type="email" className=' border border-gray-500/30 bg-gray-800 text-gray-500 placeholder-gray-500 outline-none w-64 h-9 rounded px-2 tetx-sm' placeholder='Enter your  email' />
          <button className='bg-blue-600 text-white hover:bg-blue-700 hover:text-white px-6 py-2 rounded-md'>Subscribe</button>
        </div>
      </div>
    </div>
    <p className='py-4 text-centertext-xs md:text-sm text-white/60'>© 2025 Your Company. All rights reserved.</p>
   </footer>
  )
}

export default Footer
