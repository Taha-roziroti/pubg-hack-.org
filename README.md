# Buy PUBG Cheat — Marketing Site

Static Astro site for [pubg-hack.org](https://pubg-hack.org). Primary SEO keyword: **buy pubg cheat** (secondary: pubg cheats, pubg esp, pubg aimbot, pubg wallhack).

## Stack

- Astro 7 + Tailwind CSS 4 + TypeScript
- 22-locale i18n (English at root, `/es/`, `/fr/`, …)
- Cloudflare Workers deployment with `src/worker.ts`

## Quick start

```bash
npm install
npm run localhost
# open http://localhost:5173
```

## Deploy

See [DEPLOY.md](./DEPLOY.md) for Cloudflare Workers Builds setup targeting **pubg-hack.org**.

## Open configuration

- Production domain and checkout: `src/data/brand.ts` (`url`, `checkoutUrl`)
- Replace `https://example.com/AFFILIATE_LINK_PLACEHOLDER` with your live affiliate link before launch.
