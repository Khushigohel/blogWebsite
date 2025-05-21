import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const EditBlog = () => {
  const { id } = useParams(); // ✅ Get blog ID from URL
  const navigate = useNavigate();

  const [blogData, setBlogData] = useState({
    title: "",
    description: "",
    websiteLink: "",
    authorName: "",
  });
  
  const [image, setImage] = useState(null);
  const [previewImage, setPreviewImage] = useState("");

  // ✅ Fetch blog data on mount
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/blogs/${id}`)
      .then((res) => {
        const { title, description, websiteLink, authorName, imageUrl } = res.data.blog;
        setBlogData({ title, description, websiteLink, authorName });
        setPreviewImage(`http://localhost:5000${imageUrl}`);
      })
      .catch((err) => {
        console.error("Error fetching blog:", err);
      });
  }, [id]);

  

  // ✅ Handle Input Changes
  const handleChange = (e) => {
    setBlogData({ ...blogData, [e.target.name]: e.target.value });
  };

  // ✅ Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

   // ✅ Handle blog update
   const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("title", blogData.title);
      formData.append("description", blogData.description);
      formData.append("websiteLink", blogData.websiteLink);
      formData.append("authorName", blogData.authorName);
      if (image) {
        formData.append("image", image);
      }

      await axios.put(`http://localhost:5000/api/blogs/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      alert("✅ Blog updated successfully!");
      navigate("/admin/displayblog");
    } catch (error) {
      console.error("Update error:", error);
      alert("❌ Failed to update blog.");
    }
  };

  return (
    <div className="add-blog-container">
      <h2>📝 Edit The Blog</h2>
      <form onSubmit={handleSubmit}>
        <label>Blog Title</label>
        <input type="text" name="title" value={blogData.title} onChange={handleChange} placeholder="Blog Title" required />
        <label>Blog Description</label>
        <textarea name="description" value={blogData.description} onChange={handleChange} placeholder="Blog Description" required></textarea>
        
        <label>Upload Image</label>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {previewImage && (
          <div style={{ marginTop: "10px" }}>
            <img src={previewImage} alt="Preview" style={{ maxWidth: "200px", borderRadius: "8px" }} />
          </div>
        )}
        <br/>
       <label>Website Link (Optional)</label>
        <input type="text" name="websiteLink" value={blogData.websiteLink} onChange={handleChange} placeholder="Enter a website link" />
        
        
        <label>Author Name</label>
        <input type="text" name="authorName" value={blogData.authorName} onChange={handleChange} placeholder="Enter the Author Name" required />
        
        <button type="submit">Update Blog</button>
      </form>
    </div>
  );
};

export default EditBlog;
