import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from '../models/Product.js';

dotenv.config();

// Available images in the project
const availableImages = [
  'collection-1.jpg', 'collection-2.jpg', 'collection-3.jpg',
  'insta-1.jpg', 'insta-2.jpg', 'insta-3.jpg', 'insta-4.jpg',
  'insta-5.jpg', 'insta-6.jpg', 'insta-7.jpg', 'insta-8.jpg',
  'product-1.jpg', 'product-2.jpg', 'product-3.jpg', 'product-4.jpg',
  'product-5.jpg', 'product-6.jpg', 'product-7.jpg', 'product-8.jpg'
];

// Brands
const brands = [
  'Nike', 'Adidas', 'Jordan', 'Puma', 'Reebok', 'Converse', 'ASICS',
  'New Balance', 'Vans', 'Skechers', 'Under Armour', 'Fila', 'Brooks',
  'Saucony', 'Mizuno', 'Onitsuka Tiger', 'Hoka', 'Salomon', 'Merrell',
  'Timberland', 'Dr. Martens', 'Clarks', 'Cole Haan', 'ECCO', 'Geox'
];

// Categories
const categories = [
  'Running', 'Basketball', 'Lifestyle',
  'Training', 'Street Wear', 'Casual', 'High Top', 'Low Top', 'Platform',
  'Stability Running', 'Trail Running', 'Fast Training', 'Cross Training',
  'Walking', 'Hiking', 'Tennis', 'Soccer', 'Golf', 'Athletic', 'Sneakers',
  'Boots', 'Sandals', 'Slip-On', 'Skateboarding', 'Minimalist', 'Maximalist'
];

// Genders
const genders = ['Men', 'Women', 'Unisex'];

// Colors
const colorsList = ['Black', 'White', 'Blue', 'Red', 'Grey', 'Navy', 'Green', 'Yellow', 'Pink', 'Orange'];

// Sizes
const sizesList = [6, 7, 8, 9, 10, 11, 12];

// Product name templates by brand
const productNameTemplates = {
  'Nike': ['Air Max', 'Zoom', 'React', 'Pegasus', 'Free', 'Court', 'Blazer', 'Dunk', 'Air Force', 'Vapor', 'Mercurial', 'Phantom', 'Tiempo', 'Hypervenom'],
  'Adidas': ['Ultraboost', 'NMD', 'Stan Smith', 'Superstar', 'Yeezy', 'Gazelle', 'Samba', 'Forum', 'Campus', 'Ozweego', 'ZX', 'Predator', 'Nemeziz', 'Copa'],
  'Jordan': ['Air Jordan', 'Retro', 'One Take', 'Why Not', 'Jumpman', 'Flight', 'Pro', 'Team', 'CP3', 'Melo'],
  'Puma': ['RS-X', 'Suede', 'Clyde', 'Thunder', 'Cell', 'Speedcat', 'Future', 'King', 'One', 'Disc'],
  'Reebok': ['Classic', 'Club C', 'Nano', 'CrossFit', 'Zig', 'Pump', 'Instapump', 'Question', 'Answer', 'Kamikaze'],
  'Converse': ['Chuck Taylor', 'Run Star', 'One Star', 'Jack Purcell', 'Pro Leather', 'Weapon', 'A-6', 'Fastbreak'],
  'ASICS': ['Gel-Kayano', 'Gel-Nimbus', 'Gel-Cumulus', 'Gel-Venture', 'GT-2000', 'Metaracer', 'Novablast', 'Magic Speed'],
  'New Balance': ['Fresh Foam', 'FuelCell', '990', '550', '574', '327', '2002R', '1080', '880', 'Hierro'],
  'Vans': ['Old Skool', 'Authentic', 'Sk8-Hi', 'Era', 'Slip-On', 'Half Cab', 'Ave', 'Chukka'],
  'Skechers': ['Go Walk', 'Go Run', 'D\'Lites', 'Relaxed Fit', 'Memory Foam', 'Flex', 'Max Cushioning', 'Arch Fit'],
  'Under Armour': ['HOVR', 'Charged', 'Micro G', 'Speedform', 'Project Rock', 'Curry', 'Spine', 'Assert'],
  'Fila': ['Disruptor', 'Ray', 'Grant Hill', 'Mindblower', 'Fusion', 'Original Fitness', 'Axilus', 'T-1'],
  'Brooks': ['Ghost', 'Glycerin', 'Adrenaline', 'Cascadia', 'Launch', 'Revel', 'Levitate', 'Bedlam'],
  'Saucony': ['Ride', 'Triumph', 'Kinvara', 'Guide', 'Peregrine', 'Endorphin', 'Freedom', 'Jazz'],
  'Mizuno': ['Wave Rider', 'Wave Inspire', 'Wave Creation', 'Wave Sky', 'Wave Horizon', 'Wave Prophecy', 'Wave Rebellion'],
  'Onitsuka Tiger': ['Mexico 66', 'Ultimate 81', 'Serrano', 'Colorado 85', 'GSM', 'Fabre', 'Lai'],
  'Hoka': ['Bondi', 'Clifton', 'Speedgoat', 'Challenger', 'Mach', 'Rincon', 'Arahi', 'Gaviota'],
  'Salomon': ['Speedcross', 'XA Pro', 'Sense', 'S-Lab', 'XT-6', 'XT-Wings', 'Quest', 'Pulsar'],
  'Merrell': ['Trail Glove', 'Moab', 'Vapor Glove', 'Bare Access', 'All Out', 'Agility', 'Antora', 'Jungle Moc'],
  'Timberland': ['6-Inch Premium', 'Classic', 'Euro Hiker', 'Field Boot', 'Radford', 'Killington', 'Mt. Maddsen'],
  'Dr. Martens': ['1460', '1461', 'Jadon', 'Chelsea', 'Sinclair', 'Pascal', 'Combs', 'Adrian'],
  'Clarks': ['Desert Boot', 'Wallabee', 'Originals', 'Unstructured', 'Cloudsteppers', 'Tilden', 'Bushacre'],
  'Cole Haan': ['Grand', 'Zerogrand', 'OriginalGrand', 'Lunargrand', 'Stitchlite', 'Grand Crosscourt'],
  'ECCO': ['Biom', 'Soft', 'Track', 'Street', 'Sneaker', 'Golf', 'Hiking', 'Casual'],
  'Geox': ['U Rise', 'U Breathe', 'U Walk', 'U Sprint', 'U Fly', 'U Run', 'U Play']
};

// Badges
const badges = ['HOT', 'NEW', 'ECO', 'SALE', 'LIMITED', 'EXCLUSIVE', 'TRENDING', ''];

// Price ranges by category
const priceRanges = {
  'Running': { min: 8000, max: 20000 },
  'Basketball': { min: 12000, max: 25000 },
  'Lifestyle': { min: 6000, max: 18000 },
  'Training': { min: 9000, max: 22000 },
  'Street Wear': { min: 10000, max: 20000 },
  'Casual': { min: 5000, max: 15000 },
  'High Top': { min: 12000, max: 25000 },
  'Low Top': { min: 8000, max: 18000 },
  'Platform': { min: 10000, max: 20000 },
  'Stability Running': { min: 12000, max: 22000 },
  'Trail Running': { min: 10000, max: 20000 },
  'Fast Training': { min: 11000, max: 23000 },
  'Cross Training': { min: 10000, max: 21000 },
  'Walking': { min: 7000, max: 16000 },
  'Hiking': { min: 12000, max: 25000 },
  'Tennis': { min: 8000, max: 18000 },
  'Soccer': { min: 10000, max: 22000 },
  'Golf': { min: 15000, max: 30000 },
  'Athletic': { min: 9000, max: 20000 },
  'Sneakers': { min: 7000, max: 18000 },
  'Boots': { min: 12000, max: 28000 },
  'Sandals': { min: 3000, max: 12000 },
  'Slip-On': { min: 5000, max: 15000 },
  'Skateboarding': { min: 6000, max: 16000 },
  'Minimalist': { min: 8000, max: 18000 },
  'Maximalist': { min: 10000, max: 22000 }
};

// Helper function to format price in Indian Rupees
function formatPrice(amount) {
  return `₹${amount.toLocaleString('en-IN')}`;
}

// Helper function to get random element from array
function getRandomElement(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Helper function to get random number in range
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Generate product name
function generateProductName(brand) {
  const templates = productNameTemplates[brand] || ['Classic', 'Pro', 'Elite', 'Premium', 'Sport', 'Active'];
  const baseName = getRandomElement(templates);
  const suffixes = ['', ' 2.0', ' 3', ' Pro', ' Max', ' Plus', ' Ultra', ' Elite', ' Premium', ' SE', ' Limited', ' OG'];
  const numbers = ['', ' 1', ' 2', ' 3', ' 4', ' 5', ' 6', ' 7', ' 8', ' 9', ' 10'];
  const colors = ['', ' Black', ' White', ' Red', ' Blue', ' Grey', ' Navy', ' Green'];
  
  const suffix = Math.random() > 0.5 ? getRandomElement(suffixes) : '';
  const number = Math.random() > 0.7 ? getRandomElement(numbers) : '';
  const color = Math.random() > 0.6 ? getRandomElement(colors) : '';
  
  return `${baseName}${suffix}${number}${color}`;
}

// Generate product description
function generateDescription(brand, category) {
  const descriptions = [
    `Premium ${category.toLowerCase()} footwear from ${brand}, engineered for comfort and performance.`,
    `High-quality ${category.toLowerCase()} shoes by ${brand}, designed for durability and style.`,
    `${brand}'s latest ${category.toLowerCase()} collection, combining innovation with classic design.`,
    `Experience ultimate comfort with ${brand}'s ${category.toLowerCase()} footwear technology.`,
    `Stylish ${category.toLowerCase()} shoes from ${brand}, perfect for everyday wear.`,
    `${brand} ${category.toLowerCase()} shoes featuring advanced cushioning and support.`,
    `Modern ${category.toLowerCase()} design from ${brand}, built for performance and style.`,
    `Classic ${brand} ${category.toLowerCase()} footwear with contemporary updates.`
  ];
  return getRandomElement(descriptions);
}

// Helper function to get random multiple elements
function getRandomMultiple(array, max) {
  const count = getRandomInt(1, max);
  const result = [];
  const shuffled = [...array].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count).sort((a, b) => a - b);
}

// Generate a single product
function generateProduct() {
  const brand = getRandomElement(brands);
  const category = getRandomElement(categories);
  const gender = getRandomElement(genders);
  const name = generateProductName(brand);
  const image = getRandomElement(availableImages);
  const badge = Math.random() > 0.7 ? getRandomElement(badges) : '';
  
  // Get price range for category, fallback to default
  const priceRange = priceRanges[category] || { min: 7000, max: 18000 };
  const rawPrice = getRandomInt(priceRange.min, priceRange.max);
  const priceDisplay = formatPrice(rawPrice);
  
  const description = generateDescription(brand, category);
  const sizes = getRandomMultiple(sizesList, 5);
  const colors = getRandomMultiple(colorsList, 3);
  const popularity = getRandomInt(0, 1000);
  
  return {
    name: `${brand} ${name}`,
    brand,
    category,
    gender,
    price: rawPrice,
    priceDisplay,
    sizes,
    colors,
    popularity,
    image,
    badge,
    description
  };
}

// Generate 2000+ products
function generateProducts(count = 2000) {
  const products = [];
  const seen = new Set();
  
  for (let i = 0; i < count; i++) {
    let product;
    let key;
    let attempts = 0;
    
    // Ensure unique product names (avoid exact duplicates)
    do {
      product = generateProduct();
      key = `${product.brand}-${product.name}`;
      attempts++;
    } while (seen.has(key) && attempts < 10);
    
    seen.add(key);
    products.push(product);
    
    // Progress indicator
    if ((i + 1) % 200 === 0) {
      console.log(`Generated ${i + 1} products...`);
    }
  }
  
  return products;
}

// Main seed function
async function seedProducts() {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/ecommerce', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ Connected to MongoDB');

    // Clear existing products
    await Product.deleteMany({});
    console.log('🗑️  Cleared existing products');

    // Generate products
    console.log('🔄 Generating 2000+ products...');
    const products = generateProducts(2000);
    console.log(`✅ Generated ${products.length} unique products`);

    // Insert in batches for better performance
    const batchSize = 500;
    let inserted = 0;
    
    for (let i = 0; i < products.length; i += batchSize) {
      const batch = products.slice(i, i + batchSize);
      await Product.insertMany(batch);
      inserted += batch.length;
      console.log(`📦 Inserted batch: ${inserted}/${products.length} products`);
    }

    console.log(`✅ Successfully seeded ${inserted} products to database`);
    
    // Show summary
    const brandCounts = {};
    const categoryCounts = {};
    const genderCounts = {};
    
    products.forEach(p => {
      brandCounts[p.brand] = (brandCounts[p.brand] || 0) + 1;
      categoryCounts[p.category] = (categoryCounts[p.category] || 0) + 1;
      genderCounts[p.gender] = (genderCounts[p.gender] || 0) + 1;
    });
    
    console.log('\n📊 Product Summary:');
    console.log(`Total Products: ${inserted}`);
    console.log(`\nBrands (Top 10):`);
    Object.entries(brandCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([brand, count]) => {
        console.log(`  ${brand}: ${count} products`);
      });
    
    console.log(`\nCategories (Top 10):`);
    Object.entries(categoryCounts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 10)
      .forEach(([category, count]) => {
        console.log(`  ${category}: ${count} products`);
      });

    console.log(`\nGenders:`);
    Object.entries(genderCounts)
      .forEach(([gender, count]) => {
        console.log(`  ${gender}: ${count} products`);
      });

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding products:', error);
    process.exit(1);
  }
}

seedProducts();
