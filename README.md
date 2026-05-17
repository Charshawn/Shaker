# Yusa Club Website

A modern, clean landing page for Yusa Club — guayusa-powered energy drinks for deep focus and creative work.

## Features

- **Hero Section**: Compelling headline with animated can mockups showcasing all three flavors
- **Brand Story**: Educational section about guayusa from Ecuador and its benefits
- **Flavors**: Three distinct product cards for Mango Bloom, Peach Glow, and Agave Still
- **Responsive Design**: Fully responsive across desktop, tablet, and mobile devices
- **Smooth Animations**: Intersection Observer API for scroll-triggered fade-in effects
- **Modern UI**: Clean typography, gradient accents, and smooth interactions

## File Structure

```
yusaclub-website/
├── index.html      # Main HTML structure
├── styles.css      # All styling and responsive design
├── script.js       # Interactive features and animations
└── README.md       # This file
```

## Local Development

Simply open `index.html` in your browser to view the website locally.

## Deployment Options

### Option 1: Vercel (Recommended)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project directory
3. Follow the prompts to deploy

### Option 2: Netlify
1. Go to [netlify.com](https://netlify.com)
2. Drag and drop the `yusaclub-website` folder
3. Your site will be live instantly

### Option 3: Custom Domain (yusaclub.com)
Since you already own yusaclub.com:

1. Deploy using Vercel or Netlify
2. Add your custom domain in their dashboard
3. Update your DNS settings to point to their servers

#### DNS Configuration Example (Vercel):
- **A Record**: `@` → `76.76.21.21`
- **CNAME**: `www` → `cname.vercel-dns.com`

## Customization

### Colors
Edit the CSS variables in `styles.css` (lines 18-30):
```css
--color-primary: #1a1a1a;
--color-accent: #00d4aa;
--color-mango: #ffb84d;
--color-peach: #ffb3ba;
--color-agave: #b5e7a0;
```

### Content
All content is in `index.html` — search for section classes:
- `.hero` — Main headline
- `.story` — Brand story
- `.flavors` — Product cards

### Images
Replace the placeholder `div` elements with actual product images:
- `.hero-visual .can` elements → Replace with `<img>` tags
- `.image-placeholder` → Replace with actual guayusa/Ecuador imagery

## Next Steps

1. **Add Real Images**: Replace gradient placeholders with actual product photography
2. **CTA Integration**: Link "Explore Flavors" buttons to e-commerce or where-to-buy pages
3. **Email Capture**: Add newsletter signup form in footer
4. **Analytics**: Add Google Analytics or Plausible tracking
5. **SEO**: Add meta descriptions, Open Graph tags, and favicon

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

© 2026 Yusa Club. All rights reserved.
