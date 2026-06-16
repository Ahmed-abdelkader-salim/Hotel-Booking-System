import React from 'react'
import Title from '../../components/Title'
import { assets, facilityIcons } from '../../assets/assets'
import useGetAllRooms from '../../hooks/useGetAllRooms'
import { useAppContext } from '../../context/AppContext'

const ListRoom = () => {
    const { fetchRooms, rooms, loading } = useGetAllRooms();
    const {axios, getToken} = useAppContext();

    const toggleAvailability = async(id) => {
        try {
            const {data} = await axios.post('/api/rooms/toggle-availability', {roomId:id},{
                headers:{Authorization:`Bearer ${await getToken()}`}
            })
            
            if(data?.success){
                fetchRooms();
            }
        } catch (error) {
            console.error(error.message)
        }
    }

    if (loading) {
        return <div className="flex items-center justify-center h-[80vh]">
            <p>Loading...</p>
        </div>
    }

    return (
        <div className="px-6 md:px-10 pb-20">

            <Title title="Room List" align="left" font="outfit" subTitle="" />

            <div className="mt-8 bg-white border border-gray-200 rounded-2xl overflow-hidden">

                {/* Header */}
                <div className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-3 bg-gray-50 border-b border-gray-100 text-xs font-medium text-gray-400 uppercase tracking-wide">
                    <span>Room</span>
                    <span>Type</span>
                    <span>Price</span>
                    <span>Amenities</span>
                    <span className="text-center">Available</span>
                </div>

                {/* Rows */}
                {rooms.map((room) => (
                    <div key={room._id}
                        className="grid grid-cols-[2fr_1fr_1fr_1fr_1fr] gap-4 px-5 py-4 border-b border-gray-50 hover:bg-gray-50/60 transition-all items-center last:border-0">

                        {/* Image + Hotel */}
                        <div className="flex items-center gap-3 min-w-0">
                            <img
                                src={room.images[0]}
                                alt={room.roomType}
                                className="w-14 h-14 rounded-xl object-cover shrink-0"
                            />
                            <div className="min-w-0">
                                <p className="text-sm font-medium text-gray-800 truncate">{room.hotel.name}</p>
                                <p className="text-xs text-gray-400 truncate flex items-center gap-1">
                                    <img src={assets.locationIcon} alt="location" className="w-3 h-3" />
                                    {room.hotel.city}
                                </p>
                            </div>
                        </div>

                        {/* Type */}
                        <p className="text-sm text-gray-600">{room.roomType}</p>

                        {/* Price */}
                        <p className="text-sm font-medium text-gray-800">${room.pricePerNight}<span className="text-xs text-gray-400 font-normal">/night</span></p>

                        {/* Amenities */}
                        <div className="flex flex-wrap gap-1">
                            {room.amenities.slice(0, 2).map((amenity, i) => (
                                <span key={i} className="flex items-center gap-1 text-[11px] bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full border border-gray-200">
                                    <img src={facilityIcons[amenity]} alt={amenity} className="w-3 h-3 opacity-70" />
                                    {amenity}
                                </span>
                            ))}
                            {room.amenities.length > 2 && (
                                <span className="text-[11px] text-gray-400 px-2 py-0.5 bg-gray-100 rounded-full border border-gray-200">
                                    +{room.amenities.length - 2}
                                </span>
                            )}
                        </div>

                        {/* Toggle */}
                        <div className="flex justify-center">
                            <button
                                onClick={() => toggleAvailability(room._id)}
                                className={`relative w-11 h-6 rounded-full transition-all duration-300 focus:outline-none ${room.isAvailable ? 'bg-blue-500' : 'bg-gray-200'
                                    }`}
                            >
                                <span className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full shadow transition-all duration-300 ${room.isAvailable ? 'translate-x-5' : 'translate-x-0'
                                    }`} />
                            </button>
                        </div>

                    </div>
                ))}

                {rooms.length === 0 && (
                    <div className="text-center py-16 text-gray-400 text-sm">
                        No rooms added yet.
                    </div>
                )}
            </div>

            <p className="text-xs text-gray-400 mt-4">{rooms.length} room{rooms.length !== 1 ? 's' : ''} total</p>

        </div>
    )
}

export default ListRoom