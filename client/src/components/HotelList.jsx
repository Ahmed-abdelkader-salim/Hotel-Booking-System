import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import useRooms from '../hooks/useRooms';
const HotelList = () => {
    const navigate = useNavigate();
    const {rooms} = useRooms();
  return (
    <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
      {/* Header */}
        <Title
        title="Featured Hotels"
        subTitle="Discover our handpicked selection of the world's finest hotels and resorts."
        />

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {rooms.slice(0, 4).map((room, index) => (
          <HotelCard room={room} key={room._id} index={index} />
        ))}
      </div>

      <button className='mt-12 px-6 py-2.5 text-sm font-medium border border-gray-300
      rounded bg-white hover:bg-gray-50 transition-all cursor-pointer' 
      onClick={() => { navigate('/rooms'); scrollTo(0,0)}}>
        View All Destinations
      </button>
    </div>
  )
}

export default HotelList