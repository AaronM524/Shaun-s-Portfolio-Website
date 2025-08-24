# Portfolio Website

A modern, responsive portfolio website built with HTML, CSS, and JavaScript.

Modern design with smooth animations, responsive layout for all screen sizes, accessibility optimized with ARIA labels and semantic HTML, SEO optimized with meta tags and Open Graph, lazy loading for images, smooth scroll animations using AOS, and Progressive Web App capabilities.

Technologies: HTML5, CSS3, JavaScript, Bootstrap 5.3.2 for responsive grid, Font Awesome 6.4.0 and DevIcons for icons, AOS (Animate On Scroll) library, Vue.js 2.6.14 for project filtering, Google Fonts (Poppins).

Project Structure:
- index.html (Main HTML file)
- style.css (Main stylesheet) 
- script.js (JavaScript functionality)
- manifest.json (PWA manifest)
- robots.txt (SEO robots file)
- sitemap.xml (SEO sitemap)
- images/ (Image assets)

Getting Started:
1. Clone the repository
2. Open index.html in your web browser
3. For development, use a local server: python -m http.server 8000

Customization:
- Rotating headline: update phrases in `script.js` (see `phrasesMobile` and `phrasesDesktop`). Mobile-only sizing tweaks use CSS selectors like `.hero-subtext .animated-text[data-phrase="aws-azure"]`.
- Projects: edit `projectsData` in `script.js` to add/remove items and tags.
- Contact: the form posts to Formspree; change the `action` URL in `index.html#contact`.
- Styles: adjust colors, spacing, and components in `style.css`. Mobile and desktop rules are separated with media queries.

Development Notes:
- Run a local server for best results (video autoplay, fonts, and AOS init):
  - Python: `python -m http.server 8000`
  - Node: `npx http-server -p 8000`
- The navbar adapts color on light sections via JS (`NavbarManager`) and `.scrolled` styles.
- The mobile menu uses an overlay with no page scroll when open; ESC and background tap close it.
- The rotating headline uses a gradient text effect and cycles every ~3.5s. On mobile, transitions use fade-only to avoid layout twitch.

Accessibility:
- Keyboard-focus styles and larger tap targets on mobile are included.
- Respects `prefers-reduced-motion` to limit non-essential animations.

Deploy:
- Static hosting works out of the box (GitHub Pages, Vercel static, Netlify, etc.). Just serve the repo root.

Browser Support: Chrome, Firefox, Safari, Edge (latest versions)