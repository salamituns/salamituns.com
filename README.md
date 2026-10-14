# salamituns.com

Personal site for Olatunde Salami — geoscientist and software engineer.

**Live site**: [salamituns.com](https://salamituns.com) (deployed on Vercel, linked to this repository)

## About

A deliberately minimal single-page site: a short bio, selected projects, writing from my
[Substack](https://salamituns.substack.com), and links. No frameworks, no build step, no
dependencies — one HTML file with inline CSS, plus one small serverless function that
caches the GitHub contributions graph.

## Structure

```
salamituns.com/
├── index.html             # The entire site
├── favicon.svg            # Icon (modern browsers)
├── favicon.ico            # Icon fallback
├── apple-touch-icon.png   # iOS home screen icon
├── og-image.png           # Social preview image
├── robots.txt
├── sitemap.xml
├── api/
│   └── contributions.js   # Edge-cached proxy for the GitHub graph
├── vercel.json            # www → apex redirect, security headers
├── README.md
└── .gitignore
```

## Design notes

- System font stack (San Francisco on macOS/iOS, Segoe UI on Windows, Roboto on Android)
- Near-black text on a warm paper background
- Single muted blue accent for links
- ~620px measure, generous line height and whitespace

## Local development

```bash
# Open directly, or serve for live reload
npx serve .

# Or run with the /api function, exactly as on Vercel
vercel dev
```

Under `npx serve`, the contributions graph falls back to calling the public API directly.

## Editing

Everything lives in `index.html`. Content sections are marked with `<section>` tags:

- **Projects** — add an `<article class="project-card">` to `.project-grid`, most important
  first. With an odd number of cards, the first spans both columns automatically. Cards
  sharing a row look best with descriptions of similar length.
- **Writing** — add an `<li>` with the post URL and a
  `<time class="entry-date" datetime="YYYY-MM-DD">Mon YYYY</time>`
- **Links** — the `li` items in the Links list

After any content change, bump `<lastmod>` in `sitemap.xml`.

If you add a new external script, image host, or fetch target, add its origin to the
`Content-Security-Policy` header in `vercel.json`, or the browser will block it.

## Deployment

Pushes to `main` deploy automatically via Vercel. The `salamituns.com` domain is managed
in Vercel (domain settings, DNS).

## License

© 2026 Olatunde Salami. All rights reserved.
