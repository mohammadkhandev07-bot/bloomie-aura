// api/order.js
// Vercel Serverless Function - Order Handler

const nodemailer = require('nodemailer');

module.exports = async (req, res) => {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { 
    fullName, 
    email, 
    phone, 
    address, 
    city, 
    state, 
    pincode, 
    quantity, 
    notes, 
    product, 
    total 
  } = req.body;

  // Validate
  if (!fullName || !email || !phone || !address || !city || !state || !pincode || !product) {
    return res.status(400).json({ error: 'Missing required fields' });
  }

  // ========== EMAIL CONFIGURATION ==========
  // YAHAN APNI EMAIL DETAILS DAALO
  
  const EMAIL_USER = 'YOUR_EMAIL@gmail.com';        // ← ← ← APNI GMAIL EMAIL
  const EMAIL_PASS = 'YOUR_APP_PASSWORD';            // ← ← ← GMAIL APP PASSWORD
  const OWNER_EMAIL = 'nimrahkhan40139@gmail.com';   // ← ← ← ORDER YE EMAIL PE JAYEGA
  
  // ==========================================

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: EMAIL_USER,
      pass: EMAIL_PASS
    }
  });

  const mailOptions = {
    from: `"Bloom & Aura" <${EMAIL_USER}>`,
    to: OWNER_EMAIL,
    replyTo: email,
    subject: `🕯️ New Order #BA${Date.now().toString(36).toUpperCase()} - ${product.name}`,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; background: #f5f5f5; margin: 0; padding: 20px; }
          .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.1); }
          .header { background: #5D4037; padding: 30px; text-align: center; }
          .header h1 { color: #D4AF37; margin: 0; font-size: 24px; }
          .header p { color: #fff; margin: 10px 0 0; opacity: 0.9; }
          .content { padding: 30px; }
          .section { margin-bottom: 25px; }
          .section h3 { color: #5D4037; border-bottom: 2px solid #D4AF37; padding-bottom: 8px; margin-bottom: 15px; }
          table { width: 100%; border-collapse: collapse; }
          td { padding: 10px; border-bottom: 1px solid #eee; }
          td:first-child { font-weight: 600; color: #5D4037; width: 40%; }
          .total-row { background: #FFF8E1; font-size: 18px; font-weight: bold; }
          .total-row td { color: #D4AF37; border-bottom: none; }
          .footer { background: #FAFAFA; padding: 20px; text-align: center; color: #888; font-size: 12px; }
          .badge { display: inline-block; background: #D4AF37; color: white; padding: 4px 12px; border-radius: 20px; font-size: 12px; margin-left: 10px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🔥 New Order Received!</h1>
            <p>Bloom & Aura - Premium Handmade Candles</p>
          </div>
          
          <div class="content">
            <div class="section">
              <h3>🕯️ Product Details</h3>
              <table>
                <tr><td>Product Name</td><td>${product.name}</td></tr>
                <tr><td>Fragrance</td><td>${product.fragrance}</td></tr>
                <tr><td>Unit Price</td><td>₹${product.price}</td></tr>
                <tr><td>Quantity</td><td>${quantity}</td></tr>
                <tr class="total-row"><td>Total Amount</td><td>₹${total}</td></tr>
              </table>
            </div>

            <div class="section">
              <h3>👤 Customer Details</h3>
              <table>
                <tr><td>Full Name</td><td>${fullName}</td></tr>
                <tr><td>Email</td><td>${email}</td></tr>
                <tr><td>Phone</td><td>${phone}</td></tr>
              </table>
            </div>

            <div class="section">
              <h3>📍 Shipping Address</h3>
              <table>
                <tr><td>Address</td><td>${address}</td></tr>
                <tr><td>City</td><td>${city}</td></tr>
                <tr><td>State</td><td>${state}</td></tr>
                <tr><td>Pincode</td><td>${pincode}</td></tr>
                <tr><td>Notes</td><td>${notes || 'None'}</td></tr>
              </table>
            </div>

            <div class="section">
              <h3>⏰ Order Info</h3>
              <table>
                <tr><td>Order Date</td><td>${new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short' })}</td></tr>
                <tr><td>Order ID</td><td>BA${Date.now().toString(36).toUpperCase()}</td></tr>
                <tr><td>Status</td><td><span class="badge">NEW ORDER</span></td></tr>
              </table>
            </div>
          </div>

          <div class="footer">
            <p>This order was placed on Bloom & Aura website</p>
            <p>Please contact customer within 24 hours</p>
          </div>
        </div>
      </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    
    // Also send confirmation to customer
    const customerMail = {
      from: `"Bloom & Aura" <${EMAIL_USER}>`,
      to: email,
      subject: `✅ Order Confirmed - ${product.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 20px;">
          <h2 style="color: #5D4037;">Thank you for your order!</h2>
          <p>Hi ${fullName},</p>
          <p>We have received your order for <strong>${product.name}</strong>.</p>
          <p>Our team will contact you shortly at <strong>${phone}</strong> to confirm delivery.</p>
          <p style="margin-top: 30px; color: #888; font-size: 12px;">Bloom & Aura - Blooming Beauty, Lasting Aura</p>
        </div>
      `
    };
    
    await transporter.sendMail(customerMail);

    return res.status(200).json({ 
      success: true, 
      message: 'Order placed successfully! Confirmation email sent.',
      orderId: 'BA' + Date.now().toString(36).toUpperCase()
    });

  } catch (error) {
    console.error('Email error:', error);
    return res.status(500).json({ 
      error: 'Failed to send email. Please try again.',
      details: error.message 
    });
  }
};
