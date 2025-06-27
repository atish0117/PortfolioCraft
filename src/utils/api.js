

import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:5000/api",  // backend API base URL
  withCredentials: true,                //Send JWT cookie with every request
});

export default API;
