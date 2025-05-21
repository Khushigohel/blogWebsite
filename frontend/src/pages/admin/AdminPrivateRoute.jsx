// src/components/AdminPrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const AdminPrivateRoute = ({ children }) => {
  const isAdminLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true";

  if (!isAdminLoggedIn) {
    return <Navigate to="/admin/loginadmin" replace />;
  }

  return children;
};

export default AdminPrivateRoute;
