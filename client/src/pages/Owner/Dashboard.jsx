import React from 'react'
import Title from '../../components/Title'
import { assets } from '../../assets/assets'
import useDashboard from '../../hooks/useDashboard';

const Dashboard = () => {
    // eslint-disable-next-line no-unused-vars
    const { dashboardData, loading, refetch, currency } = useDashboard();
    const {totalBookings, totalRevenue, bookings} = dashboardData;
    if(loading){
        return <div className="flex items-center justify-center h-[80vh]">
            <p>Loading...</p>
        </div>
    }

    return (
        <div className="px-6 md:px-10  ">

            <Title title="Dashboard" align="left" font="outfit" subTitle="" />

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">

                <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="p-3 bg-blue-50 rounded-xl">
                        <img src={assets.totalBookingIcon} alt="bookings" className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-2xl font-medium text-gray-900">{totalBookings}</p>
                        <p className="text-sm text-gray-400 mt-0.5">Total Bookings</p>
                    </div>
                </div>

                <div className="flex items-center gap-4 bg-white border border-gray-200 rounded-2xl p-5">
                    <div className="p-3 bg-green-50 rounded-xl">
                        <img src={assets.totalRevenueIcon} alt="revenue" className="w-7 h-7" />
                    </div>
                    <div>
                        <p className="text-2xl font-medium text-gray-900">{currency}{totalRevenue}</p>
                        <p className="text-sm text-gray-400 mt-0.5">Total Revenue</p>
                    </div>
                </div>

            </div>

            {/* Recent Bookings */}
            <div className="mt-12">
                <h2 className="text-lg font-medium text-gray-900 mb-5">Recent Bookings</h2>
                <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden">
                    <div className="overflow-auto max-h-100px">
                        <table className="w-full text-sm">
                        <thead className="sticky top-0 bg-white z-10">
                            <tr className="border-b border-gray-100 text-gray-400 text-left">
                                <th className="px-5 py-4 font-medium">Guest</th>
                                <th className="px-5 py-4 font-medium">Room</th>
                                <th className="px-5 py-4 font-medium max-sm:hidden">Check In</th>
                                <th className="px-5 py-4 font-medium max-sm:hidden">Check Out</th>
                                <th className="px-5 py-4 font-medium">Amount</th>
                                <th className="px-5 py-4 font-medium">Status</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                            bookings.length === 0 ? (
                                <tr>
                                    <td colSpan="6" className="text-center py-10 text-gray-500">
                                        No bookings found.
                                    </td>   
                                </tr>
                            ) : (
                                bookings.map((booking) => (
                                <tr key={booking._id} className="border-b border-gray-50 hover:bg-gray-50 transition-all">
                                        <td className="px-5 py-4">
                                            <div className="flex items-center gap-3">
                                            <img src={booking.user.image} alt={booking.user.username}
                                                className="w-8 h-8 rounded-full object-cover" />
                                            <span className="font-medium text-gray-800 max-sm:hidden">{booking.user.username}</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-gray-600">{booking.room.roomType}</td>
                                    <td className="px-5 py-4 text-gray-500 max-sm:hidden">
                                        {new Date(booking.checkInDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-5 py-4 text-gray-500 max-sm:hidden">
                                        {new Date(booking.checkOutDate).toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-5 py-4 font-medium text-gray-800">{currency}{booking.totalPrice}</td>
                                    <td className="px-5 py-4">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${booking.isPaid
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-500'
                                            }`}>
                                            {booking.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>
                                    </td>
                                </tr>
                            )))}
                        </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Dashboard