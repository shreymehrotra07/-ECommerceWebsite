import React, { useEffect, useState } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { isAdminAuthenticated } from "../utils/auth";
import adminAuth from "../utils/adminAuth";

/**
 * UserProtectedRoute - Prevents admin users from accessing customer-facing pages
 * 
 * This component checks if the current user is logged in as an admin.
 * If admin is detected, they are redirected to the admin dashboard.
 * Regular users can access the pages normally.
 */
function UserProtectedRoute({ children }) {
  const [isAllowed, setIsAllowed] = useState(null);
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const checkUserAccess = async () => {
      try {
        // Check if user is logged in as admin (using admin auth system)
        const isAdmin = isAdminAuthenticated();
        
        // Also check adminAuth utility for consistency
        const isAdminViaAuth = adminAuth.isAdminAuthenticated();
        
        console.log('UserProtectedRoute - Admin check:', {
          isAdmin,
          isAdminViaAuth,
          adminUserId: localStorage.getItem('admin_userId'),
          adminRole: localStorage.getItem('admin_role')
        });

        // If logged in as admin, block access to user panel
        if (isAdmin || isAdminViaAuth) {
          console.log('⛔ Admin detected - blocking access to user panel');
          setIsAllowed(false);
        } else {
          console.log('✅ Regular user or guest - allowing access');
          setIsAllowed(true);
        }
      } catch (error) {
        console.error('UserProtectedRoute - Error checking access:', error);
        // On error, allow access (fail-safe for regular users)
        setIsAllowed(true);
      } finally {
        setLoading(false);
      }
    };

    checkUserAccess();
  }, []);

  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#0f172a'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '50px',
            height: '50px',
            border: '4px solid rgba(59, 130, 246, 0.2)',
            borderTop: '4px solid #3b82f6',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 16px'
          }}></div>
          <p style={{ color: '#94a3b8', fontSize: '14px' }}>Checking access...</p>
        </div>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </div>
    );
  }

  // If admin is trying to access user panel, redirect to admin dashboard
  if (!isAllowed) {
    console.log('🔄 Redirecting admin to admin dashboard');
    return (
      <Navigate 
        to="/admin/dashboard" 
        state={{ 
          message: "Admin users cannot access the customer panel. Please use the admin dashboard." 
        }} 
        replace 
      />
    );
  }

  // Allow regular users to access the page
  return children;
}

export default UserProtectedRoute;
