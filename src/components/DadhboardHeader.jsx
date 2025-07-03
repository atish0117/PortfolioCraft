import React from "react";

const DashboardHeader = ({ user }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-2">Welcome, {user?.fullName || "User"}</h2>
      <p className="text-gray-600">Edit your portfolio and manage your profile below.</p>
    </div>
  );
};

export default DashboardHeader;