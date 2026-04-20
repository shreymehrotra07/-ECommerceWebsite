import dotenv from "dotenv";
dotenv.config(); // Load environment variables FIRST

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import mongoSanitize from "express-mongo-sanitize";
import rateLimit from "express-rate-limit";
import xss from "xss-clean";
import cookieParser from "cookie-parser";
import paymentRoutes from './routes/paymentRoutes.js';
import authRoutes from "./routes/auth.js";
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import wishlistRoutes from "./routes/wishlistRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import notificationRoutes from "./routes/notificationRoutes.js";

import { loggingMiddleware } from "./middleware/logging.js";
import {
  errorHandler,
  handleValidationError,
  handleCastError,
  handleDuplicateKeyError,
  handleJWTError,
} from "./middleware/errorHandler.js";

const app = express();
const PORT = process.env.PORT || 5000;

// 🔹 SECURITY MIDDLEWARE
// Helmet for security headers
app.use(helmet());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: { message: 'Too many requests from this IP, please try again later.' }
});
app.use(limiter);

// Data sanitization against NoSQL query injection
app.use(mongoSanitize());

// Data sanitization against XSS
app.use(xss());

// Parse cookies
app.use(cookieParser());

// 🔹 GLOBAL MIDDLEWARE
app.use(loggingMiddleware);

// CORS configuration with credentials support
const corsOptions = {
  origin: "*",
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🔹 DATABASE
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://localhost:27017/ecommerce")
  .then(async () => {
    console.log("✅ MongoDB Connected Successfully");
    
    // Check if products exist, if not, seed the database
    try {
      const Product = (await import('./models/Product.js')).default;
      const productCount = await Product.countDocuments();
      
      if (productCount === 0) {
        console.log("⚠️ No products found in database. Seeding with sample products...");
        console.log("💡 Run 'npm run seed' to populate the database with sample products");
      } else {
        console.log(`📊 Found ${productCount} products in database`);
      }
    } catch (dbError) {
      console.error("❌ Error checking products in database:", dbError);
    }
  })
  .catch((error) =>
    console.error("❌ MongoDB Connection Error:", error)
  );

// 🔹 ROUTES (CLEAN ORDER)
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/wishlist", wishlistRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api", notificationRoutes);
app.use("/api/payments", paymentRoutes);

// 🔹 HEALTH CHECK
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", message: "Server is running" });
});

// 🔹 ROOT
app.get("/", (req, res) => {
  res.send("✅ FootCap Backend is Running...");
});

// 🔹 ERROR HANDLING (ALWAYS LAST)
app.use(handleValidationError);
app.use(handleCastError);
app.use(handleDuplicateKeyError);
app.use(handleJWTError);
app.use(errorHandler);

// 🔹 START SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
