import mongoose from "mongoose";




const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    username: { type: String, required: true, unique: true, trim: true,index: true, },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
     // Profile Fields
    profileImgUrl: { type: String, default: "" },
    resumeUrl: { type: String, default: "" },
    title: String,
    bio: String,
     socialLinks: {
    github: String,
    linkedin: String,
    twitter: String,
  },
    skills: [String],
     workExperience: {
      type: String,
      default: "Fresher",
    },
      // Portfolio Sections
    experienceDetails: [
      {
        companyName: { type: String, required: true },
        jobTitle: { type: String, required: true },
        duration: { type: String, required: true },
        responsibilities: String,
        skills: [String],
      },
    ],
      education: [
      {
        institution: { type: String, required: true },
        degree: { type: String, required: true },
        startYear: String,
        endYear: String
      },
    ],
    sectionOrder: {
  type: [String],
  default: ["hero", "skills", "projects", "education", "experience", "certifications", "testimonials", "contact"]
},
visibleSections: {
  type: Map,
  of: Boolean,
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
    certifications: [
  {
    title: String,
    platform: String,
    certificateLink: String
  }
],
    selectedTemplate: { type: String, default: "minimal" },
  },
  { timestamps: true }
);

// 👇 OPTION 1: fullName + random 3-digit username generator
userSchema.pre("validate", async function (next) {
  if (!this.username || this.username.trim() === "") {
    const base = this.fullName.replace(/\s+/g, "").toLowerCase(); // Remove spaces, lowercase
    let candidate;
    let exists = true;

    while (exists) {
      const randomNum = Math.floor(100 + Math.random() * 900); // Random 3-digit number
      candidate = `${base}${randomNum}`;
      exists = await mongoose.models.User.exists({ username: candidate });
    }

    this.username = candidate;
  }
  next();
});

export default mongoose.model("User", userSchema);
