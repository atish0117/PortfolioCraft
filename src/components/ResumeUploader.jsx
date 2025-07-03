// File: components/ResumeUploader.jsx
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import API from "../utils/api";
// import { uploadResume } from "../components/dashboard/uploadService";
import {
  updateProfile,
  uploadProfileImage,
  uploadResume,
} from "../features/profile/profileSlice";
const ResumeUploader = () => {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState("");
  const dispatch = useDispatch();

  const handleUpload = async () => {
    if (!file) return toast.error("Please select a file");

    try {
      const formData = new FormData();
      formData.append("resume", file);

      const res = await API.post("/upload/resume", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      dispatch(uploadResume(res.data.url));
      setPreview(res.data.url);
      toast.success("Resume uploaded successfully!");
    } catch (err) {
      toast.error("Failed to upload resume.");
    }
  };

  return (
    <div className="bg-white p-4 rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Upload Resume (PDF)</h3>
      <input
        type="file"
        accept="\application/pdf\"
        onChange={(e) => setFile(e.target.files[0])}
        className="mb-2"
      />
      <button
        onClick={handleUpload}
        className="bg-yellow-400 px-4 py-1 rounded font-semibold"
      >
        Upload
      </button>

      {preview && (
        <div className="mt-4">
          <a
            href={preview}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline text-sm"
          >
            View Uploaded Resume
          </a>
        </div>
      )}
    </div>
  );
};

export default ResumeUploader;
