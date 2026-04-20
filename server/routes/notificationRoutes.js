import express from 'express';
import { adminAuth } from '../middleware/adminAuth.js';
import Notification from '../models/Notification.js';
import Order from '../models/Order.js';
import User from '../models/User.js';

const router = express.Router();

// Get all notifications for admin
router.get('/notifications', adminAuth, async (req, res) => {
  try {
    const { page = 1, limit = 20, type, isRead } = req.query;
    
    let query = {};
    
    if (type && type !== 'all') {
      query.type = type;
    }
    
    if (isRead !== undefined) {
      query.isRead = isRead === 'true';
    }
    
    const notifications = await Notification.find(query)
      .sort({ createdAt: -1 })
      .limit(parseInt(limit))
      .skip((parseInt(page) - 1) * parseInt(limit));
    
    const total = await Notification.countDocuments(query);
    const unreadCount = await Notification.countDocuments({ ...query, isRead: false });
    
    res.json({
      notifications,
      currentPage: parseInt(page),
      totalPages: Math.ceil(total / parseInt(limit)),
      totalNotifications: total,
      unreadCount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark notification as read
router.patch('/notifications/:id/read', adminAuth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndUpdate(
      req.params.id,
      { isRead: true },
      { new: true }
    );
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json({ message: 'Notification marked as read', notification });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Mark all notifications as read
router.patch('/notifications/read-all', adminAuth, async (req, res) => {
  try {
    await Notification.updateMany({ isRead: false }, { isRead: true });
    res.json({ message: 'All notifications marked as read' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Delete notification
router.delete('/notifications/:id', adminAuth, async (req, res) => {
  try {
    const notification = await Notification.findByIdAndDelete(req.params.id);
    
    if (!notification) {
      return res.status(404).json({ message: 'Notification not found' });
    }
    
    res.json({ message: 'Notification deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get unread notification count
router.get('/notifications/unread-count', adminAuth, async (req, res) => {
  try {
    const unreadCount = await Notification.countDocuments({ isRead: false });
    res.json({ unreadCount });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create notification (internal use)
export const createNotification = async (type, title, message, relatedId = null, relatedModel = null, priority = 'medium') => {
  try {
    const notification = new Notification({
      type,
      title,
      message,
      relatedId,
      relatedModel,
      priority
    });
    
    await notification.save();
    return notification;
  } catch (error) {
    console.error('Error creating notification:', error);
  }
};

export default router;