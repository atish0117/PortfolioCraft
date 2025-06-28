import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addProject, updateProject } from "./projectSlice";
import { toast } from "react-toastify";

import { uploadImage } from "../../utils/uploadImage";
const ProjectForm = ({ editMode = false, existingData = {}, onClose }) => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    projectLink: ""
  });
const [image, setImage] = useState(null);
  useEffect(() => {
    if (editMode && existingData) {
      setFormData({
        title: existingData.title || "",
        description: existingData.description || "",
        techStack: existingData.techStack?.join(", ") || "",
        projectLink: existingData.projectLink || ""
      });
    }
  }, [editMode, existingData]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let imageUrl = existingData?.imageUrl || "";
if (image) {
  const { url } = await uploadImage(image);
  imageUrl = url;
}

    const payload = {
      ...formData,
      techStack: formData.techStack
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
        imageUrl
    };

    if (editMode) {
      const res = await dispatch(updateProject({ id: existingData._id, updatedData: payload }));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Project updated!");
        onClose?.();
      }
    } else {
      const res = await dispatch(addProject(payload));
      if (res.meta.requestStatus === "fulfilled") {
        toast.success("Project added!");
        setFormData({ title: "", description: "", techStack: "", projectLink: "" });
        onClose?.();
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded-lg shadow">


      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        placeholder="Project Title"
        className="w-full border p-2 rounded"
        required
      />
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        placeholder="Short Description"
        rows={3}
        className="w-full border p-2 rounded"
        required
      />
      <input
        name="techStack"
        value={formData.techStack}
        onChange={handleChange}
        placeholder="Tech Stack (comma separated)"
        className="w-full border p-2 rounded"
      />
      <input
  type="file"
  accept="image/*"
  onChange={(e) => setImage(e.target.files[0])}
  className="w-full"
/>
      <input
        name="projectLink"
        value={formData.projectLink}
        onChange={handleChange}
        placeholder="Project URL (optional)"
        className="w-full border p-2 rounded"
      />
      <button
        type="submit"
        className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 px-4 rounded"
      >
        {editMode ? "Update Project" : "Add Project"}
      </button>
    </form>
  );
};

export default ProjectForm;
