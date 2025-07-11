import React, { useState } from "react";
import "./contact.css"; // Link to CSS file
const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      console.log("Submitting form data:", formData);
      const res = await fetch("http://127.0.0.1:5000/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const result = await res.json();
      console.log(result);

      if (res.ok) {
        alert("Thank you! We'll get back to you shortly.");
        setFormData({ name: "", email: "", message: "" });
      } else {
        alert(result.error || "Something went wrong.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Failed to send message.");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "500px", margin: "auto" }}>
      <h2>Contact Us</h2>
      
      <input
        type="text"
        name="name"
        placeholder="Your Full Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{ display: "block", margin: "10px 0", width: "100%", padding: "10px" }}
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        value={formData.email}
        onChange={handleChange}
        required
        style={{ display: "block", margin: "10px 0", width: "100%", padding: "10px" }}
      />

      <textarea
        name="message"
        placeholder="Your Message"
        value={formData.message}
        onChange={handleChange}
        required
        rows="5"
        style={{ display: "block", margin: "10px 0", width: "100%", padding: "10px" }}
      ></textarea>

      <button type="submit" style={{ padding: "10px 20px", background: "#1890ff", color: "#fff", border: "none" }}>
        Send
      </button>
    </form>
  );
};

export default ContactForm;
