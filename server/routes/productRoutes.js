import express from 'express';
import Product from '../models/Product.js';
import { adminAuth } from '../middleware/adminAuth.js';

const router = express.Router();

// Get all products with pagination and filtering
router.get('/', async (req, res) => {
  try {
    const { brand, category, gender, minPrice, maxPrice, size, color, search, page, limit, sort = 'newest' } = req.query;
    let query = {};

    if (brand) {
      query.brand = brand;
    }
    if (category) {
      query.category = category;
    }
    if (gender) {
      query.gender = gender;
    }
    if (minPrice || maxPrice) {
      query.price = {};
      if (minPrice) query.price.$gte = parseInt(minPrice);
      if (maxPrice) query.price.$lte = parseInt(maxPrice);
    }
    if (size) {
      query.sizes = parseInt(size);
    }
    if (color) {
      query.colors = color;
    }
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } },
        { brand: { $regex: search, $options: 'i' } }
      ];
    }

    // Sorting
    let sortOption = { createdAt: -1 }; // default: newest first
    if (sort === 'price-low') {
      sortOption = { price: 1 };
    } else if (sort === 'price-high') {
      sortOption = { price: -1 };
    } else if (sort === 'popularity') {
      sortOption = { popularity: -1 };
    } else if (sort === 'name') {
      sortOption = { name: 1 };
    }

    // If pagination params provided, return paginated response
    if (page && limit) {
      const pageNum = parseInt(page);
      const limitNum = parseInt(limit);
      const skip = (pageNum - 1) * limitNum;

      const products = await Product.find(query)
        .sort(sortOption)
        .skip(skip)
        .limit(limitNum);

      const total = await Product.countDocuments(query);

      return res.json({
        products,
        pagination: {
          currentPage: pageNum,
          totalPages: Math.ceil(total / limitNum),
          totalProducts: total,
          hasNext: skip + limitNum < total,
          hasPrev: pageNum > 1
        }
      });
    }

    // Always return consistent response format
    const products = await Product.find(query).sort(sortOption);
    
    // Debug safety check
    if (products.length === 0) {
      console.warn("⚠️ No products found in database with query:", query);
    }
    
    res.json({
      products,
      pagination: null
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get single product
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create product (Admin only - for seeding)
router.post('/', adminAuth, async (req, res) => {
  try {
    const product = new Product(req.body);
    await product.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
