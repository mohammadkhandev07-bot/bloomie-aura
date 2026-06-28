const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Enable CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(express.json());

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Bloom & Aura API is running!' });
});

// Products data
const products = [
  { id: 1, name: 'Vanilla Dream', price: 499, image: '/images/candles/vanilla.jpg', description: 'Sweet vanilla essence' },
  { id: 2, name: 'Lavender Calm', price: 549, image: '/images/candles/lavender.jpg', description: 'Relaxing lavender' },
  { id: 3, name: 'Rose Romance', price: 599, image: '/images/candles/rose.jpg', description: 'Romantic rose scent' },
  { id: 4, name: 'Jasmine Bliss', price: 549, image: '/images/candles/jasmine.jpg', description: 'Exotic jasmine' },
  { id: 5, name: 'Sandalwood Warmth', price: 649, image: '/images/candles/sandalwood.jpg', description: 'Warm sandalwood' },
  { id: 6, name: 'Cinnamon Spice', price: 499, image: '/images/candles/cinnamon.jpg', description: 'Spicy cinnamon' },
  { id: 7, name: 'Ocean Breeze', price: 579, image: '/images/candles/ocean.jpg', description: 'Fresh ocean scent' },
  { id: 8, name: 'Honey Glow', price: 529, image: '/images/candles/honey.jpg', description: 'Sweet honey' }
];

// Get all products
app.get('/api/products', (req, res) => {
  res.json(products);
});

// Get single product
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Pincode data
const PINCODE_DATA = {
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat' },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh' }
};

// Pincode lookup
app.get('/api/pincode/:code', (req, res) => {
  const data = PINCODE_DATA[req.params.code];
  if (!data) return res.status(404).json({ error: 'Pincode not found' });
  res.json(data);
});

// Place order
app.post('/api/order', async (req, res) => {
  const {
    fullName, email, phone, address, city, state,
    pincode, quantity, notes, product, total
  } = req.body;

  if (!fullName || !email || !phone || !address || !city || !state || !pincode || !product) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const EMAIL_USER = process.env.EMAIL_USER || 'YOUR_EMAIL@gmail.com';
  const EMAIL_PASS = process.env.EMAIL_PASS || 'YOUR_APP_PASSWORD';
  const OWNER_EMAIL = process.env.OWNER_EMAIL || 'nimrahkhan40139@gmail.com';

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: { user: EMAIL_USER, pass: EMAIL_PASS }
  });

  const mailOptions = {
    from: `"Bloom & Aura" <${EMAIL_USER}>`,
    to: OWNER_EMAIL,
    replyTo: email,
    subject: `🕯️ New Order - ${product.name}`,
    html: `
      <h2>🔥 New Order!</h2>
      <h3>Product: ${product.name}</h3>
      <p><strong>Total:</strong> ₹${total}</p>
      <p><strong>Customer:</strong> ${fullName}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Address:</strong> ${address}, ${city}, ${state} - ${pincode}</p>
      ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({
      success: true,
      message: 'Order placed successfully!'
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = app;
