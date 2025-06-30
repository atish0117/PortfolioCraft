import express from "express";
import { updateProfile,updateSectionSettings  } from "../controllers/profileController.js";
import { addTestimonial, deleteTestimonial } from "../controllers/profileController.js";
import { addCertification, deleteCertification } from "../controllers/profileController.js";
import {
  updateWorkExperience,
  addExperienceDetail,
  removeExperienceDetail,
} from "../controllers/experienceController.js";

import {
  addEducation,
   updateEducation,
  removeEducation,
} from "../controllers/educationController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.put("/", protect, updateProfile);

router.put("/section-settings", protect, updateSectionSettings);
router.post("/testimonial", protect, addTestimonial);
router.delete("/testimonial/:index", protect, deleteTestimonial);
router.post("/certification", protect, addCertification);
router.delete("/certification/:index", protect, deleteCertification);

// PATCH: Update work experience string (e.g., "2 years")
router.put("/work-experience", protect, updateWorkExperience);

// POST: Add new experience detail
router.post("/experience-details", protect, addExperienceDetail);

// DELETE: Remove a specific experience detail by _id
router.delete("/experience-details/:detailId", protect, removeExperienceDetail);

// Education routes
router.post("/education", protect, addEducation);
//  Update
router.put("/education/:eduId", protect, updateEducation);   
router.delete("/education/:eduId", protect, removeEducation);

export default router;
