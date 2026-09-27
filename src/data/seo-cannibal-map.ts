/**
 * Near-duplicate pageIds → stronger pillars (301 in production via Worker + path-redirects).
 *
 * Long-tail URLs (/pubg-wallhack/, /pubg-mod-menu/, /pubg-cheat-download/, etc.)
 * stay on 301 — not thin indexable stubs — to consolidate link equity on pillar pages
 * and avoid SERP cannibalization against /pubg-esp/, /pubg-aimbot/, /, and /pubg-cheats/.
 */
export const cannibalRedirectTargets = {
	'mod-menu': 'home',
	'unlock-all': 'home',
	'aimbot-hack': 'pubg-aimbot',
	'soft-aim': 'pubg-aimbot',
	'esp-hack': 'pubg-esp',
	wallhack: 'pubg-esp',
	'cheat-download': 'setup',
	reliable: 'updates',
} as const;

export type CannibalPageId = keyof typeof cannibalRedirectTargets;

export const cannibalPageIds = Object.keys(cannibalRedirectTargets) as CannibalPageId[];

export function isCannibalPageId(pageId: string): pageId is CannibalPageId {
	return pageId in cannibalRedirectTargets;
}

export function getCannibalTargetId(pageId: string): string {
	return (cannibalRedirectTargets as Record<string, string>)[pageId] ?? pageId;
}
