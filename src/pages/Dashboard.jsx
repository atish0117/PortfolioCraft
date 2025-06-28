import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateUserProfile } from "../features/auth/authSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    bio: "",
    socialLinks: {
      github: "",
      linkedin: ""
    }
  });

  // Set initial form data from Redux
  useEffect(() => {
    if (user) {
      setFormData({
        fullName: user.fullName || "",
        title: user.title || "",
        bio: user.bio || "",
        socialLinks: {
          github: user?.socialLinks?.github || "",
          linkedin: user?.socialLinks?.linkedin || ""
        }
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (["github", "linkedin"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        socialLinks: { ...prev.socialLinks, [name]: value }
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfile(formData));
  };

  return (
    <div className="max-w-3xl mx-auto mt-10 p-6 bg-white rounded-xl shadow">
      <h2 className="text-xl font-bold mb-6 text-center">Update Profile</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          value={formData.fullName}
          onChange={handleChange}
          placeholder="Full Name"
          className="w-full border p-2 rounded"
        />
        <input
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Your Title (e.g. MERN Stack Dev)"
          className="w-full border p-2 rounded"
        />
        <textarea
          name="bio"
          value={formData.bio}
          onChange={handleChange}
          placeholder="Short Bio"
          rows={3}
          className="w-full border p-2 rounded"
        />
        <input
          name="github"
          value={formData.socialLinks.github}
          onChange={handleChange}
          placeholder="GitHub URL"
          className="w-full border p-2 rounded"
        />
        <input
          name="linkedin"
          value={formData.socialLinks.linkedin}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded"
        >
          Save Profile
        </button>
      </form>
    </div>
  );
};

export default Dashboard;
