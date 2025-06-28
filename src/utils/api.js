

// import axios from "axios";

// const API = axios.create({
//   baseURL: "http://localhost:5000/api",  // backend API base URL
//   withCredentials: true,                //Send JWT cookie with every request
// });

// export default API;


// Centralised Axios instance with interceptors
// 1. Automatically sends JWT cookie (withCredentials: true)
// 2. Optionally attaches a Bearer token from Redux (if you decide to store it)
// 3. Dispatches global loading state on every request/response
// 4. Shows a toast for any response errors in a single place

import axios from "axios";
import { store } from "../app/store";
// ❗️ Make sure you have a uiSlice or similar with setLoading action
import { setLoading } from "../features/ui/uiSlice"; // adjust path if needed
import { toast } from "react-toastify";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // send HTTP‑only JWT cookies automatically
});

// 🔐 REQUEST INTERCEPTOR
API.interceptors.request.use(
  (config) => {
    // (Optional) Attach Bearer token from Redux/localStorage
    const { auth } = store.getState();
    if (auth?.token) {
      config.headers.Authorization = `Bearer ${auth.token}`;
    }

    // 🔄 Start global loading spinner
    store.dispatch(setLoading(true));
    return config;
  },
  (error) => {
    store.dispatch(setLoading(false));
    return Promise.reject(error);
  }
);

// 🎯 RESPONSE INTERCEPTOR
API.interceptors.response.use(
  (response) => {
    store.dispatch(setLoading(false)); // ✅ Stop spinner on success
    return response;
  },
  (error) => {
    store.dispatch(setLoading(false)); // ✅ Stop spinner on error

    // 🛑 Global error toast
    const message =
      error.response?.data?.msg ||
      error.response?.data?.message ||
      error.message ||
      "Something went wrong";
    toast.error(message);

    // 🔒 Auto‑logout on 401 (optional)
    if (error.response?.status === 401) {
      store.dispatch({ type: "auth/logout" });
    }

    return Promise.reject(error);
  }
);

export default API;

