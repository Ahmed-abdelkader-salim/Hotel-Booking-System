import express from "express";
import { checkAvailabilityApi, createBooking, getHotelBookings, getUserBookings } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";




const bookingRouter = express.Router();
bookingRouter.get("/hotel", protect, getHotelBookings);
bookingRouter.get("/user", protect, getUserBookings);

bookingRouter.post("/check-availability", checkAvailabilityApi);

bookingRouter.post("/book", protect, createBooking);



export default bookingRouter;