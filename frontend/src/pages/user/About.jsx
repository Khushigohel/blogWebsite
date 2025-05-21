import React from "react";
import "../../index.css";
import aboutImage from "/images/image3.jpg"; // Use your actual image path
import PageHeader from "../../components/PageHeader";
import NavigationBar from "../../components/Navbar";
import Footer from "./Footer";

const About = () => {
  return (
    <>
    <NavigationBar/>
    <PageHeader/>
    <div className="about-container">
      {/* Left Section (Text Content) */}
      <div className="about-text">
        <h2>ABOUT US</h2>
        <p className="about-subtitle">IT-Blog can provide the Latest Blog</p>
        <p className="about-description">
         
 Your go-to platform for Java, C, Android, PHP, and emerging technologies. Stay ahead with expert insights, tutorials, and hands-on projects—empowering developers at every level. 
        </p>
        <button className="read-more">Read More</button>

        {/* Social Media Icons */}
        <div className="social-icons">
          <i className="fab fa-facebook"></i>
          <i className="fab fa-twitter"></i>
          <i className="fab fa-instagram"></i>
        </div>
      </div>
    
      {/* Right Section (Image) */}
      <div className="about-image">
        <img src={aboutImage} alt="About Us" />
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default About;
