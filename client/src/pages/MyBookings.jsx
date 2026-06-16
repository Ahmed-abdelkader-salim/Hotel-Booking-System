import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import useBookings from '../hooks/useBookings'

const MyBookings = () => {

    const { bookings, currency, loading } = useBookings();



    if (loading) return <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading...</p>
    </div>
    return (
        <div className="px-6 md:px-16 lg:px-24 xl:px-32 pt-28 pb-20 min-h-screen">

            <Title
                title="My Bookings"
                subTitle="View and manage all your hotel reservations in one place."
                align="left"
            />

            <div className="mt-12 flex flex-col gap-6">
                {bookings.map((booking) => {
                    const checkIn = new Date(booking.checkInDate).toDateString().slice(4);
                    const checkOut = new Date(booking.checkOutDate).toDateString().slice(4);

                    return (
                        <div key={booking._id} className="flex flex-col md:flex-row gap-4 bg-white border border-gray-200 rounded-2xl overflow-hidden">

                            {/* Room Image */}
                            <img
                                src={booking.room.images[0]}
                                alt={booking.room.roomType}
                                className="w-full md:w-48 h-48 md:h-auto object-cover shrink-0"
                            />

                            {/* Booking Info */}
                            <div className="flex flex-col md:flex-row flex-1 justify-between gap-4 p-5">

                                <div className="flex flex-col gap-1.5">
                                    <h2 className="text-lg font-medium text-gray-900">{booking.hotel.name}
                                        <span className="text-sm font-normal text-gray-400 ml-2">({booking.room.roomType})</span>
                                    </h2>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                                        {booking.hotel.address}
                                    </p>

                                    {/* Dates */}
                                    <div className="flex items-center gap-3 mt-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-1.5">
                                            <img src={assets.calenderIcon} alt="check-in" className="w-4 h-4" />
                                            <span>{checkIn}</span>
                                        </div>
                                        <span className="text-gray-300">→</span>
                                        <div className="flex items-center gap-1.5">
                                            <img src={assets.calenderIcon} alt="check-out" className="w-4 h-4" />
                                            <span>{checkOut}</span>
                                        </div>
                                    </div>

                                    {/* Guests */}
                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                                        <img src={assets.guestsIcon} alt="guests" className="w-4 h-4" />
                                        <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                                    </div>
                                </div>

                                {/* Right side: price + status */}
                                <div className="flex md:flex-col items-start md:items-end justify-between gap-3 shrink-0">
                                    <div className="text-right">
                                        <p className="text-xl font-medium text-gray-900">{currency}{booking.totalPrice}</p>
                                        <p className="text-xs text-gray-400">Total Price</p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        {/* Payment status */}
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${booking.isPaid
                                            ? 'bg-green-100 text-green-700'
                                            : 'bg-red-100 text-red-500'
                                            }`}>
                                            {booking.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                        {/* Pay Now button */}
                                        {!booking.isPaid && (
                                            <button className="text-xs font-medium px-4 py-1.5 border border-gray-400 rounded-full hover:bg-gray-50 active:scale-95 transition-all cursor-pointer">
                                                Pay Now
                                            </button>
                                        )}
                                        {booking.isPaid && (
                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${booking.status === 'confirmed'
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : booking.status === 'cancelled'
                                                        ? 'bg-gray-100 text-gray-500'
                                                        : 'bg-orange-100 text-orange-500'
                                                }`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        )}

                                        {/* Payment method */}
                                        {
                                            booking.isPaid && (
                                                <p className="text-xs text-gray-400">{booking.paymentMethod}</p>
                                            )
                                        }
                                    </div>
                                </div>

                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default MyBookings