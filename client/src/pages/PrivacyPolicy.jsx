import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./StaticPage.css";

function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="static-page">
        <div className="static-container">
          <div className="static-card">
            <div className="static-header">
              <h1>Privacy Policy</h1>
              <p>Last updated: January 27, 2025</p>
            </div>
            <div className="static-content">
              <p>
                FootCap Ltd. ("we", "our", or "us") is committed to protecting your privacy. 
                This Privacy Policy explains how we collect, use, and safeguard your personal information.
              </p>
              
              <h2>Information We Collect</h2>
              <p>We collect information you provide directly to us, such as when you:</p>
              <ul>
                <li>Create an account or place an order</li>
                <li>Subscribe to our newsletter</li>
                <li>Contact customer support</li>
                <li>Participate in surveys or promotions</li>
              </ul>
              
              <h2>How We Use Your Information</h2>
              <p>We use your information to:</p>
              <ul>
                <li>Process and fulfill your orders</li>
                <li>Send you order confirmations and shipping updates</li>
                <li>Provide customer support</li>
                <li>Send you marketing communications (with your consent)</li>
                <li>Improve our products and services</li>
                <li>Comply with legal obligations</li>
              </ul>
              
              <h2>Information Sharing</h2>
              <p>We do not sell your personal information. We may share your information with:</p>
              <ul>
                <li>Service providers who help us operate our business</li>
                <li>Shipping carriers to deliver your orders</li>
                <li>Payment processors to handle transactions</li>
                <li>Law enforcement or regulatory authorities when required by law</li>
              </ul>
              
              <h2>Your Rights</h2>
              <p>You have the right to:</p>
              <ul>
                <li>Access and update your personal information</li>
                <li>Request deletion of your data</li>
                <li>Opt out of marketing communications</li>
                <li>Export your data in a portable format</li>
              </ul>
              
              <h2>Security</h2>
              <p>
                We implement industry-standard security measures to protect your personal information. 
                However, no method of transmission over the internet is 100% secure.
              </p>
              
              <h2>Changes to This Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any material changes 
                by posting the new policy on this page and updating the "Last updated" date.
              </p>
              
              <h2>Contact Us</h2>
              <p>If you have questions about this Privacy Policy, please contact us at:</p>
              <p><strong>privacy@footcap.com</strong></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default PrivacyPolicy;