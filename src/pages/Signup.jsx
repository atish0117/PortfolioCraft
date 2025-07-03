import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const Signup = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    username: ""
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(registerUser(formData));
    if (res.meta.requestStatus === "fulfilled") {
         toast.success("Account created successfully!");
      navigate("/dashboard");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-lg rounded-xl">
      <h2 className="text-2xl font-bold mb-4 text-center">Create Account</h2>
      {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          name="username"
          placeholder="Username (unique)"
          value={formData.username}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-semibold py-2 rounded"
        >
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
};

export default Signup;
