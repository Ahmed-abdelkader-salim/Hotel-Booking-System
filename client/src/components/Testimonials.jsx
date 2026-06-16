import React from 'react'
import Title from './Title'
import TestimonialsList from './TestimonialsList'

const Testimonials = () => {
  return (
    <div className='flex flex-col items-center bg-slate-50 px-6 md:px-16 lg:px-24 xl:px-32 pt-20 pb-30 bg-'>
      {/* text */}
         
      <Title
        title="What Our Guests Say"
        align="center"
        subTitle="Trusted by thousands of travelers worldwide — here's what they love about QuickStay."
      />


      {/* card list */}
      <TestimonialsList/>

    </div>
  )
}

export default Testimonials
