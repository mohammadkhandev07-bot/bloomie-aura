const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage
let orders = [];

// Product Data
const PRODUCTS = [
  { id: 1, name: 'Vanilla Bliss', fragrance: 'Sweet Vanilla', price: 499, originalPrice: 624, discount: 20, isNew: true, rating: 4.8, reviews: 124 },
  { id: 2, name: 'Lavender Dream', fragrance: 'Calming Lavender', price: 599, originalPrice: 599, discount: 0, isNew: false, rating: 4.6, reviews: 98 },
  { id: 3, name: 'Rose Garden', fragrance: 'Fresh Rose', price: 699, originalPrice: 823, discount: 15, isNew: true, rating: 4.9, reviews: 156 },
  { id: 4, name: 'Jasmine Evening', fragrance: 'Exotic Jasmine', price: 549, originalPrice: 610, discount: 10, isNew: false, rating: 4.7, reviews: 87 },
  { id: 5, name: 'Sandalwood Serenity', fragrance: 'Warm Sandalwood', price: 799, originalPrice: 1065, discount: 25, isNew: true, rating: 4.8, reviews: 203 },
  { id: 6, name: 'Cinnamon Spice', fragrance: 'Spicy Cinnamon', price: 449, originalPrice: 449, discount: 0, isNew: false, rating: 4.5, reviews: 76 },
  { id: 7, name: 'Ocean Breeze', fragrance: 'Fresh Ocean', price: 649, originalPrice: 721, discount: 10, isNew: true, rating: 4.7, reviews: 112 },
  { id: 8, name: 'Honey & Oats', fragrance: 'Sweet Honey', price: 529, originalPrice: 622, discount: 15, isNew: false, rating: 4.6, reviews: 94 }
];

const PINCODE_DATA = {
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '400050': { city: 'Mumbai', state: 'Maharashtra' },
  '400053': { city: 'Mumbai', state: 'Maharashtra' },
  '110001': { city: 'Delhi', state: 'Delhi' },
  '110020': { city: 'Delhi', state: 'Delhi' },
  '110030': { city: 'Delhi', state: 'Delhi' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '560034': { city: 'Bengaluru', state: 'Karnataka' },
  '560076': { city: 'Bengaluru', state: 'Karnataka' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '600020': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '700020': { city: 'Kolkata', state: 'West Bengal' }
};

// Health Check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString(), service: 'Bloom & Aura API' });
});

// Get All Products
app.get('/api/products', (req, res) => {
  res.json({ success: true, count: PRODUCTS.length, data: PRODUCTS });
});

// Get Single Product
app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === parseInt(req.params.id));
  if (!product) {
    return res.status(404).json({ success: false, error: 'Product not found' });
  }
  res.json({ success: true, data: product });
});

// Pincode Lookup
app.get('/api/pincode/:code', (req, res) => {
  const data = PINCODE_DATA[req.params.code];
  if (!data) {
    return res.status(404).json({ success: false, error: 'Pincode not found' });
  }
  res.json({ success: true, data });
});

// Place Order
app.post('/api/order', (req, res) => {
  const { fullName, email, phone, address, city, state, pincode, candleId, quantity, instructions } = req.body;

  const errors = [];
  if (!fullName || fullName.length < 3) errors.push('Full name must be at least 3 characters');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email address');
  if (!phone || !/^\d{10}$/.test(phone)) errors.push('Phone must be 10 digits');
  if (!address || address.length < 5) errors.push('Address must be at least 5 characters');
  if (!city) errors.push('City is required');
  if (!state) errors.push('State is required');
  if (!pincode || !/^\d{6}$/.test(pincode)) errors.push('Pincode must be 6 digits');
  if (!candleId) errors.push('Candle selection is required');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const orderId = 'BLOOM-' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).substr(2, 3).toUpperCase();

  const order = {
    orderId,
    fullName,
    email,
    phone,
    address,
    landmark: req.body.landmark || '',
    city,
    state,
    pincode,
    candleId: parseInt(candleId),
    quantity: parseInt(quantity) || 1,
    instructions: instructions || '',
    status: 'pending',
    createdAt: new Date().toISOString()
  };

  orders.push(order);

  console.log('\n✨ NEW ORDER RECEIVED ✨');
  console.log('Order ID:', orderId);
  console.log('Customer:', fullName);
  console.log('Product:', PRODUCTS.find(p => p.id === parseInt(candleId))?.name || 'Unknown');
  console.log('Amount: ₹', PRODUCTS.find(p => p.id === parseInt(candleId))?.price * (parseInt(quantity) || 1));
  console.log('------------------------\n');

  res.status(201).json({ success: true, message: 'Order placed successfully', orderId, data: order });
});

// Admin: Get All Orders
app.get('/api/admin/orders', (req, res) => {
  const adminKey = req.headers['x-admin-key'];
  if (adminKey !== 'bloomaura2026') {
    return res.status(401).json({ success: false, error: 'Unauthorized. Invalid admin key.' });
  }
  res.json({ success: true, count: orders.length, data: orders });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({ success: false, error: 'Route not found' });
});

// Error Handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ success: false, error: 'Something went wrong!' });
});

// Export for Vercel serverless (NO app.listen!)
module.exports = app;
