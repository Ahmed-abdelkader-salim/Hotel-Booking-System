import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { assets, facilityIcons, roomCommonData } from '../assets/assets';
import StarRating from '../components/StarRating';
import { useAppContext } from '../context/AppContext';
import { toast } from 'react-hot-toast';

const RoomDetails = () => {
    const { axios, getToken, user, navigate } = useAppContext();
    const { id } = useParams();
    const [mainImage, setMainImage] = useState(null);
    const [room, setRoom] = useState(null);
    const [loading, setLoading] = useState(true);
    const [checkIn, setCheckIn] = useState('');
    const [checkOut, setCheckOut] = useState('');
    const [guests, setGuests] = useState(1);
    const [isAvailable, setIsAvailable] = useState(false);

    useEffect(() => {
        const fetchRoom = async () => {
            try {
                const { data } = await axios.get(`/api/rooms/${id}`);
                if (data.success) {
                    setRoom(data.room);
                    setMainImage(data.room.images[0]);
                }
            } catch (error) {
                console.error(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchRoom();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!user) {
            toast.error('Please login to book a room');
            return navigate('/login');
        }

        // check is checkIn Date is grater than checkOutDate

        if (checkIn >= checkOut) {
            toast.error("Check-in Date should be less than checkOut Date")
            return
        }

        if (!isAvailable) {
            // check availability first
            try {
                const { data } = await axios.post('/api/bookings/check-availability', {
                    room: id,
                    checkInDate: checkIn,
                    checkOutDate: checkOut
                });
                if (data.isAvailable) {
                    setIsAvailable(true);
                    toast.success('Room is available!');
                } else {
                    toast.error('Room is not available for selected dates');
                }
            } catch (error) {
                toast.error(error.message);
            }
            return;
        }

        // book room
        try {
            const { data } = await axios.post('/api/bookings/book', {
                room: id,
                checkInDate: checkIn,
                checkOutDate: checkOut,
                guests
            }, {
                headers: { Authorization: `Bearer ${await getToken()}` }
            });

            if (data.success) {
                toast.success('Booking created successfully!');
                navigate('/my-bookings');
            } else {
                toast.error(data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    }

    // reset availability when dates change
    useEffect(() => {
        setIsAvailable(false);
    }, [checkIn, checkOut]);

    if (loading) return <div className="flex items-center justify-center min-h-screen">
        <p className="text-gray-400">Loading...</p>
    </div>

    return room && (
        <div className='py-28 md:py-35 px-4 md:px-16 lg:px-24 xl:px-32'>

            {/* Room Details */}
            <div className="flex flex-col md:flex-row items-start md:items-center gap-2">
                <h1 className='font-playfair text-3xl md:text-4xl'>{room.hotel.name}
                    <span className='font-inter text-sm'>({room.roomType})</span>
                </h1>
                <p className='text-xs font-inter py-1.5 px-3 text-white bg-orange-500 rounded-full'>20% OFF</p>
            </div>

            {/* Room Rating */}
            <div className="flex gap-1 items-center mt-2">
                <StarRating />
                <p className='ml-2'>200+ Reviews</p>
            </div>

            {/* Room Address */}
            <div className="flex items-center gap-1 text-gray-500 mt-2">
                <img src={assets.locationIcon} alt="location" />
                <span>{room.hotel.address}</span>
            </div>

            {/* Room Images */}
            <div className="flex flex-col lg:flex-row mt-6 gap-6">
                <div className="lg:w-1/2 w-full">
                    <img src={mainImage} alt="roomImage" className='w-full rounded-xl shadow-lg object-cover' />
                </div>
                <div className="grid grid-cols-2 gap-4 lg:w-1/2 w-full">
                    {room?.images.length > 1 && room.images.map((image, index) => (
                        <img
                            className={`w-full rounded-xl shadow-md object-cover cursor-pointer 
                                ${mainImage === image && 'outline-3 outline-orange-500'}`}
                            onClick={() => setMainImage(image)} key={index} src={image} />
                    ))}
                </div>
            </div>

            {/* Room Highlights */}
            <div className="flex flex-col md:flex-row md:justify-between mt-10">
                <div className='flex flex-col'>
                    <h1 className='text-3xl md:text-4xl font-playfair'>Experience Luxury Like Never Before</h1>
                    <div className='flex flex-wrap items-center mt-3 mb-6 gap-4'>
                        {room.amenities.map((item, index) => (
                            <div key={index} className='flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100'>
                                <img src={facilityIcons[item]} alt={item} className='w-5 h-5' />
                                <p className='text-xs'>{item}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <p className='text-2xl font-medium'>${room.pricePerNight}/night</p>
            </div>

            {/* CheckIn CheckOut Form */}
            <form onSubmit={handleSubmit} className='flex flex-col md:flex-row items-start md:items-center
                justify-between bg-white shadow-[0px_0px_20px_rgba(0,0,0,0.15)] p-6 rounded-xl
                mx-auto mt-16 max-w-6xl'>
                <div className='flex flex-col flex-wrap md:flex-row items-start md:items-center gap-4 md:gap-10 text-gray-500'>
                    <div className="flex flex-col">
                        <label htmlFor="checkInDate" className='font-medium'>CheckIn</label>
                        <input onChange={(e) => setCheckIn(e.target.value)} value={checkIn}
                            min={new Date().toISOString().split('T')[0]} type="date" id="checkInDate"
                            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="checkOutDate" className='font-medium'>CheckOut</label>
                        <input onChange={(e) => setCheckOut(e.target.value)} value={checkOut}
                            min={checkIn} disabled={!checkIn} type="date" id="checkOutDate"
                            className='w-full rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                    <div className="flex flex-col">
                        <label htmlFor="guests" className='font-medium'>Guests</label>
                        <input onChange={(e) => setGuests(e.target.value)} value={guests}
                            type="number" min={1} id="guests"
                            className='max-w-20 rounded border border-gray-300 px-3 py-2 mt-1.5 outline-none' required />
                    </div>
                </div>
                <button type='submit' className='bg-primary hover:bg-primary-dull
                    active:scale-95 transition-all text-white rounded-md
                    max-md:w-full max-md:mt-6 md:px-25 py-3 md:py-4 text-base cursor-pointer'>
                    {isAvailable ? 'Book Now' : 'Check Availability'}
                </button>
            </form>

            {/* Common Specifications */}
            <div className='mt-25 space-y-4'>
                {roomCommonData.map((spec, index) => (
                    <div key={index} className="flex items-start gap-2">
                        <img src={spec.icon} alt="" className='w-6.5' />
                        <div>
                            <p className='text-base'>{spec.title}</p>
                            <p className='text-gray-500'>{spec.description}</p>
                        </div>
                    </div>
                ))}
            </div>

            <div className="max-w-3xl border-y border-gray-300 my-15 py-10 text-gray-500">
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Eius illum dolores doloribus, optio laudantium dolorem unde vitae odio
                    veniam veritatis odit velit hic commodi nobis.
                    Exercitationem necessitatibus quidem temporibus culpa!</p>
            </div>

            {/* Hosted by */}
            <div className="flex flex-col items-start gap-4">
                <div className="flex gap-4">
                    <img src={room.hotel.owner.image} alt="host" className='h-14 w-14 md:h-18 md:w-18 rounded-full' />
                    <div>
                        <p className='text-lg md:text-xl'>Hosted by {room.hotel.name}</p>
                        <div className="flex items-center mt-1">
                            <StarRating />
                            <p className='ml-2'>200+ Reviews</p>
                        </div>
                    </div>
                </div>
                <button className='px-6 py-2.5 mt-4 text-white rounded bg-primary hover:bg-primary-dull transition-all cursor-pointer'>
                    Contact Now
                </button>
            </div>

        </div>
    )
}

export default RoomDetails