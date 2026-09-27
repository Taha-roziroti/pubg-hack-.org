import { brand } from './brand';
import type { PageId } from './i18n/routing';

export type ExternalResource = {
	id: string;
	label: string;
	href: string;
	note?: string;
};

export type GuideCta = {
	label: string;
	href: string;
};

/** Canonical outbound URLs — single source for CTAs, pills, and resource blocks. */
export const externalUrls = {
	steam: brand.gameUrl,
	steamNews: 'https://pubg.com/en/news',
	officialSite: 'https://pubg.com/',
	wiki: 'https://pubg.fandom.com/wiki/PUBG:_Battlegrounds',
	steamCommunity: 'https://www.reddit.com/r/PUBATTLEGROUNDS/',
} as const;

/** Authoritative third-party guides — cite official game sources for readers and search engines. */
export const externalResources: ExternalResource[] = [
	{
		id: 'steam',
		label: 'PUBG on PC',
		href: externalUrls.steam,
		note: 'Official store page, system requirements, and player reviews.',
	},
	{
		id: 'patch',
		label: 'PUBG patch notes & news',
		href: externalUrls.steamNews,
		note: 'Read official update posts before you change your loadout.',
	},
	{
		id: 'official',
		label: 'Official PUBG website',
		href: externalUrls.officialSite,
		note: 'Game overview from KRAFTON.',
	},
	{
		id: 'wiki',
		label: 'PUBG Wiki (Fandom)',
		href: externalUrls.wiki,
		note: 'Weapons, maps, and community-maintained guides.',
	},
	{
		id: 'community',
		label: 'PUBG Community hub',
		href: externalUrls.steamCommunity,
		note: 'Announcements and community discussions.',
	},
];

/** Compact above-the-fold guide links for blogs and page banners. */
export const featuredGuidePills: GuideCta[] = [
	{ label: 'PUBG on PC', href: externalUrls.steam },
	{ label: 'Official patch notes', href: externalUrls.steamNews },
	{ label: 'PUBG Wiki', href: externalUrls.wiki },
];

/**
 * Secondary banner buttons that should point to official guides — not internal sales pages.
 * Keeps primary Buy CTAs while giving Google clear outbound citations.
 */
export const externalSecondaryByPageId: Partial<Record<PageId, GuideCta>> = {
	features: { label: 'Official patch notes', href: externalUrls.steamNews },
	updates: { label: 'PUBG patch notes', href: externalUrls.steamNews },
	hacks: { label: 'PUBG Wiki', href: externalUrls.wiki },
	'pubg-esp': { label: 'PUBG Wiki', href: externalUrls.wiki },
	'pubg-aimbot': { label: 'PUBG Wiki', href: externalUrls.wiki },
	radar: { label: 'PUBG Wiki', href: externalUrls.wiki },
	setup: { label: 'Official game site', href: externalUrls.officialSite },
	support: { label: 'PUBG community', href: externalUrls.steamCommunity },
	faq: { label: 'PUBG Wiki', href: externalUrls.wiki },
	reliable: { label: 'PUBG patch notes', href: externalUrls.steamNews },
	wallhack: { label: 'PUBG Wiki', href: externalUrls.wiki },
	vac: { label: 'Official patch notes', href: externalUrls.steamNews },
	'cheats-2026': { label: 'PUBG on PC', href: externalUrls.steam },
	'cheat-download': { label: 'Official game site', href: externalUrls.officialSite },
	'mod-menu': { label: 'PUBG Wiki', href: externalUrls.wiki },
	'soft-aim': { label: 'PUBG Wiki', href: externalUrls.wiki },
	'best-cheats': { label: 'PUBG community', href: externalUrls.steamCommunity },
	'aimbot-hack': { label: 'PUBG Wiki', href: externalUrls.wiki },
	'esp-hack': { label: 'PUBG Wiki', href: externalUrls.wiki },
	'unlock-all': { label: 'Official game site', href: externalUrls.officialSite },
	pricing: { label: 'PUBG on PC', href: externalUrls.steam },
};

export function getExternalSecondaryCta(pageId: PageId): GuideCta | undefined {
	return externalSecondaryByPageId[pageId];
}

export function isExternalHref(href: string): boolean {
	return href.startsWith('http');
}
