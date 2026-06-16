import express from "express";
import { getUserData, storeRecentSearchedCities } from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";


const router = express.Router();

router.get("/", protect, getUserData);
router.post("/recent-search-cities", protect, storeRecentSearchedCities);


export default router;