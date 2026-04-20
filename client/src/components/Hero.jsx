import React from "react";
import heroImg from "../assets/images/collection-3.jpg";
import "./Hero.css";
import { useNavigate } from "react-router-dom";

function Hero() {
  const navigate = useNavigate();

  return (
    <section className="fc-hero">

      {/* LEFT — DARK CHARCOAL */}
      <div className="fc-hero-left-panel">
        <div className="fc-hero-content">

          <div className="fc-hero-eyebrow">
            <span className="fc-eyebrow-pill">New Drop</span>
            <span className="fc-eyebrow-year">SS 2025</span>
          </div>

          <h1 className="fc-hero-title">Step Into</h1>
          <h2 className="fc-hero-title-alt">the Future.</h2>

          <p className="fc-hero-desc">
            Premium sneakers engineered for comfort, performance
            and street-style dominance. Made for those who lead.
          </p>

          <div className="fc-hero-actions">
            <button className="fc-btn-primary" onClick={() => navigate("/new-arrivals")}>
              Shop Now
            </button>
            <button className="fc-btn-ghost" onClick={() => navigate("/collections/performance-elite")}>
              Explore
            </button>
          </div>

          <div className="fc-hero-stats">
            <div className="fc-stat">
              <div className="fc-stat-num">4.9K+</div>
              <div className="fc-stat-label">Happy Customers</div>
            </div>
            <div className="fc-stat">
              <div className="fc-stat-num">120+</div>
              <div className="fc-stat-label">Premium Styles</div>
            </div>
            <div className="fc-stat">
              <div className="fc-stat-num">98%</div>
              <div className="fc-stat-label">Satisfaction</div>
            </div>
          </div>

        </div>
      </div>

      {/* RIGHT — WARM CARD SURFACE */}
      <div className="fc-hero-right-panel">
        <div className="fc-hero-visual">
          <div className="fc-hero-dots" />
          <div className="fc-hero-img-wrap">
            <img src={heroImg} alt="Hero Shoe" />
          </div>
          <div className="fc-hero-tag">
            <p>Starting at</p>
            <span>₹4,999</span>
          </div>
        </div>
        <span className="fc-hero-panel-label">New Collection 2025</span>
      </div>

    </section>
  );
}

export default Hero;