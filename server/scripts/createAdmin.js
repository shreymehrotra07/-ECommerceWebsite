import mongoose from 'mongoose';
import User from '../models/User.js';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

dotenv.config();

const createAdmin = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce');
    console.log('Connected to MongoDB');

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: 'footcap54@gmail.com' });
    
    if (existingAdmin) {
      console.log('Admin user already exists!');
      console.log('Email: footcap54@gmail.com');
      console.log('Password: FootCap@5407');
      process.exit(0);
    }

    // Create admin user
    const admin = new User({
      name: 'Admin User',
      email: 'footcap54@gmail.com',
      password: 'FootCap@5407',
      role: 'admin',
      phone: '+91 9876543210',
      address: '123 Admin Street',
      city: 'Mumbai',
      pincode: '400001'
    });

    await admin.save();
    console.log('✅ Admin user created successfully!');
    console.log('Email: footcap54@gmail.com');
    console.log('Password: FootCap@5407');
    console.log('Role: admin');

    process.exit(0);
  } catch (error) {
    console.error('Error creating admin:', error);
    process.exit(1);
  }
};

createAdmin();
