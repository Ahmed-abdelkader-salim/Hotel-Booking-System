import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { createRoom, getAllRooms, getOwnerRooms, toggleRoomAvailability, getRoomById } from "../controllers/roomController.js";
import upload from '../middleware/uploadMiddleware.js'



const roomRouter = express.Router();



roomRouter.get('/', getAllRooms);
// api route to create room
roomRouter.post('/', upload.array("images", 4), protect, createRoom);
roomRouter.get('/owner', protect, getOwnerRooms);
roomRouter.post('/toggle-availability', protect, toggleRoomAvailability);
roomRouter.get('/:id', getRoomById)




export default roomRouter;