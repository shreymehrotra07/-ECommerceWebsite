import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./StaticPage.css";

function FAQ() {
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
              <h1>Frequently Asked Questions</h1>
            </div>
            <div className="static-content">
              <div className="faq-item">
                <h3>What is FootCap's return policy?</h3>
                <p>We offer a 30-day return policy for all unused items in their original packaging. Returns are free and can be initiated through your account dashboard.</p>
              </div>
              
              <div className="faq-item">
                <h3>How long does shipping take?</h3>
                <p>Standard shipping typically takes 3-5 business days. Express shipping options are available for faster delivery. Shipping times may vary based on your location.</p>
              </div>
              
              <div className="faq-item">
                <h3>Are FootCap shoes true to size?</h3>
                <p>Our shoes are designed to fit true to size. However, we recommend checking our detailed size guide on each product page for the most accurate fit information.</p>
              </div>
              
              <div className="faq-item">
                <h3>Do you offer international shipping?</h3>
                <p>Yes, we ship to select international destinations. International shipping costs and delivery times will be calculated at checkout based on your location.</p>
              </div>
              
              <div className="faq-item">
                <h3>What makes FootCap different from other footwear brands?</h3>
                <p>FootCap combines high-performance technology with contemporary style, creating footwear that excels both in the gym and on the street. We're also committed to sustainability in our materials and manufacturing processes.</p>
              </div>
              
              <div className="faq-item">
                <h3>How do I track my order?</h3>
                <p>Once your order ships, you'll receive a tracking number via email. You can also track your order status through the "My Orders" section of your account.</p>
              </div>
              
              <div className="faq-item">
                <h3>Can I exchange my shoes for a different size?</h3>
                <p>Yes, exchanges are easy. You can request a size exchange within 30 days of purchase. Simply contact our customer support team with your order number and the size you'd like to exchange for.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default FAQ;