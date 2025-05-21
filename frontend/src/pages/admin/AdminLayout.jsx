import React from "react";
import { Outlet } from "react-router-dom"; 
import AdminSidebar from "./AdminSidebar.jsx";
import "./style.css"; 

const AdminLayout = () => {
  return (
    <div className="admin-container">
      {/* ✅ Sidebar on the left */}
      <AdminSidebar />

      {/* ✅ Main Content (Admin Pages Load Here) */}
      <div className="admin-content">
        <Outlet />  {/* ✅ This renders Dashboard, AddBlog, etc. */}
      </div>
    </div>
  );
};

export default AdminLayout;
