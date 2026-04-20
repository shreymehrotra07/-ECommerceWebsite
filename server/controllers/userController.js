import { body, validationResult } from 'express-validator';
import {
  createUser,
  authenticateUser,
  getUserById,
  updateUserProfile,
  changePassword,
  getAllUsers
} from '../services/userService.js';

// Register user
export const register = [
  body('name').trim().isLength({ min: 2 }).withMessage('Name must be at least 2 characters long'),
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const result = await createUser(req.body);
      
      // Set JWT in HTTP-only cookie
      const token = result.token;
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      };
      
      res.cookie('token', token, cookieOptions);
      
      // Return success response without token in body
      res.status(201).json({
        message: result.message,
        user: result.user
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// Login user
export const login = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const result = await authenticateUser(req.body.email, req.body.password);
      
      // Set JWT in HTTP-only cookie
      const token = result.token;
      const cookieOptions = {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
      };
      
      res.cookie('token', token, cookieOptions);
      
      // Return success response without token in body
      res.json({
        message: result.message,
        user: result.user
      });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// Get user profile
export const getProfile = async (req, res) => {
  try {
    console.log('getProfile called');
    console.log('Authorization header:', req.headers.authorization);
    console.log('Cookies:', req.cookies);
    
    // Use JWT authentication - read from cookie first, then header as fallback
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    console.log('Token extracted:', token);
    
    if (!token) {
      console.log('No token provided');
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    const jwt = (await import('jsonwebtoken')).default;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    console.log('Token decoded:', decoded);
    
    // Use decoded.userId as the token was generated with userId
    const user = await getUserById(decoded.userId);
    
    console.log('User found:', user);
    
    res.json(user);
  } catch (error) {
    console.error('getProfile error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expired.' });
    }
    
    res.status(500).json({ message: error.message });
  }
};

// Update user profile
export const updateProfile = async (req, res) => {
  try {
    // Use JWT authentication - read from cookie first, then header as fallback
    const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
    
    if (!token) {
      return res.status(401).json({ message: 'Access denied. No token provided.' });
    }

    // Verify token
    const jwt = (await import('jsonwebtoken')).default;
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
    
    const result = await updateUserProfile(decoded.id, req.body);
    res.json(result);
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(403).json({ message: 'Invalid token.' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(403).json({ message: 'Token expired.' });
    }
    
    res.status(500).json({ message: error.message });
  }
};

// Change password
export const changePasswordRoute = [
  body('email').isEmail().normalizeEmail().withMessage('Please provide a valid email'),
  body('newPassword').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  async (req, res) => {
    try {
      // Check for validation errors
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: errors.array()
        });
      }

      const result = await changePassword(req.body.email, req.body.newPassword);
      res.json(result);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }
];

// Get all users (admin only)
export const getAllUsersList = async (req, res) => {
  try {
    const { page = 1, limit = 20, search = '', role = '' } = req.query;
    
    const result = await getAllUsers(page, limit, search, role);
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};