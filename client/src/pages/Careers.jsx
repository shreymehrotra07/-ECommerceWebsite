import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./StaticPage.css";

function Careers() {
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
              <h1>Join Our Team</h1>
            </div>
            <div className="static-content">
              <p>
                At FootCap, we're always looking for passionate individuals who share our vision of crafting the future of footwear. 
                If you're excited about innovation, sustainability, and style, we'd love to hear from you.
              </p>
              
              <h2>Current Opportunities</h2>
              <div className="career-position">
                <h3>Senior Product Designer</h3>
                <p>Lead the design of our next-generation footwear, combining aesthetics with performance requirements.</p>
                <ul>
                  <li>5+ years of footwear design experience</li>
                  <li>Strong portfolio in both athletic and lifestyle footwear</li>
                  <li>Knowledge of sustainable materials and manufacturing</li>
                </ul>
              </div>
              
              <div className="career-position">
                <h3>E-commerce Marketing Manager</h3>
                <p>Drive digital marketing strategies to grow our brand and customer base.</p>
                <ul>
                  <li>3+ years in e-commerce marketing</li>
                  <li>Experience with social media advertising and influencer partnerships</li>
                  <li>Data-driven approach to campaign optimization</li>
                </ul>
              </div>
              
              <div className="career-position">
                <h3>Supply Chain Analyst</h3>
                <p>Optimize our supply chain for efficiency while maintaining quality standards.</p>
                <ul>
                  <li>Bachelor's degree in Supply Chain Management or related field</li>
                  <li>2+ years in manufacturing or supply chain roles</li>
                  <li>Familiarity with sustainability practices in manufacturing</li>
                </ul>
              </div>
              
              <h2>Benefits</h2>
              <ul>
                <li>Competitive salary and equity options</li>
                <li>Comprehensive health and wellness benefits</li>
                <li>Fitness allowance and company discounts</li>
                <li>Flexible working arrangements</li>
                <li>Professional development opportunities</li>
                <li>Company-sponsored footwear collection</li>
              </ul>
              
              <p><strong>Ready to join us? Send your resume and portfolio to careers@footcap.com</strong></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Careers;