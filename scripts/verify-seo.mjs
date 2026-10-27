#!/usr/bin/env node
/**
 * SEO Super Booster checks on built HTML (run after astro build).
 */
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const distDir = path.join(ROOT, 'dist');

function readBrandUrl() {
	const src = readFileSync(path.join(ROOT, 'src/data/brand.ts'), 'utf8');
	const m = src.match(/(?:^|\n)\turl:\s*'((?:\\'|[^'])*)'/);
	if (!m) throw new Error('brand.ts missing url');
	return m[1].replace(/\\'/g, "'").replace(/\/$/, '');
}

const CANONICAL = readBrandUrl();

function walkHtml(dir, files = []) {
	if (!existsSync(dir)) return files;
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) walkHtml(full, files);
		else if (entry.name.endsWith('.html')) files.push(full);
	}
	return files;
}

function checkHome(file, raw) {
	const errors = [];
	const canon = raw.match(/<link rel="canonical" href="([^"]+)"/i)?.[1];
	if (!canon || canon !== `${CANONICAL}/`) {
		errors.push(`canonical must be ${CANONICAL}/ (got ${canon ?? 'none'})`);
	}
	if (!/<link rel="image_src"/i.test(raw)) {
		errors.push('missing rel=image_src');
	}
	const robots = raw.match(/<meta name="robots" content="([^"]+)"/i)?.[1] ?? '';
	if (!robots.includes('max-snippet:-1') || !robots.includes('max-video-preview:-1')) {
		errors.push(`robots meta incomplete: ${robots}`);
	}
	const title = raw.match(/<title>([^<]*)<\/title>/i)?.[1]?.trim();
	const ogTitle = raw.match(/<meta property="og:title" content="([^"]*)"/i)?.[1]?.trim();
	if (title && ogTitle && title !== ogTitle) {
		errors.push('og:title must match <title>');
	}
	const desc = raw.match(/<meta name="description" content="([^"]*)"/i)?.[1];
	const ogDesc = raw.match(/<meta property="og:description" content="([^"]*)"/i)?.[1];
	if (desc && ogDesc && desc !== ogDesc) {
		errors.push('og:description must match meta description');
	}
	if (!/<meta property="og:image"/i.test(raw) || !/<meta name="twitter:image"/i.test(raw)) {
		errors.push('missing og:image or twitter:image');
	}
	const h1s = [...raw.matchAll(/<h1[\s>]/gi)];
	if (h1s.length !== 1) {
		errors.push(`expected 1 h1, found ${h1s.length}`);
	}
	return errors;
}

function main() {
	if (!existsSync(distDir)) {
		console.error('dist/ missing — run npm run build first');
		process.exit(1);
	}
	const homePath = path.join(distDir, 'index.html');
	if (!existsSync(homePath)) {
		console.error('dist/index.html missing');
		process.exit(1);
	}
	const homeRaw = readFileSync(homePath, 'utf8');
	const homeErrors = checkHome(homePath, homeRaw);

	const ogHome = path.join(ROOT, 'public', 'og', 'home.jpg');
	if (!existsSync(ogHome)) {
		homeErrors.push('public/og/home.jpg missing — run npm run generate:seo-assets');
	}

	const titles = new Map();
	for (const file of walkHtml(distDir)) {
		const rel = path.relative(distDir, file).replace(/\\/g, '/');
		if (rel.includes('/')) continue;
		const raw = readFileSync(file, 'utf8');
		if (rawIncludesNoindex(raw)) continue;
		const t = raw.match(/<title>([^<]*)<\/title>/i)?.[1];
		if (!t) continue;
		titles.set(t, (titles.get(t) ?? 0) + 1);
	}
	let dupTitles = 0;
	for (const [, count] of titles) {
		if (count > 1) dupTitles += count - 1;
	}
	if (dupTitles > 0) {
		homeErrors.push(`duplicate root <title> on ${dupTitles} page(s)`);
	}

	if (homeErrors.length) {
		console.error('[verify-seo] failed:\n' + homeErrors.map((e) => `  - ${e}`).join('\n'));
		process.exit(1);
	}
	console.log('[verify-seo] OK — homepage canonical, social meta, robots, h1');
}

function rawIncludesNoindex(html) {
	return /<meta[^>]+name=["']robots["'][^>]+noindex/i.test(html);
}

main();
