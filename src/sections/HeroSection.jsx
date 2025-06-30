import React from "react";

const HeroSection = ({ data }) => {
  return (
    <section className="text-center py-12 bg-yellow-100">
      <h1 className="text-4xl font-bold">{data.fullName}</h1>
      <p className="text-xl text-gray-700 mt-2">{data.title}</p>
      <p className="max-w-2xl mx-auto text-gray-600 mt-4">{data.bio}</p>

      <div className="mt-4 flex justify-center gap-4">
        {data.socialLinks?.github && (
          <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="text-blue-500 underline">
            GitHub
          </a>
        )}
        {data.socialLinks?.linkedin && (
          <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-blue-500 underline">
            LinkedIn
          </a>
        )}
      </div>
    </section>
  );
};

export default HeroSection;
