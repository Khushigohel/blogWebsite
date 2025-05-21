import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "./style.css";

const AddBlog = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [websiteLink, setWebsiteLink] = useState("");
  const [authorName, setAuthorName] = useState("");
  const navigate = useNavigate();

  // Handle file change
  const handleFileChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  // Submit form data
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", imageFile); // ✅ Send file
    formData.append("websiteLink", websiteLink);
    formData.append("authorName", authorName);

    try {
      const response = await axios.post("http://localhost:5000/api/blogs/add", formData, { 
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert(" Blog Added Successfully!");
        navigate("/admin/displayblog");
      } else {
        alert(" Failed to add blog. Please try again.");
      }
    } catch (error) {
      console.error("Error adding blog:", error);
      alert(" Server error. Please check console for details.");
    }
  };

  return (
    <div className="add-blog-container">
      <h2>📝 Add a New Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input type="text" placeholder="Blog Title" value={title} onChange={(e) => setTitle(e.target.value)} required />

        <label>Blog Description</label>
        <textarea placeholder="Blog Description" value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>

        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleFileChange} />

        <label>Website Link (Optional)</label>
        <input type="text" value={websiteLink} onChange={(e) => setWebsiteLink(e.target.value)} placeholder="Enter a website link" />

        <label>Author Name</label>
        <input type="text" value={authorName} onChange={(e) => setAuthorName(e.target.value)} placeholder="Enter the Author Name" required />

        <button type="submit">Add Blog</button>
      </form>
    </div>
  );
};

export default AddBlog;
