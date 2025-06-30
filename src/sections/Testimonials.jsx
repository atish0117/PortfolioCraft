import React from "react";

const Testimonials = ({ data = [] }) => {
  if (!data.length) return null;

  return (
    <section className="py-10 bg-gray-50 px-4">
      <h2 className="text-2xl font-bold text-center mb-6">Testimonials</h2>

      <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
        {data.map((testimonial, index) => (
          <div
            key={index}
            className="bg-white rounded-lg p-6 shadow-md border border-gray-100"
          >
            {testimonial.imageUrl && (
              <img
                src={testimonial.imageUrl}
                alt={testimonial.name}
                className="w-16 h-16 rounded-full object-cover mb-3"
              />
            )}
            <p className="text-gray-700 italic">“{testimonial.message}”</p>
            <p className="mt-4 font-semibold">{testimonial.name}</p>
            <p className="text-sm text-gray-500">{testimonial.designation}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
