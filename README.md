# Nexus Wave Media Agency — Website

Production website for [nexuswavemediaagency.com](https://nexuswavemediaagency.com)  
Built as a clean static multi-page site. No frameworks. No build step. Pure HTML + CSS + JS.

---

## Project Structure

```
nexuswave/
│
├── index.html          ← Homepage
├── about.html          ← About page
├── portfolio.html      ← Portfolio + filter
├── pricing.html        ← Pricing & packages
├── contact.html        ← Contact form + FAQ
├── 404.html            ← Custom not-found page
│
├── css/
│   ├── style.css       ← Global variables, reset, shared components
│   ├── navbar.css      ← Fixed navbar styles
│   ├── footer.css      ← Footer + oversized wordmark
│   ├── animations.css  ← All keyframes + motion rules
│   ├── responsive.css  ← All media queries (tablet + mobile)
│   └── pages/
│       ├── index.css   ← Homepage-only styles
│       ├── about.css   ← About-only styles
│       ├── portfolio.css
│       ├── pricing.css
│       └── contact.css
│
├── js/
│   ├── navbar.js       ← Scroll state, hamburger, mobile menu, active link
│   ├── animations.js   ← Scroll reveal, jitter/scramble text, page load sequence
│   ├── faq.js          ← FAQ accordion (index + contact pages)
│   ├── portfolio.js    ← Portfolio card filter by category
│   └── script.js       ← Contact form (Formspree async submit)
│
├── components/
│   ├── navbar.html     ← Navbar HTML reference (copy-paste into new pages)
│   └── footer.html     ← Footer HTML reference (copy-paste into new pages)
│
├── images/             ← All site images (use descriptive filenames)
├── fonts/              ← Self-hosted fonts (if added later)
├── assets/             ← Icons, PDFs, other static assets
│
├── vercel.json         ← Vercel deployment config (clean URLs, headers, cache)
├── .gitignore          ← Git ignore rules
└── README.md           ← This file
```

---

## CSS Load Order

Every page loads CSS in this exact order:

```html
<link rel="stylesheet" href="css/style.css"/>       <!-- Variables + reset -->
<link rel="stylesheet" href="css/navbar.css"/>      <!-- Navbar -->
<link rel="stylesheet" href="css/footer.css"/>      <!-- Footer -->
<link rel="stylesheet" href="css/responsive.css"/>  <!-- Media queries -->
<link rel="stylesheet" href="css/animations.css"/>  <!-- Motion rules -->
<link rel="stylesheet" href="css/pages/[page].css"/><!-- Page-specific -->
```

---

## JS Load Order

```html
<script src="js/navbar.js"></script>       <!-- All pages -->
<script src="js/animations.js"></script>  <!-- All pages -->
<script src="js/faq.js"></script>         <!-- index + contact only -->
<script src="js/portfolio.js"></script>   <!-- portfolio only -->
<script src="js/script.js"></script>      <!-- index + contact (Formspree) -->
```

---

## Brand System

| Token | Value |
|-------|-------|
| Background | `#050505` |
| Surface | `#111111` |
| Surface 2 | `#1C1C1C` |
| Surface 3 | `#2A2A2A` |
| Text | `#FAFAF8` |
| Muted | `#6B6B6B` |
| Border | `rgba(255,255,255,0.08)` |
| Display font | Playfair Display (900, 700, italic) |
| Body font | Instrument Sans (300, 400, 500, 600) |
| Easing | `cubic-bezier(0.22, 1, 0.36, 1)` |

**Rules:** No green. No gradients. No glow. No emojis in UI. Monochrome only. Border radius max 4px.

---

## Animations

| Effect | Where | File |
|--------|-------|------|
| Scroll reveal | All pages | `animations.js` + `animations.css` |
| Jitter/scramble text | Hero headline | `animations.js` |
| Page load fade | Hero | `animations.js` |
| Marquee | Homepage | `animations.css` |
| Service row fill | Homepage | `animations.css` |
| FAQ accordion | Index + Contact | `faq.js` + `animations.css` |
| Portfolio filter | Portfolio | `portfolio.js` |

---

## Adding a New Page

1. Copy `contact.html` as a template
2. Update `<title>`, `<meta>`, and `<link rel="canonical">`
3. Set the correct active nav link: add `class="active"` to the right `<a>`
4. Create `css/pages/newpage.css` for page-specific styles
5. Add the new CSS link after `animations.css`
6. Build the page sections inside `<body>` between navbar and footer
7. Load only the JS files that page needs

---

## Deployment (Vercel)

1. Push to GitHub: `git push origin main`
2. Vercel auto-deploys on every push
3. `vercel.json` handles: clean URLs, security headers, asset caching
4. Custom domain: set in Vercel dashboard → nexuswavemediaagency.com

---

## Formspree Setup

Contact form action is set to `https://formspree.io/f/nexuswave`.  
Update the form endpoint in `index.html` and `contact.html` with your real Formspree ID.

---

## Contact

**WhatsApp:** +92 304 7355553  
**Email:** info@nexuswavemediaagency.com  
**Location:** Hyderabad, Sindh, Pakistan
