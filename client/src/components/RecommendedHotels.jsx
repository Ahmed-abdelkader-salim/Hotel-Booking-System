import React from 'react'
import HotelCard from './HotelCard'
import Title from './Title'
import { useNavigate } from 'react-router-dom'
import useRooms from '../hooks/useRooms';
import { useAppContext } from '../context/AppContext';
const RecommendedHotels = () => {
    const navigate = useNavigate();
    const { rooms } = useRooms();
    const {searchedCities} = useAppContext();
    const recommended = searchedCities.length > 0
        ? rooms.filter(room => searchedCities.includes(room.hotel.city)).slice(0, 4)
        : rooms.slice(0, 4);

   
    return (
        <div className="flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-50 py-20">
            {/* Header */}
            <Title
                title="Recommended Hotels"
                subTitle="Discover our handpicked selection of the world's finest hotels and resorts."
            />

            {/* Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {recommended.slice(0, 4).map((room, index) => (
                    <HotelCard room={room} key={room._id} index={index} />
                ))}
            </div>
                

            {recommended.length === 0 && (
                <p className="text-gray-400 text-sm mt-6">No recommendations yet.</p>
            )}
            <button className='mt-12 px-6 py-2.5 text-sm font-medium border border-gray-300
            rounded bg-white hover:bg-gray-50 transition-all cursor-pointer'
                onClick={() => { navigate('/rooms'); scrollTo(0, 0) }}>
                View All Destinations
            </button>
        </div>
    )
}

export default RecommendedHotels