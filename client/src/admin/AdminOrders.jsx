import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getAdminOrders, updateOrderStatus, getOrderById, deleteOrder } from "../utils/adminAPI";
import { FiChevronLeft, FiChevronRight, FiRefreshCw, FiEye, FiEdit2, FiTrash2 } from "react-icons/fi";

function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalOrders, setTotalOrders] = useState(0);
  const [filters, setFilters] = useState({
    status: "all"
  });
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showDetails, setShowDetails] = useState(false);

  // Fetch orders from API
  const fetchOrders = async () => {
    try {
      setLoading(true);
      const response = await getAdminOrders(currentPage, 20, filters.status);
      setOrders(response.orders);
      setTotalPages(response.totalPages);
      setTotalOrders(response.totalOrders);
    } catch (err) {
      setError(err.message);
      console.error("Error fetching orders:", err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch orders when component mounts or filters change
  useEffect(() => {
    fetchOrders();
  }, [currentPage, filters]);

  // Handle filter changes
  const handleFilterChange = (field, value) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
    setCurrentPage(1); // Reset to first page when filters change
  };

  // Handle order status update
  const handleStatusUpdate = async (orderId, newStatus) => {
    if (window.confirm(`Are you sure you want to update order status to ${newStatus}?`)) {
      try {
        await updateOrderStatus(orderId, newStatus);
        // Refresh the order list
        fetchOrders();
      } catch (err) {
        alert(`Error updating order status: ${err.message}`);
      }
    }
  };

  // View order details
  const viewOrderDetails = async (orderId) => {
    try {
      const order = await getOrderById(orderId);
      setSelectedOrder(order);
      setShowDetails(true);
    } catch (err) {
      alert(`Error fetching order details: ${err.message}`);
    }
  };

  // Handle order deletion
  const handleDelete = async (orderId) => {
    console.log('Delete button clicked for order:', orderId);
    if (window.confirm("Are you sure you want to delete this order?")) {
      try {
        console.log('Confirmed deletion, calling deleteOrder...');
        const result = await deleteOrder(orderId);
        console.log('Delete operation successful:', result);
        // Refresh the order list
        fetchOrders();
      } catch (err) {
        console.error('Error in handleDelete:', err);
        alert(`Error deleting order: ${err.message}`);
      }
    }
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get status color class
  const getStatusClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'status-pending';
      case 'Paid':
        return 'status-paid';
      case 'Shipped':
        return 'status-shipped';
      case 'Delivered':
        return 'status-delivered';
      case 'Cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  // Close details modal
  const closeDetails = () => {
    setShowDetails(false);
    setSelectedOrder(null);
  };

  return (
    <div className="admin-content">
      <div className="admin-page-header">
        <h1>Order Management</h1>
      </div>

      {/* Filters */}
      <div className="admin-filters">
        <div className="filter-group">
          <div className="filter-item">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={filters.status}
              onChange={(e) => handleFilterChange('status', e.target.value)}
            >
              <option value="all">All Statuses</option>
              <option value="Pending">Pending</option>
              <option value="Paid">Paid</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>

      {/* Loading/Error States */}
      {loading && (
        <div className="admin-loading">
          <FiRefreshCw className="spinner" />
          <p>Loading orders...</p>
        </div>
      )}

      {error && (
        <div className="admin-error">
          <p>Error: {error}</p>
          <button className="btn btn-secondary" onClick={fetchOrders}>
            Retry
          </button>
        </div>
      )}

      {/* Orders Table */}
      {!loading && !error && (
        <>
          <div className="table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Order ID</th>
                  <th>Customer</th>
                  <th>Email</th>
                  <th>Total</th>
                  <th>Payment</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {orders.length === 0 ? (
                  <tr>
                    <td colSpan="8" className="no-data">
                      No orders found
                    </td>
                  </tr>
                ) : (
                  orders.map(order => (
                    <tr key={order.orderId}>
                      <td className="order-id">
                        {order.orderId}
                      </td>
                      <td>{order.userId?.name || 'N/A'}</td>
                      <td>{order.userId?.email || 'N/A'}</td>
                      <td>{formatCurrency(order.totalAmount)}</td>
                      <td>
                        <div className="payment-info">
                          <span className="payment-method">
                            {order.paymentMethod === 'razorpay' ? 'Razorpay' : 
                             order.paymentMethod === 'cod' ? 'COD' : 'Card'}
                          </span>
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${getStatusClass(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td>{formatDate(order.createdAt)}</td>
                      <td className="actions-cell">
                        <button
                          className="btn btn-sm btn-outline"
                          onClick={() => viewOrderDetails(order.orderId)}
                          title="View Details"
                        >
                          <FiEye />
                        </button>
                        <div className="dropdown">
                          <button className="btn btn-sm btn-outline dropdown-toggle">
                            <FiEdit2 /> Update
                          </button>
                          <div className="dropdown-menu">
                            {['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled']
                              .filter(status => status !== order.status)
                              .map(status => (
                                <button
                                  key={status}
                                  className="dropdown-item"
                                  onClick={() => handleStatusUpdate(order.orderId, status)}
                                >
                                  {status}
                                </button>
                              ))}
                          </div>
                        </div>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(order.orderId)}
                          title="Delete Order"
                        >
                          <FiTrash2 />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="btn btn-outline"
                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                disabled={currentPage === 1}
              >
                <FiChevronLeft /> Previous
              </button>
              
              <span className="pagination-info">
                Page {currentPage} of {totalPages} ({totalOrders} total)
              </span>
              
              <button
                className="btn btn-outline"
                onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                disabled={currentPage === totalPages}
              >
                Next <FiChevronRight />
              </button>
            </div>
          )}
        </>
      )}

      {/* Order Details Modal */}
      {showDetails && selectedOrder && (
        <div className="modal-overlay" onClick={closeDetails}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Order Details</h2>
              <button className="modal-close" onClick={closeDetails}>
                &times;
              </button>
            </div>
            <div className="modal-body">
              <div className="order-details-grid">
                <div className="order-summary">
                  <h3>Order Summary</h3>
                  <div className="detail-item">
                    <strong>Order ID:</strong>
                    <span>#{selectedOrder.orderId || selectedOrder._id}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Status:</strong>
                    <span className={`status-badge ${getStatusClass(selectedOrder.status)}`}>
                      {selectedOrder.status}
                    </span>
                  </div>
                  <div className="detail-item">
                    <strong>Payment Method:</strong>
                    <span className="payment-method-badge">
                      {selectedOrder.paymentMethod === 'razorpay' ? 'Razorpay' : 
                       selectedOrder.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Card'}
                    </span>
                  </div>
                  {selectedOrder.paymentMethod === 'razorpay' && (
                    <>
                      <div className="detail-item">
                        <strong>Payment Status:</strong>
                        <span className={`payment-status-badge ${selectedOrder.paymentStatus}`}>
                          {selectedOrder.paymentStatus?.toUpperCase() || 'N/A'}
                        </span>
                      </div>
                      <div className="detail-item">
                        <strong>Payment ID:</strong>
                        <span className="payment-id-text">{selectedOrder.paymentId || 'N/A'}</span>
                      </div>
                      <div className="detail-item">
                        <strong>Razorpay Order ID:</strong>
                        <span className="payment-id-text">{selectedOrder.razorpayOrderId || 'N/A'}</span>
                      </div>
                    </>
                  )}
                  <div className="detail-item">
                    <strong>Date:</strong>
                    <span>{new Date(selectedOrder.createdAt).toLocaleDateString('en-IN', {
                      day: 'numeric',
                      month: 'short',
                      year: 'numeric',
                    })}</span>
                  </div>
                </div>

                <div className="customer-info">
                  <h3>Customer Information</h3>
                  <div className="detail-item">
                    <strong>Name:</strong>
                    <span>{selectedOrder.userId?.name || selectedOrder.deliveryDetails?.name || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Email:</strong>
                    <span>{selectedOrder.userId?.email || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Phone:</strong>
                    <span>{selectedOrder.deliveryDetails?.phone || selectedOrder.userId?.phone || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Address:</strong>
                    <span>{selectedOrder.deliveryDetails?.address || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <strong>City:</strong>
                    <span>{selectedOrder.deliveryDetails?.city || 'N/A'}</span>
                  </div>
                  <div className="detail-item">
                    <strong>Pincode:</strong>
                    <span>{selectedOrder.deliveryDetails?.pincode || 'N/A'}</span>
                  </div>
                </div>

                <div className="order-items">
                  <h3>Items</h3>
                  <div className="items-list">
                    {selectedOrder.items?.map((item, index) => (
                      <div key={index} className="item-row">
                        <div className="item-info">
                          <img 
                            src={item.productId?.image || '/src/assets/images/default-product.jpg'} 
                            alt={item.productId?.name}
                            className="item-thumb"
                          />
                          <div className="item-text">
                            <h4>{item.productId?.name}</h4>
                            <p>Size: {item.size}</p>
                            <p>Qty: {item.quantity}</p>
                          </div>
                        </div>
                        <div className="item-price">
                          {formatCurrency(item.price * item.quantity)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button className="btn btn-secondary" onClick={closeDetails}>
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;