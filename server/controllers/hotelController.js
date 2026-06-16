import Hotel from '../models/Hotel.js';
import User from '../models/User.js';


export const registerHotel = async (req, res) => {
    try {
        const { name, address, contact, city } = req.body;
        const owner = req.user._id;
        // check if user is already registered hotel
        const existingHotel = await Hotel.findOne({ owner });
        if (existingHotel) {
            return res.status(400).json({ success: false, message: 'hotel already registered' });
        }

        await Hotel.create({ name, address, contact, city, owner });
        await User.findByIdAndUpdate(owner, {role:"hotelOwner"});

        res.status(201).json({success: true, message: 'hotel registered successfully' });

    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}