import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "../../index.css";
import NavigationBar from "../../components/Navbar";
import PageHeader from "../../components/PageHeader";
import Footer from "./Footer";
import axios from "axios";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/${id}`);
        setBlog(res.data.blog);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch blog:", err);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id]);

  const renderDescription = () => {
    const splitKey = "Some important points need to be noticed about PHP are as follows:";
    const parts = blog.description.split(splitKey);

    if (parts.length < 2) {
      return <div style={{ whiteSpace: "pre-wrap", lineHeight: "1.6" }}>{blog.description}</div>;
    }

    const intro = parts[0].trim();
    const rest = parts[1].trim();

    const lines = rest.split(/[\n•-]+/).map(line => line.trim()).filter(Boolean);

    // Adjust index if more or fewer bullet points
    const bulletPoints = lines.slice(0, 6);
    const afterPoints = lines.slice(6).join(" ");

    return (
      <>
        <div style={{ textAlign: "justify", lineHeight: "1.6" }}>{intro}</div>

        <p className="mt-3 fw-bold">{splitKey}</p>
        <ul>
          {bulletPoints.map((point, index) => (
            <li key={index}>{point}</li>
          ))}
        </ul>

        {afterPoints && (
          <p style={{ textAlign: "justify", lineHeight: "1.6" }}>{afterPoints}</p>
        )}
      </>
    );
  };

  if (loading) {
    return <p style={{ textAlign: "center", marginTop: "50px" }}>Loading blog...</p>;
  }

  if (!blog) {
    return <h2 className="error-message">Blog not found!</h2>;
  }

  return (
    <>
      <NavigationBar />
      <PageHeader />

      <div className="container my-5">
        <h2 className="text-center">{blog.title}</h2>

        <div className="text-center my-3">
          {blog.imageUrl && (
            <img
              src={`http://localhost:5000${blog.imageUrl}`}
              alt={blog.title}
              style={{ maxWidth: "100%", maxHeight: "400px" }}
            />
          )}
        </div>
        {/* Render smartly split description */}
        {renderDescription()}

        {blog.websiteLink && (
          <p className="mt-3">
            Visit site:{" "}
            <a href={blog.websiteLink} target="_blank" rel="noopener noreferrer">
              {blog.websiteLink}
            </a>
          </p>
        )}
          <p className="text-center text-muted">
          By {blog.authorName || "Unknown Author"}
        </p>

      </div>

      <Footer />
    </>
  );
};

export default BlogDetails;
