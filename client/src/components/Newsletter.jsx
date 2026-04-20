import React, { useState } from "react";
import "./Newsletter.css";

function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubmitted(true);
      setEmail("footcap54@gmail.com");
    }
  };

  return (
    <section className="fc-newsletter">
      <div className="fc-newsletter-container">

        <div className="fc-newsletter-left">
          <p className="fc-newsletter-eyebrow">Inner Circle</p>
          <h2 className="fc-newsletter-title">
            First Access.<br />
            <em>Always.</em>
          </h2>
        </div>

        <div className="fc-newsletter-right">
          {submitted ? (
            <div style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: '32px',
              fontWeight: 700,
              color: '#fff',
              lineHeight: 1.2
            }}>
              You're on the list.
              <br />
              <span style={{ fontStyle: 'italic', opacity: 0.7, fontSize: '20px', fontWeight: 400 }}>
                Expect something special.
              </span>
            </div>
          ) : (
            <>
              <p className="fc-newsletter-desc">
                Subscribe for early access to limited drops, member-only discounts,
                and insider news before anyone else.
              </p>
              <form className="fc-newsletter-form" onSubmit={handleSubmit}>
                <input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="fc-newsletter-submit">
                  Join Now
                </button>
              </form>
              <p className="fc-newsletter-note">No spam. Unsubscribe anytime.</p>
            </>
          )}
        </div>
      </div>
    </section>
  );
}

export default Newsletter;