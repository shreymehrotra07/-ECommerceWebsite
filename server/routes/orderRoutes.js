import express from 'express';
import mongoose from 'mongoose';
import Order from '../models/Order.js';
import Cart from '../models/Cart.js';
import { createNotification } from './notificationRoutes.js';
import { authenticateToken } from '../middleware/auth.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Generate order ID
const generateOrderId = () => {
  const prefix = 'FC';
  const randomNum = Math.floor(10000 + Math.random() * 90000);
  return `${prefix}-${randomNum}`;
};

// Get user's orders
// router.get('/:userId', async (req, res) => {
//   try {
//     const userId = new mongoose.Types.ObjectId(req.params.userId);
//     const orders = await Order.find({ userId })
//       .populate('items.productId')
//       .sort({ createdAt: -1 });

//     // Format orders for frontend - filter out any deleted products
//     const formattedOrders = orders.map(order => {
//       // Filter out any items with deleted products
//       const validItems = order.items.filter(item => item.productId !== null && item.productId !== undefined);

//       return {
//         id: order.orderId,
//         date: new Intl.DateTimeFormat('en-IN', {
//           day: 'numeric',
//           month: 'short',
//           year: 'numeric'
//         }).format(order.createdAt),
//         status: order.status,
//         total: order.totalAmount,
//         items: validItems.map(item => ({
//           name: item.name,
//           qty: item.quantity,
//           size: item.size,
//           price: item.price,
//           image: item.image
//         })),
//         deliveryDetails: order.deliveryDetails,
//         paymentMethod: order.paymentMethod
//       };
//     });

//     res.json({ orders: formattedOrders });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// Get logged-in user's orders (SECURE)
router.get('/my-orders', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id; // ✅ JWT se aaya

    const orders = await Order.find({ userId })
      .sort({ createdAt: -1 });

    res.json({ orders });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Create new order
router.post('/create', authenticateToken, async (req, res) => {  // ✅ ADD AUTHENTICATION HERE
  try {
    const { items, totalAmount, deliveryDetails, paymentMethod, paymentId, razorpayOrderId } = req.body;
    const userId = req.user._id; // ✅ GET USER ID FROM TOKEN, NOT FROM REQUEST BODY

    console.log('📦 Order Creation Request:', {
      itemsCount: items?.length,
      totalAmount,
      paymentMethod,
      paymentId,
      razorpayOrderId,
      firstItem: items?.[0]
    });

    if (!items || !totalAmount || !deliveryDetails) {
      return res.status(400).json({ message: 'All order details are required' });
    }

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const orderId = generateOrderId();

    // Determine order status based on payment method
    let orderStatus = 'Pending';
    let paymentStatus = 'pending';
    
    if (paymentMethod === 'razorpay' && paymentId) {
      // Razorpay payment is already verified, set as Paid
      orderStatus = 'Paid';
      paymentStatus = 'paid';
    } else if (paymentMethod === 'cod') {
      // COD is always pending initially
      orderStatus = 'Pending';
      paymentStatus = 'pending';
    }

    const order = new Order({
      userId: userObjectId,
      orderId,
      items,
      totalAmount,
      deliveryDetails,
      paymentMethod: paymentMethod || 'cod',
      status: orderStatus,
      paymentId: paymentId || null,
      razorpayOrderId: razorpayOrderId || null,
      paymentStatus: paymentStatus
    });

    await order.save();

    console.log('✅ Order saved successfully:', {
      orderId: order.orderId,
      status: order.status,
      paymentMethod: order.paymentMethod,
      itemsCount: order.items.length
    });

    // Create notification for new order
    await createNotification(
      'order',
      'New Order Placed',
      `New order #${order.orderId} has been placed by a customer`,
      order._id,
      'Order',
      'high'
    );

    // Clear cart after order
    const cart = await Cart.findOne({ userId: userObjectId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }

    res.status(201).json({
      message: 'Order placed successfully',
      orderId: order.orderId,
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single order
router.get('/single/:orderId', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findOne({ orderId: req.params.orderId })
      .populate('items.productId');

    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }

    // Only allow user to access their own order
    if (order.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Access denied. You can only view your own orders.' });
    }

    // Filter out any items with deleted products
    const validItems = order.items.filter(item => item.productId !== null && item.productId !== undefined);

    const formattedOrder = {
      ...order.toObject(),
      items: validItems.map(item => ({
        name: item.name,
        qty: item.quantity,
        size: item.size,
        price: item.price,
        image: item.image
      }))
    };

    res.json(formattedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});




export default router;