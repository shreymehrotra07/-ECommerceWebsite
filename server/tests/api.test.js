import request from 'supertest';
import app from '../server.js'; // Adjust path as needed
import mongoose from 'mongoose';
import User from '../models/User.js';

// Test environment setup
const agent = request.agent(app);

describe('API Tests', () => {
  beforeAll(async () => {
    // Connect to a test database
    const TEST_MONGODB_URI = process.env.TEST_MONGODB_URI || 'mongodb://localhost:27017/ecommerce-test';
    await mongoose.connect(TEST_MONGODB_URI);
  });

  afterAll(async () => {
    // Clean up test data
    await User.deleteMany({ email: { $regex: 'test.*@example.com' } });
    await mongoose.connection.close();
  });

  describe('Authentication API', () => {
    const testUser = {
      name: 'Test User',
      email: `test${Date.now()}@example.com`,
      password: 'TestPass123!'
    };

    test('should register a new user', async () => {
      const response = await agent
        .post('/api/users/register')
        .send(testUser)
        .expect(201);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('User registered successfully');
      expect(response.body).toHaveProperty('user');
      expect(response.body.user.name).toBe(testUser.name);
      expect(response.body.user.email).toBe(testUser.email);
    });

    test('should login an existing user', async () => {
      const response = await agent
        .post('/api/users/login')
        .send({
          email: testUser.email,
          password: testUser.password
        })
        .expect(200);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Login successful');
      expect(response.body).toHaveProperty('token');
      expect(response.body.token).toBeTruthy();
      expect(response.body).toHaveProperty('user');
    });

    test('should reject invalid credentials', async () => {
      await agent
        .post('/api/users/login')
        .send({
          email: testUser.email,
          password: 'wrongpassword'
        })
        .expect(401);
    });
  });

  describe('Product API', () => {
    test('should get all products', async () => {
      const response = await agent
        .get('/api/products')
        .expect(200);

      expect(response.body).toHaveProperty('products');
      expect(Array.isArray(response.body.products)).toBe(true);
    });

    test('should get products with pagination', async () => {
      const response = await agent
        .get('/api/products?page=1&limit=10')
        .expect(200);

      expect(response.body).toHaveProperty('products');
      expect(Array.isArray(response.body.products)).toBe(true);
      expect(response.body).toHaveProperty('pagination');
    });
  });

  describe('Order API', () => {
    let authToken;

    beforeAll(async () => {
      // Login to get auth token for protected routes
      const loginResponse = await agent
        .post('/api/users/login')
        .send({
          email: `test${Date.now - 1000}@example.com`, // Use an existing test user if available
          password: 'TestPass123!'
        });

      if (loginResponse.body.token) {
        authToken = loginResponse.body.token;
      }
    });

    test('should get user orders', async () => {
      if (!authToken) {
        // Skip test if no auth token available
        return;
      }

      const response = await agent
        .get('/api/orders/my-orders')
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(response.body).toHaveProperty('orders');
      expect(Array.isArray(response.body.orders)).toBe(true);
    });
  });

  describe('Validation Tests', () => {
    test('should validate user registration input', async () => {
      const response = await agent
        .post('/api/users/register')
        .send({
          name: 'T', // Too short name
          email: 'invalid-email', // Invalid email
          password: '123' // Weak password
        })
        .expect(400);

      expect(response.body).toHaveProperty('message');
      expect(response.body.message).toBe('Validation failed');
      expect(Array.isArray(response.body.errors)).toBe(true);
    });

    test('should validate user login input', async () => {
      await agent
        .post('/api/users/login')
        .send({
          email: 'invalid-email',
          password: '' // Empty password
        })
        .expect(400);
    });
  });
});