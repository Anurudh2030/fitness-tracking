import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const AdminPrivateRoute = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const isAdmin = user && user.role === "admin"; // Check if the user is an admin

  return isAdmin ? <Outlet /> : <Navigate to="/login" replace />;
};

export default AdminPrivateRoute;