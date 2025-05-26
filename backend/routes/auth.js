const express = require("express");
const router = express.Router();
const crypto = require("crypto");
const User = require("../models/User");
const OTP = require("../models/otpStore");
const fetch = require("node-fetch");
const bcrypt = require("bcryptjs");

const EMAILJS_SERVICE_ID = "service_n466rff";
const EMAILJS_TEMPLATE_ID = "template_738r592";
const EMAILJS_PUBLIC_KEY = "FapwK4xIgpqbQc_iN";

// ✅ SEND OTP
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    // 1. Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // 2. Generate OTP
    const otp = crypto.randomInt(100000, 999999).toString();

    // 3. Store in DB with 20 mins expiry
    await OTP.create({
      email,
      otp,
      expiresAt: new Date(Date.now() + 20 * 60 * 1000),
    });

    // 4. Send email via EmailJS
    const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
      method: "POST",
      headers: {
        origin: "http://localhost",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          email,
          passcode: otp,
          time: new Date().toLocaleTimeString(),
        },
      }),
    });

    const result = await response.text();
    console.log("EmailJS Response:", result);

    if (!response.ok) {
      return res.status(500).json({ message: "Failed to send OTP email" });
    }

    return res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.error("Error sending OTP:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

// ✅ VERIFY OTP
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;
    const otpEntry = await OTP.findOne({ email, otp });

    if (!otpEntry) return res.status(400).json({ message: "Invalid OTP" });
    if (otpEntry.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

// ✅ RESET PASSWORD
router.post("/reset-password", async (req, res) => {
  try {
    const { email, otp, newPassword } = req.body;
    const otpEntry = await OTP.findOne({ email, otp });

    if (!otpEntry) return res.status(400).json({ message: "Invalid OTP" });
    if (otpEntry.expiresAt < new Date()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    const user = await User.findOneAndUpdate(
      { email },
      { password: hashedPassword },
      { new: true }
    );

    if (!user) return res.status(404).json({ message: "User not found" });

    await OTP.deleteOne({ _id: otpEntry._id });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    console.error("Error resetting password:", error);
    return res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;





// const generateOTP = () => {
//   let otp = "";
//   for (let i = 0; i < 6; i++) {
//     otp += Math.floor(Math.random() * 10);
//   }
//   return otp;
// };

// // Setup mailtrap transporter
// const transporter = nodemailer.createTransport({
//   host: process.env.EMAIL_HOST,
//   port: Number(process.env.EMAIL_PORT), // ensure port is a number, not string
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });


// // Step 1: Request reset OTP
// router.post("/request-reset", async (req, res) => {
//   const { email } = req.body;

//   if (!email) return res.status(400).json({ msg: "Email is required" });

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: "User with this email not found" });

//     const otp = generateOTP();
//     const expiry = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes

//     user.resetOTP = otp;
//     user.resetOTPExpiry = expiry;
//     await user.save();

//     // Send OTP email
//     const mailOptions = {
//       from: '"Your App" <no-reply@yourapp.com>',
//       to: email,
//       subject: "Password Reset OTP",
//       text: `Your OTP for password reset is: ${otp}. It is valid for 10 minutes.`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.json({ msg: "OTP sent to your email" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// // Step 2: Verify OTP and reset password
// router.post("/reset-password-with-otp", async (req, res) => {
//   const { email, otp, newPassword } = req.body;

//   if (!email || !otp || !newPassword)
//     return res.status(400).json({ msg: "Email, OTP and new password are required" });

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: "User not found" });

//     if (!user.resetOTP || !user.resetOTPExpiry) {
//       return res.status(400).json({ msg: "No OTP requested or OTP expired" });
//     }

//     if (user.resetOTP !== otp) {
//       return res.status(400).json({ msg: "Invalid OTP" });
//     }

//     if (Date.now() > user.resetOTPExpiry) {
//       return res.status(400).json({ msg: "OTP has expired" });
//     }

//     // Update password
//     const salt = await bcrypt.genSalt(10);
//     user.password = await bcrypt.hash(newPassword, salt);

//     // Clear OTP fields
//     user.resetOTP = undefined;
//     user.resetOTPExpiry = undefined;

//     await user.save();

//     res.json({ msg: "Password reset successful. You can now login." });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ msg: "Server error" });
//   }
// });

// module.exports = router;

