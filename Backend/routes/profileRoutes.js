import express from "express";
import { updateProfile,updateSectionSettings  } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/", protect, updateProfile);

router.put("/section-settings", protect, updateSectionSettings);

export default router;
