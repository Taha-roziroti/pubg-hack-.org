import { siteConfig } from './site';

/** User-provided PUBG gameplay screenshots (6 unique). */
export const PRODUCT_SCREENSHOT_SOURCES = [
	'user:13be2916-8042-448d-8b88-a282c00c22b4.png',
	'user:f422ed6d-143e-434c-88e8-6c492f64d752.png',
	'user:198f0c2b-9d76-4ffb-bb9c-dfde83999fbf.png',
	'user:c43cb5d5-b6f2-4e58-8506-fb591f4a7b51.png',
	'user:1d49a213-56a6-4bdb-878e-655613144c66.png',
	'user:f7f8f852-cfcb-45c2-a5ff-84dc50e6b2c0.png',
] as const;

export const PRODUCT_SCREENSHOT_COUNT = PRODUCT_SCREENSHOT_SOURCES.length;

export type ProductScreenshotMeta = {
	id: number;
	src: string;
	url: string;
	sourceUrl: string;
	sourceKey: string;
	alt: string;
	title: string;
	caption: string;
};

const alts: Record<number, { alt: string; title: string; caption: string }> = {
	1: {
		alt: 'PUBG hack ESP player boxes during an battle royale match',
		title: 'PUBG ESP player outlines',
		caption: 'PUBG hacks ESP highlighting enemy players during a raid on PC',
	},
	2: {
		alt: 'PUBG soft aim FOV ring during a firefight',
		title: 'PUBG soft aim overlay',
		caption: 'PUBG aimbot soft aim FOV ring during close-range combat on PC',
	},
	3: {
		alt: 'PUBG loot ESP tags on crates and gear',
		title: 'PUBG loot ESP markers',
		caption: 'PUBG hacks loot ESP marking high-value gear during a raid on PC',
	},
	4: {
		alt: 'PUBG radar map with nearby threat arrows',
		title: 'PUBG 2D radar overlay',
		caption: 'PUBG radar hack showing off-screen squad movement on PC',
	},
	5: {
		alt: 'PUBG wallhack skeleton and distance readouts',
		title: 'PUBG ESP skeleton overlay',
		caption: 'PUBG ESP wallhack with skeleton lines and distance tags on PC',
	},
	6: {
		alt: 'PUBG mod menu with ESP and aim toggles',
		title: 'PUBG in-match mod menu',
		caption: 'PUBG mod menu toggles for ESP, radar, and soft aim on PC',
	},
};

export function normalizeScreenshotId(n: number): number {
	return ((n - 1) % PRODUCT_SCREENSHOT_COUNT) + 1;
}

export function screenshotSourceKey(id: number): string {
	return PRODUCT_SCREENSHOT_SOURCES[normalizeScreenshotId(id) - 1]!;
}

export function screenshotsShareSource(a: number, b: number): boolean {
	return screenshotSourceKey(a) === screenshotSourceKey(b);
}

export function screenshotIdFromSrc(src: string): number | undefined {
	const match = src.match(/pubg-screenshot-(\d{2})\.webp/i);
	return match ? parseInt(match[1]!, 10) : undefined;
}

/** Cinematic player art — homepage banner only; never reuse in galleries or in-game blocks. */
export const HERO_IMAGE_PREFIXES = ['/images/pubg-cheats-hero', '/images/pubg-hero-poster'] as const;

export function isHeroMarketingImage(src: string): boolean {
	return HERO_IMAGE_PREFIXES.some((prefix) => src.startsWith(prefix));
}

export function screenshotSrc(n: number): string {
	const id = normalizeScreenshotId(n);
	return `/images/pubg-screenshot-${String(id).padStart(2, '0')}.webp`;
}

export function absoluteScreenshotUrl(n: number): string {
	return new URL(screenshotSrc(n), siteConfig.url).href;
}

export function getProductScreenshot(n: number): ProductScreenshotMeta {
	const id = normalizeScreenshotId(n);
	const meta = alts[id] ?? {
		alt: `PUBG hacks gameplay screenshot ${id}`,
		title: `PUBG hacks screenshot ${id}`,
		caption: `PUBG hacks screenshot ${id} for PUBG PUBG on Windows PC`,
	};
	const src = screenshotSrc(id);
	const sourceKey = screenshotSourceKey(id);
	return {
		id,
		src,
		url: new URL(src, siteConfig.url).href,
		sourceUrl: sourceKey,
		sourceKey,
		...meta,
	};
}

/** Pick N screenshots with unique source assets — skips duplicate visuals. */
export function pickUniqueScreenshotIds(options: {
	count: number;
	excludeKeys?: Iterable<string>;
	startOffset?: number;
}): number[] {
	const { count, excludeKeys = [], startOffset = 0 } = options;
	const usedKeys = new Set(excludeKeys);
	const result: number[] = [];

	for (
		let offset = 0;
		result.length < count && offset < PRODUCT_SCREENSHOT_COUNT * 3;
		offset += 1
	) {
		const id = normalizeScreenshotId(startOffset + offset + 1);
		const key = screenshotSourceKey(id);
		if (usedKeys.has(key)) continue;
		usedKeys.add(key);
		result.push(id);
	}

	return result;
}

export const productScreenshots: ProductScreenshotMeta[] = Array.from(
	{ length: PRODUCT_SCREENSHOT_COUNT },
	(_, i) => getProductScreenshot(i + 1),
);

/** JSON-LD ImageObject nodes for gallery / sitemap parity. */
export function screenshotImageObjects(limit = PRODUCT_SCREENSHOT_COUNT) {
	return productScreenshots.slice(0, limit).map((shot) => ({
		'@type': 'ImageObject' as const,
		'@id': `${shot.url}#image`,
		url: shot.url,
		contentUrl: shot.url,
		name: shot.title,
		description: shot.caption,
		thumbnailUrl: shot.url,
	}));
}
