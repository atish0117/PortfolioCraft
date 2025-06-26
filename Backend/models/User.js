import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    profileImgUrl: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    title: String,
    bio: String,
    socialLinks: Object,
    skills: [String],
    sectionOrder: {
  type: [String],
  default: ["hero", "skills", "projects", "education", "experience", "certifications", "testimonials", "contact"]
},
visibleSections: {
  type: Object,
  default: {
    hero: true,
    skills: true,
    projects: true,
    education: true,
    experience: true,
    certifications: true,
    testimonials: true,
    contact: true
  }
},
    testimonials: [
  {
    name: String,
    designation: String,
    message: String,
    imageUrl: String
  }
],
    certifications: Array,
    selectedTemplate: { type: String, default: "minimal" },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
