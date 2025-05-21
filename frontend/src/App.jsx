import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";

// ✅ Public Pages
import Home from "./pages/user/Home.jsx";
import Blog from "./pages/user/Blog.jsx";
import AboutUs from "./pages/user/About.jsx";
import ContactUs from "./pages/user/Contact.jsx";
import Login from "./pages/user/Login.jsx";
import Signup from "./pages/user/Signup.jsx";
import ForgotPassword from "./pages/user/Forgotpassword.jsx";
import BlogDetails from "./pages/user/BlogDetails.jsx";

// ✅ Admin Pages
import AdminLayout from "./pages/admin/AdminLayout.jsx";
import LoginAdmin from "./pages/admin/LoginAdmin.jsx";
import Dashboard from "./pages/admin/Dashboard.jsx";
import AddBlog from "./pages/admin/AddBlog.jsx";
import DisplayBlog from "./pages/admin/DisplayBlog.jsx";
import EditBlog from "./pages/admin/EditBlog.jsx";
import AdminPrivateRoute from "./pages/admin/AdminPrivateRoute.jsx";

const App = () => {
  return (
    <Router>
      <Routes>
        {/* ✅ Public Pages */}
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        
        
        {/* ✅ Separate Admin Login Route (Matches URL exactly) */}
        <Route path="/admin/loginadmin" element={<LoginAdmin />} />
      {/* ✅ Admin Panel Routes (Everything inside AdminLayout) */}
        <Route path="/admin/*" element={<AdminPrivateRoute><AdminLayout /></AdminPrivateRoute>}>
        {/* <Route path="/admin/*" element={<AdminLayout />}> */}
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="addblog" element={<AddBlog />} />
          <Route path="displayblog" element={<DisplayBlog />} />
          <Route path="editblog/:id" element={<EditBlog />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
