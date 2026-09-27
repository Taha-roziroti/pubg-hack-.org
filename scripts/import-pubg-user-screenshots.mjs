/**
 * Import user-provided PUBG gameplay PNGs into pubg-screenshot-01…06 + hero WebP sets.
 * Run: node scripts/import-pubg-user-screenshots.mjs
 */
import { copyFile, mkdir, writeFile } from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';

const ROOT = path.resolve(import.meta.dirname, '..');
const imagesDir = path.join(ROOT, 'public/images');
const assetsDir = '/home/ubuntu/.cursor/projects/workspace/assets';
const archiveDir = path.join(ROOT, 'scripts/assets/pubg-screenshots');

const CONTENT_WIDTHS = [480, 640, 960, 1024, 1199];
const HERO_WIDTHS = [480, 640, 960, 1024, 1199, 1920];
const WEBP = { quality: 82, effort: 6, smartSubsample: true };

/** Six primary product shots — order maps to pubg-screenshot-01 … 06. */
const SCREENSHOT_SOURCES = [
	'e9856150-255c-41fd-80ae-3de5ea0b228b.png', // multi-distance player ESP
	'132f67f1-43fd-49a1-bf83-18956c54c349.png', // sniper scope
	'00f87a79-1a7c-4182-8eac-56b13eac96a5.png', // skeleton ESP through cover
	'15f781d2-22ce-479d-a904-45ee24abb367.png', // wallhack distance through wall
	'cbdaa48f-f2e5-4ade-be53-db8846cdd46d.png', // player ESP 20m
	'effc020e-d2ba-42f7-9445-61192e87355a.png', // Bootcamp ESP box
];

const HERO_SOURCE = '1b9cbe1e-6dae-4c25-a217-621aa0bb6efc.png';

const LEGACY_MAP = {
	'pubg-screenshot-01': ['pubg-cheats-esp.webp', 'pubg-esp-player-tags.webp'],
	'pubg-screenshot-02': ['pubg-cheats-wallhack.webp', 'pubg-cheats-session.webp'],
	'pubg-screenshot-03': ['pubg-cheats-aimbot.webp', 'pubg-cheats-combat.webp'],
	'pubg-screenshot-04': [
		'pubg-cheats-aimbot-view.webp',
		'pubg-aimbot-skeleton.webp',
		'pubg-aimbot-sniper.webp',
	],
	'pubg-screenshot-05': ['pubg-cheats-radar.webp', 'pubg-esp-radar.webp'],
	'pubg-screenshot-06': ['pubg-extract-fight.webp'],
};

async function encodeWebp(input, width, options = WEBP) {
	const meta = await sharp(input).metadata();
	const nativeWidth = meta.width ?? width;
	const targetWidth = Math.min(width, nativeWidth);
	const height = Math.round(((meta.height ?? 667) / nativeWidth) * targetWidth);
	return sharp(input)
		.resize(targetWidth, height, { fit: 'inside', withoutEnlargement: true })
		.webp(options)
		.toBuffer();
}

async function writeScreenshotSet(pngPath, baseName) {
	let canonical = null;
	for (const width of CONTENT_WIDTHS) {
		const file = `${baseName}-${width}w.webp`;
		const webp = await encodeWebp(pngPath, width);
		await writeFile(path.join(imagesDir, file), webp);
	}
	canonical = await encodeWebp(pngPath, 1199);
	await writeFile(path.join(imagesDir, `${baseName}.webp`), canonical);
	return canonical;
}

async function writeHeroSet(pngPath) {
	for (const width of HERO_WIDTHS) {
		const file = width === 1920 ? 'pubg-cheats-hero-4k.webp' : `pubg-cheats-hero-${width}w.webp`;
		const webp = await encodeWebp(pngPath, width);
		await writeFile(path.join(imagesDir, file), webp);
	}
	const hero = await encodeWebp(pngPath, 1199);
	await writeFile(path.join(imagesDir, 'pubg-cheats-hero.webp'), hero);
	await writeFile(path.join(imagesDir, 'pubg-hero-poster.webp'), hero);
	await writeFile(path.join(imagesDir, 'hero-banner.webp'), hero);
	return hero;
}

await mkdir(imagesDir, { recursive: true });
await mkdir(archiveDir, { recursive: true });

const heroPath = path.join(assetsDir, HERO_SOURCE);
console.log('Hero ←', HERO_SOURCE);
await copyFile(heroPath, path.join(archiveDir, 'hero-source.png'));
await writeHeroSet(heroPath);
console.log('✓ pubg-cheats-hero.webp (+ responsive variants)');

for (let i = 0; i < SCREENSHOT_SOURCES.length; i += 1) {
	const file = SCREENSHOT_SOURCES[i];
	const src = path.join(assetsDir, file);
	const num = String(i + 1).padStart(2, '0');
	const base = `pubg-screenshot-${num}`;
	await copyFile(src, path.join(archiveDir, `source-${num}.png`));
	console.log(`Processing ${base} ← ${file}`);
	const canonical = await writeScreenshotSet(src, base);
	for (const name of LEGACY_MAP[base] ?? []) {
		await writeFile(path.join(imagesDir, name), canonical);
	}
}

const reviewsCanonical = await encodeWebp(
	path.join(assetsDir, SCREENSHOT_SOURCES[3]),
	1199,
);
await writeFile(path.join(imagesDir, 'reviews-banner.webp'), reviewsCanonical);
for (const width of [480, 960]) {
	const webp = await encodeWebp(path.join(assetsDir, SCREENSHOT_SOURCES[3]), width);
	await writeFile(path.join(imagesDir, `reviews-banner-${width}w.webp`), webp);
}

console.log('Done — 6 product screenshots + hero imported from user assets.');
