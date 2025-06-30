import React from "react";

const EducationSection = ({ data = [] }) => {
  if (!data.length) return null;

  return (
    <section className="py-10 bg-white px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Education</h2>

      <div className="space-y-4 max-w-3xl mx-auto">
        {data.map((edu, index) => (
          <div
            key={index}
            className="border-l-4 border-yellow-400 pl-4 py-2 bg-gray-50 rounded shadow"
          >
            <h3 className="text-lg font-semibold">{edu.institution}</h3>
            <p className="text-sm text-gray-600">
              {edu.degree} ({edu.startYear} - {edu.endYear || "Present"})
            </p>
            {edu.description && (
              <p className="mt-1 text-gray-700 text-sm">{edu.description}</p>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default EducationSection;
