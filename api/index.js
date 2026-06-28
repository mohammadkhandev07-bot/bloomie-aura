const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

// CORS for all origins
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  next();
});

app.get('/', (req, res) => {
  res.json({ status: 'Bloom & Aura API is running!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.post('/order', async (req, res) => {
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
    subject: `New Order - ${product.name}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #D4AF37;">New Order Received!</h2>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <h3 style="color: #2C1810;">Product: ${product.name}</h3>
        <p><strong>Total:</strong> Rs.${total}</p>
        <p><strong>Quantity:</strong> ${quantity || 1}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <h4 style="color: #2C1810;">Customer Details</h4>
        <p><strong>Name:</strong> ${fullName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address}${notes ? '<br><strong>Notes:</strong> ' + notes : ''}</p>
        <p><strong>City:</strong> ${city}, ${state} - ${pincode}</p>
        <hr style="border: none; border-top: 1px solid #eee; margin: 20px 0;">
        <p style="color: #888; font-size: 12px;">Bloom & Aura - Premium Handcrafted Candles</p>
      </div>
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
    return res.status(500).json({ error: 'Failed to send email', details: error.message });
  }
});

module.exports = app;
