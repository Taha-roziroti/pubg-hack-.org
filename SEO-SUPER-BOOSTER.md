# SEO Super Booster — PUBG Hack (pubghack.org)

Implementation playbook for this Astro template. Enforced via `scripts/verify-seo.mjs` on `npm run build` (`postbuild`).

## 1. Single canonical host

- `brand.url` / `CANONICAL_ORIGIN` in `src/lib/canonical-origin.ts` → `https://pubghack.org` (apex, no `www`).
- `pubghack.org`, `www.pubghack.org`, and legacy template domains → **301** apex (`src/worker.ts`, `functions/_middleware.js`).
- Every HTML page: self-referencing `rel=canonical`, `hreflang=en`, `hreflang=x-default` on the same apex URL.

## 2. Page-level metadata discipline

- One `<h1>` per indexed page; unique `<title>` and `meta description` sitewide (no duplicates).
- `og:title` / `og:description` match `<title>` / description exactly.
- `og:image` + `twitter:image` → `https://pubghack.org/og/home.jpg` at **1200×630** (`og:image:width` / `height`).
- `rel=image_src` on all indexable pages.
- `robots`: `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`.
- No `meta keywords`, no `SearchAction`, no keyword-list JSON-LD.

## 3. Structured data graph

- Shared `@id` `https://pubghack.org/#product` on home and reviews.
- `Organization` + `WebSite` on every page; `SITE_PURPOSE` and six `knowsAbout` terms in `src/data/seo-booster.ts`.
- Product on homepage; `FAQPage` on `/faq/` (not duplicated on EN home).
- Reviews: `Product` + `ItemList` + per-review nodes.

## 4. Intent map (not rendered as keywords)

Use `SEO_ROUTE_INTENTS` in `src/data/seo-booster.ts` when writing copy. Primary queries:

| Route | Focus |
|-------|--------|
| `/` | pubg hack, ESP, loot filters, compare cheats |
| `/pubg-cheat-price/` | pubg hack price, plans |
| `/best-pubg-cheats/` | best pubg cheats, comparison |
| `/pubg-cheats/` | product features, ESP, setup |
| `/forums/` | setup, ESP, patch day |
| `/pubg-cheat-reviews/` | buyer feedback |
| `/faq/` | pricing, Windows, delivery |

## 5. Media & thumbnails

- First-party screenshots under `public/images/pubg-screenshot-*.webp`.
- Run `npm run generate:seo-assets` → `public/og/home.jpg` (1200×630).
- Hero cinematic WebP under `public/videos/`; descriptive `alt` on all visible images.

## 6. Sitemap

- Astro-generated sitemaps under `dist/`; apex URLs only (`validate-sitemap-canonical-domain.mjs`).
- `robots.txt` lists `Sitemap: https://pubghack.org/sitemap.xml`.

## 7. Crawl rules

- `robots.txt`: allow `/`, `/og/`, `/videos/`, `/sitemap.xml`; disallow brand-studio.
- Explicit `Googlebot` allow block.

## 8. Build commands

```bash
npm run generate:seo-assets
npm run build
node scripts/verify-seo.mjs
```

## 9. Rebrand checklist (new game)

1. Edit `src/data/brand.ts` (URL, name, keywords, plans) → `npm run sync:brand`
2. Update `src/data/seo-booster.ts` (`SITE_PURPOSE`, `SEO_ROUTE_INTENTS`, `SITE_ABOUT`)
3. Replace screenshots and re-run `generate:seo-assets`
4. Update `scripts/verify-seo.mjs` host strings if domain changes
5. `npm run build` until verification passes
