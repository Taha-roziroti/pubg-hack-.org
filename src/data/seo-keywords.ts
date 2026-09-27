import type { PageId } from './i18n/routing';

export const primarySeoKeyword = 'PUBG hacks';

export const globalSeoKeywords = [
	'PUBG hacks',
	'PUBG hack',
	'PUBG hacks',
	'PUBG aimbot',
	'PUBG esp',
	'PUBG wallhack',
	'pubg triggerbot',
	'pubg radar hack',
	'pubg no recoil',
	'pubg mod menu',
	'PUBG hack software',
	'PUBG hacks pc',
	'PUBG hacks 2026',
	'PUBG hacks',
	'best PUBG hacks',
	'pubg ranked cheats',
	'pubg competitive cheats',
	'pubg unlock tool',
	'pubg soft aim',
	'pubg silent aim',
	'PUBG esp overlay',
	'PUBG wallhack pc',
	'PUBG aimbot pc',
	'PUBG hack menu',
	'pubg game cheats',
	'pubg pc cheats',
	'PUBG hacks windows 11',
	'pubg latest cheats 2026',
] as const;

export const pageSeoKeywords: Partial<Record<PageId, readonly string[]>> = {
	home: [
		'PUBG hacks',
		'PUBG hacks 2026',
		'PUBG hacks',
		'best PUBG hacks',
		'PUBG esp',
		'PUBG aimbot',
	],
	hacks: [
		'PUBG hacks',
		'PUBG hacks',
		'PUBG hack software',
		'PUBG hacks',
		'PUBG esp',
		'PUBG aimbot',
	],
	'pubg-esp': [
		'PUBG esp',
		'PUBG esp cheat',
		'PUBG wallhack',
		'pubg player esp',
		'pubg enemy esp',
		'PUBG esp overlay',
	],
	wallhack: [
		'PUBG wallhack',
		'pubg wall hacks',
		'PUBG wallhack cheat',
		'pubg enemy wallhack',
		'PUBG esp',
	],
	'pubg-aimbot': [
		'PUBG aimbot',
		'PUBG aimbot cheat',
		'pubg legit aimbot',
		'pubg smooth aimbot',
		'pubg headshot aimbot',
	],
	'aimbot-hack': ['PUBG aimbot hack', 'PUBG aimbot', 'pubg rage aimbot', 'pubg auto aim'],
	'soft-aim': ['pubg soft aim', 'pubg silent aim', 'pubg auto targeting', 'PUBG aimbot settings'],
	radar: ['pubg radar hack', 'pubg radar overlay', 'pubg minimap hack', 'pubg live radar'],
	'esp-hack': ['PUBG esp hack', 'PUBG esp', 'PUBG wallhack', 'pubg agent esp'],
	features: [
		'PUBG hack features',
		'PUBG esp',
		'PUBG aimbot',
		'PUBG wallhack',
		'pubg mod menu',
		'pubg streamproof',
	],
	pricing: [
		'buy PUBG hacks',
		'PUBG hacks price',
		'PUBG hacks monthly',
		'PUBG hacks lifetime',
	],
	setup: ['PUBG hacks setup', 'PUBG hack download', 'install PUBG hacks'],
	'cheat-download': ['PUBG hack download', 'PUBG hacks download', 'PUBG hack windows 10'],
	updates: [
		'PUBG hacks',
		'PUBG hacks status',
		'vac update',
		'PUBG hacks reliable',
	],
	reliable: ['PUBG hacks', 'PUBG hacks reliable', 'vac reliable'],
	vac: [
		'vac bypass',
		'pubg vac bypass',
		'pubg anti cheat bypass',
		'pubg ranked cheats',
	],
	'cheats-2026': [
		'PUBG hacks 2026',
		'PUBG hacks 2026',
		'best PUBG hacks 2026',
		'PUBG aimbot 2026',
	],
	'best-cheats': [
		'best PUBG hacks',
		'best PUBG hacks',
		'PUBG hack comparison',
		'PUBG hack review 2026',
	],
	'mod-menu': ['pubg mod menu', 'PUBG hack menu', 'pubg tools'],
	'unlock-all': ['pubg unlock tool', 'pubg unlock all', 'pubg skin unlock tool'],
	faq: ['PUBG hacks faq', 'PUBG hack guide', 'PUBG hacks'],
	support: ['PUBG hacks support', 'PUBG hack setup help'],
};

export const reviewsSeoKeywords = [
	'PUBG hacks reviews',
	'PUBG hack review',
	'PUBG hack review',
	'PUBG esp review',
	'PUBG aimbot review',
	'PUBG wallhack review',
	'PUBG hacks',
	'pubg ranked cheats',
] as const;

export function getPageSeoKeywords(pageId?: PageId): string[] {
	if (!pageId) return [...globalSeoKeywords];
	const pageKeywords = pageSeoKeywords[pageId];
	return pageKeywords?.length ? [...pageKeywords] : [...globalSeoKeywords];
}
