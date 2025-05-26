import React, { useState } from "react";
import "../../index.css"; 
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import NavigationBar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import Footer from "./Footer";

const Contact = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // State to show success message after form submission
  const [submitted, setSubmitted] = useState(false);

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form behavior
  
    try {
      const response = await fetch("http://localhost:5000/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // Sending form data
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        alert(errorData.message || "Something went wrong, please try again.");
        return;
      }
  
      const result = await response.json(); // Parse the successful JSON response
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 4000); // Reset after 4 seconds
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting your message.");
    }
  };
  
  
  

  return (
    <>
      <NavigationBar />
      <PageHeader />
      <div className="contact-container">
        <div className="contact-header animate-slide-up">
          <h1>📞 Get in Touch</h1>
          <p>We’d love to hear from you! Reach out for any inquiries or feedback.</p>
        </div>

        <div className="contact-content">
          {/* Left Side: Contact Info */}
          <div className="contact-info animate-slide-left">
            <h3><FaMapMarkerAlt /> Our Office</h3>
            <p>123 Tech Street, Coding City, 45678</p>

            <h3><FaEnvelope /> Email Us</h3>
            <p>support@itblog.com</p>

            <h3><FaPhone /> Call Us</h3>
            <p>+91 98765 43210</p>
          </div>

          {/* Right Side: Contact Form */}
          <div className="contact-form animate-slide-right">
            {submitted ? (
              <div className="success-message animate-scale">✅ Your message has been sent!</div>
            ) : (
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                <textarea
                  name="message"
                  placeholder="Your Message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                <button type="submit" className="animate-hover">Send Message</button>
              </form>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Contact;
