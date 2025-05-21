import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./style.css";

const DisplayBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch blogs
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/blogs/");
        setBlogs(response.data.blogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  // ✅ Delete blog
  const deleteBlog = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blogs/${id}`);
      setBlogs((prev) => prev.filter((blog) => blog._id !== id));
      alert("✅ Blog deleted successfully!");
    } catch (err) {
      console.error("Delete failed:", err);
      alert("❌ Failed to delete blog.");
    }
  };

  // ✅ Navigate to edit page
  const editBlog = (id) => {
    navigate(`/admin/editblog/${id}`);
  };

  // ✅ Safe hostname parser
  const getHostname = (link) => {
    try {
      return new URL(link).hostname;
    } catch {
      return link || "Invalid URL";
    }
  };

  return (
    <div className="manage-blogs-container">
      <h2>📑 Manage Blogs</h2>

      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        <table className="blog-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Description</th>
              <th>Image</th>
              <th>Website Link</th>
              <th>Author</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, index) => (
              <tr key={blog._id}>
                <td>{index + 1}</td>
                <td>{blog.title}</td>
                <td>{blog.description}</td>
                <td>
                  {blog.imageUrl ? (
                    <img
                      src={`http://localhost:5000${blog.imageUrl}`}
                      alt="Blog"
                      className="blog-image"
                    />
                  ) : (
                    "No Image"
                  )}
                </td>
                <td>
                  {blog.websiteLink ? (
                    <a
                      href={blog.websiteLink}
                      className="website-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {getHostname(blog.websiteLink)}
                    </a>
                  ) : (
                    "No Link"
                  )}
                </td>
                <td>{blog.authorName}</td>
                <td>
                  <button className="edit-btn" onClick={() => editBlog(blog._id)}>Edit</button>
                  <button className="delete-btn" onClick={() => deleteBlog(blog._id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DisplayBlog;
