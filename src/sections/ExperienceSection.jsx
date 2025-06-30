import React from "react";

const ExperienceSection = ({ data = [] }) => {
  if (!data.length) return null;

  return (
    <section className="py-10 bg-gray-50 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Experience</h2>

      <div className="space-y-6 max-w-3xl mx-auto">
        {data.map((exp, index) => (
          <div
            key={index}
            className="border-l-4 border-yellow-400 pl-4 py-2 bg-white rounded shadow"
          >
            <h3 className="text-lg font-semibold">{exp.jobTitle}</h3>
            <p className="text-sm text-gray-600">
              {exp.companyName} ({exp.duration})
            </p>
            {exp.responsibilities && (
              <p className="mt-2 text-gray-700 text-sm">
                {exp.responsibilities}
              </p>
            )}
            {exp.skills && (
              <p className="mt-1 text-sm text-gray-500">
                <strong>Skills:</strong> {exp.skills.join(", ")}
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ExperienceSection;
