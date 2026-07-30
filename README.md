# Bloomei & Aura — Website

Website for the Bloomei & Aura candle brand. `product.html` is now a
**category hub** — it shows 8 collection cards, and each collection
has its own dedicated page with its own product grid, search bar,
and order form.

## 📁 Project Structure (bahut simple hai)

```
bloomei-aura/
├── index.html               → Home page
├── about.html                → About page
├── product.html                → Shop hub — 8 category cards, links to pages below
├── floral-candles.html          → Floral Candles collection page
├── bouquet-candles.html         → Bouquet Candles collection page
├── glass-jar-candles.html       → Glass Jar Candles collection page
├── floating-candles.html        → Floating Candles collection page
├── concrete-candles.html        → Concrete Candles collection page
├── decorative-candles.html      → Decorative Candles collection page
├── gift-hampers.html            → Gift Hampers collection page
├── customized-orders.html       → Customized Orders request page
├── terms.html                → Terms & Conditions page (linked in footer)
├── sitemap.xml               → Google ko batata hai website ke pages kya hain
├── robots.txt                → Google ko crawl karne ki permission + sitemap ka location
├── style.css                 → Saari styling ek hi file me
├── script.js                 → Cart popup + order email logic + terms validation + search
├── images/                   → Sari images yahan rakhni hain
│   ├── logo.png                   (logo / favicon)
│   ├── hero-candle.png            (home page wali badi candle image)
│   ├── about-candle.png           (about page image)
│   ├── product-*.png              (old sample candle photos — still used nowhere on
│   │                                the shop pages anymore, kept for reference)
│   ├── floral-candles/            (empty — asli floral candle photos yahan daalo)
│   ├── bouquet-candles/           (empty — asli bouquet candle photos yahan daalo)
│   ├── glass-jar-candles/         (empty — asli glass jar candle photos yahan daalo)
│   ├── floating-candles/          (empty — asli floating candle photos yahan daalo)
│   ├── concrete-candles/          (empty — asli concrete candle photos yahan daalo)
│   ├── decorative-candles/        (empty — asli decorative candle photos yahan daalo)
│   ├── gift-hampers/              (empty — asli hamper photos yahan daalo)
│   └── customized-orders/         (empty — reference photos yahan daalo, agar chahiye)
└── README.md
```

**`sitemap.xml`** aur **`robots.txt`** dono files root folder me hi
rehni hai — `images` folder ke andar nahi, aur kisi sub-folder me
nahi. Jab GitHub Pages ya Vercel pe deploy karoge, ye dono files
seedha root URL pe accessible honi chahiye, jaise:
- `https://bloomie-aura.vercel.app/sitemap.xml`
- `https://bloomie-aura.vercel.app/robots.txt`

(Google aur browsers hamesha is exact location pe hi inhe dhoondte
hain, isliye inka root me hona zaroori hai.)

## 🛍️ Shop pages kaise kaam karte hain

`product.html` par ab candles direct nahi dikhti — sirf 8 collection
cards dikhte hain (Floral, Bouquet, Glass Jar, Floating, Concrete,
Decorative, Gift Hampers, Customized Orders). Kisi bhi card pe click
karne se us collection ki apni alag page khulti hai, jisme:
- Us collection ki candles ka grid
- Ek search bar (sirf us collection ke andar search karta hai)
- "Add to Cart" → order popup (same jaisa pehle tha)

Har collection page abhi ek **sample placeholder card** ke saath aata
hai (label: "Sample — Add Photo"), taaki structure dikh sake. Real
candles add karne ke liye us page me `<article class="product-card">`
wala block copy-paste kar do aur naam/description/price/image badal
do — jaisa pehle `product.html` me hota tha.

## 🖼️ Images kaise daalein

Har collection ke liye ek alag empty folder bana diya gaya hai
`images/` ke andar (upar structure me dekho) — jaise
`images/floral-candles/`, `images/bouquet-candles/`, etc. Bas us
matching folder ke andar asli candle photos daal do.

Photo daalne ke baad us collection ki HTML file (jaise
`floral-candles.html`) me sample card ke andar ye wala placeholder
block:
```html
<div class="product-img placeholder">
  <div><span class="placeholder-tag">Sample — Add Photo</span><br />🌸</div>
</div>
```
isko normal image tag se replace kar do:
```html
<div class="product-img"><img src="images/floral-candles/yourfile.png" alt="..." /></div>
```
(bilkul waisa hi jaisa `index.html` ya `about.html` me pehle se images
lagi hui hain — same pattern).

- `logo.png` → Brand logo (ye navbar me + browser tab ke favicon icon
  me dikhega)
- `hero-candle.png` → Home page ki badi candle wali image
- `about-candle.png` → About page ki image

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

## 🔍 SEO &amp; Google Search Console Setup

Website ke saath ab **`sitemap.xml`** aur **`robots.txt`** files bhi
hain — ye Google ko batati hain ki website ke kaunse pages exist
karte hain, taaki search results me jaldi aaye.

**Sitemap Google Search Console me submit karne ka tareeka:**

1. [Google Search Console](https://search.google.com/search-console)
   me jaakar apni property (`bloomie-aura.vercel.app`) kholo.
2. Left sidebar me **"Indexing" → "Sitemaps"** par click karo.
3. "Add a new sitemap" wale box me sirf likho: `sitemap.xml`
4. Submit dabao — Google ab periodically apni site crawl karega aur
   naye/updated pages ko search results me dikhana shuru karega.

> Note: Google ko crawl + index karne me kabhi kabhi **kuch din se
> kuch hafte** lag sakte hain — ye normal hai, instant nahi hota.

**Agar domain badal jaye:** Agar future me website ka domain change
ho (jaise custom domain le lo), to `sitemap.xml`, `robots.txt`, aur
har HTML file ke `<link rel="canonical">` aur Open Graph URLs me
purana domain (`bloomie-aura.vercel.app`) naye domain se replace
karna hoga.

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
