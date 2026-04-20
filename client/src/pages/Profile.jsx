import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useOrder } from "../context/OrderContext";
import { useWishlist } from "../context/WishlistContext";
import { userAPI } from "../utils/api";
import adminAuth from "../utils/adminAuth";
import { isAuthenticated, clearAuthData } from "../utils/auth";


import {
  FiUser,
  FiShoppingBag,
  FiSettings,
  FiLogOut,
  FiEdit,
  FiClock,
  FiHeart,
  FiArrowRight,
  FiXCircle,
  FiPackage,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Profile.css";

/* ================= HELPERS ================= */

// ✅ Consistent Order ID getter (uses orderId field)
const getOrderId = (order) => {
  return order?.orderId || order?.id || order?._id || "UNKNOWN";
};

// ✅ Calculate total from order items
const calculateOrderTotal = (items = []) => {
  return items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );
};

/* ================= COMPONENT ================= */

function Profile() {
  console.log("Profile component rendered");
  const navigate = useNavigate();
  const { orders } = useOrder();
  const { totalWishlist } = useWishlist(); // Use wishlist context instead of local state
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if user is authenticated using the utility function
    if (!isAuthenticated()) {
      console.log("User not authenticated, redirecting to login");
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        console.log("Fetching profile data...");
        // 1️⃣ Profile - This will use the cookie-based authentication
        const profile = await userAPI.getProfile();
        console.log("Profile data received:", profile);
        console.log("Profile data type:", typeof profile);
        console.log("Profile data keys:", Object.keys(profile));
        setUser(profile);

        // 2️⃣ Wishlist count is now handled by WishlistContext
        // No need to fetch it separately

      } catch (err) {
        console.error("Profile fetch error:", err);
        console.error("Error details:", {
          message: err.message,
          name: err.name,
          stack: err.stack
        });
        // Check if it's an authentication error
        if (err.message && (err.message.includes("Access denied") || err.message.includes("No token") || err.message.includes("Invalid token"))) {
          // Clear user data and redirect to login
          clearAuthData();
          navigate("/login");
          return;
        }
        // Don't set error state, just use localStorage data as fallback
        setError(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // If we have no user data from API but user is authenticated, use localStorage data
  const displayUser = user || {
    name: localStorage.getItem("userName") || "Guest User",
    email: localStorage.getItem("userEmail") || "Not available",
    // Add other fields as needed
  };
  
  console.log("Display user calculation:", {
    user: user,
    userExists: !!user,
    localStorageName: localStorage.getItem("userName"),
    localStorageEmail: localStorage.getItem("userEmail"),
    finalDisplayUser: displayUser
  });

  console.log("Display user data:", displayUser);

  /* ✅ FIXED TOTAL SPENT */
  const totalSpent = orders.reduce(
    (sum, order) => sum + calculateOrderTotal(order.items),
    0
  );

  const displayName = displayUser.name;
  const displayEmail = displayUser.email;
  const avatarInitial = displayName.charAt(0).toUpperCase();

  /* ================= LOADING ================= */

  console.log("Profile render - loading:", loading, "error:", error, "user:", user, "displayUser:", displayUser);
  
  if (loading) {
    console.log("Showing loading state");
    return (
      <div className="profile-loading">
        <div className="loader"></div>
        <p>Fetching your profile...</p>
      </div>
    );
  }

  /* ================= ERROR ================= */

  if (error) {
    console.log("Showing general error state:", error);
    return (
      <>
        <Navbar />
        <div className="profile-error-container">
          <div className="error-card">
            <FiXCircle className="error-icon" />
            <h2>Error Loading Profile</h2>
            <p>{error}</p>
            <button
              className="login-redirect-btn"
              onClick={() => {
                localStorage.removeItem('userId');
                localStorage.removeItem('userName');
                localStorage.removeItem('userEmail');
                adminAuth.clearAdminAuth();
                navigate("/login");
              }}
            >
              Back to Login
            </button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  /* ================= UI ================= */

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-layout">
          {/* LEFT SIDEBAR */}
          <aside className="profile-sidebar-card">
            <div className="user-avatar-section">
              <div className="avatar-large">{avatarInitial}</div>
              <button className="edit-avatar-btn" onClick={() => navigate("/profile/edit")}>
                <FiEdit />
              </button>
            </div>

            <div className="user-identity">
              <h2>{displayName}</h2>
              <p>{displayEmail}</p>
              <span className="member-badge">Elite Member</span>
            </div>

            <nav className="profile-nav">
              <button className="active">
                <FiUser /> Account Overview
              </button>
              <button onClick={() => navigate("/orders")}>
                <FiClock /> Order History
              </button>
              <button onClick={() => navigate("/wishlist")}>
                <FiHeart /> My Wishlist
              </button>
              <button
                className="logout-btn"
                onClick={() => {
                  localStorage.clear();
                  adminAuth.clearAdminAuth();
                  navigate("/login");
                }}
              >
                <FiLogOut /> Logout
              </button>
            </nav>
          </aside>

          {/* RIGHT DASHBOARD */}
          <main className="profile-dashboard">
            {/* STATS */}
            <div className="dashboard-grid">
              <div className="dash-stat-card">
                <FiShoppingBag />
                <div className="stat-text">
                  <h3>{orders.length}</h3>
                  <span>Total Orders</span>
                </div>
              </div>

              <div className="dash-stat-card">
                <FiHeart />
                <div className="stat-text">
                  <h3>{totalWishlist}</h3>
                  <span>Wishlist Items</span>
                </div>
              </div>

              <div className="dash-stat-card">
                <span className="currency-symbol">₹</span>
                <div className="stat-text">
                  <h3>
                    {totalSpent >= 1000
                      ? `${(totalSpent / 1000).toFixed(1)}k`
                      : totalSpent}
                  </h3>
                  <span>Total Spent</span>
                </div>
              </div>
            </div>

            {/* RECENT ORDERS */}
            <div className="recent-activity">
              <div className="section-header">
                <h2>Recent Orders</h2>
                <button onClick={() => navigate("/orders")}>
                  View All <FiArrowRight />
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="empty-activity">
                  <p>No recent orders found.</p>
                </div>
              ) : (
                <div className="activity-list">
                  {orders.slice(0, 3).map((order) => (
                    <div
                      className="activity-item"
                      key={getOrderId(order)}
                    >
                      <div className="activity-icon">
                        <FiPackage />
                      </div>
                      <div className="activity-info">
                        <h4>Order {getOrderId(order)}</h4>
                        <span>Placed on {new Date(order.createdAt).toLocaleDateString("en-IN", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}</span>
                      </div>
                      <div className="activity-status">
                        <span
                          className={`status-dot ${order.status.toLowerCase()}`}
                        ></span>
                        {order.status}
                      </div>
                      <div className="activity-amount">
                        ₹{calculateOrderTotal(order.items)}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* ACCOUNT INFO */}
            <div className="account-details-card">
              <h2>Account Information</h2>
              <div className="details-grid">
                <div className="detail-field">
                  <label>Full Name</label>
                  <p>{displayName}</p>
                </div>
                <div className="detail-field">
                  <label>Email Address</label>
                  <p>{displayEmail}</p>
                </div>
                <div className="detail-field">
                  <label>Default Currency</label>
                  <p>INR (₹)</p>
                </div>
                <div className="detail-field">
                  <label>Shipping Preference</label>
                  <p>Standard Express</p>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Profile;
