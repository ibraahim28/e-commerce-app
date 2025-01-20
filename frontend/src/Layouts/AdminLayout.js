// components/AdminLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../components/AdminSidebar";

const AdminLayout = () => {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex-1 bg-soft-beige p-4 overflow-y-auto">
        <Outlet /> {/* Nested routes will render here */}
      </div>
    </div>
  );
};

export default AdminLayout;
