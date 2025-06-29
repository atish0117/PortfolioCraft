import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import API from "../utils/api";
import Template1 from "../templates/Template1";

const TemplatePage = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchPortfolio = async () => {
      try {
        const res = await API.get(`/public/${username}`);
        setUserData(res.data);
      } catch (err) {
        console.error("Error fetching public profile", err);
      }
    };
    fetchPortfolio();
  }, [username]);

  if (!userData) return <p>Loading...</p>;

  // Render correct template
  switch (userData.selectedTemplate) {
    case "template1":
      return <Template1 data={userData} />;
    default:
      return <p>No valid template selected</p>;
  }
};

export default TemplatePage;
