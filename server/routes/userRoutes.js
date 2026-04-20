import express from 'express';
import { register, login, getProfile, updateProfile, changePasswordRoute, getAllUsersList } from '../controllers/userController.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Register
router.post('/register', register);

// Login
router.post('/login', login);

// Simple password change by email (no token, for demo use)
router.post('/change-password', changePasswordRoute);

// Get user profile - requires authentication
router.get('/profile', authenticateToken, getProfile);

// Update user profile - requires authentication
router.put('/profile', authenticateToken, updateProfile);

export default router;