import React from "react";

const ContactSection = ({ data }) => {
  const { email, phone, address, socialLinks } = data;

  return (
    <section className="py-10 bg-white px-4 border-t border-gray-200">
      <h2 className="text-2xl font-bold text-center mb-6">Contact</h2>

      <div className="max-w-2xl mx-auto text-center space-y-2 text-gray-700">
        {email && (
          <p>
            📧 <a href={`mailto:${email}`} className="text-blue-600 underline">{email}</a>
          </p>
        )}
        {phone && (
          <p>
            📞 <a href={`tel:${phone}`} className="text-blue-600 underline">{phone}</a>
          </p>
        )}
        {address && <p>📍 {address}</p>}

        <div className="flex justify-center gap-4 mt-4">
          {socialLinks?.github && (
            <a href={socialLinks.github} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              GitHub
            </a>
          )}
          {socialLinks?.linkedin && (
            <a href={socialLinks.linkedin} target="_blank" rel="noreferrer" className="text-blue-600 underline">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
