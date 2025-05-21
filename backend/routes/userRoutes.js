const express = require("express");
const bcrypt = require("bcryptjs");
const User = require('../models/User'); 
const router = express.Router();

// Signup Endpoint
router.post("/signup", async (req, res) => {
  const { fullName, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(409).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ fullName, email, password: hashedPassword });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ message: "Server error during signup" });
  }
});

// Login Endpoint
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      console.log("User not found with email:", email);
      return res.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log("❌ Passwords do not match");
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("✅ Password matched!");
    res.status(200).json({ message: "Login successful" });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ message: "Server error during login" });
  }
});

//No-verification password reset
router.post("/reset-password-no-verify", async (req, res) => {
  const { email, newPassword } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: "User not found" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ msg: "Password changed successfully" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});
module.exports = router;