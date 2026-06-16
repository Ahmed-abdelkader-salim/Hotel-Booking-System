import React from 'react'
import { assets } from '../assets/assets'

const StarRating = ({rating=4}) => {
  return (
    <div className="flex items-center gap-1">
                {Array.from({ length: rating }).map((_, i) => (
                    <img key={i} src={assets.starIconFilled} alt="star" className="w-4 h-4" />
                ))}
                {Array.from({ length: 5 - rating }).map((_, i) => (
                    <img key={i} src={assets.starIconOutlined} alt="star" className="w-4 h-4" />
                ))}
    </div>
  )
}

export default StarRating
