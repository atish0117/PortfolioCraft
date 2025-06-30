import React from "react";

const ProjectsSection = ({ projects = [] }) => {
  if (!projects.length) return null;

  return (
    <section className="py-10 bg-gray-50 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Projects</h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-lg overflow-hidden p-4 border"
          >
            {project.imageUrl && (
              <img
                src={project.imageUrl}
                alt={project.title}
                className="w-full h-40 object-cover rounded"
              />
            )}
            <h3 className="text-xl font-semibold mt-3">{project.title}</h3>
            <p className="text-gray-600 mt-2">{project.description}</p>
            <p className="text-sm text-gray-500 mt-2">
              <strong>Tech:</strong> {project.techStack?.join(", ")}
            </p>
            {project.projectLink && (
              <a
                href={project.projectLink}
                target="_blank"
                rel="noreferrer"
                className="inline-block mt-3 text-blue-600 hover:underline text-sm"
              >
                View Project ↗
              </a>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
