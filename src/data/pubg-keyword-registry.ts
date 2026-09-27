/**
 * Owner-supplied keyword set — every term maps to exactly one URL.
 * Primaries drive title/H1/intro; secondaries appear once in body on that URL only.
 */
export const PUBG_OWNER_KEYWORDS = [
	'pubg hack',
	'buy pubg cheats',
	'pubg cheat price',
	'best pubg cheats',
	'pubg cheat reviews',
	'pubg aimbot',
	'pubg esp hack',
	'cheats for pubg',
	'pubg radar',
	'pubg battlegrounds hacks',
	'pubg hacks',
	'cheat pubg',
	'esp pubg',
	'esp for pubg',
] as const;

export type PubgOwnerKeyword = (typeof PUBG_OWNER_KEYWORDS)[number];

export type KeywordRole = 'primary' | 'secondary';

export type KeywordAssignment = {
	path: string;
	role: KeywordRole;
};

/** One home per keyword — no duplicate primaries across URLs. */
export const pubgKeywordByTerm: Record<PubgOwnerKeyword, KeywordAssignment> = {
	'pubg hack': { path: '/', role: 'primary' },
	'pubg hacks': { path: '/', role: 'secondary' },
	'cheats for pubg': { path: '/', role: 'secondary' },
	'pubg battlegrounds hacks': { path: '/', role: 'secondary' },
	'buy pubg cheats': { path: '/pubg-cheats/', role: 'primary' },
	'cheat pubg': { path: '/pubg-cheats/', role: 'secondary' },
	'pubg cheat price': { path: '/pubg-cheat-price/', role: 'primary' },
	'best pubg cheats': { path: '/best-pubg-cheats/', role: 'primary' },
	'pubg cheat reviews': { path: '/pubg-cheat-reviews/', role: 'primary' },
	'pubg aimbot': { path: '/pubg-aimbot/', role: 'primary' },
	'pubg esp hack': { path: '/pubg-esp/', role: 'primary' },
	'esp pubg': { path: '/pubg-esp/', role: 'secondary' },
	'esp for pubg': { path: '/pubg-esp/', role: 'secondary' },
	'pubg radar': { path: '/pubg-esp/', role: 'secondary' },
};

export function keywordsForPath(path: string): PubgOwnerKeyword[] {
	const normalized = path.endsWith('/') || path === '/' ? path : `${path}/`;
	return PUBG_OWNER_KEYWORDS.filter((term) => pubgKeywordByTerm[term].path === normalized);
}
