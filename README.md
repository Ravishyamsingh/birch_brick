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
├── images/         → logo and unit photography
├── _headers        → Cloudflare Pages security headers
├── robots.txt      → crawler rules and sitemap location
├── sitemap.xml     → homepage sitemap
└── README.md
```

## Running it

No build step needed. Either:
- Double-click `index.html` to open it directly in a browser, or
- In VS Code, use the **Live Server** extension and "Open with Live Server"
  on `index.html` (recommended for the smoothest experience).

## Deploying to Cloudflare Pages

This is a static site and does not require a framework, build command, or
output directory.

### Cloudflare dashboard

1. Open **Workers & Pages** in Cloudflare and choose **Create application → Pages → Upload assets**.
2. Upload the contents of this `havenlane` folder, including `index.html`,
   `css`, `js`, `images`, `_headers`, `robots.txt`, and `sitemap.xml`.
3. If you deploy through a connected Git repository instead, use `havenlane`
   as the project root, leave the build command empty, and use `.` as the
   output directory.
4. Replace `YOUR-DOMAIN.com` in `robots.txt` and `sitemap.xml` with the final
   Cloudflare Pages URL or custom domain, then redeploy.

The `_headers` file is automatically read by Cloudflare Pages and adds basic
security and privacy response headers. No local server or runtime is required.

## The property search

The search bar (city + property type) filters a small mock `PROPERTIES`
array defined at the top of the "Property listings" block in `js/script.js`
— there's no backend. Property type covers 1–4 BHK and 1–2 RK; city is
limited to Gurugram, Delhi, and Noida. Each listing renders as a card using
the same card shell as before, with:

- a 3-image carousel (dots, arrows, and touch-swipe on mobile — still
  illustrated placeholders per listing `kind`, defined in the `ICONS`
  object as `{ bhk: [...3 svgs], rk: [...3 svgs] }`)
- a "Verified" badge plus a second rotating tag (`Best Value`, `New
  Listing`, `Fast Booking`, `Popular` — set per listing via each entry's
  `tag` field)
- property type, description, three amenity chips (`amenities` array),
  and locality
- a stacked price block: struck-through `originalPrice`, a computed
  discount badge + a "No Brokerage" badge, a small "Verified Direct
  Price" label, then the final `price` — and an "Enquire Now" button

Edit the `PROPERTIES` array (`price`, `originalPrice`, `tag`, `amenities`,
etc.) to add, remove, or reprice listings — no other code needs to change.

## Adding real images later

Right now every visual — the hero graphic, the BHK/RK card icons, the
destination skylines — is hand-drawn inline SVG, styled with the brand
colors. That's why there are no broken-image icons anywhere yet. When
you're ready to swap in real photography:

1. Drop files into `images/` (e.g. `hero.jpg`, `1bhk-gurugram.jpg`).
2. In `index.html`, find the hero's `<svg>...</svg>` block (search for
   `arch-card`) and replace it with `<img src="images/hero.jpg" alt="...">`.
3. For property cards, the BHK/RK icons live in the `ICONS` object at the
   top of the property-listings block in `js/script.js` — swap those SVG
   strings for `<img>` tags pointing at `images/` once you have real photos.

## Brand tokens (in `css/style.css`, top of file)

- Colors: `--coral-deep` (primary olive-green) · `--coral` (accent orange)
  · `--ink` / `--ink-muted` / `--stone` (warm blacks and tans) · `--sand`
  (cream background) · `--forest` (secondary olive, used for the darker
  full-bleed sections)
- Fonts: Fraunces (headings) + Work Sans (body), loaded from Google Fonts
- The name "Havenlane" is a placeholder — it's a plain find-and-replace
  across the three files if you land on a real brand name.
