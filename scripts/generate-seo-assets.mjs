#!/usr/bin/env node
/**
 * Build 1200×630 Open Graph JPEGs from first-party screenshots (SEO Super Booster).
 */
import { mkdir, access } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const ogDir = path.join(ROOT, 'public', 'og');
const source = path.join(ROOT, 'public', 'images', 'pubg-screenshot-05.webp');

const OG_WIDTH = 1200;
const OG_HEIGHT = 630;
const BG = { r: 13, g: 10, b: 20, alpha: 1 };

async function exists(p) {
	try {
		await access(p);
		return true;
	} catch {
		return false;
	}
}

async function main() {
	if (!(await exists(source))) {
		console.warn('[generate-seo-assets] skip — missing', source);
		return;
	}
	await mkdir(ogDir, { recursive: true });
	const out = path.join(ogDir, 'home.jpg');
	await sharp(source)
		.resize(OG_WIDTH, OG_HEIGHT, { fit: 'cover', position: 'centre' })
		.flatten({ background: BG })
		.jpeg({ quality: 88, mozjpeg: true })
		.toFile(out);
	console.log(`Wrote ${path.relative(ROOT, out)} (${OG_WIDTH}×${OG_HEIGHT})`);
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
