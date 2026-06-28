// api/order.js - Vercel Serverless Function

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { 
    fullName, email, phone, address, city, state, 
    pincode, quantity, notes, product, total 
  } = req.body;

  if (!fullName || !email || !phone || !address || !city || !state || !pincode || !product) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // ========== EMAIL CONFIG (YAHAN APNI DETAILS DAALO) ==========
  const EMAIL_USER = 'YOUR_EMAIL@gmail.com';           // ← APNI GMAIL
  const EMAIL_PASS = 'YOUR_APP_PASSWORD';               // ← APP PASSWORD
  const OWNER_EMAIL = 'nimrahkhan40139@gmail.com';     // ← ORDER YE EMAIL PE JAYEGA
  // ============================================================

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
      <h2>🔥 New Order Received!</h2>
      <h3>Product: ${product.name}</h3>
      <p><strong>Price:</strong> ₹${product.price} x ${quantity} = <strong>₹${total}</strong></p>
      <hr>
      <h3>Customer Details:</h3>
      <p><strong>Name:</strong> ${fullName}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Address:</strong> ${address}, ${city}, ${state} - ${pincode}</p>
      <p><strong>Notes:</strong> ${notes || 'None'}</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    return res.status(200).json({ 
      success: true, 
      message: 'Order placed successfully!',
      orderId: 'BA' + Date.now().toString(36).toUpperCase()
    });
  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ error: 'Failed to send email' });
  }
};
