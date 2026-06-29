# Bloomei & Aura — Website

Simple 3-page website for the Bloomei & Aura candle brand.

## 📁 Project Structure (bahut simple hai)

```
bloomei-aura/
├── index.html       → Home page
├── about.html       → About page
├── product.html      → Product/Shop page (candles + order form)
├── terms.html         → Terms & Conditions page (linked in footer)
├── style.css         → Saari styling ek hi file me
├── script.js         → Cart popup + order email logic + terms validation
├── images/           → Sari images yahan rakhni hain
│   ├── logo.png              (logo / favicon)
│   ├── hero-candle.png       (home page wali badi candle image)
│   ├── about-candle.png      (about page image)
│   ├── product-vanilla.png
│   ├── product-lavender.png
│   ├── product-rose.png
│   ├── product-citrus.png
│   ├── product-honey.png
│   ├── product-cinnamon.png
│   ├── product-jasmine.png
│   ├── product-ocean.png
│   └── product-sandalwood.png
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

## 📧 Order Backend Setup (ZAROORI — isse karna hai)

Ab website me **real backend** lag gaya hai — jab customer "Order Now"
dabayega, order **automatically** owner ki email inbox me chala jayega.
Customer ko kuch alag se karne ki zaroorat nahi (pehle wale mailto
version me customer ko khud "Send" dabana padta tha, ab nahi).

Iske liye **Formspree** (free service) use kiya hai. Setup karne ke
sirf 2 minute lagenge:

1. [formspree.io](https://formspree.io) par jaakar free account
   banao.
2. "New Form" banao aur wahi email address daalo jis par order aane
   chahiye (jaise `bloomeiandaura@gmail.com`).
3. Formspree tumhe ek endpoint URL dega, jaisa dikhega:
   ```
   https://formspree.io/f/abc12345
   ```
4. `script.js` file kholo aur ye line dhoondo:
   ```js
   const FORMSPREE_ENDPOINT = "https://formspree.io/f/YOUR_FORMSPREE_ENDPOINT";
   ```
   `YOUR_FORMSPREE_ENDPOINT` wali jagah apna asli Formspree URL paste
   kar do.
5. Formspree us email par ek **confirmation email** bhejega — usme
   diya gaya confirm link/button dabana **zaroori** hai, varna orders
   deliver nahi honge.

Bas itna karne ke baad website ka backend fully ready hai — koi
server, hosting ya coding ki zaroorat nahi padegi. Free plan me
**50 submissions/month** milte hain, jo ek nayi small business ke
liye shuruaat me kaafi hai. Zyada orders aane lagein to Formspree ka
paid plan le sakte ho.

> Agar customer ka internet slow ho ya order na ja paaye, to popup me
> ek error message dikhega aur wo dobara try kar sakega — order tab
> tak "lost" nahi hota.

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
  hi order automatically owner ki email me chala jata hai
- **Terms & Conditions (`terms.html`)** — Footer me link diya hai
  (jaisa professional websites me hota hai). Order policy, cancellation
  policy, aur customer ki responsibility clearly likhi hai.

## 🛡️ Terms & Conditions Protection (Order Cancellation se bachne ke liye)

Jaisa aapne bola tha — agar koi order karke baad me product lene se
mana kar de, us situation ke liye safety lagayi hai:

- Order popup me ab ek checkbox hai: **"I have read and agree to the
  Terms & Conditions..."**
- Jab tak customer is checkbox ko tick nahi karega, "Order Now" dabane
  par **red error message** dikhega aur order **submit nahi hoga**.
- Checkbox tick karne ka matlab hai customer ne confirm kiya ki order
  ek **binding commitment** hai — `terms.html` page me ye clearly
  likha hai ki order place karne ke baad bina valid reason ke refuse
  karna "breach of agreement" maana jayega, aur isse hone wale
  nuksan (material, packaging, shipping cost) ke liye customer
  responsible ho sakta hai.
- Har order ke saath "Terms Accepted: Yes" wali line bhi owner ki
  email me record ke taur par chali jaati hai — taaki future me proof
  ke roop me use ho sake agar zaroorat pade.

> ⚠️ Dhyan rahe: ye terms ek **starting point** hain, kisi wakai legal
> case ke liye kisi local lawyer se ek baar terms ko confirm kar lena
> zyada sahi rahega, kyunki consumer protection laws state/country ke
> hisaab se alag hote hain.

## 🎨 Theme

Colors, fonts aur overall look bilkul wahi rakha gaya hai jo aapki
diye gaye brand poster image me tha — soft pink, lavender, cream,
sage green, gold accents, aur "Playfair Display" + "Poppins" fonts.
