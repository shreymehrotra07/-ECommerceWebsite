import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";
import adminAuth from "../utils/adminAuth";
import { clearAuthData, clearAdminAuthData } from "../utils/auth";
import NotificationDropdown from "./NotificationDropdown";
import "./AdminLayout.css";

function AdminHeader() {
  const navigate = useNavigate();
  const [adminName, setAdminName] = useState("Admin");

  useEffect(() => {
    const aName = localStorage.getItem("admin_userName");
    const uName = localStorage.getItem("userName");
    if (aName) setAdminName(aName);
    else if (uName) setAdminName(uName);
  }, []);

  const handleLogout = () => {
    adminAuth.clearAdminAuth();
    clearAuthData();
    clearAdminAuthData();
    navigate("/admin/login");
  };

  return (
    <header className="admin-header">
      <div className="admin-header-content">

        <div className="admin-header-left">
          <h1>Admin Dashboard</h1>
        </div>

        <div className="admin-header-right">
          <NotificationDropdown />

          <div className="admin-profile-menu">
            <div className="admin-avatar">
              {adminName.charAt(0).toUpperCase()}
            </div>
            <div className="admin-info">
              <span className="admin-name">{adminName}</span>
              <span className="admin-role">Admin</span>
            </div>
          </div>

          <button className="admin-logout-btn" onClick={handleLogout}>
            <FiLogOut />
            <span>Logout</span>
          </button>
        </div>

      </div>
    </header>
  );
}

export default AdminHeader;