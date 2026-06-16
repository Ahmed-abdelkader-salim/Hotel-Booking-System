import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { clerkMiddleware } from "@clerk/express";
import connectDB from "./config/db.js";
import cors from "cors";
import clerkRoutes from "./routes/clerkRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import connectCloudinary from "./config/cloudinary.js";
import roomRoutes from "./routes/roomRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";

const app = express();

connectDB();
connectCloudinary();

app.use(cors());



// Middleware
app.use(clerkMiddleware());
app.use(express.json());



// Routes
app.use("/api/clerk/webhooks", clerkRoutes);
app.use("/api/user",  userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.get('/', (req, res) => res.send('api is working success'));

const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})

