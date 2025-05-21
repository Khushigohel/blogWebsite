const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

const generateOTP = () => {
  let otp = "";
  for (let i = 0; i < 6; i++) {
    otp += Math.floor(Math.random() * 10);
  }
  return otp;
};

// Setup mailtrap transporter
const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: Number(process.env.EMAIL_PORT), // ensure port is a number, not string
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});


// Step 1: Request reset OTP
router.post("/request-reset", async (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ msg: "Email is required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User with this email not found" });

    const otp = generateOTP();
    const expiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

    user.resetOTP = otp;
    user.resetOTPExpiry = expiry;
    await user.save();

    // Send OTP email
    const mailOptions = {
      from: '"Your App" <no-reply@yourapp.com>',
      to: email,
      subject: "Password Reset OTP",
      text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
    };

    await transporter.sendMail(mailOptions);

    res.json({ msg: "OTP sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

// Step 2: Verify OTP and reset password
router.post("/reset-password-with-otp", async (req, res) => {
  const { email, otp, newPassword } = req.body;

  if (!email || !otp || !newPassword)
    return res.status(400).json({ msg: "Email, OTP and new password are required" });

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: "User not found" });

    if (!user.resetOTP || !user.resetOTPExpiry) {
      return res.status(400).json({ msg: "No OTP requested or OTP expired" });
    }

    if (user.resetOTP !== otp) {
      return res.status(400).json({ msg: "Invalid OTP" });
    }

    if (Date.now() > user.resetOTPExpiry) {
      return res.status(400).json({ msg: "OTP has expired" });
    }

    // Update password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);

    // Clear OTP fields
    user.resetOTP = undefined;
    user.resetOTPExpiry = undefined;

    await user.save();

    res.json({ msg: "Password reset successful. You can now login." });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error" });
  }
});

module.exports = router;
