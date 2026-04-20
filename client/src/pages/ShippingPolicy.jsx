import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./StaticPage.css";

function ShippingPolicy() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <Navbar />
      <div className="static-page">
        <div className="static-container">
          <div className="static-card">
            <div className="static-header">
              <h1>Shipping Policy</h1>
              <p>Last updated: January 2025</p>
            </div>
            <div className="static-content">
              <p>
                Thank you for shopping with FootCap Ltd. We are committed to ensuring your order reaches you 
                safely and in a timely manner. This Shipping Policy outlines our shipping procedures, 
                timelines, and important information you should know.
              </p>
              
              <h2>📦 Processing Time</h2>
              <p>
                All orders are processed within <strong>1-2 business days</strong> (Monday to Friday, excluding holidays) 
                after payment verification. Orders placed on weekends or public holidays will be processed 
                on the next business day.
              </p>
              <p>
                You will receive a confirmation email with tracking information once your order has been 
                shipped.
              </p>
              
              <h2>🚚 Shipping Methods & Delivery Times</h2>
              <p>We offer the following shipping options:</p>
              <ul>
                <li><strong>Standard Shipping:</strong> 5-7 business days</li>
                <li><strong>Express Shipping:</strong> 2-3 business days</li>
                <li><strong>Next Day Delivery:</strong> 1 business day (available in select cities)</li>
              </ul>
              <p>
                Delivery times are estimates and may vary based on your location, customs processing 
                (for international orders), and other factors beyond our control.
              </p>
              
              <h2>💰 Shipping Costs</h2>
              <p>
                <strong>Free Standard Shipping</strong> on all orders above <strong>₹999</strong>.
              </p>
              <p>For orders below ₹999:</p>
              <ul>
                <li>Standard Shipping: ₹99</li>
                <li>Express Shipping: ₹199</li>
                <li>Next Day Delivery: ₹299</li>
              </ul>
              <p>
                Shipping costs are calculated at checkout based on your location and selected shipping method.
              </p>
              
              <h2>📍 Delivery Areas</h2>
              <p>
                We currently ship to <strong>all major cities and towns across India</strong>. 
                For remote or international locations, please contact our customer support for availability 
                and special shipping arrangements.
              </p>
              
              <h2>📋 Order Tracking</h2>
              <p>
                Once your order is shipped, you will receive:
              </p>
              <ul>
                <li>A shipping confirmation email with tracking number</li>
                <li>Real-time tracking link to monitor your package</li>
                <li>Delivery status updates via email and SMS</li>
              </ul>
              <p>
                You can also track your order by visiting the <strong>Order Tracking</strong> page in your account.
              </p>
              
              <h2>🏠 Delivery Instructions</h2>
              <p>To ensure successful delivery:</p>
              <ul>
                <li>Provide a complete and accurate shipping address</li>
                <li>Include a valid phone number for delivery contact</li>
                <li>Ensure someone is available to receive the package</li>
                <li>For apartments/buildings, provide floor number and any access codes</li>
              </ul>
              <p>
                If no one is available to receive the delivery, the courier may leave a notice with 
                pickup instructions or attempt redelivery.
              </p>
              
              <h2>🌍 International Shipping</h2>
              <p>
                We currently focus on domestic shipping within India. For international orders, 
                please contact our customer support at <strong>support@footcap.com</strong> to discuss 
                shipping options, customs duties, and delivery timelines.
              </p>
              <p>
                <strong>Note:</strong> International customers are responsible for any customs duties, 
                taxes, or import fees levied by their country.
              </p>
              
              <h2>📦 Packaging</h2>
              <p>
                All FootCap products are carefully packaged in our premium branded boxes to ensure 
                they arrive in perfect condition. We use eco-friendly packaging materials whenever 
                possible.
              </p>
              
              <h2>⚠️ Shipping Delays</h2>
              <p>
                While we strive to deliver on time, some factors may cause delays:
              </p>
              <ul>
                <li>Peak shopping seasons (festivals, sales events)</li>
                <li>Weather conditions or natural disasters</li>
                <li>Customs clearance for international shipments</li>
                <li>Incorrect or incomplete address information</li>
                <li>Courier service disruptions</li>
              </ul>
              <p>
                If your order is delayed, we will notify you via email with an updated delivery estimate.
              </p>
              
              <h2>🔄 Lost or Damaged Packages</h2>
              <p>
                <strong>Lost Package:</strong> If your tracking shows "delivered" but you haven't received 
                your order, please contact us within 7 days.
              </p>
              <p>
                <strong>Damaged Package:</strong> If your order arrives damaged, please:
              </p>
              <ul>
                <li>Take photos of the damage immediately</li>
                <li>Do not discard the packaging</li>
                <li>Contact us within 48 hours of delivery</li>
                <li>We will arrange a replacement or full refund</li>
              </ul>
              
              <h2>🚫 Undeliverable Packages</h2>
              <p>
                If a package cannot be delivered after multiple attempts or is returned due to 
                incorrect address, we will:
              </p>
              <ul>
                <li>Contact you to verify the correct address</li>
                <li>Offer reshipping (additional shipping charges may apply)</li>
                <li>Process a refund (minus original shipping cost) if you prefer</li>
              </ul>
              
              <h2>📞 Contact Us</h2>
              <p>
                If you have any questions about our shipping policy or need assistance with your order:
              </p>
              <ul>
                <li><strong>Email:</strong> support@footcap.com</li>
                <li><strong>Phone:</strong> +91-XXXXXXXXXX (Mon-Fri, 9 AM - 6 PM IST)</li>
                <li><strong>Live Chat:</strong> Available on our website</li>
              </ul>
              <p>
                Our customer support team is here to help and will respond to your inquiry within 
                <strong> 24 hours</strong>.
              </p>
              
              <h2>📝 Policy Updates</h2>
              <p>
                We may update this Shipping Policy from time to time. Any changes will be posted on 
                this page with an updated revision date. We encourage you to review this policy 
                periodically.
              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ShippingPolicy;
