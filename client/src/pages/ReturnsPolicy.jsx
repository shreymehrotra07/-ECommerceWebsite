import React, { useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./StaticPage.css";

function ReturnsPolicy() {
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
              <h1>Returns & Exchanges</h1>
              <p>Last updated: January 2025</p>
            </div>
            <div className="static-content">
              <p>
                At FootCap Ltd., we want you to be completely satisfied with your purchase. If you're not 
                happy with your order, our hassle-free returns and exchanges policy makes it easy to get 
                a refund or exchange.
              </p>
              
              <h2>🔄 Return Policy Overview</h2>
              <p>
                We offer a <strong>30-day return window</strong> from the date of delivery. Items must be 
                unused, in their original packaging, and in the same condition as received.
              </p>
              <p>
                <strong>Key Points:</strong>
              </p>
              <ul>
                <li>✅ Returns accepted within 30 days of delivery</li>
                <li>✅ Items must be unused and in original condition</li>
                <li>✅ Original packaging and tags must be intact</li>
                <li>✅ Proof of purchase (order confirmation) required</li>
              </ul>
              
              <h2>✅ Eligible for Return</h2>
              <p>The following items can be returned:</p>
              <ul>
                <li>Products that don't fit properly</li>
                <li>Items that don't match the description</li>
                <li>Products with manufacturing defects</li>
                <li>Wrong item delivered</li>
                <li>Items damaged during shipping</li>
              </ul>
              
              <h2>❌ Non-Returnable Items</h2>
              <p>The following items cannot be returned:</p>
              <ul>
                <li>Items used, worn, or washed</li>
                <li>Products without original packaging or tags</li>
                <li>Customized or personalized items</li>
                <li>Sale items marked as "Final Sale"</li>
                <li>Items returned after 30 days</li>
                <li>Undergarments or socks (for hygiene reasons)</li>
              </ul>
              
              <h2>📦 How to Initiate a Return</h2>
              <p><strong>Step 1:</strong> Contact our customer support</p>
              <ul>
                <li>Email: <strong>returns@footcap.com</strong></li>
                <li>Phone: <strong>+91-XXXXXXXXXX</strong> (Mon-Fri, 9 AM - 6 PM IST)</li>
                <li>Include your order number and reason for return</li>
              </ul>
              
              <p><strong>Step 2:</strong> Receive Return Authorization</p>
              <ul>
                <li>We'll send you a Return Authorization (RA) number</li>
                <li>You'll receive a prepaid shipping label (if applicable)</li>
                <li>Instructions for packaging and shipping will be provided</li>
              </ul>
              
              <p><strong>Step 3:</strong> Package and Ship</p>
              <ul>
                <li>Pack items securely in original packaging</li>
                <li>Include all accessories, tags, and documentation</li>
                <li>Attach the prepaid shipping label</li>
                <li>Drop off at the nearest courier location</li>
              </ul>
              
              <p><strong>Step 4:</strong> Receive Refund or Exchange</p>
              <ul>
                <li>Once we receive and inspect your return (3-5 business days)</li>
                <li>We'll process your refund or ship your exchange</li>
                <li>You'll receive a confirmation email</li>
              </ul>
              
              <h2>💰 Refund Process</h2>
              <p><strong>Refund Timeline:</strong></p>
              <ul>
                <li>Inspection: 3-5 business days after we receive your return</li>
                <li>Processing: 5-7 business days after approval</li>
                <li>Total: 8-12 business days from when we receive your return</li>
              </ul>
              
              <p><strong>Refund Method:</strong></p>
              <ul>
                <li><strong>Credit/Debit Card:</strong> Refunded to original payment method</li>
                <li><strong>UPI/Wallet:</strong> Refunded to original UPI ID or wallet</li>
                <li><strong>Cash on Delivery:</strong> Refunded via bank transfer (provide account details)</li>
                <li><strong>Razorpay:</strong> Refunded to original payment method</li>
              </ul>
              
              <p><strong>Shipping Costs:</strong></p>
              <ul>
                <li>Original shipping costs are <strong>non-refundable</strong></li>
                <li>Return shipping is <strong>FREE</strong> for defective or wrong items</li>
                <li>Return shipping is <strong>₹99</strong> for size/color exchanges or change of mind</li>
              </ul>
              
              <h2>🔄 Exchange Process</h2>
              <p><strong>What You Can Exchange:</strong></p>
              <ul>
                <li>Different size (same style and color)</li>
                <li>Different color (same style and size)</li>
                <li>Different style (price difference will be adjusted)</li>
              </ul>
              
              <p><strong>Exchange Timeline:</strong></p>
              <ul>
                <li>Once we receive your original item (3-5 business days)</li>
                <li>We ship the replacement within 1-2 business days</li>
                <li>Delivery as per standard shipping times</li>
              </ul>
              
              <p><strong>Price Adjustments:</strong></p>
              <ul>
                <li>If new item costs more: Pay the difference</li>
                <li>If new item costs less: Receive refund for difference</li>
                <li>Shipping charges apply for price difference transactions</li>
              </ul>
              
              <h2>🚚 Return Shipping</h2>
              <p><strong>Free Return Shipping:</strong></p>
              <ul>
                <li>Defective or damaged items</li>
                <li>Wrong item delivered</li>
                <li>Product doesn't match description</li>
              </ul>
              
              <p><strong>Paid Return Shipping (₹99):</strong></p>
              <ul>
                <li>Size or color exchange</li>
                <li>Change of mind</li>
                <li>Didn't like the product</li>
              </ul>
              
              <p>We provide a prepaid return shipping label for all returns. The cost will be deducted 
                from your refund if applicable.
              </p>
              
              <h2>⏱️ Processing Times</h2>
              <p><strong>Return Processing:</strong></p>
              <ul>
                <li>Receive return: 3-5 business days</li>
                <li>Quality inspection: 1-2 business days</li>
                <li>Refund processing: 5-7 business days</li>
              </ul>
              
              <p><strong>Exchange Processing:</strong></p>
              <ul>
                <li>Receive return: 3-5 business days</li>
                <li>Quality inspection: 1-2 business days</li>
                <li>Ship replacement: 1-2 business days</li>
                <li>Delivery: As per shipping method selected</li>
              </ul>
              
              <h2>📋 Return Conditions</h2>
              <p>To be eligible for a return, your item must meet these conditions:</p>
              <ul>
                <li>✅ Unused and in original condition</li>
                <li>✅ All tags attached</li>
                <li>✅ Original packaging included</li>
                <li>✅ No signs of wear or damage</li>
                <li>✅ Within 30-day return window</li>
                <li>✅ Proof of purchase provided</li>
              </ul>
              
              <h2>⚠️ Important Notes</h2>
              <ul>
                <li>Items must be returned in a resalable condition</li>
                <li>We reserve the right to refuse returns that don't meet our conditions</li>
                <li>Sale items are eligible for exchange only (no refunds) unless defective</li>
                <li>Gift cards and promotional items are non-returnable</li>
                <li>Final sale items cannot be returned or exchanged</li>
              </ul>
              
              <h2>🔄 Late or Missing Refunds</h2>
              <p>If you haven't received your refund after 12 business days:</p>
              <ol>
                <li>Check your bank account again</li>
                <li>Contact your credit card company (processing may take time)</li>
                <li>Contact your bank (some processing delays are normal)</li>
                <li>If still unresolved, contact us at <strong>returns@footcap.com</strong></li>
              </ol>
              
              <h2>🎁 Returns for Gifts</h2>
              <p>If you received an item as a gift:</p>
              <ul>
                <li>Contact us with the order number</li>
                <li>We'll verify the purchase</li>
                <li>Refund will be issued to the original purchaser</li>
                <li>Or we can issue store credit to the gift recipient</li>
              </ul>
              
              <h2>🌍 International Returns</h2>
              <p>
                For international orders, please contact our customer support to arrange returns. 
                International return shipping costs are the responsibility of the customer unless the 
                item is defective or incorrect.
              </p>
              <p>
                <strong>Note:</strong> Customs duties and taxes on international returns are non-refundable.
              </p>
              
              <h2>📞 Contact Us</h2>
              <p>For any questions about returns or exchanges:</p>
              <ul>
                <li><strong>Email:</strong> returns@footcap.com</li>
                <li><strong>Phone:</strong> +91-XXXXXXXXXX (Mon-Fri, 9 AM - 6 PM IST)</li>
                <li><strong>Live Chat:</strong> Available on our website</li>
                <li><strong>Response Time:</strong> Within 24 hours</li>
              </ul>
              
              <h2>📝 Policy Updates</h2>
              <p>
                We may update this Returns & Exchanges Policy from time to time. Any changes will be 
                posted on this page with an updated revision date. We encourage you to review this 
                policy periodically.
              </p>
              
              <h2>💡 Tips for Smooth Returns</h2>
              <ul>
                <li>Keep your order confirmation email</li>
                <li>Don't remove tags until you're sure about keeping the item</li>
                <li>Keep original packaging until you've tried the product</li>
                <li>Initiate returns as early as possible within the 30-day window</li>
                <li>Take photos before shipping if item is damaged</li>
                <li>Use trackable shipping for returns</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default ReturnsPolicy;
