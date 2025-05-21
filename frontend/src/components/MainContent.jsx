import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import NavigationBar from "./components/Navbar.jsx";
import Header from "./components/Header1.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import About from "./pages/About.jsx";
import Footer from "./pages/Footer.jsx";

const MainContent = () => {
  const location = useLocation(); // Now useLocation() works correctly!

  return (
    <div className="app-container">
      <NavigationBar />
      <Header />

      <div className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </div>

      {/* Show footer on all pages except About */}
      {location.pathname !== "/about" && <Footer />}
    </div>
  );
};

export default MainContent;
