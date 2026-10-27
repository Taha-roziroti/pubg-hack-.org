#!/usr/bin/env node
/** Build responsive WebP hero backgrounds from public/images/pubg-hero-bg-source.jpg */
import { access, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const imagesDir = path.join(ROOT, 'public', 'images');
const source = path.join(imagesDir, 'pubg-hero-bg-source.jpg');
const WIDTHS = [480, 640, 1024];

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
		console.warn('[import-hero-bg] skip — add', source);
		return;
	}
	const meta = await sharp(source).metadata();
	const base = await sharp(source)
		.webp({ quality: 90, effort: 6, smartSubsample: true })
		.toBuffer();
	await writeFile(path.join(imagesDir, 'pubg-hero-bg.webp'), base);

	for (const width of WIDTHS) {
		if (meta.width && width > meta.width) continue;
		const quality = width <= 480 ? 72 : width <= 640 ? 82 : 88;
		const buffer = await sharp(source)
			.resize({ width, withoutEnlargement: true })
			.webp({ quality, effort: 6, smartSubsample: true })
			.toBuffer();
		const file = `pubg-hero-bg-${width}w.webp`;
		await writeFile(path.join(imagesDir, file), buffer);
		console.log(`Wrote public/images/${file}`);
	}
	console.log('Wrote public/images/pubg-hero-bg.webp');
}

main().catch((e) => {
	console.error(e);
	process.exit(1);
});
