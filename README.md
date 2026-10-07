# Ledion Imeri — Portfolio

Personal portfolio of **Ledion Imeri**, Computer Science Student & Software Developer.
Built with **React + Vite**, plain CSS and zero UI libraries (only `react` and `react-dom` ship to the browser).

## Quick start

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # production build → dist/
npm run preview   # serve the production build locally
```

Requires Node.js 20+.

## Project structure

```
├── index.html            # SEO meta, Open Graph, Twitter card, JSON-LD, loading screen
├── 404.html              # Custom 404 page (served automatically by Netlify, Vercel, GitHub Pages…)
├── public/               # favicon, og-image.png, apple-touch-icon, cv/
├── .env.example          # all optional settings (copy to .env)
└── src/
    ├── data/config.js    # ★ ALL CONTENT LIVES HERE
    ├── assets/icons.js   # inline SVG icon registry (tech + UI icons)
    ├── components/       # reusable UI: Button, Icon, Navbar, ProjectCard, TimelineItem, ContactForm, Cursor…
    ├── sections/         # page sections: Hero, About, Skills, WhatIDo, Projects, Experience, Education…
    ├── pages/NotFound.jsx
    ├── hooks/            # useActiveSection, useScrolled, useReveal
    ├── utils/            # analytics, contact transport, LeetCode stats, content helpers
    └── styles/           # base (tokens), components, sections, index (reveal + reduced motion)
```

## Updating content

Everything is edited in **`src/data/config.js`**. Empty values are hidden automatically — no empty cards or sections.

| What | How |
| --- | --- |
| **CV** | Put the PDF in `public/cv/` and set `personal.cv.url = '/cv/Ledion-Imeri-CV.pdf'`. Until then all CV buttons say **"Request CV"** and open a pre-filled email. |
| **YouTube channel** | Set the `url` of the `youtube` entry in `socials`. The icon appears in hero, mobile menu, contact and footer. |
| **New project** | Add an object to `projects`. Buttons appear only for links you fill (`github`, `live`, `youtube`, `docs`). Screenshots: put images in `public/projects/` and add `images: [{ src: '/projects/app.png', alt: '…' }]`. `featured: true` uses the large layout; other projects go into a grid. |
| **PunaKosova GitHub** | When the repository is public, set `projects[0].links.github` — the GitHub button appears. |
| **Experience / internships** | Add entries to `experience` (example in the comments). The section **and** its navbar item appear automatically. |
| **Certifications / achievements / articles** | Add entries to `certifications`, `achievements` or `articles`. Each section appears when it has data. |
| **Skills** | Edit `skillGroups`. Icons are keys from `src/assets/icons.js`. |
| **Education** | Edit `education` (you can add a `period`, e.g. `'2025 – Present'`). |
| **LeetCode** | Set `leetcode.profileUrl` and fill the numbers in `leetcode.stats` — or use a live endpoint (below). Stats left as `null` are not shown. |

## Environment variables

Copy `.env.example` to `.env`. Everything is optional — the site works without any of them.

| Variable | Purpose |
| --- | --- |
| `VITE_SITE_URL` | Your domain (e.g. `https://ledionimeri.dev`). Enables canonical URL, absolute OG/Twitter image URLs, `sitemap.xml` and `robots.txt`. |
| `VITE_BASE_PATH` | Sub-folder deployments, e.g. `/portfolio/` for a GitHub Pages project site. |
| `VITE_GA_ID` | Google Analytics 4 ID (`G-XXXXXXXXXX`). Without it, analytics is never loaded. Respects Do Not Track. |
| `VITE_CONTACT_PROVIDER` | `formspree`, `emailjs` or `custom` (see below). |
| `VITE_LEETCODE_STATS_ENDPOINT` | Optional URL returning LeetCode stats JSON. |

### Contact form

The form always validates on the client. How it sends depends on configuration:

- **Nothing configured (default):** it opens the visitor's email app with the message pre-filled and says so honestly in the UI.
- **Formspree:** `VITE_CONTACT_PROVIDER=formspree` + `VITE_FORMSPREE_ID=<form id>`.
- **EmailJS:** `VITE_CONTACT_PROVIDER=emailjs` + service ID, template ID and public key. Template params: `from_name`, `reply_to`, `message`.
- **Custom backend:** `VITE_CONTACT_PROVIDER=custom` + `VITE_CONTACT_ENDPOINT` — receives `POST` JSON `{ name, email, message }`.

All transport logic is in `src/utils/contact.js`. A hidden honeypot field filters simple bots.

### LeetCode statistics

`VITE_LEETCODE_STATS_ENDPOINT` may contain `{username}`, which is replaced with `leetcode.username`.
Common response shapes are recognised (`totalSolved`/`easySolved`/`mediumSolved`/`hardSolved`, or `solved`/`easy`/`medium`/`hard`).
If the request fails, the manual values from `config.js` are used. Third-party LeetCode APIs can be unreliable — manual numbers are the safest option.

## Deployment

Any static host works (Netlify, Vercel, Cloudflare Pages, GitHub Pages):

- Build command: `npm run build`
- Output directory: `dist`
- Set the environment variables in the host's dashboard.

`dist/404.html` is used automatically as the not-found page by these hosts.

## Accessibility & performance notes

- Semantic landmarks, one `h1`, ordered `h2`/`h3` hierarchy, skip link, visible focus styles.
- Mobile menu: `aria-expanded`, Escape to close, focus trap, scroll lock.
- Form: labels, `aria-invalid`, linked error messages, polite live region; errors never shift the layout.
- `prefers-reduced-motion` disables reveal, parallax, marquee and cursor effects.
- Custom cursor only on devices with a fine pointer; the native cursor always stays visible.
- The YouTube demo loads only after a click (privacy-friendly `youtube-nocookie.com`).
- Icons are inline SVG data — no icon font or icon library in the bundle.
