import express from "express";
import {
  createProject,
  getMyProjects,
  updateProject,
  deleteProject
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);         // Add new project
router.get("/", protect, getMyProjects);          // Get all my projects
router.put("/:id", protect, updateProject);       // Update project
router.delete("/:id", protect, deleteProject);    // Delete project

export default router;
