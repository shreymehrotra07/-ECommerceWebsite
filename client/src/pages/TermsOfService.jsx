import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./StaticPage.css";

function TermsOfService() {
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
              <h1>Terms of Service</h1>
              <p>Last updated: January 27, 2025</p>
            </div>
            <div className="static-content">
              <p>
                Welcome to FootCap. These Terms of Service ("Terms") govern your access to and use of our website and services. 
                By accessing or using our services, you agree to be bound by these Terms.
              </p>
              
              <h2>Use of Services</h2>
              <p>You may use our services only for lawful purposes and in accordance with these Terms. You agree not to:</p>
              <ul>
                <li>Use our services for any illegal or unauthorized purpose</li>
                <li>Attempt to gain unauthorized access to our systems</li>
                <li>Interfere with or disrupt the integrity of our services</li>
                <li>Use our services to transmit harmful or malicious content</li>
              </ul>
              
              <h2>Account Registration</h2>
              <p>
                To access certain features, you may need to create an account. You are responsible for maintaining the 
                confidentiality of your account credentials and for all activities that occur under your account.
              </p>
              
              <h2>Orders and Payment</h2>
              <p>
                All orders are subject to availability and acceptance. We reserve the right to refuse or cancel any order 
                for any reason. Prices are subject to change without notice. You agree to provide accurate payment information 
                and authorize us to charge your payment method for the total amount of your order.
              </p>
              
              <h2>Shipping and Delivery</h2>
              <p>
                Shipping costs and delivery times will be displayed at checkout. We are not liable for delays caused by 
                shipping carriers or customs. Risk of loss and title for products pass to you upon our delivery to the 
                carrier.
              </p>
              
              <h2>Returns and Refunds</h2>
              <p>
                Our return policy allows for returns within 30 days of delivery for unused items in original packaging. 
                Refunds will be processed to the original payment method within 7-14 business days after we receive the 
                returned item.
              </p>
              
              <h2>Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, and images, is the property of FootCap Ltd. 
                and is protected by copyright and other intellectual property laws.
              </p>
              
              <h2>Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by law, FootCap Ltd. shall not be liable for any indirect, incidental, 
                special, or consequential damages arising out of or in connection with your use of our services.
              </p>
              
              <h2>Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will notify you of material changes by posting 
                the updated Terms on this page and updating the "Last updated" date.
              </p>
              
              <h2>Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Your Jurisdiction], 
                without regard to its conflict of law provisions.
              </p>
              
              <h2>Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <p><strong>legal@footcap.com</strong></p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default TermsOfService;