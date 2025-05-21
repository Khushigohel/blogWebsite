import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; 
import "../../index.css"; // Ensure CSS is imported
import NavigationBar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import Footer from "./Footer";
import { useAuth } from "../../components/AuthContext";
import Login from "../../pages/user/Login";

const Blog = () => {
 const [blogs, setBlogs] = useState([]);
   const [loading, setLoading] = useState(true);
   const { isLoggedIn } = useAuth();
   const [showLogin, setShowLogin] = useState(false);
   const [redirectBlogId, setRedirectBlogId] = useState(null);
   const navigate = useNavigate();
  
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/blogs"); // Make sure your server is running
        setBlogs(res.data.blogs); // ✅ fix: access the blogs array inside response
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
    <NavigationBar/>
    <PageHeader/>

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


  <Footer/>
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

export default Blog;
