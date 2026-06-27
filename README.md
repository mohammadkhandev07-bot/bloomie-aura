# 🕯️ Bloom & Aura

## 🌿 blooming beauty, lasting aura

Premium handcrafted candles made with love and natural ingredients.

![Bloom & Aura](https://img.shields.io/badge/Bloom%20%26%20Aura-Premium%20Candles-gold)
![React](https://img.shields.io/badge/Frontend-React-61DAFB?logo=react)
![Node.js](https://img.shields.io/badge/Backend-Node.js-339933?logo=node.js)

## 🛠️ Tech Stack
- **Frontend:** React.js (Create React App)
- **Backend:** Node.js + Express
- **Styling:** Custom CSS with animations
- **Deployment:** Vercel (Frontend) + Render (Backend)

## 📁 Project Structure
```
bloomie-aura/
├── frontend/          → React app (deploy on Vercel)
│   ├── public/        → Static assets & images
│   ├── src/           → React components & styles
│   └── package.json
├── backend/           → Node.js API (deploy on Render)
│   ├── server.js      → Express server
│   └── package.json
├── vercel.json        → Vercel deployment config
└── README.md
```

## 🚀 Quick Start

### Frontend
```bash
cd frontend
npm install
npm start
# Opens at http://localhost:3000
```

### Backend
```bash
cd backend
npm install
npm start
# Runs at http://localhost:3001
```

## 🔧 Environment Variables (Backend)
Create a `.env` file in `backend/`:
```env
PORT=3001
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | Get all 8 candles |
| GET | `/api/products/:id` | Get single candle |
| GET | `/api/pincode/:code` | City/state lookup |
| POST | `/api/order` | Place new order |
| GET | `/api/admin/orders` | Get all orders (requires `x-admin-key: bloomaura2026`) |

## 🎨 Features
- ✅ Modern e-commerce UI with React
- ✅ Animated 3D candle with realistic flame
- ✅ Product cards with hover effects, ratings & discounts
- ✅ Flipkart-style order form with live validation
- ✅ Auto pincode lookup (Mumbai, Delhi, Bengaluru, Chennai, Kolkata)
- ✅ Confetti celebration on order success
- ✅ Floating bottom navigation
- ✅ Fully responsive (Mobile, Tablet, Desktop)
- ✅ Dark mode support (`prefers-color-scheme`)
- ✅ Custom gold scrollbar & smooth animations

## 🖼️ Product Images
Product images are stored in `frontend/public/images/candles/`. Replace them with your actual product photos before deployment.

## 🌐 Deployment

### Frontend (Vercel)
1. Push code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Set framework to "Create React App"
4. Set root directory to `frontend/`
5. Deploy!

### Backend (Render)
1. Push code to GitHub
2. Create new Web Service on [Render](https://render.com)
3. Set root directory to `backend/`
4. Build Command: `npm install`
5. Start Command: `npm start`
6. Deploy!

## 📝 License
This project is created for educational purposes.

---

Made with ❤️ in India | **Bloom & Aura** © 2024
