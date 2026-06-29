# Bloomei & Aura — Website

Simple 3-page website for the Bloomei & Aura candle brand.

## 📁 Project Structure (bahut simple hai)

```
bloomei-aura/
├── index.html       → Home page
├── about.html       → About page
├── product.html      → Product/Shop page (candles + order form)
├── style.css         → Saari styling ek hi file me
├── script.js         → Cart popup + order email logic
├── images/           → Sari images yahan rakhni hain
│   ├── logo.png              (logo / favicon)
│   ├── hero-candle.png       (home page wali badi candle image)
│   ├── about-candle.png      (about page image)
│   ├── product-vanilla.png
│   ├── product-lavender.png
│   ├── product-rose.png
│   └── product-citrus.png
└── README.md
```

## 🖼️ Images kaise daalein

Filhal maine simple placeholder images banaye hain testing ke liye.
Aapko sirf `images` folder ke andar asli candle photos daalni hain —
**bilkul same naam se** jo upar list me diya hai. Naam match hote hi
website automatically asli image dikhana shuru kar degi, koi code
change karne ki zaroorat nahi.

- `logo.png` → Brand logo (ye navbar me + browser tab ke favicon icon
  me dikhega)
- `hero-candle.png` → Home page ki badi candle wali image
- `about-candle.png` → About page ki image
- `product-*.png` → Product page ki candle images (jitne chahiye utne
  add kar sakte ho, just `product.html` me ek aur `<article
  class="product-card">` copy-paste kar dena)

## 📧 Order Email Setup (ZAROORI — isse karna hai)

`script.js` file kholo aur ye line dhoondo:

```js
const SHOP_OWNER_EMAIL = "youremail@example.com"; // <-- PUT YOUR EMAIL HERE
```

Yahan apni (ya banday ki) asli email daal do, jaise:

```js
const SHOP_OWNER_EMAIL = "bloomeiandaura@gmail.com";
```

Bas itna karne se jab koi customer "Order Now" dabayega, uska email
app khulega us email address ke saath order ki saari detail already
bhari hui — customer ko sirf **Send** dabana hoga. Koi backend/server
ki zaroorat nahi padi.

> Agar future me chaho ke email automatically bina customer ke "Send"
> dabaye chala jaaye, uske liye EmailJS ya Formspree jaisi free
> service use karke `script.js` ke `sendOrderByEmail()` function ko
> update karna padega. Abhi ke liye simple `mailto:` tareeka use kiya
> hai jo bina kisi backend ke kaam karta hai.

## 🚀 GitHub par daalna (deploy karna)

1. GitHub par naya repository banao (e.g. `bloomei-aura`)
2. Is poore folder ko upload kar do (saari files + `images` folder)
3. Repo ke **Settings → Pages** me jaakar GitHub Pages ON kar do
   (branch: `main`, folder: `/root`)
4. Kuch minute baad website live ho jayegi ek link par jaise:
   `https://yourusername.github.io/bloomei-aura/`

## ✅ Pages

- **Home (`index.html`)** — Brand intro, badi candle image, features,
  values, CTA
- **About (`about.html`)** — Brand story, values
- **Products (`product.html`)** — Saari candles, har candle ke "Add
  to Cart" button par click karne se popup khulta hai jisme customer
  apna naam, phone, email, address bharta hai aur "Order Now" dabate
  hi email ban jata hai

## 🎨 Theme

Colors, fonts aur overall look bilkul wahi rakha gaya hai jo aapki
diye gaye brand poster image me tha — soft pink, lavender, cream,
sage green, gold accents, aur "Playfair Display" + "Poppins" fonts.
