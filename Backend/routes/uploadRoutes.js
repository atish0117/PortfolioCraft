import express from "express";
import { uploadResume, uploadProfileImage } from "../controllers/uploadController.js";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/multer.js"; // ✅ new multer middleware

const router = express.Router();

// Use upload.single for one file
router.post("/resume", protect, upload.single("resume"), uploadResume);
router.post("/profile-image", protect, upload.single("image"), uploadProfileImage);

export default router;
