import express from "express";
import clerkWebhooks from "../controllers/clerkWebhooks.js";

const clerkRoutes = express.Router();



clerkRoutes.post("/", clerkWebhooks);



export default clerkRoutes;