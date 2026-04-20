import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./StaticPage.css";

function AboutUs() {
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
              <h1>About FootCap</h1>
            </div>
            <div className="static-content">
              <p>
                Founded in 2024, FootCap is revolutionizing the footwear industry by merging cutting-edge technology with uncompromising style. 
                We believe that premium footwear should not only look exceptional but also deliver unparalleled performance and comfort.
              </p>
              
              <h2>Our Mission</h2>
              <p>
                To craft the future of footwear by combining high-performance materials, innovative design, and sustainable practices. 
                We're committed to creating shoes that empower athletes and style enthusiasts alike to step confidently into tomorrow.
              </p>
              
              <h2>What Sets Us Apart</h2>
              <ul>
                <li><strong>Performance Innovation:</strong> Advanced cushioning and support technologies</li>
                <li><strong>Sustainable Materials:</strong> Eco-friendly production processes</li>
                <li><strong>Style Meets Function:</strong> Designs that transition seamlessly from gym to street</li>
                <li><strong>Premium Quality:</strong> Crafted with attention to every detail</li>
              </ul>
              
              <h2>Join the Movement</h2>
              <p>
                At FootCap, we're not just selling shoes – we're building a community of forward-thinkers who demand the best in both performance and style. 
                Step into the future with us.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;