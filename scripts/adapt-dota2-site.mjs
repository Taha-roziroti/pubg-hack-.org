#!/usr/bin/env node
/**
 * Bulk rebrand: Warzone template → PUBG Hack (pubg-hack.org)
 * Run from project root: node scripts/adapt-pubg-site.mjs
 */
import { readFile, writeFile, readdir, unlink, rm } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');

const SKIP_DIRS = new Set(['node_modules', '.git', 'dist', '.astro']);

const REPLACEMENTS = [
	['https://cheatsforwarzone.com', 'https://pubg-hack.org'],
	['https://www.cheatsforwarzone.com', 'https://pubg-hack.org'],
	['cheatsforwarzone.com', 'pubg-hack.org'],
	['support@cheatsforwarzone.com', 'support@pubg-hack.org'],
	['https://zadeyo.com/go/UMAIR?to=%2Fproducts%2Fwarzone', 'https://pubg-hack.org/store'],
	['https://zadeyo.com', 'https://pubg-hack.org'],
	['zadeyo.com', 'pubg-hack.org'],
	['zadeyo', ''],
	['Call of Duty: Warzone', 'PUBG'],
	['Call of Duty', 'PUBG'],
	['Warzone Cheats', 'PUBG Hack'],
	['warzone cheats', 'PUBG hacks'],
	['warzone cheat', 'PUBG hack'],
	['warzone hacks', 'PUBG hacks'],
	['warzone hack', 'PUBG hack'],
	['warzone aimbot', 'PUBG aimbot'],
	['warzone esp', 'PUBG esp'],
	['warzone wallhack', 'PUBG wallhack'],
	['Warzone', 'PUBG'],
	['warzone', 'pubg'],
	['Ricochet', 'VAC'],
	['ricochet', 'vac'],
	['Verdansk', 'the map'],
	['Battle Royale', 'battle royale matches'],
	['undetected warzone cheats', 'PUBG hacks'],
	['undetected PUBG hacks', 'PUBG hacks'],
	['Undetected warzone cheats', 'PUBG hacks'],
	['Undetected PUBG hacks', 'PUBG hacks'],
	['undetected', 'reliable'],
	['Undetected', 'Reliable'],
	['UNDETECTED', 'RELIABLE'],
	['cheats-for-warzone', 'pubg-cheat'],
	['cheats for warzone', 'PUBG hacks'],
	["/blog/", '/forums/'],
	['"/blog"', '"/forums"'],
	["'/blog'", "'/forums'"],
	['https://www.callofduty.com/warzone', 'https://www.pubg.com/'],
	['https://callofduty.fandom.com', 'https://pubg.fandom.com'],
	['https://www.reddit.com/r/Warzone/', 'https://www.reddit.com/r/DotA2/'],
	['@CallofDuty', '@PUBG'],
	['https://x.com/CallofDuty', 'https://x.com/PUBG'],
];

async function walk(dir, files = []) {
	const entries = await readdir(dir, { withFileTypes: true });
	for (const entry of entries) {
		if (SKIP_DIRS.has(entry.name)) continue;
		const full = path.join(dir, entry.name);
		if (entry.isDirectory()) await walk(full, files);
		else files.push(full);
	}
	return files;
}

function shouldProcess(file) {
	const ext = path.extname(file);
	return ['.ts', '.tsx', '.astro', '.mjs', '.js', '.json', '.md', '.css', '.toml', '.txt', '.xml'].includes(ext);
}

async function processFile(file) {
	if (!shouldProcess(file)) return false;
	if (file.includes('adapt-pubg-site.mjs')) return false;
	if (file.includes('generate-forum-posts.mjs')) return false;
	let content = await readFile(file, 'utf8');
	const original = content;
	for (const [from, to] of REPLACEMENTS) {
		content = content.split(from).join(to);
	}
	if (content !== original) {
		await writeFile(file, content, 'utf8');
		return true;
	}
	return false;
}

async function removeGuides() {
	const targets = [
		path.join(ROOT, 'src/pages/guides'),
		path.join(ROOT, 'src/components/GuideIndexPage.astro'),
		path.join(ROOT, 'src/components/GuidePostPage.astro'),
		path.join(ROOT, 'public/images/guides'),
		path.join(ROOT, 'public/images/zadeyo-logo.webp'),
	];
	for (const target of targets) {
		try {
			await rm(target, { recursive: true, force: true });
			console.log('Removed:', path.relative(ROOT, target));
		} catch {
			/* ignore */
		}
	}
}

async function stubGuidesHelpers() {
	const helpersPath = path.join(ROOT, 'src/data/guides/helpers.ts');
	const stub = `/** Guides removed for PUBG Hack site — forums replace blog/guides. */
export function getGuidesSitemapEntries() {
	return [];
}

export function getAllGuides() {
	return [];
}

export function getGuideBySlug(_slug: string) {
	return undefined;
}
`;
	await writeFile(helpersPath, stub, 'utf8');
	console.log('Stubbed guides helpers');
}

async function main() {
	const files = await walk(ROOT);
	let changed = 0;
	for (const file of files) {
		if (await processFile(file)) changed++;
	}
	console.log(`Updated ${changed} files`);
	await removeGuides();
	await stubGuidesHelpers();
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
