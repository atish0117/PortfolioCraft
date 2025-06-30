

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
import { toast } from "react-toastify";
import { setLoading } from "../features/ui/uiSlice"; // sirf action, store nahin

const API = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true,
});

/*
 * is function ko baad me call karke redux‑store inject karenge
 */
export const attachInterceptors = (store) => {
  // REQUEST
  API.interceptors.request.use(
    (config) => {
      const { auth } = store.getState();          // ⬅ store yahan safe hai
      if (auth?.token) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      }
      store.dispatch(setLoading(true));
      return config;
    },
    (error) => {
      store.dispatch(setLoading(false));
      return Promise.reject(error);
    }
  );

  // RESPONSE
  API.interceptors.response.use(
    (response) => {
      store.dispatch(setLoading(false));
      return response;
    },
    (error) => {
      store.dispatch(setLoading(false));

      const msg =
        error.response?.data?.msg ||
        error.response?.data?.message ||
        error.message ||
        "Something went wrong";
      toast.error(msg);

      if (error.response?.status === 401) {
        store.dispatch({ type: "auth/logout" });
      }

      return Promise.reject(error);
    }
  );
};

export default API;


