/** Shared constants for i18n content generation. */

export const LOCALES = [
	'en', 'es', 'fr', 'de', 'pt', 'it', 'nl', 'pl', 'ru', 'tr',
	'ar', 'ja', 'ko', 'zh', 'hi', 'id', 'th', 'vi', 'uk', 'cs', 'ro', 'sv',
];

export const PAGE_IDS = [
	'home', 'pubg-esp', 'pubg-aimbot', 'features', 'pricing', 'setup',
	'updates', 'faq', 'support', 'reliable', 'wallhack', 'radar', 'vac',
	'cheats-2026', 'hacks', 'cheat-download', 'mod-menu', 'soft-aim', 'best-cheats',
	'aimbot-hack', 'esp-hack', 'unlock-all', 'privacy', 'refund', 'terms',
];

/** Agent image per page — simple PUBG hacks keyword filenames. */
export const HERO_IMAGES = {
	home: '/images/pubg-screenshot-01.webp',
	'pubg-esp': '/images/pubg-screenshot-01.webp',
	'pubg-aimbot': '/images/pubg-screenshot-02.webp',
	features: '/images/pubg-screenshot-03.webp',
	pricing: '/images/pubg-screenshot-04.webp',
	setup: '/images/pubg-screenshot-05.webp',
	updates: '/images/pubg-screenshot-06.webp',
	faq: '/images/pubg-screenshot-06.webp',
	support: '/images/pubg-screenshot-06.webp',
	reliable: '/images/pubg-screenshot-01.webp',
	wallhack: '/images/pubg-screenshot-02.webp',
	radar: '/images/pubg-screenshot-03.webp',
	vac: '/images/pubg-screenshot-04.webp',
	'cheats-2026': '/images/pubg-screenshot-05.webp',
	hacks: '/images/pubg-screenshot-06.webp',
	'cheat-download': '/images/pubg-screenshot-06.webp',
	'mod-menu': '/images/pubg-screenshot-02.webp',
	'soft-aim': '/images/pubg-screenshot-01.webp',
	'best-cheats': '/images/pubg-screenshot-02.webp',
	'aimbot-hack': '/images/pubg-screenshot-03.webp',
	'esp-hack': '/images/pubg-screenshot-04.webp',
	'unlock-all': '/images/pubg-screenshot-05.webp',
	privacy: '/images/pubg-screenshot-06.webp',
	refund: '/images/pubg-screenshot-06.webp',
	terms: '/images/pubg-screenshot-03.webp',
};

export const TS_HEADER = `import type { LocaleCode } from './locales';

export type PageSection = { h2: string; paragraphs: string[]; list?: string[] };
export type PageContent = {
\ttitle: string;
\tdescription: string;
\th1: string;
\tintro: string;
\timageAlt: string;
\tgalleryTitle: string;
\theroImage: string;
\tsections: PageSection[];
\tctaPrimary: string;
\tctaSecondary?: string;
\tctaSecondaryHref?: string;
};
export type LocaleUi = {
\tnav: { home: string; hacks: string; aimbot: string; esp: string; features: string; pricing: string; setup: string; updates: string; faq: string; buyNow: string };
\thero: { accent: string; accentShort: string; subtitle: string; subtitleShort: string; buyNow: string; seeFeatures: string };
\ttrust: { status: string; statusNote: string; statusShort: string; delivery: string; platform: string; antiCheat: string; antiCheatShort: string };
\tproduct: { title: string; addToCart: string; monthly: string; lifetime: string; available: string; gameBadge: string; platformBadge: string; statusBadge: string };
\treviews: { title: string; subtitle: string; outOf: string; countLabel: string };
\tcommon: { buyNow: string; readGuide: string; language: string; officialLanguageNote: string; relatedPages: string };
\tfooter: { explore: string; help: string; tagline: string };
\timages: {
\t\thero: string; espWallhack: string; aimbotCombat: string; squadFight: string; playerEsp: string;
\t\theaderArt: string; hacksPackage: string; matchFight: string; battleRoyale: string; matchMap: string;
\t};
};
export type PageId = 'home' | 'pubg-esp' | 'pubg-aimbot' | 'features' | 'pricing' | 'setup' | 'updates' | 'faq' | 'support' | 'reliable' | 'wallhack' | 'radar' | 'vac' | 'cheats-2026' | 'hacks' | 'cheat-download' | 'mod-menu' | 'soft-aim' | 'best-cheats' | 'aimbot-hack' | 'esp-hack' | 'unlock-all' | 'privacy' | 'refund' | 'terms';
`;

/** Clamp meta strings to SEO limits without ugly ellipsis. */
export function clampTitle(s) {
	if (s.length <= 60) return s;
	const trimmed = s.slice(0, 60);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 45 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, 60);
}

export function clampDesc(s) {
	let text = s.trim();
	const MIN = 140;
	const MAX = 160;
	if (text.length < MIN) {
		const pad = text.toLowerCase().includes('pubg-hack.org')
			? ' Windows PC license with BattlEye maintenance after patches.'
			: ' Compare plans and guides at pubg-hack.org.';
		text = `${text.replace(/[.…]+$/, '')}.${pad}`;
	}
	if (text.length <= MAX) return text;
	const trimmed = text.slice(0, MAX);
	const lastSpace = trimmed.lastIndexOf(' ');
	return lastSpace > 130 ? trimmed.slice(0, lastSpace) : trimmed.slice(0, MAX);
}

/** Remove checkout from meta title/description strings only. */
export function stripcheckoutFromMeta(text) {
	return text
		.replace(/\s*[—–-]\s*secure checkout\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout en checkout\.?/gi, '.')
		.replace(/\s*[—–-]\s*checkout über checkout\.?/gi, '.')
		.replace(/\s*with secure checkout\.?/gi, '.')
		.replace(/\s*via secure checkout\.?/gi, '.')
		.replace(/\s*secure checkout\.?/gi, '')
		.replace(/\s*secure checkout,?\s*/gi, ' ')
		.replace(/\s*checkout delivery\.?/gi, ' instant digital delivery.')
		.replace(/\s*and checkout delivery\.?/gi, ' and instant digital delivery.')
		.replace(/\|\s*Instant checkout Delivery/g, '| Instant Digital Delivery')
		.replace(/Buy on checkout/g, 'Buy PUBG Hack')
		.replace(/\s{2,}/g, ' ')
		.trim();
}

/** Build a page section. Pass 2+ paragraph strings; optional trailing string[] becomes list. */
export function section(h2, ...args) {
	let list;
	const paragraphs = [...args];
	if (paragraphs.length && Array.isArray(paragraphs[paragraphs.length - 1])) {
		list = paragraphs.pop();
	}
	if (paragraphs.length < 2) {
		throw new Error(`section "${h2}" needs at least 2 paragraphs`);
	}
	const sec = { h2, paragraphs };
	if (list?.length) sec.list = list;
	return sec;
}

/** Authoritative external citation helpers (open in new tab). */
export const EXT = {
	pubg:
		'<a href="https://store.steampowered.com/app/1867240/PUBG/" target="_blank" rel="noopener noreferrer">PUBG on Steam</a>',
	status:
		'<a href="https://store.steampowered.com/app/1867240/PUBG/" target="_blank" rel="noopener noreferrer">PUBG on Steam</a>',
	elytra:
		'<a href="https://store.steampowered.com/app/1867240/PUBG/" target="_blank" rel="noopener noreferrer">BattlEye anti-cheat</a>',
	eac:
		'<a href="https://www.easy.ac/" target="_blank" rel="noopener noreferrer">Easy Anti-Cheat</a>',
	vac:
		'<a href="https://store.steampowered.com/app/1867240/PUBG/" target="_blank" rel="noopener noreferrer">BattlEye anti-cheat</a>',
	dota2:
		'<a href="https://store.steampowered.com/app/1867240/PUBG/" target="_blank" rel="noopener noreferrer">PUBG</a>',
	Valve:
		'<a href="https://store.steampowered.com/app/1867240/PUBG/" target="_blank" rel="noopener noreferrer">PUBG</a>',
	rust:
		'<a href="https://store.steampowered.com/app/1867240/PUBG/" target="_blank" rel="noopener noreferrer">PUBG</a>',
	finals:
		'<a href="https://store.steampowered.com/app/1867240/PUBG/" target="_blank" rel="noopener noreferrer">PUBG</a>',
	naraka:
		'<a href="https://store.steampowered.com/app/1867240/PUBG/" target="_blank" rel="noopener noreferrer">PUBG</a>',
};
