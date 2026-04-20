import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { userAPI } from "../utils/api";
import Toast from "../components/Toast";
import { FiEye, FiEyeOff, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
import adminAuth from "../utils/adminAuth";
// 🔥 Firebase imports for Google Auth
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [toast, setToast] = useState({
    show: false,
    message: "",
    type: "error",
  });

  const showToast = (message, type = "error") => {
    setToast({ show: true, message, type });
    setTimeout(() => {
      setToast({ show: false, message: "", type: "error" });
    }, 2500);
  };

  // 🔥 Google Login Handler (only for existing users)
  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      // 1️⃣ Firebase Google Auth
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // 2️⃣ Send to backend to check if user exists
      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/google-login`, {
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
      });

      const data = await response.json();

      if (!response.ok) {
        // If user doesn't exist, show specific message
        if (response.status === 404) {
          showToast("Account not registered. Please register first.", "error");
          setLoading(false);
          return;
        }
        
        throw new Error(data.message || "Google login failed");
      }

      // 3️⃣ Store user data (token is in HTTP-only cookie)
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);
      
      // Debug: Log the stored data
      console.log('Google Login - Stored user data:', {
        userId: data.user.id,
        userName: data.user.name,
        userEmail: data.user.email
      });
      console.log('Google Login - localStorage after setting:', {
        userId: localStorage.getItem("userId"),
        userName: localStorage.getItem("userName"),
        userEmail: localStorage.getItem("userEmail")
      });

      // 4️⃣ Success and redirect
      showToast("Login successful with Google!", "success");
      setTimeout(() => {
        // Ensure data is set before navigation
        console.log('Google Login - Before navigation, localStorage:', {
          userId: localStorage.getItem("userId"),
          userName: localStorage.getItem("userName"),
          userEmail: localStorage.getItem("userEmail")
        });
        navigate("/");
      }, 1500); // Increased delay to ensure data is set

    } catch (error) {
      console.error("Google Login Error:", error);
      showToast(
        error.response?.data?.message ||
        error.message ||
        "Google login failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Normal Email/Password Login
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      showToast("Please fill in both email and password.", "error");
      return;
    }

    try {
      setLoading(true);

      const res = await userAPI.login({ email, password });

      adminAuth.clearAdminAuth();

      // In cookie-based auth, token is stored in HTTP-only cookie
      // We still store user info in localStorage for UI purposes
      localStorage.setItem("userId", res.user.id);
      localStorage.setItem("userName", res.user.name);
      localStorage.setItem("userEmail", res.user.email);
      
      // Debug: Log the stored data
      console.log('Email Login - Stored user data:', {
        userId: res.user.id,
        userName: res.user.name,
        userEmail: res.user.email
      });
      console.log('Email Login - localStorage after setting:', {
        userId: localStorage.getItem("userId"),
        userName: localStorage.getItem("userName"),
        userEmail: localStorage.getItem("userEmail")
      });

      showToast("Login successful!", "success");
      setTimeout(() => {
        // Ensure data is set before navigation
        console.log('Email Login - Before navigation, localStorage:', {
          userId: localStorage.getItem("userId"),
          userName: localStorage.getItem("userName"),
          userEmail: localStorage.getItem("userEmail")
        });
        navigate("/");
      }, 1500); // Increased delay to ensure data is set
    } catch (err) {
      showToast(
        err.response?.data?.message || "Login failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="auth-wrapper-blue">
      <div className="auth-card-blue">
        <h1 className="auth-brand">
          Foot<span>Cap</span>
        </h1>

        <h2>Welcome Back</h2>
        <p className="subtitle">Login to continue your journey</p>

        <form className="auth-form-blue" onSubmit={handleSubmit}>
          <div className="auth-input-box">
            <input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
            <FiMail className="input-icon" />
          </div>

          <div className="auth-input-box auth-password-field">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
            />
            <FiLock className="input-icon" />

            <button
              type="button"
              className="auth-toggle-password"
              onClick={() => setShowPassword((s) => !s)}
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <div className="auth-row">
            <span></span>
            <Link className="forgot" to="/forgot-password">
              Forgot password?
            </Link>
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? (
              <span className="auth-loader"></span>
            ) : (
              <>
                Login <FiArrowRight />
              </>
            )}
          </button>
        </form>

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

        <p className="auth-switch">
          Don’t have an account? <Link to="/register">Register</Link>
        </p>

        <Toast
          show={toast.show}
          message={toast.message}
          type={toast.type}
          onClose={() =>
            setToast({ show: false, message: "", type: "error" })
          }
        />
      </div>
    </div>
  );
}

export default Login;
