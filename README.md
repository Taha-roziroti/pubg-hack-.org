# PUBG Hack — Marketing Site

Static Astro site for [pubg-hack.org](https://pubg-hack.org). Primary SEO keyword: **pubg hack** (full owner list in `src/data/pubg-keyword-registry.ts`).

## Locked SEO rules

Follow **[`.cursor/rules/seo-locked.mdc`](./.cursor/rules/seo-locked.mdc)** for page structure, nav meaning, tokens, schema, and copy style. Do not invent new SEO architecture.

## Stack

- Astro 7 + Tailwind CSS 4 + TypeScript
- 22-locale i18n (English at root)
- Cloudflare Pages / Workers deployment

## Quick start

```bash
npm install
npm run localhost
```

## Configuration

| Area | File |
|------|------|
| Brand, domain, theme, checkout | `src/data/brand.ts` |
| Checkout (affiliate) | `https://zadeyo.com/go/TAHA?to=%2Fproducts%2Fpubg` |
| Keyword hub copy (EN) | `src/data/pubg-keyword-pages.ts` |
| Features list (EN) | `src/data/i18n/simple-pages.ts` |
| Hero background | `public/videos/PUBG_Cinematic_5s_removed_1080p60.webp` |

Run `npm run sync:brand` before release builds (also runs on `prebuild`).

## Deploy

See [DEPLOY.md](./DEPLOY.md) for Cloudflare setup on **pubg-hack.org**.
