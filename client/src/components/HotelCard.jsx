import React from 'react'
import { Link } from 'react-router-dom'
import { assets, facilityIcons } from '../assets/assets'

const HotelCard = ({ room, index }) => {
    if (!room) return null;

    return (
        <Link
            to={'/rooms/' + room._id}
            onClick={() => scrollTo(0, 0)}
            className="group bg-white border border-gray-200 rounded-2xl overflow-hidden hover:border-gray-300 transition-all duration-300"
        >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
                <img
                    src={room.images[0]}
                    alt={room.roomType}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Best Seller badge */}
                {index % 2 === 0 && (
                    <div className="absolute top-3 left-3 bg-white text-gray-800 text-xs font-medium px-3 py-1 rounded-full border border-gray-200">
                        🏆 Best Seller
                    </div>
                )}

                {/* Wishlist */}
                <button className="absolute top-3 right-3 bg-white rounded-full w-8 h-8 flex items-center justify-center border border-gray-200 hover:scale-110 transition-transform">
                    <img src={assets.heartIcon} alt="save" className="w-4 h-4" />
                </button>

                {/* Rating badge */}
                <div className="absolute bottom-3 left-3 bg-black/55 text-white text-xs px-3 py-1 rounded-full flex items-center gap-1">
                    <img src={assets.starIconFilled} alt="star" className="w-3 h-3" />
                    <span>4.8 · 124 reviews</span>
                </div>
            </div>

            {/* Content */}
            <div className="p-4">
                {/* Title + Price */}
                <div className="flex justify-between items-start gap-2">
                    <div>
                        <p className="font-medium text-gray-900 text-[15px]">{room.hotel.name}</p>
                        <p className="text-gray-500 text-[13px] flex items-center gap-1 mt-0.5">
                            <img src={assets.locationIcon} alt="location" className="w-3.5 h-3.5" />
                            {room.hotel.city}
                        </p>
                    </div>
                    <div className="text-right shrink-0">
                        <p className="font-medium text-gray-900">${room.pricePerNight}</p>
                        <p className="text-gray-400 text-xs">/ night</p>
                    </div>
                </div>

                {/* Amenity tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                    {room.amenities.slice(0, 3).map((amenity, i) => (
                        <span
                            key={i}
                            className="flex items-center gap-1 text-[11px] bg-gray-100 text-gray-500 px-2.5 py-1 rounded-full border border-gray-200"
                        >
                            <img src={facilityIcons[amenity]} alt={amenity} className="w-3.5 h-3.5 opacity-70" />
                            {amenity}
                        </span>
                    ))}
                </div>

                {/* Footer */}
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400">{room.roomType}</span>
                    <span className="text-[13px] bg-black text-white px-4 py-1.5 rounded-full">
                        Book now
                    </span>
                </div>
            </div>
        </Link>
    )
}

export default HotelCard