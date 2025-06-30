import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addTestimonial,
  deleteTestimonial,
} from "../../features/profile/profileThunk";

const TestimonialsForm = () => {
  const dispatch = useDispatch();
  const { testimonials } = useSelector((state) => state.profile);

  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    message: "",
    imageUrl: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = () => {
    dispatch(addTestimonial(formData));
    setFormData({ name: "", designation: "", message: "", imageUrl: "" });
  };

  const handleDelete = (index) => {
    dispatch(deleteTestimonial(index));
  };

  return (
    <div className="bg-white p-4 rounded shadow mt-6">
      <h2 className="text-xl font-bold mb-4">Manage Testimonials</h2>

      <div className="grid gap-2 mb-4">
        <input
          name="name"
          placeholder="Name"
          className="border px-3 py-2 rounded"
          value={formData.name}
          onChange={handleChange}
        />
        <input
          name="designation"
          placeholder="Designation"
          className="border px-3 py-2 rounded"
          value={formData.designation}
          onChange={handleChange}
        />
        <textarea
          name="message"
          placeholder="Message"
          className="border px-3 py-2 rounded"
          value={formData.message}
          onChange={handleChange}
        />
        <input
          name="imageUrl"
          placeholder="Image URL"
          className="border px-3 py-2 rounded"
          value={formData.imageUrl}
          onChange={handleChange}
        />
        <button
          onClick={handleSubmit}
          className="bg-yellow-400 text-black px-4 py-2 rounded hover:bg-yellow-300"
        >
          Add Testimonial
        </button>
      </div>

      <ul className="space-y-2">
        {testimonials?.map((item, index) => (
          <li
            key={index}
            className="border p-3 rounded flex justify-between items-center"
          >
            <span>
              {item.name} — {item.designation}
            </span>
            <button
              onClick={() => handleDelete(index)}
              className="text-red-600 text-sm"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestimonialsForm;
