import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser, FiMail, FiPhone, FiMapPin, FiArrowLeft, FiSave } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { userAPI } from "../utils/api";
import { isAuthenticated, clearAuthData } from "../utils/auth";
import "./Profile.css";

function EditProfile() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    // Check if user is authenticated using the utility function
    if (!isAuthenticated()) {
      navigate("/login");
      return;
    }

    const fetchProfile = async () => {
      try {
        const profile = await userAPI.getProfile();
        setFormData({
          name: profile.name || "",
          email: profile.email || "",
          phone: profile.phone || "",
          address: profile.address || "",
          city: profile.city || "",
          pincode: profile.pincode || "",
        });
      } catch (err) {
        // Check if it's an authentication error
        if (err.message && (err.message.includes("Access denied") || err.message.includes("No token") || err.message.includes("Invalid token"))) {
          // Clear user data and redirect to login
          clearAuthData();
          navigate("/login");
          return;
        }
        setError(err.message || "Failed to load profile");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      setSaving(true);
      const updated = await userAPI.updateProfile(null, formData);

      if (updated.user) {
        localStorage.setItem("userName", updated.user.name || "");
        localStorage.setItem("userEmail", updated.user.email || "");
      }

      setSuccess("Profile updated successfully!");

      setTimeout(() => {
        navigate("/profile");
      }, 1000);
    } catch (err) {
      setError(err.message || "Failed to update profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loader"></div>
        <p>Loading your details...</p>
      </div>
    );
  }

  return (
    <>
      <Navbar />
      <div className="profile-container">
        <div className="profile-card premium-card">
          <div className="profile-header">
            <button className="back-btn" onClick={() => navigate("/profile")}>
              <FiArrowLeft />
            </button>
            <div className="header-text">
              <h2>Edit Profile</h2>
              <p>Maintain your personal boutique presence</p>
            </div>
          </div>

          <form className="profile-form" onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label><FiUser /> Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                />
              </div>

              <div className="form-group">
                <label><FiMail /> Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  disabled
                  title="Email cannot be changed"
                />
                <span className="input-hint">Immutable for security</span>
              </div>

              <div className="form-group">
                <label><FiPhone /> Phone Number</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+91 XXXXX XXXXX"
                />
              </div>

              <div className="form-group">
                <label><FiMapPin /> City</label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Mumbai, Delhi, etc."
                />
              </div>
            </div>

            <div className="form-group full-width">
              <label><FiMapPin /> Delivery Address</label>
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="House No., Street Name, Landmark"
                rows={3}
              />
            </div>

            <div className="form-group">
              <label>Pincode</label>
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
                placeholder="400001"
              />
            </div>

            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <div className="form-actions">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => navigate("/profile")}
              >
                Cancel
              </button>
              <button type="submit" className="save-btn" disabled={saving}>
                {saving ? "Processing..." : <><FiSave /> Save Changes</>}
              </button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default EditProfile;
