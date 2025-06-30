import React, { useState, useEffect } from "react";

const ProjectFormModal = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    techStack: "",
    githubLink: "",
    liveLink: ""
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        ...initialData,
        techStack: initialData.techStack.join(", ")
      });
    } else {
      setFormData({
        title: "",
        description: "",
        techStack: "",
        githubLink: "",
        liveLink: ""
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleaned = {
      ...formData,
      techStack: formData.techStack.split(",").map((s) => s.trim())
    };
    onSubmit(cleaned);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-xl font-bold mb-4">{initialData ? "Edit" : "Add"} Project</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <input name="title" value={formData.title} onChange={handleChange} placeholder="Project Title" className="w-full border p-2 rounded" />
          <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="w-full border p-2 rounded" />
          <input name="techStack" value={formData.techStack} onChange={handleChange} placeholder="Tech Stack (comma-separated)" className="w-full border p-2 rounded" />
          <input name="githubLink" value={formData.githubLink} onChange={handleChange} placeholder="GitHub Link" className="w-full border p-2 rounded" />
          <input name="liveLink" value={formData.liveLink} onChange={handleChange} placeholder="Live Link" className="w-full border p-2 rounded" />
          <div className="flex justify-end space-x-2 mt-3">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
            <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">{initialData ? "Update" : "Add"}</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProjectFormModal;
