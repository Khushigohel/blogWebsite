import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import "../../App.css"; // Import CSS for styling

const Footer = () => {
  return (
    <footer className="footer-section">
      <Container fluid className="footer-container">
        <Row>
          {/* About Section */}
          <Col md={4} sm={12}>
            <h5>About Us</h5>
            <p>
              We provide insightful blog content on various topics, helping readers stay informed.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={4} sm={12}>
            <h5>Quick Links</h5>
            <ul className="footer-links">
              <li><a href="/">Home</a></li>
              <li><a href="/about">About</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/blog">Blog</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </Col>

          {/* Social Media Icons */}
          <Col md={3} sm={10}>
            <h5>Follow Us</h5>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer"><FaLinkedinIn /></a>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Copyright Section */}
      <div className="footer-bottom">
        <p>&copy; {new Date().getFullYear()} YourCompany. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
