// ========================================
// BLOOM & AURA - BACKEND SERVER
// ========================================

const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// ===== MIDDLEWARE =====
app.use(cors({
  origin: '*', // Vercel frontend ke liye allow all (production mein specific domain daalna)
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ===== IN-MEMORY DATABASE (For demo - baad mein MongoDB laga dena) =====
let orders = [];
let nextOrderId = 1;

// ===== PRODUCT DATA =====
const products = [
  {
    id: 1,
    name: 'Vanilla Bliss Candle',
    price: 499,
    image: '/images/candles/vanilla.jpg',
    rating: 4.8,
    reviews: 234,
    fragrance: 'Vanilla',
    isNew: true,
    isBestSeller: true,
    discount: 20,
    category: 'floral',
    description: 'Sweet vanilla with warm undertones. Perfect for relaxation.'
  },
  {
    id: 2,
    name: 'Lavender Dream Candle',
    price: 599,
    image: '/images/candles/lavender.jpg',
    rating: 4.6,
    reviews: 189,
    fragrance: 'Lavender',
    isNew: false,
    isBestSeller: false,
    discount: 0,
    category: 'floral',
    description: 'Calming lavender with a hint of chamomile. Sleep peacefully.'
  },
  {
    id: 3,
    name: 'Rose Garden Candle',
    price: 699,
    image: '/images/candles/rose.jpg',
    rating: 4.9,
    reviews: 312,
    fragrance: 'Rose',
    isNew: true,
    isBestSeller: true,
    discount: 15,
    category: 'floral',
    description: 'Fresh roses with dewy greens. Bring the garden indoors.'
  },
  {
    id: 4,
    name: 'Jasmine Evening Candle',
    price: 549,
    image: '/images/candles/jasmine.jpg',
    rating: 4.4,
    reviews: 156,
    fragrance: 'Jasmine',
    isNew: false,
    isBestSeller: false,
    discount: 10,
    category: 'floral',
    description: 'Exotic jasmine with a touch of musk. Evening elegance.'
  },
  {
    id: 5,
    name: 'Sandalwood Serenity',
    price: 799,
    image: '/images/candles/sandalwood.jpg',
    rating: 4.7,
    reviews: 278,
    fragrance: 'Sandalwood',
    isNew: true,
    isBestSeller: true,
    discount: 25,
    category: 'woody',
    description: 'Rich sandalwood with cedar notes. Meditation and peace.'
  },
  {
    id: 6,
    name: 'Cinnamon Spice Candle',
    price: 449,
    image: '/images/candles/cinnamon.jpg',
    rating: 4.3,
    reviews: 98,
    fragrance: 'Cinnamon',
    isNew: false,
    isBestSeller: false,
    discount: 0,
    category: 'spicy',
    description: 'Warm cinnamon with clove and nutmeg. Cozy and inviting.'
  },
  {
    id: 7,
    name: 'Ocean Breeze Candle',
    price: 649,
    image: '/images/candles/ocean.jpg',
    rating: 4.5,
    reviews: 145,
    fragrance: 'Ocean Breeze',
    isNew: true,
    isBestSeller: false,
    discount: 10,
    category: 'fresh',
    description: 'Salty sea air with hints of coconut. Beach vibes at home.'
  },
  {
    id: 8,
    name: 'Honey & Oats Candle',
    price: 529,
    image: '/images/candles/honey.jpg',
    rating: 4.8,
    reviews: 201,
    fragrance: 'Honey & Oats',
    isNew: false,
    isBestSeller: true,
    discount: 15,
    category: 'gourmand',
    description: 'Sweet honey with warm oats and milk. Comfort in a jar.'
  }
];

// ===== API ROUTES =====

// ===== 1. HEALTH CHECK =====
app.get('/api/health', (req, res) => {
  res.json({
    status: 'OK',
    message: 'Bloom & Aura API is running! 🕯️',
    timestamp: new Date().toISOString()
  });
});

// ===== 2. GET ALL PRODUCTS =====
app.get('/api/products', (req, res) => {
  try {
    res.status(200).json({
      success: true,
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
      error: error.message
    });
  }
});

// ===== 3. GET SINGLE PRODUCT =====
app.get('/api/products/:id', (req, res) => {
  try {
    const productId = parseInt(req.params.id);
    const product = products.find(p => p.id === productId);
    
    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
      error: error.message
    });
  }
});

// ===== 4. PLACE ORDER =====
app.post('/api/order', (req, res) => {
  try {
    const {
      fullName,
      email,
      phone,
      address,
      landmark,
      city,
      state,
      pincode,
      candleType,
      quantity,
      specialInstructions,
      paymentMethod,
      selectedCandle,
      totalAmount
    } = req.body;

    // ===== VALIDATION =====
    const errors = [];

    if (!fullName || fullName.trim().length < 3) {
      errors.push('Full name is required (min 3 characters)');
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      errors.push('Valid email is required');
    }

    if (!phone || phone.length !== 10) {
      errors.push('Valid 10-digit phone number is required');
    }

    if (!address || address.trim().length < 5) {
      errors.push('Address is required (min 5 characters)');
    }

    if (!city || city.trim().length < 2) {
      errors.push('City is required');
    }

    if (!state || state.trim().length < 2) {
      errors.push('State is required');
    }

    if (!pincode || pincode.length !== 6) {
      errors.push('Valid 6-digit pincode is required');
    }

    if (!candleType) {
      errors.push('Candle type is required');
    }

    if (!quantity || quantity < 1 || quantity > 10) {
      errors.push('Quantity must be between 1 and 10');
    }

    if (errors.length > 0) {
      return res.status(400).json({
        success: false,
        errors: errors
      });
    }

    // ===== CREATE ORDER =====
    const newOrder = {
      id: nextOrderId++,
      orderId: 'ORD-' + Date.now().toString().slice(-6) + '-' + String(nextOrderId).padStart(3, '0'),
      customer: {
        fullName: fullName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone.trim()
      },
      delivery: {
        address: address.trim(),
        landmark: landmark ? landmark.trim() : '',
        city: city.trim(),
        state: state.trim(),
        pincode: pincode.trim()
      },
      order: {
        candleType: candleType,
        candleName: selectedCandle?.label || 'Candle',
        quantity: parseInt(quantity),
        pricePerUnit: selectedCandle?.price || 0,
        totalAmount: totalAmount || (selectedCandle?.price || 0) * parseInt(quantity)
      },
      payment: {
        method: paymentMethod || 'cod',
        status: 'pending'
      },
      specialInstructions: specialInstructions ? specialInstructions.trim() : '',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    // Save to memory
    orders.push(newOrder);

    // ===== SEND WHATSAPP ALERT (Optional - Twilio) =====
    // if (process.env.TWILIO_ACCOUNT_SID) {
    //   sendWhatsAppAlert(newOrder);
    // }

    // ===== SEND EMAIL CONFIRMATION (Optional - Nodemailer) =====
    // if (process.env.EMAIL_USER) {
    //   sendOrderConfirmationEmail(newOrder);
    // }

    // ===== LOG ORDER =====
    console.log('✅ New Order Placed:', newOrder.orderId);
    console.log('📦 Customer:', newOrder.customer.fullName);
    console.log('🕯️ Product:', newOrder.order.candleName);
    console.log('💰 Total:', newOrder.order.totalAmount);
    console.log('📞 Phone:', newOrder.customer.phone);

    res.status(201).json({
      success: true,
      message: 'Order placed successfully!',
      data: {
        orderId: newOrder.orderId,
        order: newOrder
      }
    });

  } catch (error) {
    console.error('❌ Order Error:', error);
    res.status(500).json({
      success: false,
      message: 'Error placing order',
      error: error.message
    });
  }
});

// ===== 5. GET ALL ORDERS (Admin) =====
app.get('/api/admin/orders', (req, res) => {
  try {
    // Simple admin key check (for demo)
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'bloomaura2026') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Invalid admin key.'
      });
    }

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

// ===== 6. GET SINGLE ORDER (Admin) =====
app.get('/api/admin/order/:id', (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'bloomaura2026') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Invalid admin key.'
      });
    }

    const orderId = req.params.id;
    const order = orders.find(o => o.orderId === orderId || o.id === parseInt(orderId));
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    res.status(200).json({
      success: true,
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching order',
      error: error.message
    });
  }
});

// ===== 7. UPDATE ORDER STATUS (Admin) =====
app.put('/api/admin/order/:id', (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'bloomaura2026') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Invalid admin key.'
      });
    }

    const orderId = req.params.id;
    const { status } = req.body;
    
    const order = orders.find(o => o.orderId === orderId || o.id === parseInt(orderId));
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const validStatuses = ['confirmed', 'processing', 'shipped', 'delivered', 'cancelled'];
    if (!validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status. Must be: ' + validStatuses.join(', ')
      });
    }

    order.status = status;
    order.updatedAt = new Date().toISOString();

    res.status(200).json({
      success: true,
      message: 'Order status updated successfully',
      data: order
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message
    });
  }
});

// ===== 8. DELETE ORDER (Admin) =====
app.delete('/api/admin/order/:id', (req, res) => {
  try {
    const adminKey = req.headers['x-admin-key'];
    if (adminKey !== process.env.ADMIN_KEY && adminKey !== 'bloomaura2026') {
      return res.status(401).json({
        success: false,
        message: 'Unauthorized. Invalid admin key.'
      });
    }

    const orderId = req.params.id;
    const orderIndex = orders.findIndex(o => o.orderId === orderId || o.id === parseInt(orderId));
    
    if (orderIndex === -1) {
      return res.status(404).json({
        success: false,
        message: 'Order not found'
      });
    }

    const deletedOrder = orders[orderIndex];
    orders.splice(orderIndex, 1);

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully',
      data: deletedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: error.message
    });
  }
});

// ===== 9. PINCODE LOOKUP (Mock API) =====
app.get('/api/pincode/:code', (req, res) => {
  try {
    const pincode = req.params.code;
    
    if (pincode.length !== 6) {
      return res.status(400).json({
        success: false,
        message: 'Pincode must be 6 digits'
      });
    }

    // Mock data - real mein external API use karein
    const mockData = {
      '400001': { city: 'Mumbai', state: 'Maharashtra', district: 'Mumbai City' },
      '400002': { city: 'Mumbai', state: 'Maharashtra', district: 'Mumbai City' },
      '110001': { city: 'Delhi', state: 'Delhi', district: 'New Delhi' },
      '560001': { city: 'Bengaluru', state: 'Karnataka', district: 'Bengaluru Urban' },
      '600001': { city: 'Chennai', state: 'Tamil Nadu', district: 'Chennai' },
      '700001': { city: 'Kolkata', state: 'West Bengal', district: 'Kolkata' },
      '500001': { city: 'Hyderabad', state: 'Telangana', district: 'Hyderabad' },
      '302001': { city: 'Jaipur', state: 'Rajasthan', district: 'Jaipur' },
      '380001': { city: 'Ahmedabad', state: 'Gujarat', district: 'Ahmedabad' },
      '411001': { city: 'Pune', state: 'Maharashtra', district: 'Pune' }
    };

    const data = mockData[pincode];
    
    if (!data) {
      return res.status(404).json({
        success: false,
        message: 'Pincode not found. Please enter city and state manually.'
      });
    }

    res.status(200).json({
      success: true,
      data: data
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pincode data',
      error: error.message
    });
  }
});

// ===== 10. CONTACT FORM =====
app.post('/api/contact', (req, res) => {
  try {
    const { name, email, phone, message } = req.body;

    // Validation
    if (!name || name.trim().length < 2) {
      return res.status(400).json({
        success: false,
        message: 'Name is required'
      });
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Valid email is required'
      });
    }

    if (!message || message.trim().length < 10) {
      return res.status(400).json({
        success: false,
        message: 'Message must be at least 10 characters'
      });
    }

    // Log contact (in memory)
    const contact = {
      id: Date.now(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : 'N/A',
      message: message.trim(),
      createdAt: new Date().toISOString()
    };

    console.log('📩 New Contact Message:', contact.name);
    console.log('📧 Email:', contact.email);
    console.log('💬 Message:', contact.message.substring(0, 50) + '...');

    res.status(200).json({
      success: true,
      message: 'Message sent successfully! We\'ll get back to you soon.',
      data: contact
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error sending message',
      error: error.message
    });
  }
});

// ===== 11. 404 HANDLER =====
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// ===== 12. ERROR HANDLER =====
app.use((err, req, res, next) => {
  console.error('🔥 Server Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// ===== START SERVER =====
app.listen(PORT, () => {
  console.log('🕯️  Bloom & Aura API Server');
  console.log(`🚀 Running on http://localhost:${PORT}`);
  console.log(`📦 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`📋 Products: ${products.length} candles ready`);
  console.log(`📝 Orders: ${orders.length} orders in memory`);
  console.log('✨ Ready to serve!');
});
