import Project from "../models/Project.js";

// ➕ Create Project
export const createProject = async (req, res) => {
  try {
    const project = await Project.create({ ...req.body, userId: req.user._id });
    res.status(201).json({ msg: "Project created", project });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// 📄 Get All Projects by User
export const getMyProjects = async (req, res) => {
  try {
    const projects = await Project.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(projects);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✏️ Update Project
export const updateProject = async (req, res) => {
  try {
    const updated = await Project.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );
    if (!updated) return res.status(404).json({ msg: "Project not found" });
    res.json({ msg: "Updated", project: updated });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ❌ Delete Project
export const deleteProject = async (req, res) => {
  try {
    const deleted = await Project.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!deleted) return res.status(404).json({ msg: "Not found" });
    res.json({ msg: "Deleted" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};
