import { siteConfig } from './site';

/** User-provided PUBG gameplay screenshots (6 unique). */
export const PRODUCT_SCREENSHOT_SOURCES = [
	'user:e9856150-255c-41fd-80ae-3de5ea0b228b.png',
	'user:132f67f1-43fd-49a1-bf83-18956c54c349.png',
	'user:00f87a79-1a7c-4182-8eac-56b13eac96a5.png',
	'user:15f781d2-22ce-479d-a904-45ee24abb367.png',
	'user:cbdaa48f-f2e5-4ade-be53-db8846cdd46d.png',
	'user:effc020e-d2ba-42f7-9445-61192e87355a.png',
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
		alt: 'PUBG player ESP boxes with distance markers on Sanhok',
		title: 'PUBG player ESP with distance',
		caption: 'PUBG ESP hack showing enemy boxes and meter readouts through foliage on PC',
	},
	2: {
		alt: 'PUBG sniper scope view during long-range aim',
		title: 'PUBG sniper scope gameplay',
		caption: 'PUBG aimbot-friendly scope view for zeroing and target acquisition on PC',
	},
	3: {
		alt: 'PUBG wallhack skeleton ESP through rock cover',
		title: 'PUBG skeleton ESP wallhack',
		caption: 'PUBG ESP skeleton lines revealing a player behind hard cover on PC',
	},
	4: {
		alt: 'PUBG ESP enemy box through concrete with distance readout',
		title: 'PUBG wallhack distance ESP',
		caption: 'PUBG ESP wallhack with distance tag through a structure at Bootcamp on PC',
	},
	5: {
		alt: 'PUBG player ESP box at 20 meters behind cover',
		title: 'PUBG close-range player ESP',
		caption: 'PUBG ESP hack highlighting a nearby enemy with a 20m distance label on PC',
	},
	6: {
		alt: 'PUBG Bootcamp ESP box while holding M249',
		title: 'PUBG Bootcamp ESP overlay',
		caption: 'PUBG ESP player box during a Bootcamp push with gear level and distance on PC',
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
