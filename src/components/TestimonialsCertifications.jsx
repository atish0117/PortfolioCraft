// File: components/TestimonialsCertifications.jsx
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTestimonial,
  deleteTestimonial,
  addCertification,
  deleteCertification,
} from "../features/portfolio/portfolioSlice";
import API from "../utils/api";
import { toast } from "react-toastify";

// Helper to upload image to Appwrite & return URL
const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);
  const res = await API.post("/upload/profile-image", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.url; // => { url: "https://..." }
};

const TestimonialsCertifications = () => {
  // ================= Testimonials =================
  const [tData, setTData] = useState({
    name: "",
    designation: "",
    message: "",
    imageFile: null,
  });

  // ================= Certifications ===============
  const [cData, setCData] = useState({
    title: "",
    platform: "",
    certificateLink: "",
  });

  const dispatch = useDispatch();
  const { testimonials, certifications } = useSelector(
    (state) => state.portfolio
  );

  // ---------- Testimonial Submit
  const handleTestimonialSubmit = async (e) => {
    e.preventDefault();
    let imageUrl = "";
    try {
      if (tData.imageFile) {
        imageUrl = await uploadImage(tData.imageFile);
      }
      await dispatch(
        addTestimonial({
          name: tData.name,
          designation: tData.designation,
          message: tData.message,
          imageUrl,
        })
      ).unwrap();
      toast.success("Testimonial added!");
      setTData({ name: "", designation: "", message: "", imageFile: null });
    } catch (err) {
      toast.error(err);
    }
  };

  // ---------- Certification Submit
  const handleCertSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addCertification(cData)).unwrap();
      toast.success("Certification added!");
      setCData({ title: "", platform: "", certificateLink: "" });
    } catch (err) {
      toast.error(err);
    }
  };

  return (
    <div className="grid md:grid-cols-2 gap-6 mt-8">
      {/* ================= Testimonials ================= */}
      <section className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Testimonials</h3>
        <form onSubmit={handleTestimonialSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Name"
            className="w-full border p-2 rounded"
            value={tData.name}
            onChange={(e) => setTData({ ...tData, name: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Designation"
            className="w-full border p-2 rounded"
            value={tData.designation}
            onChange={(e) => setTData({ ...tData, designation: e.target.value })}
            required
          />
          <textarea
            placeholder="Message"
            className="w-full border p-2 rounded"
            rows={3}
            value={tData.message}
            onChange={(e) => setTData({ ...tData, message: e.target.value })}
            required
          ></textarea>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setTData({ ...tData, imageFile: e.target.files[0] })}
          />
          <button className="bg-yellow-400 w-full py-2 rounded font-semibold">
            Add Testimonial
          </button>
        </form>

        {/* List */}
        <ul className="mt-6 space-y-3 max-h-60 overflow-auto pr-2">
          {testimonials.map((t, idx) => (
            <li
              key={idx}
              className="border p-3 rounded flex items-start gap-2"
            >
              {t.imageUrl && (
                <img
                  src={t.imageUrl}
                  alt={t.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
              )}
              <div className="flex-1">
                <p className="font-medium">{t.name}</p>
                <p className="text-xs text-gray-600">{t.designation}</p>
                <p className="text-sm mt-1">{t.message}</p>
              </div>
              <button
                onClick={() => dispatch(deleteTestimonial(idx))}
                className="text-red-500 text-xs"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      </section>

      {/* ================= Certifications ============== */}
      <section className="bg-white p-4 rounded-xl shadow">
        <h3 className="text-xl font-semibold mb-4">Certifications</h3>
        <form onSubmit={handleCertSubmit} className="space-y-3">
          <input
            type="text"
            placeholder="Certificate Title"
            className="w-full border p-2 rounded"
            value={cData.title}
            onChange={(e) => setCData({ ...cData, title: e.target.value })}
            required
          />
          <input
            type="text"
            placeholder="Platform (e.g., Coursera)"
            className="w-full border p-2 rounded"
            value={cData.platform}
            onChange={(e) => setCData({ ...cData, platform: e.target.value })}
            required
          />
          <input
            type="url"
            placeholder="Certificate Link (URL)"
            className="w-full border p-2 rounded"
            value={cData.certificateLink}
            onChange={(e) =>
              setCData({ ...cData, certificateLink: e.target.value })
            }
            required
          />
          <button className="bg-yellow-400 w-full py-2 rounded font-semibold">
            Add Certification
          </button>
        </form>

        {/* List */}
        <ul className="mt-6 space-y-3 max-h-60 overflow-auto pr-2">
          {certifications.map((c, idx) => (
            <li
              key={idx}
              className="border p-3 rounded flex justify-between gap-2"
            >
              <div>
                <p className="font-medium">{c.title}</p>
                <p className="text-xs text-gray-600">{c.platform}</p>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={c.certificateLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 text-xs underline"
                >
                  View
                </a>
                <button
                  onClick={() => dispatch(deleteCertification(idx))}
                  className="text-red-500 text-xs"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default TestimonialsCertifications;