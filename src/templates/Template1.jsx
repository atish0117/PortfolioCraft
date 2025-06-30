// import React from "react";

// const Template1 = ({ data }) => {
//   return (
//     <div className="min-h-screen bg-gray-50 text-gray-900">
//       <header className="bg-yellow-300 p-6 text-center">
//         <h1 className="text-3xl font-bold">{data.fullName}</h1>
//         <p className="text-lg">{data.title}</p>
//         <p className="mt-2">{data.bio}</p>
//         <div className="flex justify-center gap-4 mt-2">
//           {data.socialLinks?.github && (
//             <a href={data.socialLinks.github} target="_blank" rel="noreferrer" className="text-blue-600 underline">
//               GitHub
//             </a>
//           )}
//           {data.socialLinks?.linkedin && (
//             <a href={data.socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline">
//               LinkedIn
//             </a>
//           )}
//         </div>
//       </header>

//       <main className="p-6 max-w-4xl mx-auto">
//         <h2 className="text-2xl font-semibold mb-4">Projects</h2>
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           {data.projects?.map((project) => (
//             <div key={project._id} className="bg-white rounded shadow p-4">
//               {project.imageUrl && (
//                 <img src={project.imageUrl} alt={project.title} className="w-full h-40 object-cover rounded" />
//               )}
//               <h3 className="mt-2 text-xl font-bold">{project.title}</h3>
//               <p className="text-gray-700">{project.description}</p>
//               <p className="text-sm text-gray-500 mt-1">
//                 <strong>Tech:</strong> {project.techStack.join(", ")}
//               </p>
//               {project.projectLink && (
//                 <a
//                   href={project.projectLink}
//                   target="_blank"
//                   rel="noreferrer"
//                   className="text-blue-500 text-sm mt-1 inline-block"
//                 >
//                   Visit Project ↗
//                 </a>
//               )}
//             </div>
//           ))}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default Template1;



import React from "react";

// ✨ Section Components
import HeroSection from "../sections/HeroSection";
import SkillsSection from "../sections/SkillsSection";
import ProjectsSection from "../sections/ProjectSection";
import EducationSection from "../sections/EducationSection";
import ExperienceSection from "../sections/ExperienceSection";
import Certifications from "../sections/Certifications";
import Testimonials from "../sections/Testimonials";
import ContactSection from "../sections/ContactSection";

/**
 * Portfolio Template‑1
 * Renders sections dynamically using `sectionOrder` & `visibleSections`
 * Props:
 *   data: {
 *     sectionOrder: string[],
 *     visibleSections: Record<string, boolean>,
 *     skills, projects, education, experience,
 *     certifications, testimonials, ...etc
 *   }
 */
const Template1 = ({ data }) => {
  const {
    sectionOrder = [
      "hero",
      "skills",
      "projects",
      "education",
      "experience",
      "certifications",
      "testimonials",
      "contact",
    ],
    visibleSections = {},
  } = data;

  const renderSection = (key) => {
    if (!visibleSections[key]) return null;
    switch (key) {
      case "hero":
        return <HeroSection data={data} key={key} />;
      case "skills":
        return <SkillsSection skills={data.skills} key={key} />;
      case "projects":
        return <ProjectsSection projects={data.projects} key={key} />;
      case "education":
        return <EducationSection data={data.education} key={key} />;
      case "experience":
        return <ExperienceSection data={data.experience} key={key} />;
      case "certifications":
        return <Certifications data={data.certifications} key={key} />;
      case "testimonials":
        return <Testimonials data={data.testimonials} key={key} />;
      case "contact":
        return <ContactSection data={data} key={key} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-white text-black">
      {sectionOrder.map(renderSection)}
    </div>
  );
};

export default Template1;
