// server.js

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


app.get('/api/test', (req, res) => {
    res.json({ 
        success: true, 
        env: {
            hasMongoUri: !!process.env.MONGO_URI,
            hasClerkKey: !!process.env.CLERK_SECRET_KEY,
            hasCloudName: !!process.env.CLOUDINARY_CLOUD_NAME,
            nodeEnv: process.env.NODE_ENV
        }
    });
});

connectDB();
connectCloudinary();

app.use(cors({
    origin: "https://hotel-booking-system-ahbj-k5httu8ea.vercel.app/",
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

app.use(clerkMiddleware());
app.use(express.json());

// Routes
app.use("/api/clerk/webhooks", clerkRoutes);
app.use("/api/user", userRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomRoutes);
app.use("/api/bookings", bookingRoutes);
app.get('/', (req, res) => res.send('api is working success'));

app.use((err, req, res, next) => {
    console.error("=== GLOBAL ERROR ===");
    console.error("Message:", err.message);
    console.error("Stack:", err.stack);
    console.error("====================");
    res.status(500).json({
        success: false,
        message: err.message,
        stack: process.env.NODE_ENV === 'production' ? null : err.stack
    });
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err.message);
    console.error(err.stack);
});

if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

export default app;