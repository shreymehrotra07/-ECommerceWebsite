import express from 'express';
import { authenticateToken } from '../middleware/auth.js';
import {
  createRazorpayOrder,
  verifyPayment,
  getPaymentDetails
} from '../controllers/paymentController.js';

const router = express.Router();

// Create Razorpay order (requires authentication)
router.post('/create-order', authenticateToken, createRazorpayOrder);

// Verify payment (requires authentication)
router.post('/verify', authenticateToken, verifyPayment);

// Get payment details (requires authentication)
router.get('/details/:paymentId', authenticateToken, getPaymentDetails);

export default router;