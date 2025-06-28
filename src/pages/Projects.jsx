import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProjects, deleteProject } from "../features/projects/projectSlice";
import ProjectForm from "../features/projects/ProjectForm";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const Projects = () => {
  const dispatch = useDispatch();
  const { projects, loading } = useSelector((state) => state.projects);

  const [showForm, setShowForm] = useState(false);
  const [editData, setEditData] = useState(null);

  useEffect(() => {
    dispatch(getProjects());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      dispatch(deleteProject(id));
    }
  };

  const handleEdit = (project) => {
    setEditData(project);
    setShowForm(true);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Your Projects</h2>
        <button
          onClick={() => {
            setShowForm(!showForm);
            setEditData(null);
          }}
          className="bg-yellow-400 text-black px-3 py-2 rounded flex items-center gap-2"
        >
          <FaPlus />
          {showForm ? "Cancel" : "Add New"}
        </button>
      </div>

      {showForm && (
        <div className="mb-6">
          <ProjectForm
            editMode={!!editData}
            existingData={editData}
            onClose={() => {
              setShowForm(false);
              setEditData(null);
            }}
          />
        </div>
      )}

      {loading && <p>Loading projects...</p>}

      {projects.length === 0 && !loading && (
        <p className="text-gray-500">No projects added yet.</p>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project._id}
            className="bg-white shadow p-4 rounded-lg border"
          >
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold">{project.title}</h3>
              <div className="flex gap-3 text-sm">
                <button
                  onClick={() => handleEdit(project)}
                  className="text-blue-500 hover:underline flex items-center gap-1"
                >
                  <FaEdit /> Edit
                </button>
                <button
                  onClick={() => handleDelete(project._id)}
                  className="text-red-500 hover:underline flex items-center gap-1"
                >
                  <FaTrash /> Delete
                </button>
              </div>
            </div>
            <p className="text-gray-700">{project.description}</p>
            <div className="text-sm text-gray-500 mt-1">
              <strong>Tech:</strong> {project.techStack.join(", ")}
            </div>
            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-500 text-sm mt-1 inline-block"
              >
                Visit Project ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Projects;
