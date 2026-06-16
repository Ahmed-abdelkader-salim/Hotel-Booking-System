import Hotel from "../models/Hotel.js";
import Room from "../models/Room.js";
import {cloudinary} from "../config/cloudinary.js";
import upload from "../middleware/uploadMiddleware.js";
// Create a new room for a hotel
export const createRoom = async (req, res) => {
    try {
        const {hotel, roomType, pricePerNight, amenities} = req.body;
        // check if hotel exists
        const existingHotel = await Hotel.findOne({owner:req.user._id});
        if(!existingHotel){
            return res.status(404).json({success:false, message:"Hotel not found"});
        }


        // Upload Images to Cloudinary
        const uploadImages = req.files.map(async(file) => {
            const response = await cloudinary.uploader.upload(file.path, {folder:"hotelBooking/rooms"});
            return response.secure_url;

        })

        // await all images to be uploaded
        const images = await Promise.all(uploadImages);

        await Room.create({
            hotel:existingHotel._id,
            roomType,
            pricePerNight: +pricePerNight,
            amenities: JSON.parse(amenities),
            images
        });
        res.status(201).json({success:true, message:"Room created successfully"});
    } catch (error) {
        res.status(500).json({success:false, message:error.message});
    }
}



// api to get all rooms
export const getAllRooms = async(req, res) => {
    try {
        const rooms = await Room.find({isAvailable:true}).populate({
            path:'hotel',
            populate:{
                path:'owner',
                select:'image'
            }
        }).sort({createdAt:-1});

        res.status(200).json({success:true, rooms})
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
}

//get room by id
export const getRoomById = async(req, res) => {
    try {
        const {id} = req.params;
        const room = await Room.findById(id).populate({
            path: 'hotel',
            populate: { path: 'owner', select: 'image' }
        });
        if (!room) return res.status(404).json({ success: false, message: "Room not found" });
        res.json({ success: true, room });
    } catch (error) {
        res.status(500).json({success:false, message:error.message})
    }
} 


// api to get all rooms specific hotel
export const getOwnerRooms = async(req, res) => {
    try {
        const hotelData = await Hotel.findOne({owner:req.user._id});
        if (!hotelData) {
            return res.status(404).json({ success: false, message: "Hotel not found" });
        }
        const rooms = await Room.find({hotel:hotelData._id}).populate("hotel");

        res.status(200).json({success:true, rooms})
    } catch (error) {
        res.status(500).json({success:false, messafe:error.message})
    }
}

// api to toggle availability of a room
export const toggleRoomAvailability = async(req, res) => {
    try {
        const {roomId} = req.body;
        const roomData = await Room.findById(roomId);
        roomData.isAvailable = !roomData.isAvailable;
        await roomData.save();
        res.status(200).json({success:true, message:"Room availability updated"})
    } catch (error) {
        res.status(500).json({success:false, messafe:error.message})   
    }
}

