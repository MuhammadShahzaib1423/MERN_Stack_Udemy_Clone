import React from 'react'
import Hero from '../../Component/student/Hero'
import Companies from '../../Component/student/Companies'
import CoursesSection from '../../Component/student/CoursesSection'
import TestimonialSection from '../../Component/student/TestimonialSection'
import CallToAction from '../../Component/student/CallToAction'
import Footer from '../../Component/student/Footer'

const Home = () => {
  return (
    <div className='flex  flex-col items-center space-y-7 text-denter'>
  <Hero />  
  <Companies />
  <CoursesSection />
  <TestimonialSection />
  <CallToAction />
  <Footer />
    </div>
  )
}

export default Home
