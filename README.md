# 🕯️ Bloom & Aura

## 🌿 blooming beauty, lasting aura

Premium handcrafted candles made with love and natural ingredients.

## 🛠️ Tech Stack
- **Frontend:** React.js + React Router + Framer Motion + Lucide Icons
- **Backend:** Node.js + Express + Nodemailer (Email notifications)
- **Styling:** Custom CSS with premium animations
- **Deployment:** Vercel (Monorepo - Frontend + Backend together)

## 📁 Project Structure
```
bloomie-aura/
├── api/                    → Backend (Vercel Serverless)
│   ├── index.js           → Express API with email
│   └── package.json
├── frontend/              → React App
│   ├── public/
│   │   ├── logo.png
│   │   └── images/candles/
│   ├── src/
│   │   ├── App.jsx
│   │   ├── index.js
│   │   └── style.css
│   └── package.json
├── vercel.json            → Vercel Monorepo Config
├── package.json           → Root config
└── README.md
```

## 🚀 Deploy on Vercel

### Step 1: Add Images
Add your product images to `frontend/public/images/candles/`:
- `vanilla.jpg`, `lavender.jpg`, `rose.jpg`, `jasmine.jpg`
- `sandalwood.jpg`, `cinnamon.jpg`, `ocean.jpg`, `honey.jpg`

Add logo: `frontend/public/logo.png`

### Step 2: Push to GitHub
```bash
git init
git add .
git commit -m "Bloom & Aura"
git remote add origin https://github.com/YOUR_USERNAME/bloomie-aura.git
git push -u origin main
```

### Step 3: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com)
2. Click "Add New Project"
3. Import your GitHub repo
4. Vercel will auto-detect frontend + backend
5. Click **Deploy**

### Step 4: Email Setup (Optional)
Add environment variables in Vercel Dashboard:
```
EMAIL_USER=your-gmail@gmail.com
EMAIL_PASS=your-app-password
OWNER_EMAIL=your-email@example.com
```

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/health` | Health check |
| GET | `/api/products` | Get all candles |
| GET | `/api/products/:id` | Get single candle |
| GET | `/api/pincode/:code` | City/state lookup |
| POST | `/api/order` | Place order + send email |
| GET | `/api/admin/orders` | Get all orders (x-admin-key: bloomaura2026) |

## 🎨 Features
- ✅ Flipkart-style flow: Products → Cart → Checkout → Success
- ✅ Product detail pages with full info
- ✅ Cart with quantity update & remove
- ✅ Auto pincode lookup (Mumbai, Delhi, Bengaluru, Chennai, Kolkata)
- ✅ Order email notifications
- ✅ Confetti celebration on order
- ✅ Animated 3D candle with flickering flame
- ✅ Fully responsive (Mobile, Tablet, Desktop)
- ✅ Premium half-white theme
- ✅ Professional typography (Cormorant Garamond + Inter)

## 📝 License
Made with ❤️ in India | Bloom & Aura © 2024
