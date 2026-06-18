import express from "express";
import { checkAvailabilityApi, createBooking, getHotelBookings, getUserBookings, stripePayment, verifyPayment } from "../controllers/bookingController.js";
import { protect } from "../middleware/authMiddleware.js";




const bookingRouter = express.Router();
bookingRouter.get("/hotel", protect, getHotelBookings);
bookingRouter.get("/user", protect, getUserBookings);

bookingRouter.post("/check-availability", checkAvailabilityApi);

bookingRouter.post("/book", protect, createBooking);
bookingRouter.post("/stripe-payment", protect, stripePayment);
bookingRouter.get("/verify/:bookingId", protect, verifyPayment);


export default bookingRouter;