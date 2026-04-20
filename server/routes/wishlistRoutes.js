import express from 'express';
import mongoose from 'mongoose';
import Wishlist from '../models/Wishlist.js';
import Product from '../models/Product.js';
import { authenticateToken } from '../middleware/auth.js';

const router = express.Router();

// Get user's wishlist
router.get('/my-wishlist', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    let wishlist = await Wishlist.findOne({ userId }).populate('products');
    
    if (!wishlist) {
      wishlist = new Wishlist({ userId, products: [] });
      await wishlist.save();
    }

    // Filter out any products that couldn't be populated (deleted products)
    const validProducts = wishlist.products.filter(product => product !== null && product !== undefined);

    // Format wishlist items for frontend
    const formattedItems = validProducts.map(product => ({
      id: product._id.toString(),
      name: product.name,
      price: product.price,
      image: product.image,
      brand: product.brand,
      category: product.category
    }));

    res.json({ wishlistItems: formattedItems });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Toggle wishlist (add/remove)
router.post('/toggle', authenticateToken, async (req, res) => {
  try {
    const { productId } = req.body;
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

    let wishlist = await Wishlist.findOne({ userId: userObjectId });

    if (!wishlist) {
      wishlist = new Wishlist({ userId: userObjectId, products: [] });
    }

    const productIndex = wishlist.products.findIndex(
      p => p.toString() === productId.toString()
    );

    if (productIndex > -1) {
      // Remove from wishlist
      wishlist.products.splice(productIndex, 1);
      await wishlist.save();
      res.json({ message: 'Product removed from wishlist', isWishlisted: false });
    } else {
      // Add to wishlist
      wishlist.products.push(productId);
      await wishlist.save();
      res.json({ message: 'Product added to wishlist', isWishlisted: true });
    }
  } catch (error) {
    console.error('Error toggling wishlist:', error);
    res.status(500).json({ message: error.message });
  }
});

// Check if product is wishlisted
router.get('/check/:productId', authenticateToken, async (req, res) => {
  try {
    const userId = req.user._id;
    const productId = req.params.productId;
    const wishlist = await Wishlist.findOne({ userId });
    const isWishlisted = wishlist?.products.some(
      p => p.toString() === productId.toString()
    ) || false;
    res.json({ isWishlisted });
  } catch (error) {
    console.error('Error checking wishlist:', error);
    res.status(500).json({ message: error.message });
  }
});

export default router;
