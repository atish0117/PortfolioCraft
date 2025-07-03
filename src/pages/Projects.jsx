import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addProject,
  deleteProject,
  getProjects,
  updateProject
} from "../features/projects/projectSlice";
import ProjectForm from "../features/projects/ProjectForm";
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";

const Projects = () => {
  const dispatch = useDispatch();
  const {list: projects, loading } = useSelector((state) => state.projects);

    const [modalOpen, setModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

 const handleAddClick = () => {
    setEditIndex(null); // new
    setModalOpen(true);
  };

    const handleEditClick = (index) => {
    setEditIndex(index);
    setModalOpen(true);
  };

   const handleFormSubmit = (project) => {
    if (editIndex !== null) {
      dispatch(updateProject({ index: editIndex, updatedProject: project }));
    } else {
      dispatch(addProject(project));
    }
  };

  const handleDelete = async (id) => {
    const confirm = window.confirm("Delete this project?");
    if (!confirm) return;
    const res = await dispatch(deleteProject(id));
    if (res.meta.requestStatus === "fulfilled") {
      toast.success("Project deleted");
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
          onClick={handleAddClick}
          className="bg-yellow-400 text-black px-3 py-2 rounded flex items-center gap-2"
        >
          <FaPlus />
          Add Project
        </button>
      </div>

       {loading ? <p>Loading...</p> : (
        <ul className="space-y-4">
          {projects.map((project, idx) => (
            <li key={idx} className="border p-4 rounded-lg">
              <div className="font-bold text-lg">{project.title}</div>
              <div className="text-sm text-gray-600">{project.description}</div>
              <div className="text-sm mt-1 text-blue-500">{project.techStack?.join(", ")}</div>
               {project.githubLink && (
              <a
                href={project.githubLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline text-sm"
              >
                GitHub
              </a>
            )}

            {project.liveLink && (
              <a
                href={project.liveLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-green-600 underline text-sm"
              >
                Visit Project ↗
              </a>
            )}
              <div className="flex gap-4 mt-2">
                <button onClick={() => handleEditClick(idx)} className="text-yellow-600">Edit</button>
                <button onClick={() => handleDelete(idx)} className="text-red-600">Delete</button>
              </div>
            </li>
          ))}
        </ul>
      )}
       
        <div className="mb-6">
          <ProjectForm
          isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSubmit={handleFormSubmit}
        initialData={editIndex !== null ? projects[editIndex] : null}
          />
        </div>
    </div>
  );
};

export default Projects;
