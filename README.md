# ECommerce Website - Full Stack Application

A modern, full-stack e-commerce platform built with React, Node.js, Express, and MongoDB. Features include user authentication, product catalog, shopping cart, wishlist, order management, and a comprehensive admin panel.

## 🚀 Features

### User Features
- ✅ User Authentication (Register/Login with JWT)
- ✅ Product Catalog with Filtering & Search
- ✅ Shopping Cart (Database persistence)
- ✅ Wishlist Management
- ✅ Order Placement & History
- ✅ User Profile Management
- ✅ Password Reset Functionality
- ✅ Responsive Design

### Admin Features
- ✅ Admin Dashboard with Analytics
- ✅ Product Management (Add/Edit/Delete)
- ✅ Order Management
- ✅ User Management
- ✅ Notification System
- ✅ Admin Role-based Access Control

### Payment Integration
- ✅ Razorpay Payment Gateway
- ✅ Secure Checkout Process

## 📁 Project Structure

```
ECommerceWebsite/
├── .gitignore
├── .env.example
├── README.md
│
├── client/                          # React Frontend
│   ├── .env.example
│   ├── .gitignore
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── index.html
│   │
│   ├── public/
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── firebase.js
│       │
│       ├── admin/                   # Admin panel components
│       ├── assets/                  # Images and static assets
│       ├── components/              # Reusable UI components
│       ├── context/                 # React Context (Cart, Order, Wishlist)
│       ├── data/                    # Product data
│       ├── pages/                   # Page components
│       └── utils/                   # API and auth utilities
│
└── server/                          # Node.js Backend
    ├── .env.example
    ├── .gitignore
    ├── package.json
    ├── server.js
    │
    ├── controllers/                 # Route controllers
    ├── middleware/                  # Express middleware
    ├── models/                      # Mongoose models
    ├── routes/                      # API routes
    ├── services/                    # Business logic
    ├── utils/                       # Utilities
    ├── tests/                       # Test files
    └── scripts/                     # Database scripts
        ├── seedProducts.js
        └── createAdmin.js
```

## 🛠️ Setup Instructions

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local or Atlas)
- npm or yarn

### Backend Setup

1. Navigate to server directory:
```bash
cd server
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
NODE_ENV=development
PORT=5000
MONGODB_URI=mongodb://localhost:27017/ecommerce
JWT_SECRET=your-super-secret-jwt-key-here-make-it-long-and-random
JWT_COOKIE_EXPIRES_DAYS=7
CLIENT_URL=http://localhost:5173
```

5. Seed the database with products:
```bash
npm run seed
```

6. Create an admin user:
```bash
npm run create-admin
```

7. Start the server:
```bash
npm run dev
```

The server will run on `http://localhost:5000`

### Frontend Setup

1. Navigate to client directory:
```bash
cd client
```

2. Install dependencies:
```bash
npm install
```

3. Create `.env` file from example:
```bash
cp .env.example .env
```

4. Update `.env` with your configuration:
```env
VITE_API_URL=http://localhost:5000/api
VITE_FIREBASE_API_KEY=your-firebase-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-firebase-auth-domain
VITE_FIREBASE_PROJECT_ID=your-firebase-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-firebase-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-firebase-messaging-sender-id
VITE_FIREBASE_APP_ID=your-firebase-app-id
```

5. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

## 📊 Database Models

- **User**: User accounts and authentication
- **Product**: Product catalog with categories, sizes, colors
- **Cart**: Shopping cart items with user association
- **Wishlist**: User wishlists for favorite products
- **Order**: Order history with status tracking
- **Notification**: Admin notifications for system events

## 🔌 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password

### Users
- `GET /api/users/profile` - Get user profile (Protected)
- `PUT /api/users/profile` - Update user profile (Protected)

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get single product

### Cart
- `GET /api/cart/:userId` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart
- `DELETE /api/cart/clear/:userId` - Clear cart

### Wishlist
- `GET /api/wishlist/:userId` - Get user's wishlist
- `POST /api/wishlist/toggle` - Toggle product in wishlist
- `GET /api/wishlist/check/:userId/:productId` - Check if product is wishlisted

### Orders
- `GET /api/orders/:userId` - Get user's orders
- `POST /api/orders/create` - Create new order
- `GET /api/orders/single/:orderId` - Get single order

### Payment
- `POST /api/payment/create-order` - Create Razorpay order
- `POST /api/payment/verify` - Verify payment

### Admin (Protected - Admin Only)
- `POST /api/admin/products` - Create product
- `PUT /api/admin/products/:id` - Update product
- `DELETE /api/admin/products/:id` - Delete product
- `GET /api/admin/orders` - Get all orders
- `PUT /api/admin/orders/:id` - Update order status
- `GET /api/admin/users` - Get all users
- `DELETE /api/admin/users/:id` - Delete user
- `GET /api/admin/notifications` - Get notifications
- `POST /api/admin/notifications` - Create notification

## 🔒 Security Features

- JWT-based authentication with HTTP-only cookies
- Password hashing with bcrypt
- Rate limiting on API endpoints
- Input validation and sanitization
- XSS protection
- MongoDB query sanitization
- CORS configuration
- Helmet security headers

## 🚀 Deployment

### Backend (Render/Heroku/Railway)
1. Set environment variables in your platform
2. Connect your MongoDB Atlas database
3. Deploy the server directory

### Frontend (Vercel/Netlify)
1. Set VITE_API_URL to your backend URL
2. Deploy the client directory
3. Configure Firebase settings

## 📝 Notes

- The application supports both logged-in users (data saved to database) and guest users (data saved to localStorage)
- All cart, wishlist, and order operations are automatically synced with the database when a user is logged in
- Make sure MongoDB is installed and running before starting the backend server
- Use `.env.example` files as templates for your environment variables
- Never commit `.env` files to version control

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

## 📧 Support

For support, email your-email@example.com or open an issue in the repository.
