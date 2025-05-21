import React, { useEffect, useState } from "react";
import axios from "axios";
import NavigationBar from "../../components/Navbar";
import HeaderSlider from "../../components/Header";
import Footer from "./Footer";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { FaCheckCircle, FaUsers, FaLaptopCode, FaRocket } from "react-icons/fa";
import { useAuth } from "../../components/AuthContext";
import Login from "../../pages/user/Login";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const { isLoggedIn } = useAuth();
  const [showLogin, setShowLogin] = useState(false);
  const [redirectBlogId, setRedirectBlogId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs");
        setBlogs(res.data.blogs);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blogs", err);
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleReadMore = (blogId) => {
    if (isLoggedIn) {
      navigate(`/blog/${blogId}`);
    } else {
      setRedirectBlogId(blogId);
      setShowLogin(true);
    }
  };

  const handleLoginSuccess = () => {
    setShowLogin(false);
    if (redirectBlogId) {
      navigate(`/blog/${redirectBlogId}`);
      setRedirectBlogId(null);
    }
  };

  return (
    <>
      <NavigationBar />
      <HeaderSlider />

      <section className="why-choose-us">
        <h2>Why Choose Us?</h2>
        <div className="choose-container">
          <div className="choose-item"><FaCheckCircle className="icon" /><h3>Quality Content</h3><p>We provide in-depth tutorials and guides on trending technologies.</p></div>
          <div className="choose-item"><FaUsers className="icon" /><h3>Expert Articles</h3><p>Written by experienced developers.</p></div>
          <div className="choose-item"><FaRocket className="icon" /><h3>Boost Your Career</h3><p>Real-world projects and learning paths.</p></div>
          <div className="choose-item"><FaLaptopCode className="icon" /><h3>Trending Tech</h3><p>Stay updated with the latest dev trends.</p></div>
        </div>
      </section>

      <section className="featured-blogs">
        <h2>Featured Blogs</h2>
        <div className="blog-container">
          {loading ? (
            <p>Loading blogs...</p>
          ) : blogs.length > 0 ? (
            blogs.map((blog) => (
              <div key={blog._id} className="blog-card">
                <img src={`http://localhost:5000${blog.imageUrl}`} alt={blog.title} />
                <h3>{blog.title}</h3>
                <p>{blog.description}</p>
                <button className="read-more" onClick={() => handleReadMore(blog._id)}>
                  Read More
                </button>
              </div>
            ))
          ) : (
            <p>No blogs found.</p>
          )}
        </div>
      </section>

      <Footer />

      {/* 🔐 Login Modal */}
      {showLogin && (
        <div className="login-popup-overlay">
          <div className="login-popup">
            <button className="close-btn" onClick={() => setShowLogin(false)}>X</button>
            <Login 
              onLoginSuccess={handleLoginSuccess}
              openSignup={() => {
                setShowLogin(false);
                navigate("/signup");
              }}
              openForgot={() => {
                setShowLogin(false);
                navigate("/forgot-password");
              }}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
