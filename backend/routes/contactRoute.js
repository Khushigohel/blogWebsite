const express = require("express");
const router = express.Router();
const Contact = require("../models/Contact");

router.post("/", async (req, res) => {  // Change to root ("/") to match "/api/contact"
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ msg: "All fields are required." });
  }

  try {
    const newMessage = new Contact({ name, email, message });
    await newMessage.save();
    res.status(200).json({ msg: "Message received!" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
