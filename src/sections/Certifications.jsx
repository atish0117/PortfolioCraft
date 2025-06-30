import React from "react";

const Certifications = ({ data = [] }) => {
  if (!data.length) return null;

  return (
    <section className="py-10 bg-white px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Certifications</h2>

      <ul className="max-w-3xl mx-auto space-y-4">
        {data.map((cert, index) => (
          <li
            key={index}
            className="border-l-4 border-yellow-400 pl-4 py-2 bg-gray-50 rounded shadow"
          >
            <h3 className="text-lg font-semibold">{cert.title}</h3>
            <p className="text-sm text-gray-600">{cert.platform}</p>
            {cert.certificateLink && (
              <a
                href={cert.certificateLink}
                target="_blank"
                rel="noreferrer"
                className="text-blue-600 text-sm underline mt-1 inline-block"
              >
                View Certificate ↗
              </a>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Certifications;
