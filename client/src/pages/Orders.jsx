import React, { useState, useEffect } from "react";
import { useOrder } from "../context/OrderContext";
import {
  FiPackage,
  FiTruck,
  FiCheckCircle,
  FiClock,
  FiMapPin,
  FiPhone,
  FiX,
  FiArrowRight,
} from "react-icons/fi";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./Orders.css";

/* ================= HELPERS ================= */

// ✅ Safe price formatter
function formatPrice(amount) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount || 0);
}

// ✅ Calculate total from items (single source of truth)
const calculateOrderTotal = (items = []) => {
  return items.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );
};

// ✅ Safe Order ID getter (uses orderId field)
const getOrderId = (order) => {
  return order?.orderId || order?.id || order?._id || "UNKNOWN";
};

/* ================= COMPONENT ================= */

function Orders() {
  const { orders } = useOrder();
  const [trackingOrder, setTrackingOrder] = useState(null);

  // Scroll to top when page loads
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);


  // ✅ ONLY 4 STATUSES
  const getStatusDetails = (status) => {
    const statusMap = {
      Pending: { color: "#f59e0b", text: "Order Placed" },
      Shipped: { color: "#8b5cf6", text: "Shipped" },
      Delivered: { color: "#10b981", text: "Delivered" },
      Cancelled: { color: "#ef4444", text: "Cancelled" },
    };
    return statusMap[status] || statusMap.Pending;
  };

  return (
    <>
      <Navbar />
      <div className="orders-container">
        <div className="orders-header-section">
          <h1>My Orders</h1>
          <p>View your order history and track deliveries</p>
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty-state">
            <FiPackage className="empty-icon" />
            <h2>No orders found</h2>
            <p>You haven't placed any orders yet.</p>
            <button
              className="shop-now-btn"
              onClick={() => (window.location.href = "/")}
            >
              Explore Products <FiArrowRight />
            </button>
          </div>
        ) : (
          <div className="orders-grid-layout">
            {orders.map((order) => (
              <div
                className="order-premium-card"
                key={getOrderId(order)}
              >
                {/* ================= TOP ================= */}
                <div className="card-top">
                  <div className="order-main-info">
                    <span className="order-id-label">Order ID</span>
                    <h3>{getOrderId(order)}</h3>
                    <span className="order-date-label">
                      {new Date(order.createdAt).toLocaleDateString("en-IN", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </span>
                  </div>

                  <div
                    className="status-pill"
                    style={{
                      backgroundColor: `${getStatusDetails(order.status).color}20`,
                      color: getStatusDetails(order.status).color,
                      borderColor: `${getStatusDetails(order.status).color}40`,
                    }}
                  >
                    {order.status === "Delivered" ? (
                      <FiCheckCircle />
                    ) : (
                      <FiClock />
                    )}
                    {getStatusDetails(order.status).text}
                  </div>
                </div>

                {/* ================= ITEMS ================= */}
                <div className="order-items-preview">
                  {order.items.map((item, index) => (
                    <div className="preview-item" key={index}>
                      <div className="item-text">
                        <h4>{item.name}</h4>
                        <p>
                          Size: UK {item.size} • Qty: {item.qty}
                        </p>
                      </div>

                      <span className="item-price-val">
                        {formatPrice(
                          (item.price || 0) * (item.qty || 1)
                        )}
                      </span>
                    </div>
                  ))}
                </div>

                {/* ================= BOTTOM ================= */}
                <div className="card-bottom">
                  <div className="order-total-box">
                    <span>Grand Total</span>
                    <strong>
                      {formatPrice(
                        calculateOrderTotal(order.items)
                      )}
                    </strong>
                  </div>

                  <button
                    className="track-order-btn"
                    onClick={() => setTrackingOrder(order)}
                  >
                    Track Shipment
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ================= TRACKING MODAL ================= */}
        {trackingOrder && (
          <div
            className="modal-overlay"
            onClick={() => setTrackingOrder(null)}
          >
            <div
              className="tracking-premium-modal"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="modal-header">
                <div>
                  <h3>Order Tracking</h3>
                  <p>Order {getOrderId(trackingOrder)} • {new Date(trackingOrder.createdAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}</p>
                </div>
                <button
                  className="modal-close"
                  onClick={() => setTrackingOrder(null)}
                >
                  <FiX />
                </button>
              </div>

              <div className="modal-body">
                {/* ADDRESS */}
                <div className="delivery-card">
                  <div className="delivery-line">
                    <FiMapPin />
                    <div>
                      <p>Delivery Address</p>
                      <span>
                        {trackingOrder.deliveryDetails?.address},{" "}
                        {trackingOrder.deliveryDetails?.city} -{" "}
                        {trackingOrder.deliveryDetails?.pincode}
                      </span>
                    </div>
                  </div>

                  <div className="delivery-line">
                    <FiPhone />
                    <div>
                      <p>Contact Number</p>
                      <span>
                        {trackingOrder.deliveryDetails?.phone}
                      </span>
                    </div>
                  </div>
                </div>

                {/* STEPPER (hide for Cancelled) */}
                {trackingOrder.status !== "Cancelled" && (
                  <div className="tracking-stepper">
                    {[
                      { status: "Pending", label: "Order Placed", icon: <FiClock /> },
                      { status: "Shipped", label: "Shipped", icon: <FiTruck /> },
                      { status: "Delivered", label: "Delivered", icon: <FiCheckCircle /> },
                    ].map((step) => {
                      const flow = ["Pending", "Shipped", "Delivered"];
                      const currentIndex = flow.indexOf(trackingOrder.status);
                      const stepIndex = flow.indexOf(step.status);
                      const state =
                        stepIndex <= currentIndex ? "completed" : "pending";

                      return (
                        <div
                          className={`stepper-item ${state}`}
                          key={step.status}
                        >
                          <div className="stepper-dot">
                            {state === "completed" ? (
                              <FiCheckCircle />
                            ) : (
                              step.icon
                            )}
                          </div>
                          <div className="stepper-content">
                            <h4>{step.label}</h4>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* TOTAL */}
                <div className="modal-footer">
                  <div className="total-display">
                    <span>Total Amount Paid</span>
                    <strong>
                      {formatPrice(
                        calculateOrderTotal(trackingOrder.items)
                      )}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </>
  );
}

export default Orders;
