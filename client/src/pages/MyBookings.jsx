import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import useBookings from '../hooks/useBookings'
import axios from 'axios'
import toast from 'react-hot-toast'
import { useAppContext } from '../context/AppContext'

const MyBookings = () => {
    const { bookings, currency, loading, fetchBookings } = useBookings();
    const {getToken} = useAppContext()
    const [searchParams, setSearchParams] = useSearchParams();
    const [loadingId, setLoadingId] = useState(null); // ✅ هنا مش جوه الـ function

    useEffect(() => {
        const payment = searchParams.get("payment");
        const bookingId = searchParams.get("bookingId");

        if (payment === "success") {
            toast.success("Payment successful! Booking confirmed.");
            fetchBookings();
            setSearchParams({});
        }
        if (payment === "cancel" && bookingId) {
            axios.post("/api/bookings/cancel-payment", { bookingId })
                .catch(console.error);
            toast.error("Payment cancelled.");
            setSearchParams({});
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // ✅ مش بتاخد setLoadingId كـ parameter
    const handlePayment = async (bookingId) => {
        if (loadingId) return; // ✅ حماية double click
        setLoadingId(bookingId);
        try {
            const { data } = await axios.post(
                "/api/bookings/stripe-payment",
                { bookingId },
                { headers: { Authorization:`Bearer ${await getToken()}`}}
            );
            if (data.success) {
                window.location.href = data.session_url; // ✅ روح لـ Stripe
            } else {
                toast.error(data.message);
                setLoadingId(null);
            }
        } catch (err) {
            console.log(err.message)
            toast.error("Something went wrong");
            setLoadingId(null);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <p className="text-gray-400">Loading...</p>
        </div>
    );

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
                    const isThisLoading = loadingId === booking._id;

                    return (
                        <div key={booking._id} className="flex flex-col md:flex-row gap-4 bg-white border border-gray-200 rounded-2xl overflow-hidden">

                            <img
                                src={booking.room.images[0]}
                                alt={booking.room.roomType}
                                className="w-full md:w-48 h-48 md:h-auto object-cover shrink-0"
                            />

                            <div className="flex flex-col md:flex-row flex-1 justify-between gap-4 p-5">
                                <div className="flex flex-col gap-1.5">
                                    <h2 className="text-lg font-medium text-gray-900">
                                        {booking.hotel.name}
                                        <span className="text-sm font-normal text-gray-400 ml-2">
                                            ({booking.room.roomType})
                                        </span>
                                    </h2>
                                    <p className="text-sm text-gray-500 flex items-center gap-1">
                                        <img src={assets.locationIcon} alt="location" className="w-4 h-4" />
                                        {booking.hotel.address}
                                    </p>

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

                                    <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                                        <img src={assets.guestsIcon} alt="guests" className="w-4 h-4" />
                                        <span>{booking.guests} Guest{booking.guests > 1 ? 's' : ''}</span>
                                    </div>
                                </div>

                                <div className="flex md:flex-col items-start md:items-end justify-between gap-3 shrink-0">
                                    <div className="text-right">
                                        <p className="text-xl font-medium text-gray-900">{currency}{booking.totalPrice}</p>
                                        <p className="text-xs text-gray-400">Total Price</p>
                                    </div>

                                    <div className="flex flex-col items-end gap-2">
                                        <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                            booking.isPaid
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-500'
                                        }`}>
                                            {booking.isPaid ? 'Paid' : 'Unpaid'}
                                        </span>

                                        {!booking.isPaid && (
                                            <button
                                                onClick={() => handlePayment(booking._id)} // ✅ بس الـ id
                                                disabled={isThisLoading || !!loadingId}
                                                className="text-xs font-medium px-4 py-1.5 border border-gray-400 rounded-full hover:bg-gray-50 active:scale-95 transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                                            >
                                                {isThisLoading ? "Processing..." : "Pay Now"}
                                            </button>
                                        )}

                                        {booking.isPaid && (
                                            <span className={`text-xs font-medium px-3 py-1 rounded-full ${
                                                booking.status === 'confirmed'
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : booking.status === 'cancelled'
                                                        ? 'bg-gray-100 text-gray-500'
                                                        : 'bg-orange-100 text-orange-500'
                                            }`}>
                                                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                                            </span>
                                        )}

                                        {booking.isPaid && (
                                            <p className="text-xs text-gray-400">{booking.paymentMethod}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default MyBookings;