const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(express.json());

let orders = [];

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

// Email transporter (Gmail SMTP)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER || 'bloomaura.orders@gmail.com',
    pass: process.env.EMAIL_PASS || 'your-app-password'
  }
});

app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/products', (req, res) => {
  res.json({ success: true, data: PRODUCTS });
});

app.get('/api/products/:id', (req, res) => {
  const product = PRODUCTS.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' });
  res.json({ success: true, data: product });
});

app.get('/api/pincode/:code', (req, res) => {
  const data = PINCODE_DATA[req.params.code];
  if (!data) return res.status(404).json({ success: false, error: 'Pincode not found' });
  res.json({ success: true, data });
});

app.post('/api/order', async (req, res) => {
  const { fullName, email, phone, address, landmark, city, state, pincode, items, totalAmount, instructions } = req.body;

  const errors = [];
  if (!fullName || fullName.length < 3) errors.push('Full name must be at least 3 characters');
  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Invalid email');
  if (!phone || !/^\d{10}$/.test(phone)) errors.push('Phone must be 10 digits');
  if (!address || address.length < 5) errors.push('Address must be at least 5 characters');
  if (!city) errors.push('City is required');
  if (!state) errors.push('State is required');
  if (!pincode || !/^\d{6}$/.test(pincode)) errors.push('Pincode must be 6 digits');
  if (!items || items.length === 0) errors.push('Cart is empty');

  if (errors.length > 0) {
    return res.status(400).json({ success: false, errors });
  }

  const orderId = 'BLOOM-' + Date.now().toString(36).toUpperCase();

  const order = {
    orderId, fullName, email, phone, address, landmark: landmark || '',
    city, state, pincode, items, totalAmount, instructions: instructions || '',
    status: 'pending', createdAt: new Date().toISOString()
  };

  orders.push(order);

  // Send email notification
  const itemsHtml = items.map(item => 
    `<tr><td>${item.name}</td><td>${item.quantity}</td><td>₹${item.price * item.quantity}</td></tr>`
  ).join('');

  const mailOptions = {
    from: '"Bloom & Aura Orders" <bloomaura.orders@gmail.com>',
    to: process.env.OWNER_EMAIL || 'bloomaura.orders@gmail.com',
    subject: `🕯️ New Order Received - ${orderId}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #D4AF37; border-radius: 10px; overflow: hidden;">
        <div style="background: linear-gradient(135deg, #D4AF37, #FF6B35); padding: 20px; text-align: center; color: white;">
          <h1 style="margin: 0;">🕯️ Bloom & Aura</h1>
          <p style="margin: 5px 0 0;">New Order Received!</p>
        </div>
        <div style="padding: 20px; background: #FFF8F0;">
          <h2 style="color: #2C1810;">Order Details</h2>
          <p><strong>Order ID:</strong> ${orderId}</p>
          <p><strong>Customer:</strong> ${fullName}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Phone:</strong> ${phone}</p>
          <p><strong>Address:</strong> ${address}, ${landmark || 'N/A'}, ${city}, ${state} - ${pincode}</p>
          <hr style="border: none; border-top: 1px solid #D4AF37; margin: 15px 0;">
          <h3 style="color: #2C1810;">Items Ordered</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #D4AF37; color: white;">
              <th style="padding: 10px; text-align: left;">Product</th>
              <th style="padding: 10px;">Qty</th>
              <th style="padding: 10px; text-align: right;">Amount</th>
            </tr>
            ${itemsHtml}
          </table>
          <hr style="border: none; border-top: 1px solid #D4AF37; margin: 15px 0;">
          <p style="font-size: 18px; font-weight: bold; color: #2C1810;">Total: ₹${totalAmount}</p>
          ${instructions ? `<p><strong>Instructions:</strong> ${instructions}</p>` : ''}
        </div>
        <div style="background: #2C1810; color: #D4AF37; padding: 15px; text-align: center; font-size: 12px;">
          Bloom & Aura | blooming beauty, lasting aura
        </div>
      </div>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('📧 Order email sent successfully');
  } catch (err) {
    console.log('⚠️ Email failed:', err.message);
  }

  res.status(201).json({ success: true, message: 'Order placed', orderId, data: order });
});

app.get('/api/admin/orders', (req, res) => {
  if (req.headers['x-admin-key'] !== 'bloomaura2026') {
    return res.status(401).json({ success: false, error: 'Unauthorized' });
  }
  res.json({ success: true, data: orders });
});

module.exports = app;
