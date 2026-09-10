# Havenlane — Frontend Project

Frontend-only concept site for a serviced-apartments / corporate-housing
platform, inspired by relocatte.com. No backend — all forms and interactions
run client-side only.

## Structure

```
havenlane/
├── index.html      → page markup
├── css/style.css   → all styling (design tokens at the top of the file)
├── js/script.js    → nav, scroll reveal, search widget, testimonial slider, forms
├── images/         → drop real photos here when ready (see note below)
└── README.md
```

## Running it

No build step needed. Either:
- Double-click `index.html` to open it directly in a browser, or
- In VS Code, use the **Live Server** extension and "Open with Live Server"
  on `index.html` (recommended — some browsers restrict local file access
  for things like the date input otherwise).

## Adding real images later

Right now every visual — the hero graphic, the three collection icons — is
hand-drawn inline SVG (inside `index.html`), styled with the brand colors.
That's why there are no broken-image icons anywhere yet. When you're ready
to swap in real photography:

1. Drop files into `images/` (e.g. `hero.jpg`, `residence-1.jpg`).
2. In `index.html`, find the relevant `<svg>...</svg>` block (search for
   `arch-card` for the hero, or `collection-visual` for the three cards).
3. Replace it with `<img src="images/hero.jpg" alt="...">`.

## Brand tokens (in `css/style.css`, top of file)

- Colors: `--ink` `--paper` `--sand` `--coral` `--forest` `--stone`
- Fonts: Fraunces (headings) + Work Sans (body), loaded from Google Fonts
- The name "Havenlane" is a placeholder — it's a plain find-and-replace
  across the three files if you land on a real brand name.
