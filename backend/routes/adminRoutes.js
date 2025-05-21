const express = require("express");
const router = express.Router();
const Admin = require("../models/Admin");

// POST /api/admin/login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    //console.log("Received admin login attempt:", { email, password });

    // Only allow specific admin email (optional hardcode)
    if (email !== "admin123@gmail.com") {
      return res.status(403).json({
        success: false,
        message: "Access denied: Unauthorized admin",
      });
    }

    // Find admin by email
    const existingAdmin = await Admin.findOne({ email });
    if (!existingAdmin) {
      return res.status(404).json({
        success: false,
        message: "Admin not found",
      });
    }

    // Validate password
    if (existingAdmin.password === password) {
      console.log("Admin login successful:", existingAdmin);
      return res.status(200).json({
        success: true,
        message: "Login successful",
        admin: existingAdmin,
      });
    } else {
      console.log("Invalid password for admin:", existingAdmin);
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }
  } catch (error) {
    console.error("Error during admin login:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
});

module.exports = router;
