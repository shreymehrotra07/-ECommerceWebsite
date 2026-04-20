// Admin Authentication Utilities
// Separate auth storage to avoid conflicts with user authentication

export const adminAuth = {
  // Store admin authentication data
  setAdminAuth: (token, userData) => {
    // For cookie-based auth, the token is stored in HTTP-only cookie
    // We still store user data in localStorage for UI purposes
    localStorage.setItem('admin_userId', userData.id);
    localStorage.setItem('admin_userName', userData.name);
    localStorage.setItem('admin_userEmail', userData.email);
    localStorage.setItem('admin_role', userData.role);
  },

  // Get admin authentication data
  getAdminToken: () => {
    // For cookie-based auth, token is read from cookies via API calls
    // We return null here as the actual token is in HTTP-only cookie
    return null;
  },
  getAdminUserId: () => localStorage.getItem('admin_userId'),
  getAdminUserName: () => localStorage.getItem('admin_userName'),
  getAdminUserEmail: () => localStorage.getItem('admin_userEmail'),
  getAdminRole: () => localStorage.getItem('admin_role'),

  // Check if admin is authenticated
  isAdminAuthenticated: () => {
    // Check if admin data exists in localStorage
    const userId = localStorage.getItem('admin_userId');
    const role = localStorage.getItem('admin_role');
    return !!(userId && role === 'admin');
  },

  // Clear admin authentication data
  clearAdminAuth: () => {
    localStorage.removeItem('admin_token'); // Remove old token if exists
    localStorage.removeItem('admin_userId');
    localStorage.removeItem('admin_userName');
    localStorage.removeItem('admin_userEmail');
    localStorage.removeItem('admin_role');
  }
};

export default adminAuth;