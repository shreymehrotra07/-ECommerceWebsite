import React from "react";
import { useNavigate } from "react-router-dom";
import "./CuratedCollection.css";

function getImageUrl(imagePath) {
  const filename = imagePath.split('/').pop();
  return new URL(`../assets/images/${filename}`, import.meta.url).href;
}

function CuratedCollection() {
  const navigate = useNavigate();

  return (
    <section className="fc-curated">
      <div className="fc-curated-container">

        <div className="fc-curated-heading">
          <div className="fc-curated-heading-left">
            <p className="fc-section-eyebrow">Curated for You</p>
            <h2>Signature <em>Collections</em></h2>
          </div>
          <p className="fc-curated-subtext">
            Two worlds. One standard. Whether you push limits or set trends — there's a series built for you.
          </p>
        </div>

        <div className="fc-curated-grid">

          {/* LEFT CARD */}
          <div className="fc-curated-card" onClick={() => navigate('/collections/performance-elite')}>
            <img src={getImageUrl("Important.png")} alt="Performance Elite" />
            <div className="fc-curated-overlay">
              <span className="fc-curated-label">Series 01</span>
              <h3>Performance <em>Elite</em></h3>
              <p>Engineered for professional athletes. Maximum response, zero gravity feel.</p>
              <button className="fc-curated-btn">Explore Series</button>
            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="fc-curated-card" onClick={() => navigate('/collections/urban-minimalist')}>
            <img src={getImageUrl("Important2.png")} alt="Urban Minimalist" />
            <div className="fc-curated-overlay">
              <span className="fc-curated-label">Series 02</span>
              <h3>Urban <em>Minimalist</em></h3>
              <p>Sleek lines for the modern explorer. Comfort meets high-end street style.</p>
              <button className="fc-curated-btn">View Collection</button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default CuratedCollection;