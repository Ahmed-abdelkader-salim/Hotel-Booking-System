import React from 'react'
import { assets } from '../assets/assets'

const TestimonialsCard = ({item}) => {
  return (
    <div  className="bg-white rounded-2xl p-6 border border-gray-200 flex flex-col gap-4">
            
            {/* User */}
            <div className="flex items-center gap-3">
              <img
                src={item.image}
                alt={item.name}
                className="w-10 h-10 rounded-full object-cover"
              />
              <div>
                <p className="text-sm font-medium text-gray-900">{item.name}</p>
                <p className="text-xs text-gray-400">{item.address}</p>
              </div>
            </div>
            {/* Stars */}
            <div className="flex items-center gap-1">
              {Array.from({ length: item.rating }).map((_, i) => (
                <img key={i} src={assets.starIconFilled} alt="star" className="w-4 h-4" />
              ))}
              {Array.from({ length: 5 - item.rating }).map((_, i) => (
                <img key={i} src={assets.starIconOutlined} alt="star" className="w-4 h-4" />
              ))}
            </div>

            {/* Review */}
            <p className="text-gray-600 text-sm leading-relaxed">{item.review}</p>


       

      
    </div>
  )
}

export default TestimonialsCard
