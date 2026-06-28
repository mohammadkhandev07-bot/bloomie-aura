const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

// Enable CORS for all origins
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
  res.json({ status: 'Bloom & Aura API is running!', time: new Date().toISOString() });
});

// Products data
const products = [
  { id: 1, name: 'Vanilla Dream', price: 499, image: '/images/candles/vanilla.jpg', category: 'Sweet', rating: 4.8, reviews: 124, description: 'A warm, comforting blend of pure Madagascar vanilla with subtle hints of caramel and cream.', ingredients: 'Soy wax, Vanilla essential oil, Cotton wick', burnTime: '45 hours', weight: '200g' },
  { id: 2, name: 'Lavender Calm', price: 549, image: '/images/candles/lavender.jpg', category: 'Floral', rating: 4.9, reviews: 98, description: 'French lavender fields captured in wax. Promotes deep relaxation and better sleep.', ingredients: 'Soy wax, Lavender essential oil, Cotton wick', burnTime: '50 hours', weight: '200g' },
  { id: 3, name: 'Rose Romance', price: 599, image: '/images/candles/rose.jpg', category: 'Floral', rating: 4.7, reviews: 156, description: 'Hand-picked Bulgarian rose petals distilled into pure essential oil.', ingredients: 'Soy wax, Rose essential oil, Cotton wick', burnTime: '48 hours', weight: '220g' },
  { id: 4, name: 'Jasmine Bliss', price: 549, image: '/images/candles/jasmine.jpg', category: 'Exotic', rating: 4.8, reviews: 87, description: 'Exotic jasmine blossoms from India, known for their intoxicating sweet fragrance.', ingredients: 'Soy wax, Jasmine essential oil, Cotton wick', burnTime: '45 hours', weight: '200g' },
  { id: 5, name: 'Sandalwood Warmth', price: 649, image: '/images/candles/sandalwood.jpg', category: 'Woody', rating: 4.9, reviews: 203, description: 'Rich Indian sandalwood with earthy undertones. Grounding and meditative.', ingredients: 'Soy wax, Sandalwood essential oil, Cotton wick', burnTime: '55 hours', weight: '250g' },
  { id: 6, name: 'Cinnamon Spice', price: 499, image: '/images/candles/cinnamon.jpg', category: 'Spicy', rating: 4.6, reviews: 145, description: 'Warm cinnamon bark with a touch of clove and nutmeg.', ingredients: 'Soy wax, Cinnamon essential oil, Cotton wick', burnTime: '42 hours', weight: '200g' },
  { id: 7, name: 'Ocean Breeze', price: 579, image: '/images/candles/ocean.jpg', category: 'Fresh', rating: 4.7, reviews: 112, description: 'Crisp sea salt and marine notes with a hint of citrus.', ingredients: 'Soy wax, Marine fragrance oil, Cotton wick', burnTime: '48 hours', weight: '200g' },
  { id: 8, name: 'Honey Glow', price: 529, image: '/images/candles/honey.jpg', category: 'Sweet', rating: 4.8, reviews: 167, description: 'Pure wildflower honey blended with beeswax. A natural, sweet aroma.', ingredients: 'Beeswax, Honey fragrance, Cotton wick', burnTime: '50 hours', weight: '200g' }
];

app.get('/api/products', (req, res) => res.json(products));
app.get('/api/products/:id', (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: 'Product not found' });
  res.json(product);
});

// Pincode lookup
const PINCODE_DATA = {
  '400001': { city: 'Mumbai', state: 'Maharashtra' },
  '110001': { city: 'New Delhi', state: 'Delhi' },
  '560001': { city: 'Bengaluru', state: 'Karnataka' },
  '600001': { city: 'Chennai', state: 'Tamil Nadu' },
  '700001': { city: 'Kolkata', state: 'West Bengal' },
  '500001': { city: 'Hyderabad', state: 'Telangana' },
  '380001': { city: 'Ahmedabad', state: 'Gujarat' },
  '226001': { city: 'Lucknow', state: 'Uttar Pradesh' },
  '411001': { city: 'Pune', state: 'Maharashtra' },
  '302001': { city: 'Jaipur', state: 'Rajasthan' }
};

app.get('/api/pincode/:code', (req, res) => {
  const data = PINCODE_DATA[req.params.code];
  if (!data) return res.status(404).json({ error: 'Pincode not found' });
  res.json(data);
});

// Order endpoint
app.post('/api/order', async (req, res) => {
  const { fullName, email, phone, address, city, state, pincode, product, total, notes } = req.body;
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
    subject: `🕯️ New Order - ${product.name || 'Candle'}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px;">
        <h2 style="color: #d97706;">🔥 New Order Received!</h2>
        <h3>Product: ${product.name || 'Candle'}</h3>
        <p><strong>Total:</strong> ₹${total || 0}</p>
        <p><strong>Customer:</strong> ${fullName}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Address:</strong> ${address}, ${city}, ${state} - ${pincode}</p>
        ${notes ? `<p><strong>Notes:</strong> ${notes}</p>` : ''}
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ success: true, message: 'Order placed successfully!' });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email', detail: error.message });
  }
});

module.exports = app;
