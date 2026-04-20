import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { wishlistAPI } from "../utils/api";
import { isAuthenticated } from "../utils/auth";

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlistItems, setWishlistItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadWishlistFromAPI = useCallback(async (userId) => {
    try {
      setLoading(true);
      const response = await wishlistAPI.getWishlist(userId); // userId not used anymore but kept for compatibility
      setWishlistItems(response.wishlistItems || []);
    } catch (error) {
      console.error('Error loading wishlist:', error);
      
      // Check if it's an authentication error
      if (error.message && (error.message.includes('Access denied') || error.message.includes('No token') || error.message.includes('Invalid token'))) {
        // Clear user data and fallback to localStorage
        localStorage.removeItem('userId');
        localStorage.removeItem('userName');
        localStorage.removeItem('userEmail');
      }
      
      // Fallback to localStorage
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (e) {
          console.error('Error loading wishlist from localStorage:', e);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Load wishlist from API on mount if user is logged in
  useEffect(() => {
    if (isAuthenticated()) {
      const userId = localStorage.getItem('userId');
      loadWishlistFromAPI(userId);
    } else {
      // Load from localStorage for guest users
      const savedWishlist = localStorage.getItem('wishlist');
      if (savedWishlist) {
        try {
          setWishlistItems(JSON.parse(savedWishlist));
        } catch (error) {
          console.error('Error loading wishlist from localStorage:', error);
        }
      }
    }
  }, [loadWishlistFromAPI]);

  // Save to localStorage whenever wishlist changes (for guest users)
  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.setItem('wishlist', JSON.stringify(wishlistItems));
    }
  }, [wishlistItems]);

  // ✅ Add / Remove (Toggle)
  const toggleWishlist = async (product) => {
    const userId = localStorage.getItem('userId');
    // Use MongoDB ObjectId if available, otherwise fallback to id
    const productId = product._id || product.id;
    
    // Update local state immediately
    setWishlistItems((prev) => {
      const exists = prev.find((item) => item.id === productId);

      if (exists) {
        return prev.filter((item) => item.id !== productId);
      }

      return [
        ...prev,
        {
          id: productId,
          name: product.name,
          price: product.price,
          priceDisplay: product.priceDisplay,
          image: product.image,
          brand: product.brand,
          category: product.category,
        },
      ];
    });

    // Sync with API if user is logged in
    if (userId) {
      try {
        await wishlistAPI.toggleWishlist(userId, productId);
      } catch (error) {
        console.error('Error syncing wishlist to API:', error);
        // Revert on error
        setWishlistItems((prev) => {
          const exists = prev.find((item) => item.id === productId);
          if (exists) {
            return prev.filter((item) => item.id !== productId);
          }
          return [...prev, {
            id: productId,
            name: product.name,
            price: product.price,
            priceDisplay: product.priceDisplay,
            image: product.image,
            brand: product.brand,
            category: product.category,
          }];
        });
      }
    }
  };

  // ✅ Check if product is wishlisted
  const isWishlisted = (id) => {
    return wishlistItems.some((item) => item.id === id);
  };

  // ✅ Total wishlist count (for navbar badge)
  const totalWishlist = useMemo(() => wishlistItems.length, [wishlistItems]);

  return (
    <WishlistContext.Provider
      value={{
        wishlistItems,
        toggleWishlist,
        isWishlisted,
        totalWishlist,
        loading,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom Hook
export const useWishlist = () => useContext(WishlistContext);
