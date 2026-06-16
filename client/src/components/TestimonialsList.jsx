import React from 'react'
import { testimonials } from '../assets/assets'
import TestimonialsCard from './TestimonialsCard'

const TestimonialsList = () => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full mt-12'>
      {testimonials.map((item) => (
        <TestimonialsCard item={item} key={item._id}/>
      ))}
    </div>
  )
}

export default TestimonialsList
