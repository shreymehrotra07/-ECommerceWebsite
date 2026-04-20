import express from 'express';
import mongoose from 'mongoose';
import Cart from '../models/Cart.js';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Helper function to extract numeric price
const extractPrice = (priceString) => {
  if (typeof priceString === 'number') return priceString;
  if (!priceString) return 0;
  const numericValue = String(priceString).replace(/[₹,\s]/g, '');
  return parseInt(numericValue, 10) || 0;
};

// Get user's cart
router.get('/my-cart', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    let cart = await Cart.findOne({ userId }).populate('items.productId');
    
    if (!cart) {
      cart = new Cart({ userId, items: [] });
      await cart.save();
    }

    // Filter out any products that couldn't be populated (deleted products)
    const validItems = cart.items.filter(item => item.productId !== null && item.productId !== undefined);

    // Format cart items for frontend
    const formattedItems = validItems.map(item => {
      const product = item.productId;
      const priceNumeric = extractPrice(product.price);
      
      return {
        id: product._id.toString(),
        name: product.name,
        price: product.price,
        priceNumeric: priceNumeric,
        image: product.image,
        size: item.size,
        quantity: item.quantity
      };
    });

    res.json({ cartItems: formattedItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add to cart
router.post('/add', authenticateToken, async (req, res) => {
  try {
    const { productId, size = 9 } = req.body;
    const userId = req.user._id;

    if (!productId) {
      return res.status(400).json({ message: 'Product ID is required' });
    }

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    // Validate product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    let cart = await Cart.findOne({ userId: userObjectId });

    if (!cart) {
      cart = new Cart({ userId: userObjectId, items: [] });
    }

    // Check if item already exists with same size
    const existingItem = cart.items.find(
      item => item.productId.toString() === productId.toString() && item.size === size
    );

    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.items.push({ productId, size, quantity: 1 });
    }

    await cart.save();
    res.json({ message: 'Item added to cart', cart });
  } catch (error) {
    console.error('Error adding to cart:', error);
    res.status(500).json({ message: error.message });
  }
});

// Update quantity
router.put('/update', authenticateToken, async (req, res) => {
  try {
    const { productId, size, quantity } = req.body;
    const userId = req.user._id;

    if (!productId || size === undefined || quantity === undefined) {
      return res.status(400).json({ message: 'Product ID, size, and quantity are required' });
    }

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    const item = cart.items.find(
      item => item.productId.toString() === productId.toString() && item.size === size
    );

    if (!item) {
      return res.status(404).json({ message: 'Item not found in cart' });
    }

    if (quantity <= 0) {
      cart.items = cart.items.filter(
        item => !(item.productId.toString() === productId.toString() && item.size === size)
      );
    } else {
      item.quantity = quantity;
    }

    await cart.save();
    res.json({ message: 'Cart updated', cart });
  } catch (error) {
    console.error('Error updating cart:', error);
    res.status(500).json({ message: error.message });
  }
});

// Remove from cart
router.delete('/remove', authenticateToken, async (req, res) => {
  try {
    const { productId, size } = req.body;
    const userId = req.user._id;

    if (!productId || size === undefined) {
      return res.status(400).json({ message: 'Product ID and size are required' });
    }

    // Convert userId to ObjectId
    const userObjectId = new mongoose.Types.ObjectId(userId);

    const cart = await Cart.findOne({ userId: userObjectId });
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter(
      item => !(item.productId.toString() === productId.toString() && item.size === size)
    );

    await cart.save();
    res.json({ message: 'Item removed from cart', cart });
  } catch (error) {
    console.error('Error removing from cart:', error);
    res.status(500).json({ message: error.message });
  }
});

// Clear cart
router.delete('/clear', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId });
    if (cart) {
      cart.items = [];
      await cart.save();
    }
    res.json({ message: 'Cart cleared' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
