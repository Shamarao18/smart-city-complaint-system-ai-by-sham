
import express from "express";
import { createComplaint } from "../controllers/complaintController.js";
import upload from "../middleware/upload.js";
import { protectRoute } from "../middleware/auth.js"; // if you have auth

const router = express.Router();

// Image upload now handled by multer
router.post("/", protectRoute, upload.single("image"), createComplaint);

export default router;