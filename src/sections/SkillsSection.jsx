import React from "react";

const SkillsSection = ({ skills = [] ,visible = true}) => {
  if ( !visible || !skills.length) return null;

  return (
    <section className="py-10 bg-white text-center">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <div className="flex flex-wrap justify-center gap-3">
        {skills.map((skill, index) => (
          <span
            key={index}
            className="bg-yellow-300 text-black px-4 py-2 rounded-full text-sm font-semibold"
          >
            {skill}
          </span>
        ))}
      </div>
    </section>
  );
};

export default SkillsSection;
