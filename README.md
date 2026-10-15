# salamituns.com

Personal site for Olatunde Salami — geoscientist and software engineer.

**Live site**: [salamituns.com](https://salamituns.com) (deployed on Vercel, linked to this repository)

## About

A deliberately minimal static site: a prose homepage that links out to Work, Writing,
and Publications, a floating pill nav, and light/dark themes. The look follows
[bolabanjo.com](https://bolabanjo.com) (Once UI's Magic Portfolio): a script signature
for the name, gray prose, monochrome underlined links. No frameworks, no build step —
plain HTML pages sharing one stylesheet and one script, plus one small serverless
function that caches the GitHub contributions graph.

## Structure

```
salamituns.com/
├── index.html             # Home: signature + short bio (also holds JSON-LD)
├── work.html              # /work — projects + GitHub graph
├── writing.html           # /writing — essays + Substack subscribe
├── publications.html      # /publications — books + research profiles
├── styles.css             # Shared styles (tokens at the top)
├── site.js                # Theme toggle, header clock, GitHub graph
├── fonts/                 # Self-hosted Geist, Geist Mono, Great Vibes (OFL)
├── images/work/           # Project previews on /work (1200×750 WebP)
├── api/
│   └── contributions.js   # Edge-cached proxy for the GitHub graph
├── vercel.json            # cleanUrls, www → apex redirect, security headers
├── favicon.svg / favicon.ico / apple-touch-icon.png / og-image.png
├── robots.txt
└── sitemap.xml
```

`cleanUrls` in `vercel.json` serves `work.html` at `/work` (and `npx serve` does the same
locally). Old single-page anchors such as `/#energy-justice` redirect to `/publications`.

## Design notes

- Geist for text, Geist Mono for data (clock, dates, index numbers), Great Vibes for the
  signature on the home page
- Three text tones: `--text`, `--muted`, and `--faint` (decoration only, below WCAG contrast)
- Pure white / near-black, gray body text, links marked only by a faint underline
- ~680px measure; the pill nav floats at the top on desktop and the bottom on phones (≤768px)
- Content fades up on load in a stagger: the title rises slowest, then each block a beat
  apart (skipped under `prefers-reduced-motion`)

## Local development

```bash
# Serve with clean URLs
npx serve .

# Or run with the /api function, exactly as on Vercel
vercel dev
```

Under `npx serve`, the contributions graph falls back to calling the public API directly.

## Editing

Each page is self-contained HTML. The header and footer are repeated in all four pages,
so change them in every file.

- **Projects** (`work.html`) — copy an `<li class="project">`: name, `.row-index` number,
  `.row-kind` label, `.row-desc`, and a preview. Make the preview by screenshotting the
  site at 1440×900, then `cwebp -resize 1200 750 -q 78 shot.png -o images/work/name.webp`.
- **Writing** (`writing.html`) — add an `<li>` with
  `<time class="row-meta" datetime="YYYY-MM-DD">Mon YYYY</time>`, a `.row-title` link,
  and a `.row-desc` line.
- **Home bio** (`index.html`) — two versions: `.bio-desktop` (full) and `.bio-mobile`
  (two short lines; phones show only this so the page fits one screen). Edit both.
- **Social links** — the `.socials` icons in each page's footer.

After any content change, bump `<lastmod>` in `sitemap.xml`.

If you add a new external script, image host, or fetch target, add its origin to the
`Content-Security-Policy` header in `vercel.json`, or the browser will block it. Fonts
are self-hosted for the same reason.

## Deployment

Pushes to `main` deploy automatically via Vercel. The `salamituns.com` domain is managed
in Vercel (domain settings, DNS).

## License

© 2026 Olatunde Salami. All rights reserved.
