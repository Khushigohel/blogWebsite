const express = require("express");
const Blog = require("../models/Blog");
const upload = require("../middleware/upload"); // Multer middleware
const router = express.Router();
const path = require("path");

// Serve uploaded images
router.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Add blog with image
router.post("/add", upload.single("image"), async (req, res) => {
    try {
        const { title, description, websiteLink, authorName } = req.body;
        const imageUrl = req.file ? `/uploads/images/${req.file.filename}` : null;

        const newBlog = new Blog({
            title,
            description,
            imageUrl,
            websiteLink,
            authorName,
        });

        await newBlog.save();
        res.status(201).json({ success: true, message: "Blog added successfully!", blog: newBlog });
    } catch (error) {
        console.error("Error adding blog:", error);
        res.status(500).json({ success: false, message: "Failed to add blog" });
    }
});

// Get all blogs
router.get("/", async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ _id: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.status(500).json({ success: false, message: "Failed to get blogs" });
    }
});
// Place this above the dynamic `/:id` route
router.get("/count", async (req, res) => {
    try {
      const count = await Blog.countDocuments();
      res.json({ success: true, count });
    } catch (error) {
      console.error("Count fetch error:", error);
      res.status(500).json({ success: false, message: "Failed to get count" });
    }
  });
// Get single blog by ID
router.get("/:id", async (req, res) => {
    try {
      const blog = await Blog.findById(req.params.id);
      if (!blog) return res.status(404).json({ success: false, message: "Blog not found" });
      res.json({ success: true, blog });
    } catch (err) {
      console.error("Get by ID error:", err);
      res.status(500).json({ success: false, message: "Server error" });
    }
  });

  // Update blog
router.put("/:id", upload.single("image"), async (req, res) => {
    try {
      const { title, description, websiteLink, authorName } = req.body;
      const updateFields = { title, description, websiteLink, authorName };
      if (req.file) {
        updateFields.imageUrl = `/uploads/images/${req.file.filename}`;
      }
  
      const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, updateFields, { new: true });
      if (!updatedBlog) return res.status(404).json({ success: false, message: "Blog not found" });
  
      res.json({ success: true, message: "Blog updated", blog: updatedBlog });
    } catch (err) {
      console.error("Update error:", err);
      res.status(500).json({ success: false, message: "Update failed" });
    }
  });

// Delete blog by ID
router.delete("/:id", async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ success: true, message: "Blog deleted" });
    } catch (error) {
        res.status(500).json({ success: false, message: "Delete failed" });
    }
});



module.exports = router;
