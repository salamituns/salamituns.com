# salamituns.com

Personal site for Olatunde Salami — geoscientist and software engineer.

**Live site**: [salamituns.com](https://salamituns.com) (deployed on Vercel, linked to this repository)

## About

A deliberately minimal single-page site: a short bio, selected projects, writing from my
[Substack](https://salamituns.substack.com), and links. No frameworks, no build step, no
dependencies — one HTML file with inline CSS.

## Structure

```
salamituns.com/
├── index.html   # The entire site
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
```

## Editing

Everything lives in `index.html`. Content sections are marked with `<section>` tags:

- **Projects** — add an `<li>` under the Projects list
- **Writing** — add an `<li>` with the post URL
- **Links** — the `li` items in the Links list

## Deployment

Pushes to `main` deploy automatically via Vercel. The `salamituns.com` domain is managed
in Vercel (domain settings, DNS).

## License

© 2026 Olatunde Salami. All rights reserved.
