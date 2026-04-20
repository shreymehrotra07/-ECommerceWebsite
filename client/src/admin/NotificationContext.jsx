import React, { createContext, useContext, useState, useEffect } from 'react';
import { getUnreadNotificationCount } from '../utils/adminAPI';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within a NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);

  const fetchUnreadCount = async () => {
    try {
      const response = await getUnreadNotificationCount();
      setUnreadCount(response.unreadCount);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching notification count:', error);
      setLoading(false);
    }
  };

  const updateUnreadCount = (newCount) => {
    setUnreadCount(newCount);
  };

  const incrementUnreadCount = () => {
    setUnreadCount(prev => prev + 1);
  };

  const decrementUnreadCount = () => {
    setUnreadCount(prev => Math.max(0, prev - 1));
  };

  useEffect(() => {
    fetchUnreadCount();
    
    // Poll for updates every 30 seconds
    const interval = setInterval(fetchUnreadCount, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const value = {
    unreadCount,
    loading,
    fetchUnreadCount,
    updateUnreadCount,
    incrementUnreadCount,
    decrementUnreadCount
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};