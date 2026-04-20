import React, { createContext, useContext, useMemo, useState, useEffect, useCallback } from "react";
import { cartAPI } from "../utils/api";
import { isAuthenticated } from "../utils/auth";

const CartContext = createContext();

// Helper function to extract numeric price from string like "₹13,999"
const extractPrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  if (!priceString) return 0;
  // Remove ₹, commas, and spaces, then convert to number
  const numericValue = String(priceString).replace(/[₹,\s]/g, '');
  return parseInt(numericValue, 10) || 0;
};

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const loadCartFromAPI = useCallback(async (userId) => {
    try {
      setLoading(true);
      const response = await cartAPI.getCart(userId);
      setCartItems(response.cartItems || []);
    } catch (error) {
      console.error('Error loading cart:', error);
      
      // Don't clear user data on cart errors - cart API might fail for other reasons
      // Only clear cart items, keep user authenticated
      setCartItems([]);
      
      // Fallback to localStorage
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (e) {
          console.error('Error loading cart from localStorage:', e);
        }
      }
    } finally {
      setLoading(false);
    }
  }, []);

  // Load cart from API on mount if user is logged in
  useEffect(() => {
    if (isAuthenticated()) {
      const userId = localStorage.getItem('userId');
      loadCartFromAPI(userId);
    } else {
      // Load from localStorage for guest users
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          setCartItems(JSON.parse(savedCart));
        } catch (error) {
          console.error('Error loading cart from localStorage:', error);
        }
      }
    }
  }, [loadCartFromAPI]);

  // Save to localStorage whenever cart changes (for guest users)
  useEffect(() => {
    if (!isAuthenticated()) {
      localStorage.setItem('cart', JSON.stringify(cartItems));
    }
  }, [cartItems]);

  // ✅ Add to cart
  const addToCart = async (product, size = 9) => {
    const userId = localStorage.getItem('userId');
    
    // Handle both numeric price and priceDisplay string
    let priceNumeric;
    if (typeof product.price === 'number') {
      priceNumeric = product.price;
    } else if (product.priceDisplay) {
      priceNumeric = extractPrice(product.priceDisplay);
    } else {
      priceNumeric = extractPrice(product.price);
    }
    
    // Use MongoDB ObjectId if available, otherwise fallback to id
    const productId = product._id || product.id;

    const newItem = {
      id: productId,
      name: product.name,
      price: product.priceDisplay || product.price,
      priceNumeric: priceNumeric,
      image: product.image,
      size: size,
      quantity: 1,
    };

    // Update local state immediately
    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.id === productId && item.size === size
      );

      if (existing) {
        return prev.map((item) =>
          item.id === productId && item.size === size
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prev, newItem];
    });

    // Sync with API if user is logged in
    if (userId) {
      try {
        await cartAPI.addToCart(userId, productId, size);
      } catch (error) {
        console.error('Error syncing cart to API:', error);
      }
    }
  };

  // ✅ Remove item
  const removeFromCart = async (id, size) => {
    const userId = localStorage.getItem('userId');
    
    setCartItems((prev) =>
      prev.filter((item) => !(item.id === id && item.size === size))
    );

    if (userId) {
      try {
        await cartAPI.removeFromCart(userId, id, size);
      } catch (error) {
        console.error('Error removing from cart API:', error);
      }
    }
  };

  // ✅ Increase qty
  const increaseQty = async (id, size) => {
    const userId = localStorage.getItem('userId');
    
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      
      if (userId) {
        const item = updated.find(i => i.id === id && i.size === size);
        if (item) {
          cartAPI.updateQuantity(userId, id, size, item.quantity).catch(err => 
            console.error('Error updating quantity:', err)
          );
        }
      }
      
      return updated;
    });
  };

  // ✅ Decrease qty
  const decreaseQty = async (id, size) => {
    const userId = localStorage.getItem('userId');
    
    setCartItems((prev) => {
      const updated = prev.map((item) =>
        item.id === id && item.size === size
          ? { ...item, quantity: Math.max(1, item.quantity - 1) }
          : item
      );
      
      if (userId) {
        const item = updated.find(i => i.id === id && i.size === size);
        if (item) {
          cartAPI.updateQuantity(userId, id, size, item.quantity).catch(err => 
            console.error('Error updating quantity:', err)
          );
        }
      }
      
      return updated;
    });
  };

  // ✅ Clear cart (after order placed)
  const clearCart = async () => {
    const userId = localStorage.getItem('userId');
    setCartItems([]);
    
    if (userId) {
      try {
        await cartAPI.clearCart(userId);
      } catch (error) {
        console.error('Error clearing cart API:', error);
      }
    }
  };

  // ✅ Total items in cart (for badge)
  const totalItems = useMemo(() => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  }, [cartItems]);

  // ✅ Total amount
  const totalAmount = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item.priceNumeric !== undefined ? item.priceNumeric : extractPrice(item.price);
      return sum + price * item.quantity;
    }, 0);
  }, [cartItems]);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        increaseQty,
        decreaseQty,
        clearCart,
        totalItems,
        totalAmount,
        loading,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

// ✅ Custom Hook
export const useCart = () => useContext(CartContext);
