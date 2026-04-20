import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import AdminSidebar from "./AdminSidebar";
import AdminHeader from "./AdminHeader";
import { NotificationProvider } from "./NotificationContext";
import "./AdminLayout.css";

function AdminLayout() {
  const location = useLocation();
  
  // Hide sidebar and header on login page
  const isLoginPage = location.pathname === "/admin/login";
  
  const toggleMobileMenu = () => {
    // Close mobile menu and sidebar
    const sidebar = document.querySelector('.admin-sidebar');
    const body = document.body;
    if (sidebar) {
      sidebar.classList.remove('active');
    }
    body.classList.remove('sidebar-open');
  };
  
  return (
    <NotificationProvider>
      <div className="admin-layout">
        {!isLoginPage && <AdminSidebar />}
        <div className="admin-main">
          {!isLoginPage && <AdminHeader />}
          <main className="admin-content">
            <Outlet />
          </main>
        </div>
        {!isLoginPage && (
          <div 
            className="sidebar-backdrop" 
            onClick={toggleMobileMenu}
          />
        )}
      </div>
    </NotificationProvider>
  );
}

export default AdminLayout;
