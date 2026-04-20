// Authentication utilities for checking user login state
// This works with the HTTP-only cookie authentication system

/**
 * Check if user is authenticated by checking if user data exists in localStorage
 * Since we're using HTTP-only cookies, we can't directly access the token
 * Instead, we check if user data (userId, userName, userEmail) exists
 * @returns {boolean} True if user is authenticated
 */
export const isAuthenticated = () => {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  
  // Debug logging
  console.log('isAuthenticated check:', {
    userId,
    userName,
    userEmail,
    anyExists: !!(userId || userName || userEmail)
  });
  
  // User is authenticated if any of these exist
  return !!(userId || userName || userEmail);
};

/**
 * Get current user data from localStorage
 * @returns {Object|null} User data object or null if not authenticated
 */
export const getCurrentUser = () => {
  const userId = localStorage.getItem('userId');
  const userName = localStorage.getItem('userName');
  const userEmail = localStorage.getItem('userEmail');
  
  if (userId || userName || userEmail) {
    return {
      id: userId,
      name: userName || 'User',
      email: userEmail || 'Not available'
    };
  }
  
  return null;
};

/**
 * Clear all user authentication data from localStorage
 * This should be called on logout
 */
export const clearAuthData = () => {
  localStorage.removeItem('userId');
  localStorage.removeItem('userName');
  localStorage.removeItem('userEmail');
};

/**
 * Check if admin is authenticated
 * @returns {boolean} True if admin is authenticated
 */
export const isAdminAuthenticated = () => {
  const adminUserId = localStorage.getItem('admin_userId');
  const adminRole = localStorage.getItem('admin_role');
  
  return !!(adminUserId && adminRole === 'admin');
};

/**
 * Clear all admin authentication data from localStorage
 */
export const clearAdminAuthData = () => {
  localStorage.removeItem('admin_userId');
  localStorage.removeItem('admin_userName');
  localStorage.removeItem('admin_userEmail');
  localStorage.removeItem('admin_role');
};