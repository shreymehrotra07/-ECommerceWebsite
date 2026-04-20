import React from "react";
import "./Footer.css";
import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="fc-footer">
      <div className="fc-footer-container">

        {/* BRAND */}
        <div className="fc-footer-brand">
          <div className="fc-footer-logo">
            <div className="fc-footer-logo-icon"><span>F</span></div>
            <span className="fc-footer-logo-name">Foot<em>Cap</em></span>
          </div>
          <p className="fc-footer-tagline">
            "Where performance meets permanence."
          </p>
          <p className="fc-footer-desc">
            Crafting the future of footwear since 2024. Merging high-performance
            technology with uncompromising design — for athletes, creators, and culture-makers.
          </p>
          <div className="fc-socials">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="fc-social-link" title="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="fc-social-link" title="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="fc-social-link" title="YouTube">
              <FaYoutube />
            </a>
          </div>
        </div>

        {/* SHOP */}
        <div className="fc-footer-col">
          <h4>Shop</h4>
          <Link to="/menproduct">Men's Footwear</Link>
          <Link to="/womenproduct">Women's Footwear</Link>
          <Link to="/new-arrivals">New Drops</Link>
          <Link to="/collections/performance-elite">Performance Elite</Link>
          <Link to="/collections/urban-minimalist">Urban Minimalist</Link>
        </div>

        {/* SUPPORT */}
        <div className="fc-footer-col">
          <h4>Support</h4>
          <Link to="/orders">Order Tracking</Link>
          <Link to="/shipping-policy">Shipping Policy</Link>
          <Link to="/returns-policy">Returns & Exchanges</Link>
          <Link to="/faq">FAQ</Link>
        </div>

        {/* COMPANY */}
        <div className="fc-footer-col">
          <h4>Company</h4>
          <Link to="/about">About Us</Link>
          <Link to="/careers">Careers</Link>
          <Link to="/privacy-policy">Privacy Policy</Link>
          <Link to="/terms-of-service">Terms of Service</Link>
        </div>

      </div>

      <div className="fc-footer-bottom">
        <span className="fc-footer-copy">© 2026 FootCap Ltd. All rights reserved.</span>
        <div className="fc-footer-bottom-links">
          <Link to="/privacy-policy">Privacy</Link>
          <Link to="/terms-of-service">Terms</Link>
          <Link to="/faq">Help</Link>
        </div>
      </div>
    </footer>
  );
}

export default Footer;