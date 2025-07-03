import React from "react";
import { useSelector } from "react-redux";
import DashboardHeader from "../components/DadhboardHeader";
import ResumeUploader from "../components/ResumeUploader";
import PublicLinkShare from "../components/dashboard/PublicLinkShare";
import SectionControl from "../components/dashboard/SectionControl";
import Testimonials from "../sections/Testimonials";
import Certifications from "../sections/Certifications";

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);
  console.log(user)

  return (
    <div className="p-4 max-w-5xl mx-auto space-y-8">
      <DashboardHeader user={user} />

      <ResumeUploader />

      <PublicLinkShare username={user?.username} />

      <SectionControl />

      <Testimonials />

      <Certifications />
    </div>
  );
};

export default Dashboard;
