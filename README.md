# Ahmed Elmarghany — Developer & UI/UX Designer Portfolio

A hand-crafted, static portfolio website. No build step, no dependencies, no backend.
Dark theme by default; light theme available via the header toggle.

## Files

| File | Purpose |
|---|---|
| `index.html` | The portfolio: Hero, About, Projects (compact cards), UI/UX Showcase, Skills, Journey, Contact |
| `styles.css` | Design system: tokens, typography, glass surfaces, ambient background, light + dark themes |
| `main.js` | Vanilla JS: dark-first theme toggle, scroll-spy nav, reveal-on-scroll, mobile menu, contact form → `mailto:` |
| `assets/Ahmed-Elmarghany-CV.pdf` | The official résumé (the attached CV), linked from hero, nav, contact |

## Run it

Just open `index.html` in a browser — or serve the folder:

```
python -m http.server 4173
# → http://127.0.0.1:4173
```

## Linked assets (all real, from the CV)

- **GitHub:** github.com/AhmedElmarghany
- **LinkedIn:** linkedin.com/in/AhmedElmarghany
- **Email:** ahmedelmarghany01@gmail.com · **Phone:** +20 109 549 6727
- **Reelio:** github.com/AhmedElmarghany/Reelio
- **AuthCore:** repo + live demo (authcore-app.netlify.app)
- **Focus-CRM:** repo + live demo (ahmedelmarghany.pythonanywhere.com)
- **Kalima:** repo + live demo (GitHub Pages)

## Design system

- **Type:** Fraunces (display, editorial serif) · Inter (text) · JetBrains Mono (labels, meta)
- **Color:** warm charcoal default (`#161513`) + cream ink + terracotta accent (`#D97B50`); light theme is warm paper
- **Glass surfaces:** translucent cards with `backdrop-filter` over a fixed, ultra-quiet ambient color field — the effect reads as depth, not decoration
- **Cards:** rounded cards with square-corner artwork inside (card radius clips the media)
- **Motion:** hover lift + image zoom on cards, staggered reveal on scroll; everything disabled under `prefers-reduced-motion`

## Notes

- Project cards use real product screenshots (in `assets/`); the Design section tiles are illustrative concept mockups.
- The enterprise case study is sanitized: no companies, clients, URLs, or metrics.
- Lighthouse: Accessibility 100 · Best Practices 100 · SEO 100.
