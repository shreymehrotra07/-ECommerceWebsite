import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.css";
import { userAPI } from "../utils/api";
import Toast from "../components/Toast";
import { FiEye, FiEyeOff, FiUser, FiMail, FiLock, FiArrowRight } from "react-icons/fi";
// 🔥 Firebase imports
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider } from "../firebase";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

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

  // Password validation function
  const validatePassword = (pwd) => {
    const errors = [];
    
    if (pwd.length < 6) {
      errors.push("Password must be at least 6 characters long");
    }
    
    if (!/[A-Z]/.test(pwd)) {
      errors.push("Password must contain at least one uppercase letter");
    }
    
    if (!/[a-z]/.test(pwd)) {
      errors.push("Password must contain at least one lowercase letter");
    }
    
    if (!/\d/.test(pwd)) {
      errors.push("Password must contain at least one number");
    }
    
    return errors;
  };

  // 🔥 Google Registration with Backend Integration
  const handleGoogleRegister = async () => {
    try {
      setLoading(true);

      // 1️⃣ Firebase Google Auth
      const result = await signInWithPopup(auth, googleProvider);
      const firebaseUser = result.user;

      // 2️⃣ Send to backend for JWT token and user creation
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
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google registration failed");
      }

      // 3️⃣ Store user data (token is in HTTP-only cookie)
      localStorage.setItem("userId", data.user.id);
      localStorage.setItem("userName", data.user.name);
      localStorage.setItem("userEmail", data.user.email);

      // 4️⃣ Success and redirect
      showToast("Registration successful with Google!", "success");
      setTimeout(() => {
        navigate("/");
      }, 1200);

    } catch (error) {
      console.error("Google Registration Error:", error);
      showToast(
        error.response?.data?.message ||
        error.message ||
        "Google registration failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !confirmPassword) {
      showToast("Please fill in all fields.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    // Validate password strength
    const passwordErrors = validatePassword(password);
    if (passwordErrors.length > 0) {
      showToast(passwordErrors.join(". "), "error");
      return;
    }

    try {
      setLoading(true);

      const res = await userAPI.register({ name, email, password });

      // In cookie-based auth, token is stored in HTTP-only cookie
      // We still store user info in localStorage for UI purposes
      localStorage.setItem("userId", res.user.id);
      localStorage.setItem("userName", res.user.name);
      localStorage.setItem("userEmail", res.user.email);

      showToast("Account created successfully!", "success");
      setTimeout(() => navigate("/"), 1200);
    } catch (err) {
      showToast(
        err.response?.data?.message ||
        err.message ||
        "Registration failed. Please try again.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-wrapper-blue">
      <div className="auth-card-blue">
        {/* BRAND */}
        <h1 className="auth-brand">
          Foot<span>Cap</span>
        </h1>

        <h2>Create Account</h2>
        <p className="subtitle">Join FootCap and step into the future</p>

        <form className="auth-form-blue" onSubmit={handleSubmit}>
          <div className="auth-input-box">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoComplete="name"
            />
            <FiUser className="input-icon" />
          </div>

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
              autoComplete="new-password"
            />
            <FiLock className="input-icon" />

            <button
              type="button"
              className="auth-toggle-password"
              onClick={() => setShowPassword((s) => !s)}
              aria-label="Toggle Password"
            >
              {showPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          {/* Password Requirements */}
          {password && (
            <div className="password-requirements" style={{
              marginTop: '8px',
              padding: '12px',
              backgroundColor: '#f8f9fa',
              borderRadius: '6px',
              fontSize: '13px'
            }}>
              <p style={{ margin: '0 0 8px 0', fontWeight: '600', color: '#333' }}>Password Requirements:</p>
              <ul style={{ margin: 0, paddingLeft: '20px', listStyle: 'none' }}>
                <li style={{ 
                  color: password.length >= 6 ? '#22c55e' : '#ef4444',
                  marginBottom: '4px'
                }}>
                  {password.length >= 6 ? '✓' : '✗'} At least 6 characters
                </li>
                <li style={{ 
                  color: /[A-Z]/.test(password) ? '#22c55e' : '#ef4444',
                  marginBottom: '4px'
                }}>
                  {/[A-Z]/.test(password) ? '✓' : '✗'} One uppercase letter
                </li>
                <li style={{ 
                  color: /[a-z]/.test(password) ? '#22c55e' : '#ef4444',
                  marginBottom: '4px'
                }}>
                  {/[a-z]/.test(password) ? '✓' : '✗'} One lowercase letter
                </li>
                <li style={{ 
                  color: /\d/.test(password) ? '#22c55e' : '#ef4444'
                }}>
                  {/\d/.test(password) ? '✓' : '✗'} One number
                </li>
              </ul>
            </div>
          )}

          <div className="auth-input-box auth-password-field">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              autoComplete="new-password"
            />
            <FiLock className="input-icon" />

            <button
              type="button"
              className="auth-toggle-password"
              onClick={() => setShowConfirmPassword((s) => !s)}
              aria-label="Toggle Confirm Password"
            >
              {showConfirmPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>

          <button type="submit" disabled={loading} className="auth-btn">
            {loading ? <span className="auth-loader"></span> : <>Create Account <FiArrowRight /></>}
          </button>
        </form>

        {/* 🔹 OR DIVIDER */}
        <div className="auth-divider">
          <span>OR</span>
        </div>

        {/* 🔥 GOOGLE SIGN IN BUTTON */}
        <button
          type="button"
          onClick={handleGoogleRegister}
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
              <span>Sign up with Google</span>
            </>
          )}
        </button>

        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>

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

export default Register;
