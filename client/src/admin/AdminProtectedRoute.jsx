import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { getAdminProfile } from "../utils/adminAPI";
import { adminApiCall } from "../utils/api";
import adminAuth from "../utils/adminAuth";

function AdminProtectedRoute({ children }) {
  const [isAdmin, setIsAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkAdminAccess = async () => {
      // Check if admin is authenticated using our separate auth system
      if (!adminAuth.isAdminAuthenticated()) {
        console.log("Admin not authenticated - redirecting to login");
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        console.log("Admin authenticated, verifying with backend...");
        // Use admin API to verify admin access
        const profile = await getAdminProfile();
        console.log("Admin profile response:", profile);
        
        if (profile && profile.role === "admin") {
          console.log("Admin access verified");
          setIsAdmin(true);
        } else {
          console.log("User is not admin");
          setIsAdmin(false);
        }
      } catch (error) {
        console.error("Admin check failed:", error);
        // If verification fails, clear auth and redirect to login
        adminAuth.clearAdminAuth();
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    checkAdminAccess();
  }, []);

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loader"></div>
        <p>Verifying access...</p>
      </div>
    );
  }

  if (!isAdmin) {
    // Store the attempted URL to redirect after login
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  return children;
}

export default AdminProtectedRoute;
