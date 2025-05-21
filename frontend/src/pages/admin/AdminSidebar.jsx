import React from "react";
import { Link } from "react-router-dom";
import "./style.css";

const AdminSidebar = () => {
  const handleLogout = () => {
    localStorage.removeItem("isAdminLoggedIn");
    window.location.href = "/admin/loginadmin";
  };
  
  return (
    <div className="admin-sidebar">
      <h2 className="sidebar-logo">Admin Panel</h2>
      <ul>
        <li><Link to="/admin/dashboard">🏠 Dashboard</Link></li>
        <li><Link to="/admin/addblog">📝 Add Blog</Link></li>
        <li><Link to="/admin/displayblog">📑 Manage Blogs</Link></li>
        <button onClick={handleLogout} className="logout-btn">🚪 Log Out</button>
        <li><Link to="/">🔙 Back to Site</Link></li>
      </ul>
    </div>
  );
};

export default AdminSidebar;
