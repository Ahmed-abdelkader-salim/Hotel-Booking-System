import Booking from "../models/Booking.js";
import User from "../models/User.js";
import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import { sendBookingConfirmation } from "../utils/sendEmail.js";


// function to Check Availability of room
const checkAvailability = async ({ checkInDate, checkOutDate, room }) => {
    try {
        const bookings = await Booking.find({
            room,
            checkInDate: { $lte: checkOutDate },
            checkOutDate: { $gte: checkInDate }
        });
        const isAvailable = bookings.length === 0;
        return isAvailable;
    } catch (error) {
        conseole.error(error.message)
    }
}



// check availability api 
export const checkAvailabilityApi = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate } = req.body;
        const isAvailable = await checkAvailability({ checkInDate, checkOutDate, room });
        res.json({ success: true, isAvailable })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}


// api to create a new booking
export const createBooking = async (req, res) => {
    try {
        const { room, checkInDate, checkOutDate, guests } = req.body;
        const user = req.user._id;



        // before booking check availability

        const isAvailable = await checkAvailability({
            checkInDate,
            checkOutDate,
            room
        });
        if (!isAvailable) {
            return res.json({ success: false, message: "room is not available" })
        }

        // get total price from room
        const roomData = await Room.findById(room).populate("hotel");
        let totalPrice = roomData.pricePerNight;

        // calculate total price based on number of nights
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const timeDiff = checkOut.getTime() - checkIn.getTime();
        const nights = Math.ceil(timeDiff / (1000 * 3600 * 24));
        totalPrice *= nights;
        // create booking
        const booking = await Booking.create(
            {
                user,
                room,
                hotel: roomData.hotel._id,
                guests: +guests,
                checkInDate,
                checkOutDate,
                totalPrice,
            }



        );

        // populated before send email

        const populatedBooking = await Booking.findById(booking._id)
        .populate('user', 'userName email')
        .populate('hotel', 'name address')
        .populate('room', 'roomType')

        try {
        await sendBookingConfirmation(populatedBooking);
        } catch (emailError) {
            console.error('Email failed:', emailError.message);
        }
        res.json({ success: true, message: "booking created successfully" })
    } catch (error) {
        res.json({ success: false, message: error.message })
    }
}




// get all bookings of a user

export const getUserBookings = async (req, res) => {
    try {
        const user = req.user._id;
        const bookings = await Booking.find({user}).populate("room hotel").
        sort({ createdAt: -1 });
        res.json({ success: true, bookings });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
}


export const getHotelBookings = async (req, res) => {

    try{
        const hotel = await Hotel.findOne({ owner: req.user._id });
        if(!hotel){
            return res.json({success:false, message:"hotel not found"});
        }
        const bookings = await Booking.find({hotel:hotel._id}).populate("room hotel user").
        sort({createdAt:-1});

        // total bookings
        const totalBookings = bookings.length;

        // total revenue
        const totalRevenue = bookings.reduce((acc, booking) => acc + booking.totalPrice, 0);

        res.json({success:true, dashboardData:{totalBookings, totalRevenue, bookings}});

    }catch(error){
        res.json({success:false, message:error.message});
    }
}