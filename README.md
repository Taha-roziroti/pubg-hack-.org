# PUBG Hack — Marketing Site

Static Astro site for [pubg-hack.org](https://pubg-hack.org). Primary SEO keyword (placeholder until finalized): **pubg hack**.

## Stack

- Astro 7 + Tailwind CSS 4 + TypeScript
- 22-locale i18n (English at root)
- Cloudflare Workers deployment

## Quick start

```bash
npm install
npm run localhost
```

## Configuration

- **Brand, domain, checkout:** `src/data/brand.ts`
- **Checkout URL:** `https://zadeyo.com/go/TAHA?to=%2Fproducts%2Fpubg`
- **Features copy (EN):** `src/data/i18n/simple-pages.ts` → `features`

## Deploy

See [DEPLOY.md](./DEPLOY.md) for Cloudflare Workers setup targeting **pubg-hack.org**.
