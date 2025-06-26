import express from "express";
import { updateProfile,updateSectionSettings  } from "../controllers/profileController.js";
import { addTestimonial, deleteTestimonial } from "../controllers/profileController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/", protect, updateProfile);

router.put("/section-settings", protect, updateSectionSettings);
router.post("/testimonial", protect, addTestimonial);
router.delete("/testimonial/:index", protect, deleteTestimonial);

export default router;
