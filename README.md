# Yusa Club Website

A warm, product-forward landing page for Yusa Club, a guayusa-powered sparkling energy drink built for long focus sessions.

## What Is Included

- Editorial hero section with all three can renders
- Brand story section with custom botanical artwork
- Flavor cards for Mango Bloom, Peach Glow, and Acai Still
- Focus-positioning section with supporting line-art asset
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
--ink: #251b16;
--paper: #fff9ef;
--leaf: #284f38;
--mango: #e58b22;
--peach: #de7d63;
--acai: #2a1728;
```

Main content is in `index.html` under:

- `.hero` for the first screen
- `.story` for the guayusa origin section
- `.flavors` for the three product cards
- `.focus` for the final positioning section

## Deployment

This is a static site, so it can be deployed on Vercel, Netlify, GitHub Pages, or any static host.

For Vercel with `yusaclub.com`:

- A record: `@` to `76.76.21.21`
- CNAME: `www` to `cname.vercel-dns.com`

## License

© 2026 Yusa Club. All rights reserved.
