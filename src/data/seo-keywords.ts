import type { PageId } from './i18n/routing';
import { englishPaths } from './i18n/routing';
import {
	keywordsForPath,
	PUBG_OWNER_KEYWORDS,
	type PubgOwnerKeyword,
} from './pubg-keyword-registry';

export const primarySeoKeyword = 'pubg hack';

/** Meta keywords meta tag / schema context — owner list only. */
export const globalSeoKeywords = [...PUBG_OWNER_KEYWORDS];

const pathToPageId: Partial<Record<string, PageId>> = {
	[englishPaths.home]: 'home',
	[englishPaths.hacks]: 'hacks',
	[englishPaths.pricing]: 'pricing',
	[englishPaths['best-cheats']]: 'best-cheats',
	[englishPaths['pubg-esp']]: 'pubg-esp',
	[englishPaths['pubg-aimbot']]: 'pubg-aimbot',
};

function keywordsForPageId(pageId: PageId): PubgOwnerKeyword[] {
	const path = englishPaths[pageId];
	return path ? keywordsForPath(path) : [];
}

/**
 * Per-page meta keywords — only the seven keyword hubs get owner terms.
 * Other pages fall back to the global list without duplicating body keywords.
 */
export const pageSeoKeywords: Partial<Record<PageId, readonly string[]>> = Object.fromEntries(
	Object.entries(pathToPageId).map(([path, pageId]) => [
		pageId,
		keywordsForPath(path),
	]),
) as Partial<Record<PageId, readonly string[]>>;

export const reviewsSeoKeywords = ['pubg cheat reviews'] as const;

export function getPageSeoKeywords(pageId?: PageId): string[] {
	if (!pageId) return [...globalSeoKeywords];
	const hubTerms = keywordsForPageId(pageId);
	return hubTerms.length ? [...hubTerms] : [...globalSeoKeywords];
}
