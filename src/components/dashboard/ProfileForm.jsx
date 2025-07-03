import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfile,
  uploadProfileImage,
  uploadResume,
} from "../features/profile/profileSlice";
import SkillsSection from "../sections/SkillsSection";
// import { uploadProfileImage, uploadResume } from "../components/dashboard/uploadService";
const Dashboard = () => {
  const dispatch   = useDispatch();
  const { user, loading, resumeUrl, profileImgUrl } = useSelector((state) => state.profile);

  /* ---------------- Form state (prefilled) ---------------- */
  const [form, setForm] = useState({
    fullName: "",
    title: "",
    bio: "",
    skills: "",
      socialLinks: {
      github: "",
      linkedin: "",
      twitter: "",
    },
  });

  const [resumeFile, setResumeFile]       = useState(null);
  const [profileImgFile, setProfileImgFile] = useState(null);
  const [previewUrls, setPreviewUrls]     = useState({ resumeUrl: "", profileImgUrl: "" });

  

  /* Prefill whenever `user` changes */
  useEffect(() => {
    if (user) {
      setForm({
        fullName : user.fullName  || "",
        title    : user.title     || "",
        bio      : user.bio       || "",
        skills   : user.skills?.join(", ") || "",
         socialLinks: {
          github: user.socialLinks?.github || "",
          linkedin: user.socialLinks?.linkedin || "",
          twitter: user.socialLinks?.twitter || "",
        },
      });
        setPreviewUrls({
        resumeUrl: user.resumeUrl || "",
        profileImgUrl: user.profileImgUrl || "",
      });
    }
  }, [user]);

//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   let updatedData = { ...formData };

//   if (resumeFile) {
//     const resumeUrl = await uploadResume(resumeFile);
//     updatedData.resumeUrl = resumeUrl;
//   }

//   if (profileImgFile) {
//     const imgUrl = await uploadProfileImage(profileImgFile);
//     updatedData.profileImgUrl = imgUrl;
//   }

//   dispatch(updateProfile(updatedData));
// };

    const handleChange = (e) => {
    const { name, value } = e.target;
    if (["github", "linkedin", "twitter",].includes(name)) {
      setForm((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [name]: value,
        },
      }));
    } else {
      setForm((prev) => ({ ...prev, [name]: value }));
    }
  };


    /* ------ file inputs ------ */
  const handleResumeSelect = (e) => {
    const file = e.target.files[0];
    if (file) setResumeFile(file);
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImgFile(file);
      setPreviewUrls((p) => ({ ...p, profileImgUrl: URL.createObjectURL(file) }));
    }
  };

  /* ------ submit handler ------ */
  const handleSubmit = async (e) => {
    e.preventDefault();

    /* step‑1: upload files (if selected) */
    let resumeUrl = previewUrls.resumeUrl;
    let profileImgUrl = previewUrls.profileImgUrl;

    if (resumeFile)    resumeUrl = await dispatch(uploadResume(resumeFile)).unwrap();  
    if (profileImgFile)  profileImgUrl = await dispatch(uploadProfileImage(profileImgFile)).unwrap(); 

    /* step‑2: prepare payload */
    const skillsArr = form.skills
      .split(",")
      .map((s) => s.trim())
      .filter(Boolean);

    const payload = {
      fullName: form.fullName,
      title: form.title,
      bio: form.bio,
      skills: skillsArr,
      socialLinks: form.socialLinks,
      resumeUrl,
      profileImgUrl,
    };
    console.log("payload sent to updateProfile:", payload);

    /* step‑3: dispatch update */
    dispatch(updateProfile(payload));
  };

  /* ---------------- UI ---------------- */
 return (
    <div className="max-w-4xl mx-auto p-6 mt-10 bg-white shadow rounded-lg">
      <h1 className="text-3xl font-bold mb-6 text-center">Profile Settings</h1>

      {/* -------- Profile Form -------- */}
      <form onSubmit={handleSubmit} className="grid gap-4">
        <input
          name="fullName"
          value={form.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="p-2 border rounded"
        />
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Professional Title"
          className="p-2 border rounded"
        />
        <textarea
          name="bio"
          value={form.bio}
          onChange={handleChange}
          placeholder="Short Bio"
          rows={3}
          className="p-2 border rounded"
        />
        <input
          name="skills"
          value={form.skills}
          onChange={handleChange}
          placeholder="Skills (comma‑separated)"
          className="p-2 border rounded"
        />

        {/* Social Links */}
        <div>
          <label className="block font-medium">Social Links</label>
          {["github", "linkedin", "twitter", "portfolio"].map((field) => (
            <input
              key={field}
              name={field}
              value={form.socialLinks[field] || ""}
              onChange={handleChange}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="w-full border p-2 rounded mb-2"
            />
          ))}
        </div>

        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded"
        >
          {loading ? "Saving..." : "Save Changes"}
        </button>
      </form>

      {/* -------- File Uploads -------- */}
      <div className="grid md:grid-cols-2 gap-6 mt-8">
        {/* Resume */}
        <div>
          <label className="font-semibold block mb-1">Resume (PDF)</label>
          <input type="file" accept=".pdf" onChange={handleResumeSelect} />
          {previewUrls.resumeUrl && (
            <a
              href={previewUrls.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="block text-blue-600 underline mt-1"
            >
            View current resume
            </a>
          )}
        </div>

        {/* Profile Image */}
        <div>
          <label className="font-semibold block mb-1">Profile Image</label>
          <input type="file" accept="image/*" onChange={handleImageSelect} />
          {previewUrls.profileImgUrl && (
            <img
              src={previewUrls.profileImgUrl}
              alt="profile"
              className="w-24 h-24 rounded-full border mt-2 object-cover"
            />
          )}
        </div>
      </div>

      {/* -------- Live Preview -------- */}
      <div className="mt-10 border-t pt-8">
        <h2 className="text-xl font-bold mb-4">Live Skills Preview</h2>
        <SkillsSection
          skills={form.skills.split(",").map((s) => s.trim()).filter(Boolean)}
          visible={true}
        />
      </div>
    </div>
  );
};

export default Dashboard;
