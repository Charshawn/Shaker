# Yusa Club Website

A Sanzo-inspired, product-forward landing page for Yusa Club, a guayusa-powered sparkling energy drink built for long focus sessions.

## What Is Included

- Commerce-style hero section with all three clean front-can renders
- AI-generated product lifestyle imagery derived from the Yusa can references
- Shop-style product cards for Mango Bloom, Peach Glow, and Acai Still
- Brand story and ingredient education sections
- Bold press/benefit strip and quote band
- Responsive layout for desktop, tablet, and mobile
- Lightweight JavaScript for smooth scrolling, nav shadow, and section reveal animations

## File Structure

```text
yusaclub-website/
├── index.html
├── styles.css
├── script.js
├── README.md
└── images/
    ├── AcaiCan.png
    ├── MangoCan.png
    ├── PeachCan.png
    ├── Yusa Logo.png
    ├── generated/
    │   ├── AcaiFront.png
    │   ├── AcaiBack.png
    │   ├── MangoFront.png
    │   ├── MangoBack.png
    │   ├── PeachFront.png
    │   ├── PeachBack.png
    │   ├── yusa-mango-hero.webp
    │   ├── yusa-peach-lifestyle.webp
    │   └── yusa-acai-lifestyle.webp
    ├── amazon-leaves.svg
    ├── botanical-pattern.svg
    └── focus-lines.svg
```

## Local Development

Open `index.html` directly in a browser. No build step is required.

## Customization

Product assets live in `images/`. Keep the current filenames if you replace the can renders or logo, and the site will pick them up automatically.

Core design tokens live at the top of `styles.css`:

```css
--ink: #25151f;
--berry: #8d164e;
--pink: #f175ad;
--gold: #dec066;
--mango: #eba037;
--peach: #e7967c;
--acai: #2a1728;
```

Main content is in `index.html` under:

- `.hero` for the first screen
- `.shop` for the product cards
- `.story` for the guayusa origin section
- `.ingredients` for the product education section

## Deployment

This is a static site, so it can be deployed on Vercel, Netlify, GitHub Pages, or any static host.

For Vercel with `yusaclub.com`:

- A record: `@` to `76.76.21.21`
- CNAME: `www` to `cname.vercel-dns.com`

## License

© 2026 Yusa Club. All rights reserved.
