import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { userAPI } from "../utils/api";
import adminAuth from "../utils/adminAuth";
import Toast from "../components/Toast";
import { FiMail, FiLock, FiArrowRight, FiChrome } from "react-icons/fi";
import "../pages/Auth.css";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth as fbAuth, googleProvider } from "../firebase";
import { clearAuthData } from "../utils/auth";

function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "error" });

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => setToast({ show: false, message: "", type: "error" }), 3000);
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      console.log('🔵 Starting Google login...');

      // 1️⃣ Firebase Google Auth
      const result = await signInWithPopup(fbAuth, googleProvider);
      const firebaseUser = result.user;
      console.log('✅ Firebase auth successful:', firebaseUser.email);

      // 2️⃣ Check if this is the authorized admin Google account
      const allowedAdminEmails = [
        "footcap54@gmail.com" // The specific Google account allowed for admin access
      ];

      if (!allowedAdminEmails.includes(firebaseUser.email)) {
        console.error('❌ Email not in allowed list:', firebaseUser.email);
        showToast("Access denied. This Google account is not authorized for admin access.", "error");
        setLoading(false);
        return;
      }

      console.log('✅ Email verification passed');

      // 3️⃣ Send to backend for admin JWT token
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: firebaseUser.displayName,
          email: firebaseUser.email,
          googleId: firebaseUser.uid,
          photo: firebaseUser.photoURL,
        }),
        credentials: 'include' // Include cookies in request
      });

      const data = await response.json();

      if (!response.ok) {
        console.error('❌ Backend auth failed:', data);
        throw new Error(data.message || "Google login failed");
      }

      console.log('✅ Backend auth successful, user data:', data.user);

      // 4️⃣ Verify user role is admin
      if (data.user.role !== "admin") {
        console.error('❌ User role is not admin:', data.user.role);
        showToast("Access denied. Admin privileges required.", "error");
        setLoading(false);
        return;
      }

      // 5️⃣ Double check that this is the authorized admin account
      if (!allowedAdminEmails.includes(data.user.email)) {
        console.error('❌ Email not in allowed list (backend check):', data.user.email);
        showToast("Access denied. This account is not authorized for admin access.", "error");
        setLoading(false);
        return;
      }

      console.log('✅ All verifications passed, storing admin auth...');

      // 6️⃣ Store admin data using separate auth system (token in cookie)
      adminAuth.setAdminAuth(null, data.user);

      // Clear any user tokens to avoid conflicts
      clearAuthData();

      console.log('✅ Admin auth stored, redirecting to dashboard...');

      // 7️⃣ Success and immediate redirect
      showToast("Welcome back, Admin!", "success");
      
      // Redirect to dashboard
      setTimeout(() => {
        console.log('🔄 Redirecting to /admin/dashboard');
        navigate("/admin/dashboard", { replace: true });
      }, 1000);
    } catch (error) {
      console.error("❌ Google Admin Login Error:", error);
      showToast(error.message || "Google login failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await userAPI.login({ email, password });

      // Check if user is admin
      if (res.user.role !== "admin") {
        showToast("Access denied. Admin privileges required.");
        return;
      }

      // Store admin data using separate auth system (token in cookie)
      adminAuth.setAdminAuth(null, res.user); // Pass null as token since it's in cookie

      showToast("Welcome back, Admin!", "success");

      // Redirect to intended page or dashboard
      const from = location.state?.from?.pathname || "/admin/dashboard";
      // Small delay to show success message, then redirect
      setTimeout(() => {
        navigate(from, { replace: true });
      }, 800);
    } catch (err) {
      showToast(err.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper-blue">
      <div className="auth-card-blue">
        <div className="admin-login-header">
          <h1 className="auth-brand">
            Foot<span>Cap</span>
          </h1>
        </div>

        <h2>Admin Login</h2>
        <p className="subtitle">Access your administrative dashboard</p>

        <form className="auth-form-blue" onSubmit={handleSubmit}>
          <div className="auth-input-box">
            <input
              type="email"
              placeholder="Admin email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <FiMail className="input-icon" />
          </div>

          <div className="auth-input-box auth-password-field">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FiLock className="input-icon" />
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? <span className="auth-loader"></span> : <>Login <FiArrowRight /></>}
          </button>

          {/* 🔹 OR DIVIDER */}
          <div className="auth-divider">
            <span>OR</span>
          </div>

          {/* 🔥 GOOGLE SIGN IN BUTTON */}
          <button
            type="button"
            onClick={handleGoogleLogin}
            disabled={loading}
            className="google-signin-btn"
          >
            {loading ? (
              <span className="auth-loader dark"></span>
            ) : (
              <>
                <img
                  src="https://developers.google.com/identity/images/g-logo.png"
                  alt="Google"
                  className="google-icon"
                />
                <span>Sign in with Google</span>
              </>
            )}
          </button>
        </form>

        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() => setToast({ show: false, message: "", type: "error" })}
        />
      </div>
    </div>
  );
}

export default AdminLogin;
