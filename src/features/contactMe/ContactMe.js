import React, { useState } from "react";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaUserAlt, FaRegEnvelopeOpen } from "react-icons/fa";

const ContactMe = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Contact Form Data:", formData);
    alert("Form submitted! Check the console for data.");
    setFormData({
      name: "",
      email: "",
      subject: "",
      message: "",
    });
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 ">
    <div className="container py-5">
      <p className="text-center  mb-5">
        I'd love to hear from you! Fill out the form below and I’ll get back to you as soon as possible.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mx-auto card p-4 shadow-lg border-0"
        style={{ maxWidth: "600px", borderRadius: "1rem" }}
      >
        <div className="mb-3">
          <label htmlFor="name" className="form-label fw-semibold">
            <FaUserAlt className="me-2" />
            Name <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control rounded-pill px-4 py-2"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your full name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label fw-semibold">
            <MdOutlineMailOutline className="me-2" />
            Email <span className="text-danger">*</span>
          </label>
          <input
            type="email"
            className="form-control rounded-pill px-4 py-2"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="subject" className="form-label fw-semibold">
            <FaRegEnvelopeOpen className="me-2" />
            Subject <span className="text-danger">*</span>
          </label>
          <input
            type="text"
            className="form-control rounded-pill px-4 py-2"
            id="subject"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            placeholder="Your subject line"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="message" className="form-label fw-semibold">
            ✍️ Message <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control px-4 py-3"
            id="message"
            name="message"
            rows="5"
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Type your message here..."
            style={{ borderRadius: "1rem" }}
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary w-100 py-2 rounded-pill fw-semibold">
          Send Message 🚀
        </button>
      </form>
    </div>
    </div>
  );
};

export default ContactMe;
