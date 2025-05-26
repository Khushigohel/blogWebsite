require('dotenv').config(); 
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();
app.use(cors());
app.use(express.json());

// Import Routes
const blogRoutes = require("./routes/blogRoutes");
app.use("/api/blogs", blogRoutes);

const userRoutes = require("./routes/userRoutes");
app.use("/api", userRoutes);

const adminRoutes = require("./routes/adminRoutes"); 
app.use("/api/admin", adminRoutes); 

const contactRoutes = require("./routes/contactRoute");
app.use("/api/contact", contactRoutes);


// Serve Uploaded Images
app.use("/uploads", express.static("uploads"));

const authRoutes = require("./routes/auth");
app.use("/api/auth", authRoutes);  // 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));