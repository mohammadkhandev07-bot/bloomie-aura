const express = require('express');
const nodemailer = require('nodemailer');
const app = express();

app.use(express.json());

app.get('/', (req, res) => {
  res.json({ status: 'Bloom & Aura API is running!' });
});

app.post('/order', async (req, res) => {
  const { 
    fullName, email, phone, address, city, state, 
    pincode, quantity, notes, product, total 
  } = req.body;

  if (!fullName || !email || !phone || !address || !city || !state || !pincode || !product) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  const EMAIL_USER = 'YOUR_EMAIL@gmail.com';
  const EMAIL_PASS = 'YOUR_APP_PASSWORD';
  const OWNER_EMAIL = 'nimrahkhan40139@gmail.com';

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
      <p><strong>Address:</strong> ${address}, ${city}, ${state} - ${pincode}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ 
      success: true, 
      message: 'Order placed successfully!'
    });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to send email' });
  }
});

module.exports = app;
