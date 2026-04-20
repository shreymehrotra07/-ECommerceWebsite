import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrder } from "../context/OrderContext";
import { useNavigate } from "react-router-dom";
import { FiMapPin, FiPhone, FiUser, FiCreditCard, FiShield, FiTruck, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { isAuthenticated } from "../utils/auth";
import "./Checkout.css";
import RazorpayPayment from '../components/RazorpayPayment';

// Helper function to get image URL
function getImageUrl(imagePath) {
  const filename = imagePath.split('/').pop();
  return new URL(`../assets/images/${filename}`, import.meta.url).href;
}

// Helper function to format price
function formatPrice(amount) {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

// Helper function to extract numeric price
function extractPrice(priceString) {
  if (typeof priceString === 'number') return priceString;
  if (!priceString) return 0;
  const numericValue = String(priceString).replace(/[₹,\s]/g, '');
  return parseInt(numericValue, 10) || 0;
}

function Checkout() {
  const navigate = useNavigate();
  const { cartItems, totalAmount, clearCart } = useCart();
  const { addOrder } = useOrder();

  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    pincode: "",
    payment: "cod",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!isAuthenticated()) {
      alert("Please login to place an order!");
      navigate("/login");
      return;
    }

    if (!form.name || !form.phone || !form.address || !form.city || !form.pincode) {
      alert("Please fill all details!");
      return;
    }

    if (cartItems.length === 0) {
      alert("Cart is empty!");
      return;
    }

    // If payment method is Razorpay
    if (form.payment === 'razorpay') {
      // The RazorpayPayment component will handle this
      return;
    }

    // For COD, place order directly
    try {
      const orderId = await addOrder({
        items: cartItems,
        totalAmount: totalAmount,
        deliveryDetails: {
          name: form.name,
          phone: form.phone,
          address: form.address,
          city: form.city,
          pincode: form.pincode,
        },
        paymentMethod: form.payment,
      });

      await clearCart();
      alert(`✅ Order Placed Successfully!\nOrder ID: ${orderId}`);
      navigate("/orders");
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order. Please try again.');
    }
  };

  return (
    <>
      <Navbar />
      <div className="checkout-container">
        <div className="checkout-header-section">
          <h1>Secure Checkout</h1>
          <p>Complete your purchase with premium security</p>
        </div>

        <div className="checkout-content">
          {/* LEFT: FORM SECTION */}
          <div className="checkout-main">
            <form onSubmit={placeOrder}>
              {/* DELIVERY SECTION */}
              <div className="checkout-card">
                <div className="card-header">
                  <FiTruck />
                  <h3>Delivery Information</h3>
                </div>

                <div className="form-grid">
                  <div className="input-group full">
                    <label><FiUser /> Full Name</label>
                    <input
                      type="text"
                      name="name"
                      placeholder="e.g. John Doe"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label><FiPhone /> Contact Number</label>
                    <input
                      type="text"
                      name="phone"
                      placeholder="+91 00000 00000"
                      value={form.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label><FiMapPin /> Pincode</label>
                    <input
                      type="text"
                      name="pincode"
                      placeholder="400001"
                      value={form.pincode}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="input-group full">
                    <label><FiMapPin /> Shipping Address</label>
                    <textarea
                      name="address"
                      placeholder="Street address, Apartment, Suite, etc."
                      value={form.address}
                      onChange={handleChange}
                      required
                    ></textarea>
                  </div>

                  <div className="input-group full">
                    <label><FiMapPin /> City / District</label>
                    <input
                      type="text"
                      name="city"
                      placeholder="e.g. Mumbai"
                      value={form.city}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* PAYMENT SECTION */}
              <div className="checkout-card mt-40">
                <div className="card-header">
                  <FiCreditCard />
                  <h3>Payment Preference</h3>
                </div>

                <div className="payment-options">
                  <label className={`pay-option ${form.payment === 'cod' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="cod"
                      checked={form.payment === "cod"}
                      onChange={handleChange}
                    />
                    <div className="pay-content">
                      <span className="pay-title">Cash on Delivery</span>
                      <span className="pay-desc">Pay when your package arrives</span>
                    </div>
                  </label>

                  <label className={`pay-option ${form.payment === 'razorpay' ? 'active' : ''}`}>
                    <input
                      type="radio"
                      name="payment"
                      value="razorpay"
                      checked={form.payment === "razorpay"}
                      onChange={handleChange}
                    />
                    <div className="pay-content">
                      <span className="pay-title">Online Payment (Razorpay)</span>
                      <span className="pay-desc">Pay securely via UPI, Card, NetBanking</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* ✅ RAZORPAY BUTTON */}
              {form.payment === 'razorpay' && (
                <div style={{ marginTop: '20px' }}>
                  <RazorpayPayment
                    amount={totalAmount}
                    orderData={{
                      items: cartItems,
                      totalAmount: totalAmount,
                      deliveryDetails: {
                        name: form.name,
                        phone: form.phone,
                        address: form.address,
                        city: form.city,
                        pincode: form.pincode,
                      },
                      paymentMethod: 'razorpay',
                    }}
                    onSuccess={async (orderId, paymentId) => {
                      console.log('Payment successful:', { orderId, paymentId });
                    }}
                    onError={(error) => {
                      console.error('Payment failed:', error);
                      alert('Payment failed. Please try again.');
                    }}
                  />
                </div>
              )}

              {/* FOOTER */}
              <div className="checkout-footer-actions">
                <div className="security-trust">
                  <FiShield />
                  <span>256-bit SSL Secure Payment</span>
                </div>

                <button type="submit" className="place-order-btn">
                  Complete Purchase <FiArrowRight />
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: SUMMARY SECTION */}
          <aside className="checkout-summary-card">
            <h3>Order Review</h3>

            <div className="summary-items-list">
              {cartItems.map((item) => {
                const itemPrice = item.priceNumeric !== undefined
                  ? item.priceNumeric
                  : extractPrice(item.price);
                const itemTotal = itemPrice * item.quantity;

                return (
                  <div className="review-item" key={`${item.id}-${item.size}`}>
                    <div className="review-img">
                      <img src={getImageUrl(item.image)} alt={item.name} />
                      <span className="qty-badge">{item.quantity}</span>
                    </div>

                    <div className="review-text">
                      <h4>{item.name}</h4>
                      <p>Size UK {item.size}</p>
                    </div>

                    <span className="review-price">
                      {formatPrice(itemTotal)}
                    </span>
                  </div>
                );
              })}
            </div>

            <div className="summary-calculations">
              <div className="calc-line">
                <span>Subtotal</span>
                <span>{formatPrice(totalAmount)}</span>
              </div>
              <div className="calc-line">
                <span>Delivery Fee</span>
                <span className="free-tag">FREE</span>
              </div>
            </div>

            <div className="summary-total-final">
              <span>Payable Total</span>
              <strong>{formatPrice(totalAmount)}</strong>
            </div>

            <div className="trust-badges-checkout">
              <div className="trust-badge">
                <FiTruck />
                <span>Express Delivery</span>
              </div>
              <div className="trust-badge">
                <FiShield />
                <span>Quality Check</span>
              </div>
            </div>
          </aside>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Checkout;
