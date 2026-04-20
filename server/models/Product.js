import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  brand: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true
  },
  gender: {
    type: String,
    required: true,
    enum: ['Men', 'Women', 'Unisex'],
    default: 'Unisex'
  },
  price: {
    type: Number,
    required: true
  },
  priceDisplay: {
    type: String,
    required: true
  },
  sizes: {
    type: [Number],
    default: [7, 8, 9, 10, 11]
  },
  colors: {
    type: [String],
    default: ['Black', 'White', 'Blue', 'Red', 'Grey']
  },
  popularity: {
    type: Number,
    default: 0
  },
  image: {
    type: String,
    default: '/src/assets/images/default-shoe.jpg' // Default image if none provided
  },
  badge: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  stock: {
    type: Number,
    default: 100
  }
}, {
  timestamps: true
});

const Product = mongoose.model('Product', productSchema);

export default Product;
