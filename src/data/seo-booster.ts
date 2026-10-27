/**
 * SEO Super Booster — PUBG Hack (pubg-hack.org). Copy/intent map for writers; enforced in Layout + verify-seo.mjs.
 */
export const SITE_PURPOSE =
	'PUBG (PlayerUnknown\'s Battlegrounds) hack guides, feature lists, and license checkout for Windows PC only.';

/** Exactly six knowsAbout terms — Organization JSON-LD. */
export const SITE_ABOUT = [
	'PUBG player ESP',
	'PUBG loot ESP',
	'PUBG world overlays',
	'BattlEye patch maintenance',
	'Windows PC cheat setup',
	'PUBG hack pricing',
] as const;

/** Route → search intent (not rendered as keyword lists). */
export const SEO_ROUTE_INTENTS: Record<string, string> = {
	'/': 'pubg hack, ESP, loot filters, compare cheats',
	'/pubg-cheats/': 'pubg hacks, buy pubg cheats, feature overview',
	'/pubg-cheat-price/': 'pubg hack price, monthly and lifetime plans',
	'/best-pubg-cheats/': 'best pubg cheats, comparison',
	'/pubg-cheat-reviews/': 'pubg hack reviews, buyer feedback',
	'/pubg-aimbot/': 'pubg aimbot, skillshot assist',
	'/pubg-esp/': 'pubg esp hack, player and loot ESP',
	'/features/': 'pubg hack features',
	'/updates/': 'BattlEye status, patch rebuilds',
	'/forums/': 'setup tips, ESP presets, patch day',
	'/faq/': 'pricing, delivery, Windows requirements',
};

export const OG_SOCIAL_WIDTH = 1200;
export const OG_SOCIAL_HEIGHT = 630;
